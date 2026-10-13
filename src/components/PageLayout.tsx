import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FullScreenLogin } from './FullScreenLogin';
import { LegalModal } from './LegalModal';

const OverlayMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={`overlay-menu-container ${isOpen ? 'is-open' : ''}`}>
      <div className="overlay-menu-bg" />
      <div className="overlay-menu-content" ref={contentRef} style={{ willChange: 'transform' }}>
        {items.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="overlay-menu-item"
            style={{ transitionDelay: isOpen ? `${0.1 + index * 0.05}s` : '0s' }}
          >
            <span className="overlay-menu-chapter">CHAPTER 0{index + 1}</span>
            <span className="overlay-menu-label">{item.label}</span>
          </a>
        ))}
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
      <main className="site-main" style={{ paddingTop: title ? '130px' : '90px', overflowX: 'hidden' }}>
        {/* Hero Section - only rendered if title is provided */}
        {title && (
          <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '30px 24px 50px', textAlign: 'center' }}>
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
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 100px' }}>
          {children}
        </div>

        {/* Exact Identical Footer as Landing page */}
        <footer className="footer" style={{ position: 'relative', overflow: 'hidden', padding: 0, border: 'none' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
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
