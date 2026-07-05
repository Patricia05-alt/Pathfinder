// src/components/Features.tsx
import './Features.css';

const Features = () => {
  return (
    <section id="features" className="features">
      <div className="features-container">
        
        {/* Header */}
        <div className="features-header">
          <h2 className="features-title">Why use Path Finder?</h2>
          <p className="features-subtitle">
            Standardized tests are outdated. Here is how we actually help you decide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon-box">
              <svg className="feature-icon" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="feature-title">Talk, don't click</h3>
            <p className="feature-description">
              No boring multiple-choice tests. Just tell the AI what you like, what you hate, and what you care about.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon-box">
              <svg className="feature-icon" viewBox="0 0 24 24">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            </div>
            <h3 className="feature-title">Real numbers</h3>
            <p className="feature-description">
              We show you actual starting salaries and job growth data. No sugar-coated career brochures.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon-box">
              <svg className="feature-icon" viewBox="0 0 24 24">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <h3 className="feature-title">A real plan</h3>
            <p className="feature-description">
              We don't just give you a job title. We tell you exactly what classes to take and skills to learn next.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon-box">
              <svg className="feature-icon" viewBox="0 0 24 24">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l-2.66 2.66"></path>
              </svg>
            </div>
            <h3 className="feature-title">Changes with you</h3>
            <p className="feature-description">
              Changed your mind about a major? The AI instantly rebuilds your roadmap. No starting over from scratch.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;