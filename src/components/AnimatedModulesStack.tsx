import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PremiumHeading } from './PremiumHeading';

const modules = [
  {
    id: 'vendors',
    stepId: 'vendors',
    title: 'Vendor Management',
    desc: 'Automated KYC and tracking.',
    longDesc: 'Procuresphere automates vendor onboarding, KYC compliance, and performance tracking, ensuring you only work with verified and high-quality suppliers.',
    color: '#3b82f6',
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'
  },
  {
    id: 'intake',
    stepId: 'pr',
    title: 'Intake & Approvals',
    desc: 'Dynamic forms & routing.',
    longDesc: 'Empower your teams with dynamic intake forms and intelligent approval routing, ensuring every request is properly categorized and authorized without bottlenecks.',
    color: '#8b5cf6',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'
  },
  {
    id: 'sourcing',
    stepId: 'sourcing',
    title: 'Strategic Sourcing',
    desc: 'RFx events and bid analysis.',
    longDesc: 'Run competitive RFx events with ease. Our strategic sourcing module provides deep analytics and bid comparison tools to help you secure the best value.',
    color: '#ec4899',
    icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'
  },
  {
    id: 'orders',
    stepId: 'po',
    title: 'Purchase Orders',
    desc: 'Generate and track POs.',
    longDesc: 'Generate, track, and manage Purchase Orders automatically. Keep your inventory and budget in check with real-time visibility into order fulfillment.',
    color: '#f59e0b',
    icon: 'M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15z'
  },
  {
    id: 'invoices',
    stepId: 'match',
    title: 'Invoice Automation',
    desc: 'AI-powered OCR matching.',
    longDesc: 'Eliminate manual data entry with our AI-powered OCR matching. Invoices are automatically verified against POs and receipts for touchless processing.',
    color: '#10b981',
    icon: 'M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z'
  },
  {
    id: 'contracts',
    stepId: 'clm',
    title: 'Contract Management',
    desc: 'Centralized repository alerts.',
    longDesc: 'Maintain a centralized repository of all your supplier agreements. Stay ahead of expirations and renewals with automated alerts and lifecycle management.',
    color: '#6366f1',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z'
  }
];

export const AnimatedModulesStack: React.FC<{ hideHeader?: boolean }> = ({ hideHeader = false }) => {
  const navigate = useNavigate();
  const [animationState, setAnimationState] = useState<'stacked' | 'fanned' | 'messy'>('fanned');
  const [selectedModule, setSelectedModule] = useState<typeof modules[0] | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const isDraggingRef = React.useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 600;
  const isTablet = windowWidth >= 600 && windowWidth <= 1280;

  const handleNext = () => {
    setSlideDirection(1);
    setMobileIndex((prev) => (prev + 1) % modules.length);
  };

  const handlePrev = () => {
    setSlideDirection(-1);
    setMobileIndex((prev) => (prev - 1 + modules.length) % modules.length);
  };

  useEffect(() => {
    if (selectedModule) return;
    if (isHovered && animationState !== 'stacked') return;

    let timeoutId: ReturnType<typeof setTimeout>;

    if (animationState === 'stacked') {
      timeoutId = setTimeout(() => {
        setAnimationState('fanned');
      }, 400);
    } else if (animationState === 'fanned') {
      timeoutId = setTimeout(() => {
        setAnimationState('messy');
      }, 3000);
    } else {
      timeoutId = setTimeout(() => {
        setAnimationState('stacked');
      }, 600);
    }

    return () => clearTimeout(timeoutId);
  }, [animationState, selectedModule, isHovered]);

  const getCardTransform = (index: number, state: string) => {
    const centerOffset = index - 2.5;

    if (state === 'fanned') {
      let spacing = 160;
      let scale = 1;
      let yMultiplier = 20;
      let rotateMultiplier = 8;

      if (isMobile) {
        spacing = 36;
        scale = 0.92;
        yMultiplier = 8;
        rotateMultiplier = 5;
      } else if (isTablet) {
        // Proportional tablet fit: keeps all 6 fanned cards 100% within tablet screen without side cutoff
        const progress = Math.max(0, Math.min(1, (windowWidth - 600) / 680));
        scale = 0.68 + progress * 0.26; // 0.68 at 600px up to 0.94 at 1280px
        spacing = 68.0 + progress * 78.0; // 68px at 600px up to 146px at 1280px
        yMultiplier = 12.0 + progress * 8.0;
        rotateMultiplier = 5.5 + progress * 2.5;
      }

      const x = centerOffset * spacing;
      const y = Math.abs(centerOffset) * yMultiplier;
      const rotateZ = centerOffset * rotateMultiplier;
      return { x, y, rotateZ, scale };
    }

    if (state === 'messy') {
      const jitterRotates = isMobile ? [-8, 6, -4, 8, -6, 10] : [-14, 8, -6, 12, -10, 16];
      const jitterX = isMobile ? [-18, 14, -8, 16, -12, 18] : (isTablet ? [-28, 18, -12, 22, -16, 26] : [-40, 25, -15, 30, -20, 35]);
      const jitterY = isMobile ? [6, -8, 3, -4, 6, -2] : [10, -15, 5, -8, 12, -4];
      const scale = isMobile ? 0.9 : (isTablet ? 0.82 : 0.98);
      return {
        x: jitterX[index] || 0,
        y: jitterY[index] || 0,
        rotateZ: jitterRotates[index] || 0,
        scale
      };
    }

    const stackedRotates = [-5, 3, -2, 4, -3, 2];
    const stackedY = index * -4;
    return {
      x: 0,
      y: stackedY,
      rotateZ: stackedRotates[index] || 0,
      scale: isMobile ? 0.92 : (isTablet ? 0.85 : 0.95)
    };
  };

  const handleExplore = (stepId: string) => {
    setSelectedModule(null);
    if (window.location.pathname === '/solutions') {
      // If already on solutions page, update hash/query and smooth scroll
      const url = new URL(window.location.href);
      url.searchParams.set('step', stepId);
      window.history.pushState({}, '', url.toString());
      const el = document.getElementById('lifecycle-detail');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Trigger a custom event or hashchange
      window.dispatchEvent(new Event('popstate'));
    } else {
      navigate(`/solutions?step=${stepId}#lifecycle-detail`);
    }
  };

  return (
    <div
      id="modules"
      style={{
        position: 'relative',
        width: '100%',
        padding: hideHeader ? (isMobile ? '10px 16px 50px' : '10px 20px 100px') : (isMobile ? '40px 16px 60px' : '80px 20px 140px'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        scrollMarginTop: '80px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section Heading - hidden when hideHeader is true */}
      {!hideHeader && (
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '80px', maxWidth: '800px', zIndex: 10 }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#2563eb',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '12px',
              display: 'block'
            }}
          >
            CORE CAPABILITIES
          </span>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.15,
              margin: '0 0 16px',
              letterSpacing: '-0.02em'
            }}
          >
            <PremiumHeading
              text="Everything procurement needs, connected."
              highlightWord="connected."
              highlightClassName="highlight-blue"
              highlightStyle={{ color: '#2563eb' }}
            />
          </h2>
          <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.6, margin: '0 auto', maxWidth: '640px' }}>
            A modular, unified system replacing isolated tools. Click on any module to explore its workflow, controls, and features.
          </p>
        </div>
      )}

      {/* Cards Deck Stage (Desktop: Animated Stacked/Fanned Deck | Mobile: Swipeable Carousel) */}
      {!isMobile ? (
        <div
          className="modules-deck-stage"
          style={{
            position: 'relative',
            width: '280px',
            height: '320px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {modules.map((module, index) => {
            const transform = getCardTransform(index, animationState);

            return (
              <motion.div
                key={module.id}
                animate={{
                  x: transform.x,
                  y: transform.y,
                  rotateZ: transform.rotateZ,
                  scale: transform.scale,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 140,
                  damping: 18,
                  mass: 0.8
                }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '24px',
                  background: module.color,
                  boxShadow: '0 12px 32px rgba(15, 27, 45, 0.18)',
                  border: hoveredCardId === module.id ? '2px solid #ffffff' : `2px solid ${module.color}`,
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  zIndex: index,
                  transformOrigin: 'center bottom',
                  cursor: 'pointer',
                  transition: 'border 0.3s ease'
                }}
                onClick={() => setSelectedModule(module)}
                onHoverStart={() => setHoveredCardId(module.id)}
                onHoverEnd={() => setHoveredCardId(null)}
                whileHover={{
                  scale: isTablet ? transform.scale * 1.06 : 1.1,
                  zIndex: 50,
                  y: transform.y - 12,
                  boxShadow: '0 24px 64px rgba(0,0,0,0.4)'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d={module.icon} />
                  </svg>
                </div>

                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: '0 0 12px',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {module.title}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.5,
                    margin: 0
                  }}
                >
                  {module.desc}
                </p>

                <div
                  style={{
                    marginTop: '16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'rgba(255, 255, 255, 0.95)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 255, 255, 0.18)',
                    padding: '6px 12px',
                    borderRadius: '999px',
                  }}
                >
                  <span>Explore Details</span>
                  <span>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Mobile Swipeable Card Carousel / Slider with Dots */
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '320px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Main Card Viewport */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '280px',
              minHeight: '330px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Left Nav Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous capability"
              style={{
                position: 'absolute',
                left: '-18px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 14px rgba(15, 27, 45, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                color: '#1e293b'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right Nav Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next capability"
              style={{
                position: 'absolute',
                right: '-18px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 14px rgba(15, 27, 45, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                color: '#1e293b'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Animated Active Card */}
            <AnimatePresence mode="wait">
              {(() => {
                const currentModule = modules[mobileIndex];
                return (
                  <motion.div
                    key={currentModule.id}
                    initial={{ opacity: 0, x: slideDirection > 0 ? 40 : -40, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: slideDirection > 0 ? -40 : 40, scale: 0.94 }}
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 24,
                      mass: 0.7
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragStart={() => {
                      isDraggingRef.current = true;
                    }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -30) {
                        handleNext();
                      } else if (info.offset.x > 30) {
                        handlePrev();
                      }
                      setTimeout(() => {
                        isDraggingRef.current = false;
                      }, 60);
                    }}
                    style={{
                      width: '100%',
                      minHeight: '320px',
                      borderRadius: '24px',
                      background: currentModule.color,
                      boxShadow: `0 14px 34px ${currentModule.color}45, 0 4px 12px rgba(0,0,0,0.08)`,
                      border: '2px solid rgba(255, 255, 255, 0.25)',
                      padding: '30px 22px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      touchAction: 'pan-y'
                    }}
                    onClick={() => {
                      if (!isDraggingRef.current) {
                        setSelectedModule(currentModule);
                      }
                    }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.22)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '18px'
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <path d={currentModule.icon} />
                      </svg>
                    </div>

                    <h3
                      style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: '0 0 10px',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {currentModule.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.92)',
                        lineHeight: 1.5,
                        margin: '0 0 18px'
                      }}
                    >
                      {currentModule.desc}
                    </p>

                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#ffffff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(255, 255, 255, 0.25)',
                        padding: '7px 14px',
                        borderRadius: '999px',
                        border: '1px solid rgba(255,255,255,0.3)'
                      }}
                    >
                      <span>Explore Details</span>
                      <span>→</span>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Swipe Hint & Counter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '16px'
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#334155',
                letterSpacing: '0.04em'
              }}
            >
              {mobileIndex + 1} of {modules.length}
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>• Swipe to explore</span>
          </div>

          {/* Dots Indicator */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '8px'
            }}
          >
            {modules.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setSlideDirection(i > mobileIndex ? 1 : -1);
                  setMobileIndex(i);
                }}
                aria-label={`Go to ${m.title}`}
                style={{
                  width: i === mobileIndex ? '22px' : '7px',
                  height: '7px',
                  borderRadius: '999px',
                  background: i === mobileIndex ? m.color : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Module Modal */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(15, 27, 45, 0.6)',
              backdropFilter: 'blur(8px)'
            }}
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              className="module-modal-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '40px',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedModule(null)}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748b',
                  fontSize: '20px'
                }}
                aria-label="Close"
              >
                ✕
              </button>

              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: `${selectedModule.color}15`,
                  color: selectedModule.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d={selectedModule.icon} />
                </svg>
              </div>

              <h3
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#0f1b2d',
                  marginBottom: '16px',
                  fontFamily: '"Playfair Display", serif'
                }}
              >
                {selectedModule.title}
              </h3>

              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, marginBottom: '32px' }}>
                {selectedModule.longDesc}
              </p>

              <button
                type="button"
                onClick={() => handleExplore(selectedModule.stepId || selectedModule.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: selectedModule.color,
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '14px 28px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '15px',
                  transition: 'all 0.2s',
                  boxShadow: `0 8px 24px ${selectedModule.color}40`,
                }}
              >
                Explore {selectedModule.title}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
