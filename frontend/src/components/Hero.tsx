import heroImage from '../assets/hero.png'
import './Hero.css'

const heroVideoSrc = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

type HeroProps = {
  isLoading?: boolean
  onStartAssessment?: () => void
}

const Hero = ({ onStartAssessment }: HeroProps) => {
  return (
    <section className="hero content-section" id="hero">
      <div className="hero-background" aria-hidden="true">
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
      </div>

      <div className="section-inner hero-layout">
        <div className="hero-content">
          <p className="hero-kicker">Pathfinder</p>

          <h1 className="hero-headline">Find the path that fits your strengths.</h1>

          <p className="hero-subhead">
            Take a focused assessment and get a clear shortlist of majors, careers, and next steps that match how you think.
          </p>

          <div className="hero-actions" id="assessment">
            <button onClick={onStartAssessment} className="hero-cta">
              Start the assessment
            </button>
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
        </div>
      </div>
    </section>
  )
}

export default Hero