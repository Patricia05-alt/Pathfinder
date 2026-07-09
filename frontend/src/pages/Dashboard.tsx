import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/pathfinder-logo.png'
import './Dashboard.css'

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

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const active = CAREER_MATCHES[activeTab]
  const top = CAREER_MATCHES[0]

  return (
    <div className="dashboard">

      {/* ── Header ── */}
      <header className="dash-header">
        <Link to="/" className="dash-logo-link">
          <img src={logo} alt="PathFinder" className="dash-logo" />
        </Link>
        <div className="dash-header-actions">
          <Link to="/login" className="dash-header-btn">Log in</Link>
          <Link to="/register" className="dash-header-btn dash-header-btn-primary">Save results</Link>
        </div>
      </header>

      <main className="dash-main">

        {/* ── 1. Celebration ── */}
        <section className="dash-celebration">
          <p className="dash-celebration-label">Your results are ready</p>
          <h1 className="dash-celebration-title">
            Your strongest match is <span className="dash-celebration-highlight">{top.title}.</span>
          </h1>
          <p className="dash-celebration-sub">
            Based on your answers, we matched you against hundreds of career profiles. Here is what we found — and exactly what to do next.
          </p>
          <div className="dash-celebration-stats">
            <div className="dash-stat">
              <span className="dash-stat-value">{top.match}%</span>
              <span className="dash-stat-label">match score</span>
            </div>
            <div className="dash-stat-divider" />
            <div className="dash-stat">
              <span className="dash-stat-value">{top.avgSalary}</span>
              <span className="dash-stat-label">avg. starting salary</span>
            </div>
            <div className="dash-stat-divider" />
            <div className="dash-stat">
              <span className="dash-stat-value">{top.growthRate}</span>
              <span className="dash-stat-label">{top.growthLabel}</span>
            </div>
          </div>
        </section>

        {/* ── 2. Career explorer ── */}
        <section className="dash-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">Explore your matches</h2>
            <p className="dash-section-sub">5 careers ranked by fit. Select each one to learn more.</p>
          </div>

          {/* Tab bar */}
          <div className="dash-tabs" role="tablist">
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
          <div className="dash-panel" role="tabpanel">
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
                  {active.majors.map(m => (
                    <span key={m} className="dash-major-tag">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Roadmap ── */}
        <section className="dash-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">Your personalised roadmap</h2>
            <p className="dash-section-sub">Five steps from where you are now to your first job.</p>
          </div>
          <div className="dash-stepper">
            {ROADMAP.map((item, i) => (
              <div key={item.step} className="dash-step">
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
        <section className="dash-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">Recommended certifications</h2>
            <p className="dash-section-sub">Three picks that hiring managers actually recognise. All completable alongside your studies.</p>
          </div>
          <div className="dash-certs">
            {CERTIFICATIONS.map(cert => (
              <a
                key={cert.name}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="dash-cert-card"
              >
                <div className="dash-cert-top">
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
        <section className="dash-save">
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

      </main>
    </div>
  )
}

export default Dashboard
