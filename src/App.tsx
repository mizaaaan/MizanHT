import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const BG_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85'

const PORTRAIT_URL =
  'https://stone-expand-60400629.figma.site/_assets/v11/8da570354e86aa0d44ac3e4aa335a72c8e750d68.png'

const NAV_LINKS = ['Story', 'Jobs', 'Message']
const SOCIAL_LINKS = ['Instagram', 'TikTok', 'YouTube']

// Drop the entrance animation after it completes so `animation-fill-mode: both`
// stops pinning opacity/transform and hover effects work again.
function releaseEntrance(e: React.AnimationEvent<HTMLAnchorElement>) {
  e.currentTarget.classList.remove('anim-fade-up')
}

function App() {
  const [open, setOpen] = useState(false)

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-black text-cream">
      {/* Background image — full bleed, behind everything */}
      <img
        src={BG_URL}
        alt=""
        className="anim-fade-in absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Marquee — giant scrolling name */}
      <div
        className="anim-fade-up absolute inset-x-0 top-[16vh] z-10 overflow-hidden sm:top-[14vh]"
        style={{ animationDelay: '500ms' }}
      >
        <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] leading-none text-cream sm:text-[26vh]">
          <span className="pr-[6vw]">Marcus&nbsp;&mdash;&nbsp;Bennet&nbsp;</span>
          <span className="pr-[6vw]" aria-hidden="true">
            Marcus&nbsp;&mdash;&nbsp;Bennet&nbsp;
          </span>
        </div>
      </div>

      {/* Horizontal cream rule */}
      <div
        className="anim-line absolute inset-x-6 bottom-[5.5rem] z-10 h-0.5 bg-cream sm:inset-x-10 sm:bottom-28"
        style={{ animationDelay: '1200ms' }}
      />

      {/* Footer blurb */}
      <footer className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 pb-5 font-hn text-xs leading-relaxed sm:z-10 sm:px-10 sm:pb-8 sm:text-sm">
        <div className="anim-fade-up" style={{ animationDelay: '1400ms' }}>
          <p>Visuals Composer</p>
          <p>Digital Crafter</p>
          <p>Obsessed by The Office</p>
        </div>
        <div
          className="anim-fade-up text-right"
          style={{ animationDelay: '1550ms' }}
        >
          <p>A homage to</p>
          <p>Marcus Holloway</p>
        </div>
      </footer>

      {/* Front portrait — cutout over the marquee */}
      <img
        src={PORTRAIT_URL}
        alt="Portrait"
        className="anim-rise-in pointer-events-none absolute inset-0 z-20 h-full w-full object-cover"
        style={{ animationDelay: '300ms' }}
      />

      {/* Header chrome */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
        <a
          href="#"
          className="anim-fade-up font-hn text-lg tracking-wide"
          style={{ animationDelay: '800ms' }}
        >
          Marcus
        </a>

        <div className="hidden items-start gap-16 sm:flex lg:gap-24">
          <span
            className="anim-fade-up text-sm"
            style={{ animationDelay: '900ms' }}
          >
            2025
          </span>
          <nav className="flex flex-col gap-0.5 text-sm">
            {NAV_LINKS.map((label, i) => (
              <a
                key={label}
                href="#"
                onAnimationEnd={releaseEntrance}
                className="anim-fade-up transition-opacity duration-300 hover:opacity-60"
                style={{ animationDelay: `${1000 + i * 80}ms` }}
              >
                {label}
              </a>
            ))}
          </nav>
          <nav className="flex flex-col gap-0.5 text-sm">
            {SOCIAL_LINKS.map((label, i) => (
              <a
                key={label}
                href="#"
                onAnimationEnd={releaseEntrance}
                className="anim-fade-up transition-opacity duration-300 hover:opacity-60"
                style={{ animationDelay: `${1150 + i * 80}ms` }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile hamburger — morphs into an X */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="anim-fade-up absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center sm:hidden"
        style={{ animationDelay: '900ms' }}
      >
        <span className="relative block h-4 w-6">
          <span
            className={`absolute left-0 top-0 h-0.5 w-6 bg-cream transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-cream transition-opacity duration-300 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-6 bg-cream transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </span>
      </button>

      {/* Mobile drawer */}
      <div className="sm:hidden">
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
            open ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        />

        {/* Panel */}
        <aside
          aria-hidden={!open}
          inert={!open}
          className={`fixed right-0 top-0 z-40 h-full w-[80%] max-w-sm bg-[#141414] px-8 py-10 transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className={`absolute right-6 top-6 text-cream transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              open ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
            }`}
            style={{ transitionDelay: open ? '300ms' : '0ms' }}
          >
            <X size={26} strokeWidth={1.5} />
          </button>

          <div className="flex h-full flex-col pt-12">
            <p
              className={`uppercase tracking-[0.2em] text-cream/50 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: open ? '250ms' : '0ms' }}
            >
              Site Index
            </p>
            <nav className="mt-6 flex flex-col gap-3">
              {NAV_LINKS.map((label, i) => (
                <a
                  key={label}
                  href="#"
                  className={`text-4xl transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{ transitionDelay: open ? `${300 + i * 80}ms` : '0ms' }}
                >
                  {label}
                </a>
              ))}
            </nav>

            <p
              className={`mt-10 uppercase tracking-[0.2em] text-cream/50 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: open ? '500ms' : '0ms' }}
            >
              Find Me
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              {SOCIAL_LINKS.map((label, i) => (
                <a
                  key={label}
                  href="#"
                  className={`text-sm transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: open ? `${550 + i * 60}ms` : '0ms' }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default App
