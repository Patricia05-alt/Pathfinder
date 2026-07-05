import './HowItWorks.css'

const steps = [
  {
    number: 'Step 01',
    title: 'Answer 20 questions',
    description:
      'Tell us what you actually care about. No boring multiple-choice tests, just a quick chat.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Two people talking over notes at a desk',
  },
  {
    number: 'Step 02',
    title: 'Get your matches',
    description:
      'We give you a shortlist of college majors and careers that actually fit your profile.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Analytics dashboard with charts and performance metrics',
  },
  {
    number: 'Step 03',
    title: 'Build your roadmap',
    description:
      'Get a step-by-step plan for what classes to take and what skills to learn next.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Team planning around a laptop and notes in a creative workspace',
  },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works content-section" aria-label="How it works">
      <div className="section-inner how-it-works-container">
        <div className="how-it-works-header">
          <h2 className="how-it-works-title">How it works</h2>
          <p className="how-it-works-subtitle">Three steps to figure out your next move. No fluff.</p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <figure className="step-visual">
                <img src={step.image} alt={step.imageAlt} className="step-image" loading="lazy" />
                <div className="step-overlay" aria-hidden="true">
                  <span>{step.number}</span>
                </div>
              </figure>
              <span className="step-number">{step.number}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks