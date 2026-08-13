// Regression test: opening the mobile menu by tapping must never paint a
// focus ring on a nav item ("Story"), while keyboard users still get a
// visible focus indicator and the Tab trap keeps focus inside the drawer.
//
// Run: npm test   (requires `npm i -D playwright` + `npx playwright install chromium`)
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'

const PORT = 4173
const BASE = process.env.BASE_URL ?? `http://localhost:${PORT}`

let server
if (!process.env.BASE_URL) {
  server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
    stdio: 'ignore',
  })
  // Wait for the preview server to accept connections
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(BASE)
      if (res.ok) break
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 200))
  }
}

let browser
try {
  browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 375, height: 667 } })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  // Let the entrance animations finish so nothing interferes
  await page.waitForTimeout(2600)

  const storyLink = '#menu-panel nav a:first-child'
  // The hamburger is the only <button>; its aria-label flips with state
  const hamburger = 'button[aria-expanded]'

  const state = () =>
    page.evaluate((sel) => {
      const active = document.activeElement
      const link = document.querySelector(sel)
      const panel = document.querySelector('#menu-panel')
      const s = getComputedStyle(link)
      const ps = getComputedStyle(panel)
      return {
        activeTag: active?.tagName ?? null,
        activeId: active?.id ?? null,
        activeText: active?.textContent?.trim().slice(0, 30) ?? null,
        storyOutlineStyle: s.outlineStyle,
        storyOutlineWidth: s.outlineWidth,
        panelOutlineStyle: ps.outlineStyle,
        panelOutlineWidth: ps.outlineWidth,
        inputMode: document.documentElement.dataset.input ?? null,
      }
    }, storyLink)

  const ringVisible = (st) =>
    st.storyOutlineStyle !== 'none' && parseFloat(st.storyOutlineWidth) > 0
  const panelRingVisible = (st) =>
    st.panelOutlineStyle !== 'none' && parseFloat(st.panelOutlineWidth) > 0

  let failures = 0
  const check = (cond, msg) => {
    console.log(`${cond ? 'PASS' : 'FAIL'}: ${msg}`)
    if (!cond) failures++
  }

  // --- Scenario 1: tap-open (the reported bug) -------------------------------
  await page.click(hamburger)
  await page.waitForTimeout(700)
  let st = await state()
  console.log('\n--- After first tap-open ---')
  console.log('  activeElement:', st.activeTag, st.activeId, JSON.stringify(st.activeText))
  console.log('  Story outline:', st.storyOutlineStyle, st.storyOutlineWidth)
  console.log('  Panel outline:', st.panelOutlineStyle, st.panelOutlineWidth, '(input:', st.inputMode, ')')
  check(st.activeId === 'menu-panel', 'focus lands on the dialog panel, not a nav link')
  check(!ringVisible(st), 'no visible ring on "Story" after tap-open')
  check(!panelRingVisible(st), 'no visible ring on the drawer panel after tap-open')

  // --- Scenario 2: open/close/reopen repeatedly (the flaky repro) ------------
  for (let i = 0; i < 4; i++) {
    await page.click(hamburger) // close
    await page.waitForTimeout(700)
    await page.click(hamburger) // reopen
    await page.waitForTimeout(700)
    st = await state()
    console.log(`\n--- After reopen #${i + 1} ---`)
    console.log('  Story outline:', st.storyOutlineStyle, st.storyOutlineWidth)
    console.log('  Panel outline:', st.panelOutlineStyle, st.panelOutlineWidth, '(input:', st.inputMode, ')')
    check(!ringVisible(st), `no visible ring on "Story" after reopen #${i + 1}`)
    check(!panelRingVisible(st), `no visible ring on the panel after reopen #${i + 1}`)
  }

  // Close the drawer so we can reproduce the exact flaky case below
  await page.click(hamburger)
  await page.waitForTimeout(700)

  // --- Scenario 2b: keypress first, THEN tap (the flaky repro) ---------------
  // With the old code, Chrome remembered the keyboard interaction and
  // painted a ring on programmatic focus even though the tap that opened
  // the menu was a pointer interaction.
  console.log('\n--- Keypress then tap-open ---')
  await page.keyboard.press('ArrowDown') // makes the browser treat input as keyboard
  await page.click(hamburger) // pointer interaction must override it
  await page.waitForTimeout(700)
  st = await state()
  console.log('  input mode:', st.inputMode)
  console.log('  Story outline:', st.storyOutlineStyle, st.storyOutlineWidth)
  console.log('  Panel outline:', st.panelOutlineStyle, st.panelOutlineWidth)
  check(st.inputMode === 'pointer', 'pointer interaction resets the tracked input mode')
  check(!ringVisible(st), 'no visible ring on "Story" after keypress-then-tap')
  check(!panelRingVisible(st), 'no visible ring on the panel after keypress-then-tap')

  // --- Scenario 3: keyboard users still get focus + a visible indicator ------
  console.log('\n--- Keyboard (Tab) ---')
  await page.keyboard.press('Tab')
  st = await state()
  console.log('  activeElement after Tab:', st.activeTag, JSON.stringify(st.activeText))
  check(st.activeText === 'Story', 'Tab moves focus to the first link ("Story")')
  check(ringVisible(st), 'keyboard focus shows a visible indicator on "Story"')

  // There are 6 links total (3 nav + 3 social), so it takes 6 presses to
  // move from the first link past the last and back to the first.
  for (let i = 0; i < 6; i++) await page.keyboard.press('Tab')
  st = await state()
  check(st.activeText === 'Story', 'Tab wraps from last link back to first (trap works)')

  // Shift+Tab from the first link wraps to the last focusable in the panel
  await page.keyboard.press('Shift+Tab')
  st = await state()
  const lastLinkText = await page.$eval('#menu-panel', (panel) => {
    const links = panel.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    return links[links.length - 1].textContent.trim()
  })
  console.log('  activeElement after Shift+Tab:', st.activeText)
  check(st.activeText === lastLinkText, 'Shift+Tab wraps from first link to last (trap works)')

  // --- Scenario 4: Escape closes and focus returns to the hamburger ----------
  await page.keyboard.press('Escape')
  await page.waitForTimeout(700)
  const active = await page.evaluate(() => {
    const el = document.activeElement
    return { tag: el?.tagName, label: el?.getAttribute('aria-label') }
  })
  console.log('\n--- After Escape ---')
  console.log('  activeElement:', active.tag, JSON.stringify(active.label))
  check(active.label === 'Open menu', 'focus returns to the hamburger after close')

  console.log(`\n${failures === 0 ? 'ALL TESTS PASSED' : `${failures} TEST(S) FAILED`}`)
  process.exitCode = failures === 0 ? 0 : 1
} finally {
  await browser?.close()
  server?.kill()
}
