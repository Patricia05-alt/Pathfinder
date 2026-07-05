// src/components/Footer.tsx
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
        
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            Path<span>Finder</span>
          </div>
          <p className="footer-tagline">
            Helping high school graduates figure out what to do next. No fluff, just a clear plan.
          </p>
        </div>

        {/* Product Column */}
        <div>
          <h4 className="footer-col-title">Product</h4>
          <div className="footer-links">
            <a href="#how-it-works" className="footer-link">How it works</a>
            <a href="#features" className="footer-link">Features</a>
            <a href="#pricing" className="footer-link">Pricing</a>
            <a href="#assessment" className="footer-link">Start assessment</a>
          </div>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="footer-col-title">Company</h4>
          <div className="footer-links">
            <a href="#about" className="footer-link">About</a>
            <a href="#schools" className="footer-link">For schools</a>
            <a href="#contact" className="footer-link">Contact</a>
            <a href="#careers" className="footer-link">Careers</a>
          </div>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="footer-col-title">Legal</h4>
          <div className="footer-links">
            <a href="#privacy" className="footer-link">Privacy policy</a>
            <a href="#terms" className="footer-link">Terms of service</a>
            <a href="#cookies" className="footer-link">Cookie policy</a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <span>© 2024 Path Finder. All rights reserved.</span>
        <span>Built for students, by students.</span>
      </div>
    </footer>
  );
};

export default Footer;