import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export interface NavbarProps {
  scrolled?: boolean;
  navbarHidden?: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  scrolled = false,
  navbarHidden = false,
  mobileOpen,
  setMobileOpen,
  onOpenLogin,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>('HOME');

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/about')) {
      setActiveItem('ABOUT');
    } else if (path.includes('/solutions')) {
      setActiveItem('SOLUTIONS');
    } else if (path.includes('/benefits')) {
      setActiveItem('BENEFITS');
    } else if (path.includes('/process') || path.includes('/roles')) {
      setActiveItem('PROCESS');
    } else if (path.includes('/faq')) {
      setActiveItem('FAQ');
    } else {
      setActiveItem('HOME');
    }
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    if (mobileOpen) setMobileOpen(false);

    if (typeof window !== 'undefined') {
      (window as any).__ps360_intro_completed = true;
    }

    if (label === 'HOME' || href === '/') {
      if (window.location.pathname === '/' || window.location.pathname === '') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } else {
        navigate('/', { state: { skipIntro: true } });
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    } else {
      if (window.location.pathname === href) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } else {
        navigate(href);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (mobileOpen) setMobileOpen(false);

    if (window.location.pathname === '/' || window.location.pathname === '') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    } else {
      navigate('/#contact');
    }
  };

  return (
    <header
      className={`site-nav navarino-nav ${scrolled ? 'is-scrolled' : ''} ${mobileOpen ? 'menu-open' : ''} ${navbarHidden ? 'nav-hidden' : ''}`}
      style={{ zIndex: 1000 }}
    >
      <div className="nav-inner navarino-inner">
        {/* Left Side: Brand Logo + Desktop Nav Links */}
        <div className="nav-left-group">
          <a
            className="brand nav-brand"
            href="/"
            onClick={(e) => handleNavClick(e, '/', 'HOME')}
            aria-label="ProcureSphere 360 Home"
          >
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="12" />
                <ellipse cx="16" cy="16" rx="12" ry="5.5" />
                <path d="M4.5 16h23" />
                <path d="M16 4v24" />
                <circle cx="24.8" cy="11" r="2.1" />
                <circle cx="9.5" cy="21.5" r="2.1" />
              </svg>
            </span>
            <div className="brand-text-block">
              <span className="brand-text">
                <strong>procuresphere</strong>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="navarino-links-desktop" aria-label="Main Navigation">
            {/* Home */}
            <div className="nav-item">
              <a
                href="/"
                onClick={(e) => handleNavClick(e, '/', 'HOME')}
                className={`nav-link ${activeItem === 'HOME' ? 'is-active' : ''}`}
              >
                <span>Home</span>
              </a>
            </div>

            {/* About Us with Dropdown */}
            <div className="nav-item has-dropdown">
              <a
                href="/about"
                onClick={(e) => handleNavClick(e, '/about', 'ABOUT')}
                className={`nav-link ${activeItem === 'ABOUT' ? 'is-active' : ''}`}
              >
                <span>About Us</span>
                <svg
                  className="nav-chevron"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </a>
              <div className="nav-dropdown-menu">
                <a
                  href="/about"
                  onClick={(e) => handleNavClick(e, '/about', 'ABOUT')}
                  className="nav-dropdown-link"
                >
                  <span className="d-title">About ProcureSphere</span>
                  <span className="d-desc">Next-generation enterprise procurement platform</span>
                </a>
                <a
                  href="/about"
                  onClick={(e) => handleNavClick(e, '/about', 'ABOUT')}
                  className="nav-dropdown-link"
                >
                  <span className="d-title">Enterprise Vision</span>
                  <span className="d-desc">Connecting decisions, compliance and intelligence</span>
                </a>
              </div>
            </div>

            {/* Solutions with Dropdown */}
            <div className="nav-item has-dropdown">
              <a
                href="/solutions"
                onClick={(e) => handleNavClick(e, '/solutions', 'SOLUTIONS')}
                className={`nav-link ${activeItem === 'SOLUTIONS' ? 'is-active' : ''}`}
              >
                <span>Solutions</span>
                <svg
                  className="nav-chevron"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </a>
              <div className="nav-dropdown-menu">
                <a
                  href="/solutions"
                  onClick={(e) => handleNavClick(e, '/solutions', 'SOLUTIONS')}
                  className="nav-dropdown-link"
                >
                  <span className="d-title">All Solutions Overview</span>
                  <span className="d-desc">Unified lifecycle from requisition to ledger</span>
                </a>
                <a
                  href="/solutions"
                  onClick={(e) => handleNavClick(e, '/solutions', 'SOLUTIONS')}
                  className="nav-dropdown-link"
                >
                  <span className="d-title">Autonomous 3-Way Match</span>
                  <span className="d-desc">Zero-touch purchase order & invoice validation</span>
                </a>
                <a
                  href="/solutions"
                  onClick={(e) => handleNavClick(e, '/solutions', 'SOLUTIONS')}
                  className="nav-dropdown-link"
                >
                  <span className="d-title">Supplier & Financial Control</span>
                  <span className="d-desc">Risk scoring, live budget guards and audit trails</span>
                </a>
              </div>
            </div>

            {/* Benefits */}
            <div className="nav-item">
              <a
                href="/benefits"
                onClick={(e) => handleNavClick(e, '/benefits', 'BENEFITS')}
                className={`nav-link ${activeItem === 'BENEFITS' ? 'is-active' : ''}`}
              >
                <span>Benefits</span>
              </a>
            </div>

            {/* Process */}
            <div className="nav-item">
              <a
                href="/process"
                onClick={(e) => handleNavClick(e, '/process', 'PROCESS')}
                className={`nav-link ${activeItem === 'PROCESS' ? 'is-active' : ''}`}
              >
                <span>Process</span>
              </a>
            </div>

            {/* FAQ */}
            <div className="nav-item">
              <a
                href="/faq"
                onClick={(e) => handleNavClick(e, '/faq', 'FAQ')}
                className={`nav-link ${activeItem === 'FAQ' ? 'is-active' : ''}`}
              >
                <span>FAQ</span>
              </a>
            </div>
          </nav>
        </div>

        {/* Right Side: Login Button + Blue CTA Button + Mobile Toggle */}
        <div className="nav-right-group">
          <button
            type="button"
            onClick={onOpenLogin}
            className="nav-login-btn"
            aria-label="Login to Portal"
          >
            Login
          </button>

          {/* Navarino vibrant blue pill button */}
          <a
            href="/#contact"
            onClick={handleContactClick}
            className="navarino-blue-btn"
          >
            Request a Demo
          </a>

          {/* Mobile Menu Hamburger Toggle (Visible on small screens) */}
          <button
            type="button"
            className="navarino-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close Navigation' : 'Open Navigation'}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
