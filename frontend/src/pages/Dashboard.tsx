import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/pathfinder-logo.png'
import CompatibilityGauge from '../components/CompatibilityGauge'
import RadarChart from '../components/RadarChart'
import { fetchCurrentUser, isAuthenticated, logout, type User } from '../lib/auth'
import './Dashboard.css'

// Derive up to two initials from an email's local part (no name field available).
function getInitials(email: string): string {
  const local = email.split('@')[0] ?? ''
  const parts = local.split(/[.\-_+]/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  if (local.length >= 2) return local.slice(0, 2).toUpperCase()
  return (local[0] ?? '?').toUpperCase()
}

const CAREER_MATCHES = [
  {
    title: 'UX Designer',
    match: 94,
    why: 'You enjoy creative problem-solving, care about how things feel to use, and prefer working in collaborative team environments.',
    description: 'UX Designers shape how people interact with digital products. You will run user research sessions, sketch wireframes, prototype ideas, and work hand-in-hand with engineers to ship interfaces that feel effortless.',
    avgSalary: '$78,000',
    seniorSalary: '$130,000+',
    growthRate: '+16%',
    growthLabel: 'job growth by 2032',
    majors: ['Human-Computer Interaction', 'Graphic Design', 'Psychology', 'Information Systems'],
    dayInLife: 'Morning standup with the product team, afternoon user testing session, end of day reviewing design feedback in Figma.',
    employmentProbability: 82,
    dimensions: [
      { label: 'Interests', value: 95 },
      { label: 'Skills', value: 88 },
      { label: 'Personality', value: 90 },
      { label: 'Work style', value: 92 },
      { label: 'Academics', value: 84 },
    ],
  },
  {
    title: 'Software Engineer',
    match: 88,
    why: 'You like figuring out how things work, enjoy logical challenges, and get satisfaction from building something from scratch.',
    description: 'Software Engineers build the systems and applications that power modern products. Roles range from crafting user interfaces to designing back-end APIs and cloud infrastructure that scales to millions of users.',
    avgSalary: '$110,000',
    seniorSalary: '$180,000+',
    growthRate: '+25%',
    growthLabel: 'job growth by 2032',
    majors: ['Computer Science', 'Software Engineering', 'Mathematics', 'Electrical Engineering'],
    dayInLife: 'Code review in the morning, building a new feature after lunch, deploying to production before end of day.',
    employmentProbability: 90,
    dimensions: [
      { label: 'Interests', value: 86 },
      { label: 'Skills', value: 92 },
      { label: 'Personality', value: 78 },
      { label: 'Work style', value: 80 },
      { label: 'Academics', value: 90 },
    ],
  },
  {
    title: 'Data Analyst',
    match: 81,
    why: 'You are detail-oriented, enjoy spotting patterns, and like turning messy information into something clear and useful.',
    description: 'Data Analysts collect, clean, and interpret data to help organisations make smarter decisions. You will work with SQL, Python, and visualisation tools like Tableau to surface insights that drive strategy.',
    avgSalary: '$67,000',
    seniorSalary: '$110,000+',
    growthRate: '+23%',
    growthLabel: 'job growth by 2032',
    majors: ['Statistics', 'Data Science', 'Economics', 'Business Analytics'],
    dayInLife: 'Pulling a dataset in the morning, building a dashboard by noon, presenting findings to the marketing team in the afternoon.',
    employmentProbability: 85,
    dimensions: [
      { label: 'Interests', value: 78 },
      { label: 'Skills', value: 85 },
      { label: 'Personality', value: 74 },
      { label: 'Work style', value: 82 },
      { label: 'Academics', value: 88 },
    ],
  },
  {
    title: 'Product Manager',
    match: 76,
    why: 'You think about the big picture, enjoy coordinating people, and are good at making decisions with incomplete information.',
    description: 'Product Managers own the strategy and roadmap for a product. You will define what gets built and why, balancing user needs with business goals, and work across design, engineering, and marketing to ship it.',
    avgSalary: '$120,000',
    seniorSalary: '$200,000+',
    growthRate: '+19%',
    growthLabel: 'job growth by 2032',
    majors: ['Business Administration', 'Computer Science', 'Engineering Management', 'Communications'],
    dayInLife: 'Writing a product spec in the morning, syncing with engineering on priorities, reviewing analytics in the afternoon.',
    employmentProbability: 79,
    dimensions: [
      { label: 'Interests', value: 80 },
      { label: 'Skills', value: 72 },
      { label: 'Personality', value: 88 },
      { label: 'Work style', value: 78 },
      { label: 'Academics', value: 76 },
    ],
  },
  {
    title: 'Graphic Designer',
    match: 71,
    why: 'You have a strong visual sense, enjoy making things look polished, and like working on projects with a clear creative brief.',
    description: 'Graphic Designers communicate ideas visually across digital and print media. You will create brand identities, marketing campaigns, and visual systems that shape how people perceive a company.',
    avgSalary: '$52,000',
    seniorSalary: '$85,000+',
    growthRate: '+3%',
    growthLabel: 'job growth by 2032',
    majors: ['Graphic Design', 'Visual Communication', 'Fine Arts', 'Advertising'],
    dayInLife: 'Briefing call with a client in the morning, designing social assets in the afternoon, presenting concepts before end of day.',
    employmentProbability: 64,
    dimensions: [
      { label: 'Interests', value: 84 },
      { label: 'Skills', value: 76 },
      { label: 'Personality', value: 72 },
      { label: 'Work style', value: 70 },
      { label: 'Academics', value: 66 },
    ],
  },
]

const ROADMAP = [
  {
    step: 1,
    title: 'Choose your major',
    detail: 'Human-Computer Interaction or Computer Science are the strongest starting points for your top matches. Both are widely available and transfer well across all five careers on your list.',
    timeframe: 'Now',
  },
  {
    step: 2,
    title: 'Build your foundation',
    detail: 'In your first two years, prioritise introductory programming, design principles, and statistics. These three subjects underpin every career on your list and will make you versatile.',
    timeframe: 'Year 1–2',
  },
  {
    step: 3,
    title: 'Land your first internship',
    detail: 'Apply for internships or part-time roles after your second year. Handshake, LinkedIn, and Wellfound list positions specifically for students. Aim for one summer internship before you graduate.',
    timeframe: 'Year 2–3',
  },
  {
    step: 4,
    title: 'Earn a certification',
    detail: 'One industry certification alongside your degree signals real-world skill to employers. Pick the one below that aligns with your top career match — it can be completed in a few months part-time.',
    timeframe: 'Year 3',
  },
  {
    step: 5,
    title: 'Ship a portfolio project',
    detail: 'Before you graduate, publish two or three projects publicly — a case study, a GitHub repo, or a live website. This is what hiring managers actually look at when they review your application.',
    timeframe: 'Year 3–4',
  },
]

const CERTIFICATIONS = [
  {
    name: 'Google UX Design Certificate',
    provider: 'Google via Coursera',
    duration: '6 months part-time',
    cost: 'Free audit · ~$49/month',
    bestFor: 'UX Designer, Product Manager',
    link: 'https://grow.google/certificates/ux-design/',
  },
  {
    name: 'AWS Cloud Practitioner',
    provider: 'Amazon Web Services',
    duration: 'Approx. 6 weeks',
    cost: 'Free prep · $100 exam',
    bestFor: 'Software Engineer, Data Analyst',
    link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
  },
  {
    name: 'IBM Data Analyst Professional Certificate',
    provider: 'IBM via Coursera',
    duration: '4 months part-time',
    cost: 'Free audit · ~$49/month',
    bestFor: 'Data Analyst, Software Engineer',
    link: 'https://www.coursera.org/professional-certificates/ibm-data-analyst',
  },
]

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'matches', label: 'Career matches' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'certifications', label: 'Certifications' },
]

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [activeSection, setActiveSection] = useState('overview')
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const active = CAREER_MATCHES[activeTab]
  const top = CAREER_MATCHES[0]

  useEffect(() => {
    if (!isAuthenticated()) return
    fetchCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
  }, [])

  // Account dropdown: close on outside click / Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  // Scrollspy: highlight the section nav link for the section in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Scroll-reveal: fade/slide content in as it enters the viewport.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleLogout = async () => {
    await logout()
    setUser(null)
    setMenuOpen(false)
    navigate('/')
  }

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="dashboard">

      {/* ── Sticky top bar (brand + account + section nav) ── */}
      <div className="dash-topbar">
        <div className="dash-header">
          <Link to="/" className="dash-logo-link">
            <img src={logo} alt="PathFinder" className="dash-logo" />
          </Link>
          <div className="dash-header-actions">
            {user ? (
              <div className="dash-account" ref={menuRef}>
                <button
                  type="button"
                  className="dash-avatar"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  aria-label="Account menu"
                  title={user.email}
                >
                  {getInitials(user.email)}
                </button>
                {menuOpen && (
                  <div className="dash-account-menu" role="menu">
                    <div className="dash-account-info">
                      <span className="dash-account-caption">Signed in as</span>
                      <span className="dash-account-email">{user.email}</span>
                    </div>
                    <button
                      type="button"
                      role="menuitem"
                      className="dash-account-logout"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="dash-header-btn">Log in</Link>
                <Link to="/register" className="dash-header-btn dash-header-btn-primary">Save results</Link>
              </>
            )}
          </div>
        </div>

        <nav className="dash-nav" aria-label="Dashboard sections">
          <div className="dash-nav-inner">
            {SECTIONS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={scrollToSection(item.id)}
                className={`dash-nav-link${activeSection === item.id ? ' is-active' : ''}`}
                aria-current={activeSection === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <main className="dash-main">

        {/* ── 1. Overview / hero ── */}
        <section id="overview" className="dash-hero" data-reveal>
          <div className="dash-hero-content">
            <p className="dash-hero-eyebrow">
              <span className="dash-hero-dot" /> Your results are ready
            </p>
            <h1 className="dash-hero-title">
              Your strongest match is <span className="dash-hero-highlight">{top.title}</span>
            </h1>
            <p className="dash-hero-sub">
              Based on your answers, we matched you against hundreds of career profiles. Here is what we found — and exactly what to do next.
            </p>
            <div className="dash-hero-stats">
              <div className="dash-hero-stat">
                <span className="dash-hero-stat-value">{top.match}<span className="dash-hero-stat-unit">%</span></span>
                <span className="dash-hero-stat-label">Match score</span>
              </div>
              <span className="dash-hero-divider" aria-hidden="true" />
              <div className="dash-hero-stat">
                <span className="dash-hero-stat-value">{top.avgSalary}</span>
                <span className="dash-hero-stat-label">Avg. starting salary</span>
              </div>
              <span className="dash-hero-divider" aria-hidden="true" />
              <div className="dash-hero-stat">
                <span className="dash-hero-stat-value">{top.growthRate}</span>
                <span className="dash-hero-stat-label">{top.growthLabel}</span>
              </div>
            </div>
          </div>
          <div className="dash-hero-visual">
            <CompatibilityGauge value={top.match} label="Top compatibility" sublabel={top.title} size={208} />
          </div>
        </section>

        {/* ── 2. Career matches ── */}
        <section id="matches" className="dash-section">
          <header className="dash-section-header" data-reveal>
            <span className="dash-eyebrow">01 — Explore</span>
            <h2 className="dash-section-title">Explore your matches</h2>
            <p className="dash-section-sub">Five careers ranked by fit. Select each one to see the full breakdown.</p>
          </header>

          {/* Tab bar */}
          <div className="dash-tabs" role="tablist" aria-label="Career matches" data-reveal>
            {CAREER_MATCHES.map((c, i) => (
              <button
                key={c.title}
                role="tab"
                aria-selected={activeTab === i}
                className={`dash-tab ${activeTab === i ? 'dash-tab-active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                <span className="dash-tab-title">{c.title}</span>
                <span className="dash-tab-pct">{c.match}%</span>
              </button>
            ))}
          </div>

          {/* Active career panel */}
          <div className="dash-panel" role="tabpanel" data-reveal>
            <div className="dash-panel-top">
              <div className="dash-panel-meta">
                <span className="dash-panel-match">{active.match}% match</span>
                <span className="dash-panel-growth">{active.growthRate} growth by 2032</span>
              </div>
              <h3 className="dash-panel-title">{active.title}</h3>
              <p className="dash-panel-why">Why this fits you: {active.why}</p>
            </div>

            <div className="dash-panel-body">
              <div className="dash-panel-col">
                <span className="dash-panel-col-label">About the role</span>
                <p className="dash-panel-text">{active.description}</p>
              </div>
              <div className="dash-panel-col">
                <span className="dash-panel-col-label">A day in the life</span>
                <p className="dash-panel-text">{active.dayInLife}</p>
              </div>
            </div>

            <div className="dash-panel-footer">
              <div className="dash-panel-salary-group">
                <div className="dash-panel-salary">
                  <span className="dash-panel-salary-label">Starting salary</span>
                  <span className="dash-panel-salary-value">{active.avgSalary}</span>
                </div>
                <div className="dash-panel-salary">
                  <span className="dash-panel-salary-label">Senior salary</span>
                  <span className="dash-panel-salary-value">{active.seniorSalary}</span>
                </div>
              </div>
              <div className="dash-panel-majors">
                <span className="dash-panel-majors-label">Suggested majors</span>
                <div className="dash-panel-majors-list">
                  {active.majors.map((m) => (
                    <span key={m} className="dash-major-tag">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive compatibility visualisations */}
          <div className="dash-viz">
            <div className="dash-viz-card dash-viz-radar-card" data-reveal style={{ transitionDelay: '0ms' }}>
              <span className="dash-viz-title">Your compatibility profile</span>
              <span className="dash-viz-desc">
                How your assessment answers align with what {active.title} demands.
              </span>
              <RadarChart data={active.dimensions} />
            </div>

            <div className="dash-viz-side">
              <div className="dash-viz-card dash-viz-gauge-card" data-reveal style={{ transitionDelay: '120ms' }}>
                <CompatibilityGauge value={active.match} label="Compatibility score" />
                <span className="dash-viz-caption">
                  Overall fit against this career's profile.
                </span>
              </div>
              <div className="dash-viz-card dash-viz-gauge-card" data-reveal style={{ transitionDelay: '240ms' }}>
                <CompatibilityGauge
                  value={active.employmentProbability}
                  label="Employment probability"
                  sublabel="within 6 months"
                  color="var(--pf-good)"
                />
                <span className="dash-viz-caption">
                  Estimated chance of landing a role within 6 months of graduating, based on demand and {active.growthRate} projected growth.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Roadmap ── */}
        <section id="roadmap" className="dash-section">
          <header className="dash-section-header" data-reveal>
            <span className="dash-eyebrow">02 — Plan</span>
            <h2 className="dash-section-title">Your personalised roadmap</h2>
            <p className="dash-section-sub">Five steps from where you are now to your first job.</p>
          </header>
          <div className="dash-stepper">
            {ROADMAP.map((item, i) => (
              <div key={item.step} className="dash-step" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="dash-step-left">
                  <div className="dash-step-dot">{item.step}</div>
                  {i < ROADMAP.length - 1 && <div className="dash-step-line" />}
                </div>
                <div className="dash-step-body">
                  <div className="dash-step-header">
                    <span className="dash-step-title">{item.title}</span>
                    <span className="dash-step-timeframe">{item.timeframe}</span>
                  </div>
                  <p className="dash-step-detail">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Certifications ── */}
        <section id="certifications" className="dash-section">
          <header className="dash-section-header" data-reveal>
            <span className="dash-eyebrow">03 — Upskill</span>
            <h2 className="dash-section-title">Recommended certifications</h2>
            <p className="dash-section-sub">Three picks that hiring managers actually recognise. All completable alongside your studies.</p>
          </header>
          <div className="dash-certs">
            {CERTIFICATIONS.map((cert, i) => (
              <a
                key={cert.name}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="dash-cert-card"
                data-reveal
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="dash-cert-top">
                  <span className="dash-cert-badge" aria-hidden="true">{cert.provider[0]}</span>
                  <span className="dash-cert-name">{cert.name}</span>
                  <span className="dash-cert-provider">{cert.provider}</span>
                </div>
                <div className="dash-cert-bottom">
                  <div className="dash-cert-row">
                    <span className="dash-cert-key">Duration</span>
                    <span className="dash-cert-val">{cert.duration}</span>
                  </div>
                  <div className="dash-cert-row">
                    <span className="dash-cert-key">Cost</span>
                    <span className="dash-cert-val">{cert.cost}</span>
                  </div>
                  <div className="dash-cert-row">
                    <span className="dash-cert-key">Best for</span>
                    <span className="dash-cert-val">{cert.bestFor}</span>
                  </div>
                </div>
                <span className="dash-cert-cta">View certification →</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── 5. Save CTA ── */}
        {!user && (
          <section className="dash-save" data-reveal>
            <p className="dash-save-eyebrow">Don't lose this</p>
            <h2 className="dash-save-title">Save your roadmap for free</h2>
            <p className="dash-save-desc">
              Create an account to keep your results, track your progress through the roadmap, and retake the assessment any time your interests change.
            </p>
            <div className="dash-save-actions">
              <Link to="/register" className="dash-save-primary">Create free account</Link>
              <Link to="/" className="dash-save-secondary">Retake assessment</Link>
            </div>
          </section>
        )}

      </main>
    </div>
  )
}

export default Dashboard
