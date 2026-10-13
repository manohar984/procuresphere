import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PremiumHeading } from './PremiumHeading';

const benefits = [
  {
    title: 'Traceable Workflows',
    description: 'No more approvals lost in email. Every requisition, bid, purchase order, and invoice is strictly traceable to its state and timestamp.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    color: '#3b82f6' // Blue
  },
  {
    title: 'Zero Silent Overspend',
    description: 'Real-time budget validation distinguishes available, reserved, and actual spend. Exceptions require an explicit, documented route.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    color: '#10b981' // Green
  },
  {
    title: 'Automated Compliance',
    description: 'Vendor onboarding, KYC, and risk management with built-in due-diligence. Keep supplier identity and performance in constant view.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: '#f59e0b' // Amber
  },
  {
    title: 'Three-Way Match Precision',
    description: 'Automated validation comparing PO, receipt, and invoice. Configurable tolerances ensure accurate payment and clear exception workflows.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    color: '#ec4899' // Pink
  },
  {
    title: 'Immutable Audit Trails',
    description: 'Every critical action captures the actor, state change, and timestamp, providing uncompromised reporting for compliance teams.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="11" r="3" />
      </svg>
    ),
    color: '#06b6d4' // Cyan
  }
];

export const AnimatedBenefits: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeDotIndex, setActiveDotIndex] = useState<number | null>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure DOM properties & attributes for reliable autoplay across browsers
    video.setAttribute('muted', '');
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      if (video && video.paused) {
        video.play().catch(() => {});
      }
    };

    // Attempt initial play
    playVideo();

    // Trigger playback when Benefits section is visible in viewport
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

    // User gesture fallback (browsers immediately permit muted playback on scroll/click)
    const handleInteraction = () => {
      playVideo();
    };

    window.addEventListener('scroll', handleInteraction, { passive: true, once: true });
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true, once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dotsContainerRef.current) return;
    const rect = dotsContainerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // These match the percentage positions defined for the 5 dots
    const normalizedPositions = [
      { x: 15, y: 15 },
      { x: 20, y: 65 },
      { x: 85, y: 20 },
      { x: 80, y: 60 },
      { x: 50, y: 75 }
    ];

    let minDist = Infinity;
    let closestIndex: number | null = null;

    normalizedPositions.forEach((pos, i) => {
      const dotX = (pos.x / 100) * rect.width;
      const dotY = (pos.y / 100) * rect.height;
      const dist = Math.hypot(mouseX - dotX, mouseY - dotY);

      // We can also set a max radius if we don't want it to ALWAYS trigger from far away, 
      // but user requested "whichever dot it is closest to", so we just find the absolute closest.
      if (dist < minDist) {
        minDist = dist;
        closestIndex = i;
      }
    });

    setActiveDotIndex(closestIndex);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 20 }
    }
  };

  return (
    <section id="benefits" ref={sectionRef} style={{
      width: '100%',
      minHeight: '350px', // Prevents extreme height squashing
      padding: '60px 20px 20px', // Added top gap so it doesn't touch the section above
      background: '#0a0f1c', // Dark cinematic background
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', // Center text if height is larger
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Video */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        background: '#0a0f1c' // Solid base color
      }}>
        <video
          ref={videoRef}
          src="/hero-video-matched.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/frame_1s.png"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'bottom',
            opacity: 0.75,
            filter: 'grayscale(15%)'
          }}
        >
          <source src="/hero-video-matched.mp4" type="video/mp4" />
        </video>

        {/* Contrast overlay layer for bright text & card readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(10, 15, 28, 0.58) 0%, rgba(10, 15, 28, 0.22) 50%, rgba(10, 15, 28, 0.58) 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      <div style={{
        textAlign: 'center',
        marginBottom: '0px',
        zIndex: 10,
        position: 'relative',
        padding: '20px 40px',
        width: '100%',
        maxWidth: '1000px'
      }}>
        <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '4px', color: '#ffffff', fontWeight: 600 }}>
          <span className="eyebrow-line" style={{ background: 'rgba(255,255,255,0.4)' }} />
          BENEFITS
          <span className="eyebrow-line" style={{ background: 'rgba(255,255,255,0.4)' }} />
        </div>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          margin: '0 0 8px',
          fontFamily: '"Playfair Display", serif',
          lineHeight: 1.1,
          textShadow: '0 4px 24px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)'
        }}>
          <PremiumHeading
            text="Procurement with financial control built in."
            highlightWord="financial control"
            highlightStyle={{ color: '#3b82f6', textShadow: '0 4px 24px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)' }}
          />
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#f8fafc',
          fontWeight: 450,
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
          textShadow: '0 2px 14px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.85)'
        }}>
          Replace disconnected emails, manual checks, and spreadsheet chaos with a single source-to-pay workflow.
        </p>
      </div>

      {/* Interactive Pulse Dots (Idea 3) */}
      <div
        ref={dotsContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setActiveDotIndex(null)}
        style={{ width: '100%', height: '500px', position: 'relative', marginTop: '40px', zIndex: 20 }}
      >
        {benefits.map((benefit, index) => {
          // Predefined scattered coordinates for 5 dots with smart card opening directions to prevent clipping
          const positions = [
            { top: '15%', left: '15%', cardTransform: 'translate(24px, -110%)' }, // Blue: Opens up-right
            { top: '65%', left: '20%', cardTransform: 'translate(24px, -110%)' }, // Opens up-right
            { top: '20%', right: '15%', cardTransform: 'translate(calc(-100% - 24px), -110%)' }, // Orange: Opens up-left
            { top: '60%', right: '20%', cardTransform: 'translate(calc(-100% - 24px), -110%)' }, // Opens up-left
            { top: '75%', left: '50%', dotTransform: 'translateX(-50%)', cardTransform: 'translate(-50%, -110%)' } // Opens straight up
          ];
          const pos = positions[index] || positions[0];

          return (
            <motion.div
              key={index}
              initial="idle"
              animate={activeDotIndex === index ? "hover" : "idle"}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                right: pos.right,
                transform: pos.dotTransform,
                zIndex: 20
              }}
            >
              {/* The Pulsing Dot */}
              <motion.div
                variants={{
                  idle: { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] },
                  hover: { scale: 0, opacity: 0 }
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: benefit.color,
                  boxShadow: `0 0 20px ${benefit.color}`,
                  cursor: 'pointer',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px'
                }}
              />

              {/* Center Core of the dot (Always visible unless hovered) */}
              <motion.div
                variants={{
                  idle: { scale: 1, opacity: 1 },
                  hover: { scale: 0, opacity: 0 }
                }}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#fff',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-6px',
                  marginLeft: '-6px',
                  pointerEvents: 'none'
                }}
              />

              {/* The Hover Card Container (Handles directional positioning to prevent clipping) */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: pos.cardTransform,
                zIndex: 30,
                width: '320px' // fixed width here to help transform logic
              }}>
                <motion.div
                  variants={{
                    idle: { opacity: 0, scale: 0.8, pointerEvents: 'none', y: 15 },
                    hover: { opacity: 1, scale: 1, pointerEvents: 'auto', y: 0 }
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{
                    width: '100%',
                    background: 'rgba(10, 15, 28, 0.85)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${benefit.color}50`,
                    borderRadius: '20px',
                    padding: '28px',
                    boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${benefit.color}20`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    cursor: 'default',
                    transformOrigin: 'center'
                  }}
                >
                  <div style={{ color: benefit.color, marginBottom: '16px', transform: 'scale(1.2)', transformOrigin: 'left' }}>
                    {benefit.icon}
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '19px', margin: '0 0 10px', fontWeight: 600, letterSpacing: '0.01em' }}>
                    {benefit.title}
                  </h4>
                  <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>
                    {benefit.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
