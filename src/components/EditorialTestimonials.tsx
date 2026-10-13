import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const portraits = {
  p1: '/portrait_man_sketch.jpg',
  p2: '/portrait_woman_sketch.jpg',
  p3: '/portrait_oldman_sketch.jpg',
};

const testimonials = [
  {
    id: 't1',
    company: 'Apex Industries',
    logo: 'Apex',
    quote: 'Procurement decisions become clearer when every request, supplier and approval is connected.',
    name: 'Arjun Mehta',
    role: 'Chief Procurement Officer',
    metadata: ['Procurement workflows', 'Purchase orders'],
    layout: [
      { id: 'p1', src: portraits.p1, top: '15%', left: '15%', scale: 1.1, opacity: 1, zIndex: 3 },
      { id: 'p2', src: portraits.p2, top: '45%', left: '45%', scale: 0.7, opacity: 0.3, zIndex: 1 },
      { id: 'p3', src: portraits.p3, top: '60%', left: '-5%', scale: 0.55, opacity: 0.15, zIndex: 0 },
    ]
  },
  {
    id: 't2',
    company: 'Northstar Manufacturing',
    logo: 'Northstar',
    quote: 'A connected procurement workflow gives our teams the visibility they need to move faster.',
    name: 'Priya Sharma',
    role: 'Head of Supply Chain',
    metadata: ['Supplier management', 'Approvals'],
    layout: [
      { id: 'p1', src: portraits.p1, top: '-5%', left: '-5%', scale: 0.55, opacity: 0.15, zIndex: 0 },
      { id: 'p2', src: portraits.p2, top: '20%', left: '15%', scale: 1.1, opacity: 1, zIndex: 3 },
      { id: 'p3', src: portraits.p3, top: '50%', left: '45%', scale: 0.7, opacity: 0.3, zIndex: 1 },
    ]
  },
  {
    id: 't3',
    company: 'Global Enterprises',
    logo: 'Global',
    quote: 'We replaced six disconnected tools with one elegant operating picture. The clarity is unprecedented.',
    name: 'Robert Chen',
    role: 'VP of Finance',
    metadata: ['Financial control', 'Risk management'],
    layout: [
      { id: 'p1', src: portraits.p1, top: '50%', left: '45%', scale: 0.7, opacity: 0.3, zIndex: 1 },
      { id: 'p2', src: portraits.p2, top: '0%', left: '-5%', scale: 0.55, opacity: 0.15, zIndex: 0 },
      { id: 'p3', src: portraits.p3, top: '20%', left: '15%', scale: 1.1, opacity: 1, zIndex: 3 },
    ]
  }
];

export function EditorialTestimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const active = testimonials[index];

  return (
    <motion.div 
      className="editorial-wrapper"
      initial={{ scale: 0.97, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="editorial-frame">
        <div className="editorial-main">
          <div className="editorial-portraits">
            {active.layout.map((portrait) => (
              <motion.img 
                key={portrait.id}
                src={portrait.src}
                initial={false}
                animate={{ 
                  top: portrait.top, 
                  left: portrait.left, 
                  scale: portrait.scale, 
                  opacity: portrait.opacity,
                  zIndex: portrait.zIndex
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 80 }}
                className="editorial-portrait-img"
                alt=""
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="editorial-content">
            <AnimatePresence mode="wait">
              <motion.div 
                key={active.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="editorial-text-content"
              >
                <div className="editorial-logo">{active.logo}</div>
                <h3 className="editorial-quote">"{active.quote}"</h3>
                <div className="editorial-author">
                  <strong>{active.name}</strong>
                  <span>{active.role}</span>
                  <span className="editorial-company">{active.company}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="editorial-footer">
          <div className="editorial-metadata">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="metadata-tags"
              >
                {active.metadata.map((tag, i) => (
                  <span key={i} className="metadata-tag">{tag}</span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="editorial-controls">
            <button 
              className="nav-arrow" 
              onClick={() => setIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className="editorial-nav">
              {testimonials.map((t, i) => (
                <button 
                  key={t.id} 
                  className={`nav-dot ${i === index ? 'active' : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button 
              className="nav-arrow" 
              onClick={() => setIndex(prev => (prev + 1) % testimonials.length)}
              aria-label="Next testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
