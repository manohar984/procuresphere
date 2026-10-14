import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FullScreenLogin } from './FullScreenLogin';
import { LegalModal } from './LegalModal';

const OverlayMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
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
  }, [location.pathname, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      if (contentRef.current) contentRef.current.style.transform = 'translateY(0px)';
      return;
    }

    let mouseY = 0;
    let currentY = 0;
    let targetY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const update = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const windowHeight = window.innerHeight;

        if (contentHeight > windowHeight) {
          const maxScroll = contentHeight - windowHeight;
          const percentage = mouseY / windowHeight;
          targetY = -(maxScroll * percentage);

          currentY += (targetY - currentY) * 0.08;
          contentRef.current.style.transform = `translateY(${currentY}px)`;
        } else {
          contentRef.current.style.transform = `translateY(0px)`;
        }
      }
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  const items = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'SOLUTIONS', href: '/solutions' },
    { label: 'BENEFITS', href: '/benefits' },
    { label: 'PROCESS', href: '/process' },
    { label: 'FAQ', href: '/faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    onClose();
    if (label === 'HOME' || href === '/') {
      navigate('/', { state: { skipIntro: true } });
    } else {
      navigate(href);
    }
  };

  return (
    <div className={`overlay-menu-container ${isOpen ? 'is-open' : ''}`}>
      <div className="overlay-menu-bg" />
      <div className="overlay-menu-content" ref={contentRef} style={{ willChange: 'transform' }}>
        {items.map((item, index) => {
          const isActive = activeItem === item.label;
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href, item.label)}
              className={`overlay-menu-item ${isActive ? 'is-active' : ''}`}
              style={{ transitionDelay: isOpen ? `${0.1 + index * 0.05}s` : '0s' }}
            >
              <span className="overlay-menu-chapter">CHAPTER 0{index + 1}</span>
              <span className="overlay-menu-label">{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export const PageLayout: React.FC<{
  title?: string;
  badge?: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ title, badge, subtitle, children }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <div className="site-shell intro-finished" id="top" style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      {/* Exact identical Header as Landing page */}
      <header className={`site-nav is-scrolled ${mobileOpen ? 'menu-open' : ''}`} style={{ zIndex: 100 }}>
        <div className="nav-inner" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="sobha-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Navigation">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <span className="sobha-menu-text" style={{ letterSpacing: '1px' }}>{mobileOpen ? 'CLOSE' : 'MENU'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a
              className="brand"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/', { state: { skipIntro: true } });
              }}
              aria-label="ProcureSphere 360 home"
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
              <span className="brand-text"><strong>ProcureSphere</strong><em>360</em></span>
            </a>
          </div>

          <div className="nav-actions" style={{ justifyContent: 'flex-end', width: '100%' }}>
            <button
              className="sign-in"
              type="button"
              onClick={() => setLoginOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                font: 'inherit',
                padding: '8px 16px',
              }}
            >
              Login
            </button>
            <a className="button button-primary" href="/#contact">
              Request a Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h13" /><path d="m13 6 6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Identical Overlay Menu */}
      <OverlayMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Page Area */}
      <main className="site-main page-main" style={{ paddingTop: title ? '130px' : '90px', overflowX: 'hidden' }}>
        {/* Hero Section - only rendered if title is provided */}
        {title && (
          <section className="page-hero-section" style={{ maxWidth: '1240px', margin: '0 auto', padding: '30px 24px 50px', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {badge && (
                <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '16px' }}>
                  <span className="eyebrow-line" />
                  {badge}
                  <span className="eyebrow-line" />
                </div>
              )}
              <h1
                style={{
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  fontSize: 'clamp(32px, 4.5vw, 52px)',
                  fontWeight: 600,
                  lineHeight: 1.18,
                  margin: '0 0 16px 0',
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  style={{
                    fontSize: '19px',
                    color: '#334155',
                    maxWidth: '820px',
                    margin: '0 auto',
                    lineHeight: 1.7,
                    fontWeight: 500,
                  }}
                >
                  {subtitle}
                </p>
              )}
            </motion.div>
          </section>
        )}

        {/* Content Body */}
        <div className="page-body-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 100px' }}>
          {children}
        </div>

        {/* Exact Identical Footer as Landing page */}
        <footer className="footer" style={{ position: 'relative', overflow: 'hidden', padding: 0, border: 'none' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="footer-video"
            style={{
              display: 'block',
              width: '100%',
              height: '65vh',
              minHeight: '430px',
              objectFit: 'cover',
              objectPosition: 'bottom',
            }}
          >
            <source src="/footer-video.mp4" type="video/mp4" />
          </video>
          <div
            className="footer-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(10, 18, 32, 0.75) 0%, rgba(10, 18, 32, 0.4) 50%, rgba(10, 18, 32, 0.75) 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          <div
            className="footer-content"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '72px max(24px, calc((100vw - 1240px) / 2)) 25px',
            }}
          >
            {/* Desktop Original Footer (100% Untouched on Desktop) */}
            <div className="desktop-footer" style={{ width: '100%' }}>
              <div className="footer-top">
                <div className="footer-brand">
                  <a className="brand" href="/" aria-label="ProcureSphere 360 home">
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
                    <span className="brand-text"><strong>ProcureSphere</strong><em>360</em></span>
                  </a>
                  <p>One connected system for every procurement decision.</p>
                </div>
                <div className="footer-column">
                  <strong>PLATFORM</strong>
                  <a href="/about">About</a>
                  <a href="/solutions">Solutions</a>
                  <a href="/benefits">Benefits</a>
                  <a href="/process">Process</a>
                  <a href="/roles">Roles</a>
                </div>
                <div className="footer-column">
                  <strong>COMPANY</strong>
                  <a href="/#testimonials">Testimonials</a>
                  <a href="/faq">FAQ</a>
                  <a href="/#contact">Contact</a>
                </div>
                <div className="footer-column">
                  <strong>LEGAL & SUPPORT</strong>
                  <a href="#privacy" onClick={(e) => { e.preventDefault(); setLegalModal('privacy'); }}>Privacy Policy</a>
                  <a href="#terms" onClick={(e) => { e.preventDefault(); setLegalModal('terms'); }}>Terms & Conditions</a>
                  <a href="#top">Back to top</a>
                </div>
              </div>
              <div className="footer-bottom">
                <span>© ProcureSphere 360</span>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                  <a href="#privacy" onClick={(e) => { e.preventDefault(); setLegalModal('privacy'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
                  <span style={{ opacity: 0.5 }}>•</span>
                  <a href="#terms" onClick={(e) => { e.preventDefault(); setLegalModal('terms'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Terms & Conditions</a>
                </div>
                <span>Built for clarity. Designed for control.</span>
              </div>
            </div>

            {/* Mobile Footer (GateSphere Style Alignment) */}
            <div className="mobile-footer-gate">
              <div className="mobile-footer-brand">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <a className="brand" href="/" aria-label="ProcureSphere 360 home">
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
                    <span className="brand-text"><strong>ProcureSphere</strong><em>360</em></span>
                  </a>
                </div>
                <p className="mobile-footer-desc">
                  One connected system for every procurement decision. Automating sourcing, intake, and supplier performance.
                </p>
                <div className="mobile-footer-socials">
                  <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74V10.13H5.06v8.37h2.8z"/></svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="mailto:support@procuresphere.com" aria-label="Email">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </a>
                </div>
              </div>

              <div className="mobile-footer-grid">
                <div className="mobile-footer-col">
                  <strong>PLATFORM</strong>
                  <a href="/about">› About</a>
                  <a href="/solutions">› Solutions</a>
                  <a href="/benefits">› Benefits</a>
                  <a href="/process">› Process</a>
                  <a href="/roles">› Roles</a>
                </div>
                <div className="mobile-footer-col">
                  <strong>COMPANY & LEGAL</strong>
                  <a href="/#testimonials">› Testimonials</a>
                  <a href="/faq">› FAQ</a>
                  <a href="/#contact">› Contact Us</a>
                  <a href="#privacy" onClick={(e) => { e.preventDefault(); setLegalModal('privacy'); }}>› Privacy Policy</a>
                  <a href="#terms" onClick={(e) => { e.preventDefault(); setLegalModal('terms'); }}>› Terms & Conditions</a>
                </div>
              </div>

              <div className="mobile-footer-contact">
                <strong>GET IN TOUCH</strong>
                <div className="mobile-contact-item">
                  <span className="contact-icon-bubble">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  <a href="mailto:support@procuresphere.com">support@procuresphere.com</a>
                </div>
                <div className="mobile-contact-item">
                  <span className="contact-icon-bubble">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </span>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
                <div className="mobile-contact-item">
                  <span className="contact-icon-bubble">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <span>Bangalore, Karnataka</span>
                </div>
                <button
                  type="button"
                  className="mobile-footer-cta-btn"
                  onClick={() => {
                    window.location.href = '/#contact';
                  }}
                >
                  CONTACT US
                </button>
              </div>

              <div className="mobile-footer-bottom">
                <div className="mobile-footer-divider"></div>
                <p className="mobile-footer-copy">© 2026 ProcureSphere Enterprise. All rights reserved.</p>
                <div className="mobile-footer-quicklinks">
                  <a href="/">Home</a> • 
                  <a href="/about">Platform</a> • 
                  <a href="/solutions">Solutions</a> • 
                  <a href="/benefits">Benefits</a> • 
                  <a href="/roles">Roles</a> • 
                  <a href="#privacy" onClick={(e) => { e.preventDefault(); setLegalModal('privacy'); }}>Privacy</a> • 
                  <a href="#terms" onClick={(e) => { e.preventDefault(); setLegalModal('terms'); }}>Terms</a>
                </div>
                <p className="mobile-footer-tagline">Built for clarity. Designed for control. 🇮🇳</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
      <FullScreenLogin
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={() => {
          setLoginOpen(false);
          window.location.href = '/#roles';
        }}
      />
      <LegalModal
        isOpen={legalModal !== null}
        initialTab={legalModal || 'privacy'}
        onClose={() => setLegalModal(null)}
      />
    </div>
  );
};
