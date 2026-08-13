import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'

const CONTACT_EMAIL = 'md.mizan235@gmail.com'

const SOCIAL_LINKS = ['Instagram', 'TikTok', 'YouTube']

// Shared sample thumbnail — replace public/sample.jpg with your own photo
// and every thumbnail on the Story and Jobs pages updates automatically.
const placeholder = (_seed: string) => '/sample.jpg'

const JOBS = [
  {
    title: 'Owner & Manager',
    org: 'Dream Pharmacy',
    location: 'Dhaka, Bangladesh',
    period: '2022 – Present',
    thumb: placeholder('dream-pharmacy'),
    bullets: [
      'Manage daily operations of a community pharmacy',
      'Handle medicine purchasing, inventory, storage, and stock management',
      'Dispense medicines according to prescriptions and professional requirements',
      'Provide customers with appropriate information regarding medicines and healthcare products within professional scope',
      'Maintain pharmaceutical product records and monitor stock levels',
      'Coordinate with pharmaceutical suppliers and distributors',
      'Manage pharmacy sales, purchasing, pricing, and customer service',
      'Ensure proper organization and storage of medicines',
      'Supervise overall pharmacy administration and business operations',
    ],
  },
  {
    title: 'Medical Administrator',
    org: 'Life Line Hospital Pvt.',
    location: null,
    period: '2021 – 2022',
    thumb: placeholder('life-line-hospital'),
    bullets: [
      'Assisted with hospital administration and daily healthcare operations',
      'Coordinated with medical staff, patients, and administrative personnel',
      'Assisted with patient-related documentation and records',
      'Supported smooth coordination of hospital services',
      'Assisted with general administrative and operational responsibilities',
      'Communicated with patients and healthcare staff regarding routine hospital activities',
    ],
  },
  {
    title: 'Medical Assistant',
    org: 'Al-Habib Hospital Pvt.',
    location: null,
    period: '2018 – 2022',
    thumb: placeholder('al-habib-hospital'),
    bullets: [
      'Assisted doctors and healthcare professionals with routine clinical activities',
      'Supported patient care and basic clinical procedures',
      'Assisted with patient preparation and monitoring',
      'Maintained patient-related records and documentation',
      'Communicated with patients regarding routine healthcare procedures',
      'Supported day-to-day clinical and hospital operations',
      'Worked as part of a healthcare team in a hospital environment',
    ],
  },
  {
    title: 'Pharmacy Intern',
    org: 'Pharmacy Training',
    location: null,
    period: '2018 – 2019',
    thumb: placeholder('pharmacy-intern'),
    bullets: [
      'Completed practical pharmacy training',
      'Assisted with medicine dispensing and prescription-related activities',
      'Gained practical knowledge of pharmaceutical products',
      'Assisted with pharmaceutical inventory and stock organization',
      'Learned proper medicine storage and handling procedures',
      'Developed practical knowledge of pharmacy workflow and customer service',
    ],
  },
]

function Page({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children: ReactNode
}) {
  return (
    <main className="min-h-[100dvh] bg-black px-6 pb-28 pt-28 font-hn text-cream sm:px-10 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-cream/50">{kicker}</p>
        <h1 className="mt-3 text-5xl leading-none sm:text-6xl">{title}</h1>
        <div className="mt-8 h-0.5 w-16 bg-cream" />
        {children}
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="text-xl uppercase tracking-[0.2em] text-cream/80">{title}</h2>
      <div className="mt-6 space-y-8">{children}</div>
    </section>
  )
}

function Thumb({
  src,
  alt,
  className = 'h-20 w-28',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`shrink-0 border border-cream/20 object-cover ${className}`}
    />
  )
}

function Entry({
  title,
  meta,
  bullets,
  thumb,
}: {
  title: string
  meta?: string
  bullets: string[]
  thumb?: string
}) {
  return (
    <div className="flex gap-5">
      {thumb ? <Thumb src={thumb} alt={title} /> : null}
      <div>
        <h3 className="text-lg">{title}</h3>
        {meta ? <p className="mt-1 text-sm text-cream/60">{meta}</p> : null}
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-cream/85 marker:text-cream/40">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function List({ items }: { items: { label: string; thumb: string }[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-3">
          <Thumb src={item.thumb} alt={item.label} className="h-12 w-16" />
          <span className="text-sm leading-relaxed text-cream/85">{item.label}</span>
        </li>
      ))}
    </ul>
  )
}

export function StoryPage() {
  return (
    <Page kicker="About" title="Story">
      <Section title="Professional Summary">
        <p className="text-sm leading-relaxed text-cream/85">
          Dedicated healthcare professional with 4+ years of medical assistant experience, hospital
          administration experience, pharmacy training, and hands-on experience managing a community
          pharmacy. Qualified in Pharmaceutical Technology, Nursing, Health Technology &amp; Services,
          and Chemistry, with practical experience in patient support, hospital operations, pharmacy
          management, pharmaceutical inventory, and medicine-related services.
        </p>
        <p className="text-sm leading-relaxed text-cream/85">
          Currently serving as the <span className="text-cream">Owner &amp; Manager of Dream
          Pharmacy</span>, with several years of practical experience in pharmaceutical and healthcare
          services.
        </p>
      </Section>

      <Section title="Education & Training">
        <Entry
          title="Bachelor of Science (BSc) in Chemistry — Honours"
          meta="National University of Bangladesh"
          thumb={placeholder('chemistry')}
          bullets={[
            'Major: Chemistry',
            'Currently completing the degree',
            '4th-year examination upcoming',
          ]}
        />
        <Entry
          title="Diploma in Pharmaceutical Technology"
          thumb={placeholder('pharmaceutical-technology')}
          bullets={[
            'Professional training in pharmaceutical technology, medicines, pharmacy operations, and pharmaceutical practices',
          ]}
        />
        <Entry
          title="Health Technology and Services"
          meta="Noakhali Paramedical College"
          thumb={placeholder('health-technology')}
          bullets={[
            'Professional healthcare-related training covering health technology and healthcare services',
          ]}
        />
        <Entry
          title="1-Year Nursing Certificate"
          thumb={placeholder('nursing')}
          bullets={['Completed one-year professional nursing-related training']}
        />
      </Section>

      <Section title="Career Objective">
        <p className="text-sm leading-relaxed text-cream/85">
          To utilize my combined experience in medical assistance, pharmacy practice, healthcare
          administration, pharmaceutical technology, and chemistry in a professional healthcare
          organization where I can contribute my practical experience while continuing to develop my
          medical and pharmaceutical knowledge.
        </p>
      </Section>

      <Section title="Professional Qualifications">
        <List
          items={[
            { label: 'Licensed Pharmacist', thumb: placeholder('licensed-pharmacist') },
            { label: 'Certified Chemist', thumb: placeholder('certified-chemist') },
            { label: 'Medical Assistant', thumb: placeholder('medical-assistant') },
            {
              label: 'Diploma in Pharmaceutical Technology',
              thumb: placeholder('pharma-diploma'),
            },
            {
              label: 'Health Technology & Services training',
              thumb: placeholder('health-training'),
            },
            { label: '1-Year Nursing Certificate', thumb: placeholder('nursing-certificate') },
          ]}
        />
      </Section>

      <Section title="Professional Strengths">
        <List
          items={[
            { label: 'Patient-focused communication', thumb: placeholder('communication') },
            { label: 'Pharmacy management', thumb: placeholder('pharmacy-management') },
            { label: 'Healthcare service', thumb: placeholder('healthcare-service') },
            { label: 'Medical administration', thumb: placeholder('medical-administration') },
            { label: 'Teamwork', thumb: placeholder('teamwork') },
            { label: 'Professional responsibility', thumb: placeholder('responsibility') },
            {
              label: 'Pharmaceutical inventory management',
              thumb: placeholder('inventory-management'),
            },
            { label: 'Problem solving', thumb: placeholder('problem-solving') },
            { label: 'Customer service', thumb: placeholder('customer-service') },
            { label: 'Healthcare documentation', thumb: placeholder('documentation') },
            {
              label: 'Business and operational management',
              thumb: placeholder('business-management'),
            },
          ]}
        />
      </Section>

      <Section title="Languages">
        <List
          items={[
            { label: 'Bangla — Native', thumb: placeholder('bangla') },
            { label: 'English — Professional', thumb: placeholder('english') },
            { label: 'Arabic — Working Knowledge', thumb: placeholder('arabic') },
            { label: 'Urdu/Hindi — Working Knowledge', thumb: placeholder('urdu-hindi') },
          ]}
        />
      </Section>

      <Section title="References">
        <div className="flex items-center gap-5">
          <Thumb src={placeholder('references')} alt="References" />
          <p className="text-sm leading-relaxed text-cream/85">Available upon request.</p>
        </div>
      </Section>
    </Page>
  )
}

export function JobsPage() {
  return (
    <Page kicker="Experience" title="Jobs">
      <Section title="Experience Summary">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-cream/20">
                <th className="pb-3 pr-6 text-xs font-normal uppercase tracking-wider text-cream/60">
                  Photo
                </th>
                <th className="pb-3 pr-6 text-xs font-normal uppercase tracking-wider text-cream/60">
                  Position
                </th>
                <th className="pb-3 pr-6 text-xs font-normal uppercase tracking-wider text-cream/60">
                  Organization
                </th>
                <th className="pb-3 text-xs font-normal uppercase tracking-wider text-cream/60">
                  Period
                </th>
              </tr>
            </thead>
            <tbody>
              {JOBS.map((job) => (
                <tr key={job.title} className="border-b border-cream/10">
                  <td className="py-4 pr-6">
                    <Thumb src={job.thumb} alt={job.title} className="h-10 w-14" />
                  </td>
                  <td className="py-4 pr-6 text-sm text-cream">{job.title}</td>
                  <td className="py-4 pr-6 text-sm text-cream/85">{job.org}</td>
                  <td className="py-4 text-sm text-cream/60">{job.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Roles & Responsibilities">
        {JOBS.map((job) => (
          <Entry
            key={job.title}
            title={job.title}
            meta={[job.location, job.org, job.period].filter(Boolean).join(' — ')}
            thumb={job.thumb}
            bullets={job.bullets}
          />
        ))}
      </Section>
    </Page>
  )
}

export function MessagePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Message from ${name.trim()}`)
    const body = encodeURIComponent(
      `${message.trim()}\n\n— ${name.trim()}${email.trim() ? ` (${email.trim()})` : ''}`,
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const inputClass =
    'w-full border-b border-cream/25 bg-transparent py-3 text-sm text-cream transition-colors placeholder:text-cream/40 focus:border-cream'

  return (
    <Page kicker="Contact" title="Message">
      <Section title="Send a Message">
        <p className="text-sm leading-relaxed text-cream/85">
          Have a question, an opportunity, or just want to say hello? Fill in the form below — it
          opens your email app with everything ready to send.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-cream/60">Name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-cream/60">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </label>
          </div>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-cream/60">Message</span>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Write your message…"
              className={`${inputClass} resize-none`}
            />
          </label>
          <button
            type="submit"
            className="inline-block border border-cream/60 px-8 py-3 text-sm uppercase tracking-[0.2em] transition-colors hover:bg-cream hover:text-black"
          >
            Send Message
          </button>
        </form>
        {sent ? (
          <p className="mt-6 text-sm text-cream/70">
            Thanks — your email app should open with the message ready to send.
          </p>
        ) : null}
      </Section>

      <Section title="Or Email Me Directly">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-sm text-cream/85 underline-offset-4 hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
      </Section>

      <Section title="Find Me">
        <div className="flex flex-wrap gap-6">
          {SOCIAL_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="text-sm text-cream/85 underline-offset-4 hover:underline"
            >
              {label}
            </a>
          ))}
        </div>
      </Section>
    </Page>
  )
}
