import heroImage from '../assets/hero.png'
import './Hero.css'

const heroVideoSrc = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

type HeroProps = {
  isLoading?: boolean
}

const Hero = ({ isLoading = false }: HeroProps) => {
  return (
    <section className="hero content-section" id="hero">
      <div className={`hero-background ${isLoading ? 'is-loading' : ''}`} aria-hidden="true">
        {isLoading ? (
          <span className="skeleton skeleton-block hero-skeleton-backdrop" />
        ) : (
          <>
            <video
              className="hero-background-video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={heroImage}
            >
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
            <div className="hero-background-overlay" />
          </>
        )}
      </div>

      <div className="section-inner hero-layout">
        <div className={`hero-content ${isLoading ? 'is-loading' : ''}`}>
          {isLoading ? (
            <div className="section-loading" aria-hidden="true">
              <span className="skeleton hero-skeleton-kicker" />
              <span className="skeleton skeleton-block hero-skeleton-headline" />
              <span className="skeleton hero-skeleton-subhead" />
              <span className="skeleton hero-skeleton-button" />
            </div>
          ) : (
            <>
              <p className="hero-kicker">Pathfinder</p>

              <h1 className="hero-headline">Find the path that fits your strengths.</h1>

              <p className="hero-subhead">
                Take a focused assessment and get a clear shortlist of majors, careers, and next steps that match how you think.
              </p>

              <div className="hero-actions" id="assessment">
                <a href="#assessment" className="hero-cta">
                  Start the assessment
                </a>
                <span className="hero-microcopy">Takes about 10 minutes. Free to start.</span>
              </div>

              <dl className="hero-stats" aria-label="Pathfinder highlights">
                <div>
                  <dt>10 min</dt>
                  <dd>to complete</dd>
                </div>
                <div>
                  <dt>Majors</dt>
                  <dd>that fit you</dd>
                </div>
                <div>
                  <dt>Careers</dt>
                  <dd>with direction</dd>
                </div>
              </dl>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero