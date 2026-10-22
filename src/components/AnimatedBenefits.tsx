import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PremiumHeading } from './PremiumHeading';

const benefits = [
  {
    title: 'Traceable Workflows',
    description: 'No more approvals lost in email. Every requisition, bid, purchase order, and invoice is strictly traceable to its state and timestamp.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    color: '#3b82f6' // Blue
  },
  {
    title: 'Zero Silent Overspend',
    description: 'Real-time budget validation distinguishes available, reserved, and actual spend. Exceptions require an explicit, documented route.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    color: '#10b981' // Green
  },
  {
    title: 'Supplier Governance',
    description: 'Vendor onboarding, KYC, and risk management with built-in due-diligence. Keep supplier identity and performance in constant view.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: '#f59e0b' // Amber
  },
  {
    title: 'Three-Way Match Precision',
    description: 'Automated validation comparing PO, receipt, and invoice. Configurable tolerances ensure accurate payment and clear exception workflows.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
    color: '#8b5cf6' // Purple
  },
  {
    title: 'Contract Lifecycle Control',
    description: 'Never miss a renewal deadline. Keep obligations, SLAs, and version histories organized with automated expiry alerts.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    color: '#ec4899' // Pink
  },
  {
    title: 'Traceable Audit Trails',
    description: 'Every critical action captures the actor, state change, and timestamp, providing structured event reporting for audit readiness.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="11" r="3" />
      </svg>
    ),
    color: '#06b6d4' // Cyan
  }
];

export const AnimatedBenefits: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.setAttribute('muted', '');
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      if (video && video.paused) {
        video.play().catch(() => {});
      }
    };

    playVideo();

    video.addEventListener('canplay', playVideo);
    video.addEventListener('loadeddata', playVideo);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          }
        });
      },
      { threshold: 0.05, rootMargin: '100px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleInteraction = () => {
      playVideo();
    };

    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', playVideo);
      video.removeEventListener('loadeddata', playVideo);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <section id="benefits" ref={sectionRef} style={{
      width: '100%',
      minHeight: 'auto',
      padding: 'clamp(54px, 6.5vh, 76px) 20px clamp(54px, 6.5vh, 76px)',
      background: '#0a0f1c',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Background Video with Clean Contrast Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        background: '#0a0f1c'
      }}>
        <video
          ref={videoRef}
          src="/hero-video-matched.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/frame_1s.webp"
          onCanPlay={(e) => {
            const v = e.currentTarget;
            if (v && v.paused) v.play().catch(() => {});
          }}
          onLoadedData={(e) => {
            const v = e.currentTarget;
            if (v && v.paused) v.play().catch(() => {});
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            opacity: 0.75,
            filter: 'none'
          }}
        >
          <source src="/hero-video-matched.mp4" type="video/mp4" />
        </video>

        {/* Contrast overlay layer: keeps video clearly visible while preserving text contrast */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(10, 15, 28, 0.65) 0%, rgba(10, 15, 28, 0.35) 50%, rgba(10, 15, 28, 0.72) 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Header Container - Clean, Unclipped, High Legibility */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px',
        zIndex: 10,
        position: 'relative',
        padding: '0 20px',
        width: '100%',
        maxWidth: '920px'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '7px 20px',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.12)',
          color: '#ffffff',
          border: '1.5px solid rgba(255, 255, 255, 0.35)',
          boxShadow: '0 4px 18px rgba(0, 0, 0, 0.5), 0 0 16px rgba(56, 189, 248, 0.3)',
          fontSize: '13px',
          fontWeight: 800,
          letterSpacing: '0.09em',
          marginBottom: '16px',
          textTransform: 'uppercase',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#38bdf8',
            boxShadow: '0 0 10px #38bdf8, 0 0 4px #ffffff'
          }} />
          ENTERPRISE BENEFITS
        </div>

        <h2 style={{
          fontSize: 'clamp(28px, 3.2vw, 42px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          margin: '0 0 10px',
          fontFamily: '"Playfair Display", Georgia, serif',
          lineHeight: 1.2,
          color: '#ffffff',
          textShadow: '0 4px 20px rgba(0,0,0,0.8)'
        }}>
          <PremiumHeading
            text="Procurement with financial control built in."
            highlightWord="financial control"
            highlightStyle={{ color: '#38bdf8' }}
          />
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#f8fafc',
          fontWeight: 500,
          maxWidth: '720px',
          margin: '0 auto',
          lineHeight: 1.6,
          textShadow: '0 2px 12px rgba(0,0,0,0.85)'
        }}>
          Replace disconnected emails, manual checks, and spreadsheet chaos with a single source-to-pay workflow.
        </p>
      </div>

      {/* 6 Benefit Cards: Always Visible, Crystal Clear, Zero Clipping */}
      <div
        className="benefits-desktop-cards"
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          zIndex: 10,
          position: 'relative',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            style={{
              background: 'rgba(10, 15, 28, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1.5px solid ${benefit.color}60`,
              borderRadius: '18px',
              padding: '24px 26px 22px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              boxShadow: `0 16px 36px rgba(0, 0, 0, 0.6), 0 0 24px ${benefit.color}20`,
              cursor: 'default',
              transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: `${benefit.color}25`,
              color: benefit.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              boxShadow: `0 0 20px ${benefit.color}40`,
              border: `1px solid ${benefit.color}50`
            }}>
              {benefit.icon}
            </div>

            <h3 style={{
              color: '#ffffff',
              fontSize: '20px',
              fontWeight: 800,
              margin: '0 0 10px',
              letterSpacing: '-0.015em',
              lineHeight: 1.3
            }}>
              {benefit.title}
            </h3>

            <p style={{
              color: '#f1f5f9',
              fontSize: '15.5px',
              lineHeight: 1.65,
              margin: 0,
              fontWeight: 500
            }}>
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
