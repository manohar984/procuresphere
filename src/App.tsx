import { CSSProperties, FormEvent, ReactNode, useEffect, useState, useRef, Fragment } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AnimatedModulesStack } from './components/AnimatedModulesStack'
import { PremiumHeading } from './components/PremiumHeading'
import { AnimatedBenefits } from './components/AnimatedBenefits'
import { EditorialTestimonials } from './components/EditorialTestimonials'
import { motion, AnimatePresence } from 'framer-motion'
import { GenericDashboard } from './components/GenericDashboard'
import { AnimatedFAQ } from "./components/AnimatedFAQ";
import { FullScreenLogin } from './components/FullScreenLogin';
import { LegalModal } from './components/LegalModal';
import { Navbar } from './components/Navbar';

export type IconName = 'arrow' | 'arrow-down-right' | 'chevron' | 'check' | 'shield' | 'activity' | 'layers' | 'grid' | 'file' | 'users' | 'finance' | 'search' | 'menu' | 'close' | 'home' | 'home-solid' | 'info-solid' | 'box-solid' | 'star-solid' | 'users-solid' | 'question-solid' | 'key' | 'badge-solid' | 'chart-solid' | 'receipt-solid' | 'savings-solid'
type IconProps = { name: IconName; size?: number }

type RoleKey = 'REQUESTER' | 'PROCUREMENT' | 'FINANCE' | 'LEGAL' | 'STORES' | 'COMPLIANCE' | 'VENDOR'

const roles: Record<RoleKey, string[]> = {
  REQUESTER: ['My Requests', 'Policy guidance', 'Budget visibility'],
  PROCUREMENT: ['Sourcing', 'Suppliers', 'Purchase Orders'],
  FINANCE: ['Invoices', 'Budget', 'Payments'],
  LEGAL: ['Contracts', 'Renewals', 'Obligations'],
  STORES: ['Receipts', 'Inspection', 'Inventory context'],
  COMPLIANCE: ['Audit', 'Risk', 'Controls'],
  VENDOR: ['Onboarding', 'Bids', 'PO acknowledgement'],
}

const modules: Array<{ name: string; detail: string; state: string; icon: IconName; category: 'SOURCING' | 'PURCHASING' | 'FINANCE' | 'GOVERNANCE' }> = [
  { name: 'Vendor Onboarding & KYC', detail: 'Turn supplier intake into a clear, reviewable path.', state: 'KYC REVIEW', icon: 'users', category: 'SOURCING' },
  { name: 'Vendor Master & Risk', detail: 'Keep supplier identity, risk and ownership in view.', state: 'ACTIVE', icon: 'shield', category: 'GOVERNANCE' },
  { name: 'Purchase Requisition', detail: 'Capture intent with policy and budget context.', state: 'MANAGER REVIEW', icon: 'file', category: 'PURCHASING' },
  { name: 'Approval Policy Engine', detail: 'Route decisions to the right owner at the right time.', state: 'BUDGET REVIEW', icon: 'check', category: 'GOVERNANCE' },
  { name: 'RFQ / RFP Sourcing', detail: 'Create a transparent path from need to market.', state: 'BID WINDOW', icon: 'search', category: 'SOURCING' },
  { name: 'Vendor Bid Portal (sealed bids)', detail: 'Keep submissions structured and comparable.', state: 'PUBLISHED', icon: 'layers', category: 'SOURCING' },
  { name: 'Evaluation & Award', detail: 'Turn technical and commercial review into a decision.', state: 'AWARD APPROVAL', icon: 'activity', category: 'SOURCING' },
  { name: 'Purchase Orders & Amendments', detail: 'Make committed intent visible to every team.', state: 'ACKNOWLEDGED', icon: 'file', category: 'PURCHASING' },
  { name: 'Receipt & Inspection', detail: 'Connect arrival, inspection and acceptance.', state: 'PARTIAL RECEIPT', icon: 'check', category: 'PURCHASING' },
  { name: 'Invoice & 3-Way Match', detail: 'Resolve exceptions before they become delays.', state: '3-WAY MATCH', icon: 'finance', category: 'FINANCE' },
  { name: 'Contract Lifecycle', detail: 'Keep obligations and renewal decisions visible.', state: 'RENEWAL DUE', icon: 'file', category: 'GOVERNANCE' },
  { name: 'Budget & Spend Control', detail: 'Show how a decision changes the financial picture.', state: 'RESERVED', icon: 'finance', category: 'FINANCE' },
  { name: 'Supplier Performance', detail: 'Make health and collaboration measurable.', state: 'ACTIVE', icon: 'activity', category: 'SOURCING' },
  { name: 'Reports & Audit Trail', detail: 'Give every important action a structured place.', state: 'ACTIVE', icon: 'shield', category: 'GOVERNANCE' },
]

const testimonials = [
  { quote: 'A connected procurement experience should make the next decision obvious, not add another system to navigate.', role: 'Procurement leader', note: 'Illustrative perspective' },
  { quote: 'The value is seeing request, budget, supplier and invoice context in the same operating picture.', role: 'Finance stakeholder', note: 'Illustrative perspective' },
  { quote: 'For vendors, a clear onboarding and bid path creates a better experience for everyone involved.', role: 'Supplier operations stakeholder', note: 'Illustrative perspective' },
]

export function Icon({ name, size = 18 }: IconProps) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  if (name === 'arrow') return <svg {...common}><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
  if (name === 'arrow-down-right') return <svg {...common}><path d="M7 7l10 10M17 7v10H7" strokeWidth="1.2" /></svg>
  if (name === 'chevron') return <svg {...common}><path d="m8 10 4 4 4-4" /></svg>
  if (name === 'check') return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>
  if (name === 'shield') return <svg {...common}><path d="M12 3 5 6v5c0 4.8 2.8 8 7 10 4.2-2 7-5.2 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
  if (name === 'activity') return <svg {...common}><path d="M3 12h4l2-6 4 12 2-6h6" /></svg>
  if (name === 'layers') return <svg {...common}><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" /><path d="m4 12 8 4.5 8-4.5" /><path d="m4 16.5 8 4.5 8-4.5" /></svg>
  if (name === 'grid') return <svg {...common}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>
  if (name === 'file') return <svg {...common}><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v5h5M10 13h5M10 17h5" /></svg>
  if (name === 'users') return <svg {...common}><path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" /><circle cx="9.5" cy="7" r="3.5" /><path d="M16 11a3.5 3.5 0 0 0 0-7M21 20v-1.5a4 4 0 0 0-3-3.9" /></svg>
  if (name === 'finance') return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M15 8.5c-.8-.7-1.7-1-2.8-1-1.8 0-3 .8-3 2s1 1.8 3 2.2 3 1 3 2.3-1.2 2.3-3 2.3c-1.1 0-2.3-.4-3.1-1.1M12 5.5v13" /></svg>
  if (name === 'search') return <svg {...common}><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.5 4.5" /></svg>
  if (name === 'menu') return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  if (name === 'home') return <svg {...common}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  if (name === 'key') return <svg {...common}><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" /><path d="m21 2-9.6 9.6" /><circle cx="7.5" cy="15.5" r="5.5" /></svg>

  const solidCommon = { width: size, height: size, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true }
  if (name === 'home-solid') return <svg {...solidCommon}><path d="M12 3l10 9h-3v9H5v-9H2z" /></svg>
  if (name === 'info-solid') return <svg {...solidCommon}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
  if (name === 'box-solid') return <svg {...solidCommon}><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15z" /></svg>
  if (name === 'star-solid') return <svg {...solidCommon}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
  if (name === 'users-solid') return <svg {...solidCommon}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
  if (name === 'question-solid') return <svg {...solidCommon}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" /></svg>
  if (name === 'badge-solid') return <svg {...solidCommon}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>
  if (name === 'chart-solid') return <svg {...solidCommon}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" /></svg>
  if (name === 'receipt-solid') return <svg {...solidCommon}><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z" /></svg>
  if (name === 'savings-solid') return <svg {...solidCommon}><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>

  return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>
}

export function Logo({ compact = false }: { compact?: boolean }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const heroVid = document.querySelector('.hero-video') as HTMLVideoElement | null;
    if (heroVid) {
      heroVid.currentTime = 0;
      heroVid.play().catch(() => {});
    }
  };

  return <a className={`brand ${compact ? 'brand-compact' : ''}`} href="#top" onClick={handleClick} aria-label="ProcureSphere 360 home">
    <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" /><ellipse cx="16" cy="16" rx="12" ry="5.5" /><path d="M4.5 16h23" /><path d="M16 4v24" /><circle cx="24.8" cy="11" r="2.1" /><circle cx="9.5" cy="21.5" r="2.1" /></svg></span>
    <span className="brand-text"><strong>ProcureSphere</strong><em>360</em></span>
  </a>
}

function Button({ children, variant = 'primary', href = '#contact', icon = 'arrow', onClick }: { children: ReactNode; variant?: 'primary' | 'secondary' | 'text'; href?: string; icon?: IconName; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
  };

  return <a className={`button button-${variant}`} href={href} onClick={handleClick}>{children}<Icon name={icon} size={16} /></a>
}

function Eyebrow({ children, centered }: { children: ReactNode, centered?: boolean }) { return <div className="eyebrow" style={centered ? { justifyContent: 'center' } : {}}><span className="eyebrow-line" />{children}{centered && <span className="eyebrow-line" />}</div> }

function LayeredHeading({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <h2 ref={ref} style={{ margin: '18px 0', padding: 0 }}>
      <div className="line-wrap" style={{ overflow: 'hidden', paddingTop: '0.1em', paddingBottom: '0.25em', marginTop: '-0.1em', marginBottom: '-0.25em' }}>
        <div
          className="line"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(130%)',
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
            display: 'block'
          }}
        >
          {text.split(' ').map((word, i) => (
            <span key={i} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
              {word.split('').map((char, j) => (
                <span
                  key={j}
                  className="char"
                  style={{
                    display: 'inline-block',
                    opacity: isVisible ? 1 : 0.2,
                    transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                    transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'transform, opacity'
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </h2>
  );
}

function SobhaHeading({ text, delayOffset = 0, charStagger = 15, duration = 0.8, style, className, trigger }: { text: string, delayOffset?: number, charStagger?: number, duration?: number, style?: React.CSSProperties, className?: string, trigger?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisibleState, setIsVisibleState] = useState(false);

  useEffect(() => {
    if (trigger !== undefined) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisibleState(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [trigger]);

  const isVisible = trigger !== undefined ? trigger : isVisibleState;

  let charIndex = 0;

  return (
    <div ref={ref} style={style} className={className}>
      <div className="line-wrap" style={{ overflow: 'hidden', paddingTop: '0.4em', paddingBottom: '0.4em', marginTop: '-0.4em', marginBottom: '-0.4em' }}>
        <div
          className="line"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(120%)',
            transition: isVisible ? `transform 1.0s cubic-bezier(0.22, 1, 0.36, 1) ${delayOffset}ms` : 'none',
            willChange: 'transform',
            display: 'block'
          }}
        >
          {text.split(' ').map((word, i) => (
            <span key={i} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
              {word.split('').map((char, j) => {
                const currentIdx = charIndex++;
                return (
                  <span
                    key={j}
                    className="char"
                    style={{
                      display: 'inline-block',
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                      transition: isVisible ? `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delayOffset + (currentIdx * charStagger)}ms, opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delayOffset + (currentIdx * charStagger)}ms` : 'none',
                      willChange: 'transform, opacity'
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, copy, align = 'left' }: { eyebrow: string; title: string; copy?: string; align?: 'left' | 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`section-title align-${align}`}
    >
      <Eyebrow centered={align === 'center'}>{eyebrow}</Eyebrow>
      <h2 style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600 }}>
        <PremiumHeading text={title} />
      </h2>
      {copy && <p>{copy}</p>}
    </motion.div>
  );
}

function ProcurementSphere({ scrollDepth = 0 }: { scrollDepth?: number }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const nodes = [
    ['REQUEST', '01', 'n-request', 'blue'], ['APPROVAL', '02', 'n-approval', 'green'], ['SUPPLIER', '03', 'n-supplier', 'blue'],
    ['SOURCING', '04', 'n-sourcing', 'amber'], ['PO', '05', 'n-po', 'navy'], ['RECEIPT', '06', 'n-receipt', 'green'],
    ['INVOICE', '07', 'n-invoice', 'amber'], ['FINANCE', '08', 'n-finance', 'green'], ['CONTRACT', '09', 'n-contract', 'blue'],
    ['ANALYTICS', '10', 'n-analytics', 'blue'], ['GOVERNANCE', '11', 'n-governance', 'navy'],
  ] as const
  const style = { '--pointer-x': `${pointer.x}px`, '--pointer-y': `${pointer.y}px`, '--scroll-depth': `${scrollDepth}px` } as CSSProperties
  return <div className="sphere-stage" style={style} onPointerMove={(event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setPointer({ x: (event.clientX - rect.left - rect.width / 2) / 11, y: (event.clientY - rect.top - rect.height / 2) / 11 })
  }} onPointerLeave={() => setPointer({ x: 0, y: 0 })}>
    <div className="sphere-grid" /><div className="sphere-shadow" /><div className="sphere-object">
      <div className="sphere-orbit orbit-one" /><div className="sphere-orbit orbit-two" /><div className="sphere-orbit orbit-three" />
      <div className="sphere-globe"><div className="globe-line line-a" /><div className="globe-line line-b" /><div className="globe-line line-c" /><span className="globe-core"><i /><i /><i /></span></div>
      <svg className="sphere-paths" viewBox="0 0 620 500" preserveAspectRatio="none" aria-hidden="true"><path d="M308 245 120 120 110 295 235 430 472 387 519 210 414 80 308 245 519 210" /><path d="M308 245 120 120M308 245 110 295M308 245 235 430M308 245 472 387M308 245 519 210M308 245 414 80" /><path className="path-pulse" d="M308 245 519 210" /></svg>
      {nodes.map(([name, number, cls, tone]) => <div key={name} className={`sphere-node ${cls} node-${tone}`}><span className="node-dot" /><span className="node-number">{number}</span><strong>{name}</strong></div>)}
      <div className="sphere-label"><span className="status-dot" />CONNECTED OPERATING SYSTEM</div>
    </div>
  </div>
}

const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [shouldSlide, setShouldSlide] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure DOM properties & attributes for reliable autoplay across browsers on every refresh
    video.setAttribute('muted', '');
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      if (video && !completedRef.current) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {});
        }
      }
    };

    video.currentTime = 0;
    playVideo();

    const finishIntro = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      try {
        video.pause();
      } catch {}
      setShouldSlide(true);
      setTimeout(() => {
        onCompleteRef.current();
      }, 700);
    };

    video.onended = finishIntro;

    const onPlayFailed = () => {
      setTimeout(finishIntro, 500);
    };
    video.addEventListener('error', onPlayFailed);

    const timeout = setTimeout(() => {
      if (!completedRef.current && video.currentTime === 0) {
        finishIntro();
      }
    }, 6000);

    const handleUserGesture = () => {
      if (!completedRef.current && video && video.paused) {
        playVideo();
      }
    };
    window.addEventListener('click', handleUserGesture, { once: true });
    window.addEventListener('touchstart', handleUserGesture, { once: true, passive: true });

    return () => {
      clearTimeout(timeout);
      video.removeEventListener('error', onPlayFailed);
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('touchstart', handleUserGesture);
    };
  }, []);

  return (
    <div className={`intro-screen ${shouldSlide ? 'slide-up' : ''}`}>
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        className="intro-video"
      />
    </div>
  );
};

const navItems = [['Home', '#top'], ['About', '#about'], ['Solutions', '#solution'], ['Benefits', '#benefits'], ['Roles', '#roles'], ['FAQ', '#faq']];

const AnimatedNav = ({ mobileOpen, setMobileOpen }: { mobileOpen: boolean, setMobileOpen: (v: boolean) => void }) => {
  const [activeHash, setActiveHash] = useState(() => window.location.hash || '#top');
  const [hoveredHash, setHoveredHash] = useState<string | null>(null);
  const [pillProps, setPillProps] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash || '#top');
    window.addEventListener('hashchange', onHashChange);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveHash(`#${entry.target.id}`);
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    navItems.forEach(([, href]) => {
      const el = document.getElementById(href.replace('#', ''));
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      observer.disconnect();
    };
  }, []);

  const currentHash = hoveredHash || activeHash;

  useEffect(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector(`[data-hash="${currentHash}"]`) as HTMLElement;
    if (activeEl) {
      setPillProps({
        left: activeEl.offsetLeft - 8,
        width: activeEl.offsetWidth + 16,
        opacity: 1
      });
    } else {
      setPillProps(p => ({ ...p, opacity: 0 }));
    }
  }, [currentHash, mobileOpen, activeHash]);

  return (
    <nav
      ref={navRef}
      className={`nav-links ${mobileOpen ? 'is-open' : ''}`}
      aria-label="Primary navigation"
      style={{ position: 'relative' }}
      onMouseLeave={() => setHoveredHash(null)}
    >
      <div
        className="nav-indicator"
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          height: pillProps.opacity ? '48px' : '0px',
          marginTop: pillProps.opacity ? '-24px' : '0px',
          width: pillProps.width,
          transform: `translateX(${pillProps.left}px)`,
          opacity: pillProps.opacity,
          backgroundColor: '#FFFFFF',
          borderRadius: '999px',
          boxShadow: '0 8px 24px rgba(15, 27, 45, 0.08), 0 2px 8px rgba(15, 27, 45, 0.04)',
          transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.15), width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.3s ease, margin-top 0.3s ease, opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <div style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)', width: 5, height: 5, borderRadius: '50%', background: '#2456D6', opacity: pillProps.opacity, transition: 'opacity 0.3s ease' }} />
      </div>
      {navItems.map(([label, href]) => {
        const isActive = activeHash === href;
        const isHovered = hoveredHash === href;
        const showActive = isActive || isHovered;
        return (
          <a
            key={label}
            href={href}
            data-hash={href}
            onClick={(e) => {
              setMobileOpen(false);
              setActiveHash(href);
              if (href === '#top' || label === 'Home') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const heroVid = document.querySelector('.hero-video') as HTMLVideoElement | null;
                if (heroVid) {
                  heroVid.currentTime = 0;
                  heroVid.play().catch(() => {});
                }
              }
            }}
            onMouseEnter={() => setHoveredHash(href)}
            className={isActive ? 'is-active' : ''}
            style={{
              position: 'relative',
              zIndex: 1,
              padding: '10px 24px',
              color: showActive ? 'var(--blue)' : 'var(--ink)',
              fontWeight: showActive ? 700 : 500,
              transition: 'color 0.3s ease, font-weight 0.3s ease'
            }}
          >
            <span style={{
              display: 'inline-block',
              transform: showActive ? 'translateY(-1px)' : 'translateY(0)',
              transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2)'
            }}>
              {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
};

const platformModules = [
  {
    id: 1,
    name: 'Purchase & Approvals',
    themeColor: '#0052cc',
    accentLight: '#00d2ff',
    icon: 'file' as IconName,
    summary: 'Streamline purchase requests with automated approval hierarchies and live budget verification.',
    shortDesc: 'Automated requisition intake and multi-tier approval routing.',
    points: [
      {
        title: 'Smart Purchase Requisitions',
        desc: 'Dynamic forms automatically validate cost centers, project codes, and line-item requirements.',
        icon: 'file' as IconName
      },
      {
        title: 'Automated Approval Matrix',
        desc: 'Intelligently routes requests to department heads and finance managers based on spend thresholds.',
        icon: 'activity' as IconName
      },
      {
        title: 'Real-Time Budget Validation',
        desc: 'Verifies fund availability instantly before purchase commitments are locked, preventing overspend.',
        icon: 'check' as IconName
      }
    ]
  },
  {
    id: 2,
    name: 'Sourcing & Vendors',
    themeColor: '#6554c0',
    accentLight: '#907cfc',
    icon: 'users' as IconName,
    summary: 'Centralize supplier management, request for quotations (RFQs), and competitive bid evaluation.',
    shortDesc: 'Supplier onboarding, sealed RFQ bidding, and proposal scoring.',
    points: [
      {
        title: 'Supplier Self-Service Portal',
        desc: 'Vendors easily register, maintain profiles, upload documentation, and submit quote proposals.',
        icon: 'users' as IconName
      },
      {
        title: 'Structured RFQ & Sourcing Events',
        desc: 'Publish requirement sheets to invited suppliers and collect comparable quotes within set deadlines.',
        icon: 'search' as IconName
      },
      {
        title: 'Comparative Proposal Evaluation',
        desc: 'Evaluate commercial terms, technical ratings, and vendor delivery track records side-by-side.',
        icon: 'check' as IconName
      }
    ]
  },
  {
    id: 3,
    name: 'Orders & Invoicing',
    themeColor: '#172b4d',
    accentLight: '#60a5fa',
    icon: 'finance' as IconName,
    summary: 'Dispatch official purchase orders and reconcile warehouse receiving notes against supplier invoices.',
    shortDesc: 'PO dispatch, warehouse receiving, and touchless invoice matching.',
    points: [
      {
        title: 'Purchase Order Execution',
        desc: 'Converts approved requisitions into official POs dispatched directly to suppliers with version tracking.',
        icon: 'finance' as IconName
      },
      {
        title: 'Warehouse Goods Receipt (GRN)',
        desc: 'Receiving docks record delivered items, inspect quality, and flag partial shipments accurately.',
        icon: 'layers' as IconName
      },
      {
        title: 'Automated 3-Way Match',
        desc: 'Cross-verifies PO line items, receiving notes, and vendor invoices to prevent duplicate payments.',
        icon: 'check' as IconName
      }
    ]
  },
  {
    id: 4,
    name: 'Contracts & Compliance',
    themeColor: '#ff5630',
    accentLight: '#ff8f73',
    icon: 'shield' as IconName,
    summary: 'Maintain a centralized agreement repository with milestone deliverables and proactive renewal alerts.',
    shortDesc: 'Centralized contract vault, SLA milestones, and renewal alerts.',
    points: [
      {
        title: 'Centralized Contract Vault',
        desc: 'Single secure repository for master service agreements, vendor rate sheets, and contractual terms.',
        icon: 'shield' as IconName
      },
      {
        title: 'Milestone & Obligation Tracking',
        desc: 'Tracks key vendor deliverables against contract milestones and release schedules.',
        icon: 'activity' as IconName
      },
      {
        title: 'Proactive Renewal Notifications',
        desc: 'Automated advance reminders prevent unexpected contract expirations and facilitate timely renegotiation.',
        icon: 'check' as IconName
      }
    ]
  }
];

const CinematicStats = () => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const activeModule = platformModules.find(m => m.id === activeModuleId) || platformModules[0];

  return (
    <>
      <div style={{ position: 'relative', background: '#ffffff', width: '100%' }}>
      <section className="about-platform-section" style={{
        position: 'relative',
        padding: 'clamp(44px, 5.5vh, 68px) 0 clamp(44px, 5.5vh, 68px)',
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Section Header: Clear, Bold, Enterprise Proportion */}
        <div style={{
          padding: '0 clamp(24px, 4vw, 56px)',
          marginBottom: '22px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '999px',
            background: '#eff6ff',
            color: '#1d68f6',
            border: '1px solid #dbeafe',
            fontSize: '11.5px',
            fontWeight: 750,
            letterSpacing: '0.08em',
            marginBottom: '10px',
            textTransform: 'uppercase'
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1d68f6' }} />
            ABOUT PLATFORM
          </div>
          <h2 style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0 8px',
            fontFamily: '"Playfair Display", "Georgia", serif',
            fontSize: 'clamp(26px, 2.8vw, 38px)',
            lineHeight: 1.2,
            marginTop: 0,
            marginBottom: '8px',
            color: '#0F1B2D',
            fontWeight: 700
          }}>
            Replacing chaos with a controlled{' '}
            <span className="highlight-underline">
              source-to-pay
            </span>{' '}
            workflow.
          </h2>
          <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.55, margin: 0, maxWidth: '780px', fontWeight: 500 }}>
            ProcureSphere 360 eliminates disconnected emails, spreadsheets, and manual approvals, bringing total traceability to every transaction across your enterprise.
          </p>
        </div>

        {/* 2-Column Grid: Cards on Left, High-Contrast Details on Right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(380px, 0.95fr)',
          gap: 'clamp(24px, 3vw, 40px)',
          alignItems: 'stretch',
          padding: '0 clamp(24px, 4vw, 56px)'
        }}>
          {/* LEFT COLUMN: 4 Interactive Cards (2x2 Grid) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
              fontSize: '13px',
              color: '#475569',
              fontWeight: 650
            }}>
              <span>Select or hover on any module below:</span>
              <span style={{ color: activeModule.themeColor, fontWeight: 750 }}>
                {activeModule.name} selected →
              </span>
            </div>

            <div className="cinematic-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {platformModules.map((module) => {
                const isSelected = activeModuleId === module.id;
                return (
                  <div key={module.id} className={`stat-card-wrap-${module.id}`}>
                    <div
                      className={`uiverse-card card-theme-${module.id} ${isSelected ? 'is-active is-inspecting' : ''}`}
                      onMouseEnter={() => setActiveModuleId(module.id)}
                      onClick={() => setActiveModuleId(module.id)}
                      role="button"
                      tabIndex={0}
                      style={{
                        cursor: 'pointer',
                        height: '178px',
                        minHeight: '178px',
                        borderRadius: '16px',
                        outline: isSelected ? `3.5px solid ${module.accentLight}` : '1.5px solid rgba(15, 27, 45, 0.12)',
                        outlineOffset: '2px',
                        transform: isSelected ? 'scale(1.025)' : 'none',
                        boxShadow: isSelected
                          ? `0 22px 48px -8px ${module.themeColor}66, 0 8px 22px rgba(15, 27, 45, 0.22)`
                          : '0 12px 30px -6px rgba(15, 27, 45, 0.24), 0 4px 14px rgba(15, 27, 45, 0.12)',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      <div className="logo" style={{ top: '14px', left: '16px', width: '28px', height: '28px' }}>
                        <Icon name={module.icon} size={22} />
                      </div>
                      <div className="title" style={{ fontSize: 'clamp(1.2rem, 1.35vw, 1.45rem)', top: '50%', fontWeight: 800 }}>
                        {module.name}
                      </div>
                      <div className="card-tap-cue" style={{ position: 'absolute', bottom: '10px', width: '100%', textAlign: 'center' }}>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.95)', fontWeight: isSelected ? 750 : 600 }}>
                          {isSelected ? '● Viewing Details →' : 'Hover to view details ↗'}
                        </span>
                      </div>
                      <div className="box box3"></div>
                      <div className="box box2"></div>
                      <div className="box box1">
                        <div className="content" style={{ padding: '1rem' }}>
                          <span className="box-title" style={{ fontSize: '1.1rem', marginBottom: '6px' }}>{module.name}</span>
                          <span className="box-text" style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>{module.shortDesc}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Meaningful Client-Facing Details Panel */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              minHeight: '372px',
              borderRadius: '18px',
              overflow: 'hidden',
              background: '#ffffff',
              border: '2px solid #94a3b8',
              boxShadow: '0 24px 60px -12px rgba(15, 27, 45, 0.22), 0 8px 24px -4px rgba(15, 27, 45, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box'
            }}
          >
            {/* Top Accent Stripe matching active card */}
            <div style={{
              height: '5px',
              width: '100%',
              background: `linear-gradient(90deg, ${activeModule.themeColor}, ${activeModule.accentLight})`,
              transition: 'background 0.3s ease'
            }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: '22px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <div>
                  {/* Module Title & Icon Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '11px',
                        background: `${activeModule.themeColor}18`,
                        color: activeModule.themeColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Icon name={activeModule.icon} size={24} />
                      </div>
                      <h3 style={{
                        margin: 0,
                        fontSize: '25px',
                        fontWeight: 800,
                        fontFamily: '"Playfair Display", "Georgia", serif',
                        color: '#0F1B2D',
                        lineHeight: 1.2
                      }}>
                        {activeModule.name}
                      </h3>
                    </div>

                    <span style={{
                      fontSize: '11.5px',
                      fontWeight: 750,
                      color: activeModule.themeColor,
                      background: `${activeModule.themeColor}14`,
                      padding: '5px 11px',
                      borderRadius: '6px',
                      fontFamily: '"DM Mono", monospace',
                      letterSpacing: '0.04em'
                    }}>
                      ENTERPRISE CAPABILITY
                    </span>
                  </div>

                  {/* High-Contrast Clear Summary */}
                  <p style={{
                    margin: '0 0 16px 0',
                    fontSize: '16px',
                    color: '#0F1B2D',
                    lineHeight: 1.55,
                    fontWeight: 600
                  }}>
                    {activeModule.summary}
                  </p>

                  {/* 3 High-Contrast Feature Rows */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                    {activeModule.points.map((pt, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '14px',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          background: '#f8fafc',
                          border: '1.5px solid #cbd5e1',
                          boxShadow: '0 4px 14px -2px rgba(15, 27, 45, 0.08), 0 2px 6px rgba(15, 27, 45, 0.04)'
                        }}
                      >
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: `${activeModule.themeColor}20`,
                          color: activeModule.themeColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}>
                          <Icon name={pt.icon} size={16} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '16.5px', fontWeight: 800, color: '#0a101d', lineHeight: 1.3 }}>
                            {pt.title}
                          </span>
                          <span style={{ fontSize: '14.5px', color: '#1e293b', lineHeight: 1.5, marginTop: '3px', fontWeight: 500 }}>
                            {pt.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>

    {/* Elegant Section Transition Divider */}
    <div style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: '#ffffff'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1360px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, #cbd5e1 20%, #94a3b8 50%, #cbd5e1 80%, transparent 100%)'
      }} />
    </div>

    <section className="trust-stats-section" style={{
      position: 'relative',
      paddingTop: 'clamp(64px, 7vh, 88px)',
      paddingBottom: '0px',
      background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 60%, #ffffff 100%)',
      borderTop: '1px solid #e2e8f0'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="trust-stats-header"
      >
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '999px',
            background: '#eff6ff',
            color: '#1d68f6',
            border: '1px solid #dbeafe',
            fontSize: '11.5px',
            fontWeight: 750,
            letterSpacing: '0.08em',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1d68f6', boxShadow: '0 0 6px #1d68f6' }} />
            PROVEN AT SCALE
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1.1, marginTop: 0, marginBottom: '20px', color: '#0F1B2D', fontWeight: 700 }}>
            <PremiumHeading text="The Standard for Enterprises That Expect More" highlightWord="Enterprises" highlightClassName="highlight-underline" highlightStyle={{ color: '#0052cc' }} />
          </h2>
          <p style={{ fontSize: '20px', color: '#334155', lineHeight: 1.6, margin: 0, fontWeight: 450 }}>
            Delivering frictionless sourcing, automated billing, and seamless procurement for over 500+ global enterprises.
          </p>
        </div>
        <div className="trust-animation-container">
          <img src="/animation.webp" alt="ProcureSphere Animation" />
        </div>
      </motion.div>
        <TrustCardsSequence />
      </section>
    </>
  );
};

const OverlayMenu = ({ isOpen, onClose, onOpenLogin }: { isOpen: boolean, onClose: () => void, onOpenLogin?: () => void }) => {
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
    return () => { document.body.style.overflow = ''; };
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
    { label: 'FAQ', href: '/faq' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    onClose();
    if (label === 'HOME' || href === '/') {
      if (window.location.pathname === '/') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        const heroVid = document.querySelector('.hero-video') as HTMLVideoElement | null;
        if (heroVid) {
          heroVid.currentTime = 0;
          heroVid.play().catch(() => {});
        }
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
        {onOpenLogin && (
          <div className="overlay-menu-login-wrap">
            <button
              type="button"
              className="overlay-menu-login-btn"
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
            >
              <Icon name="shield" size={18} />
              <span>Login to Portal</span>
              <Icon name="arrow-down-right" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const TrustCardsSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [toggledCards, setToggledCards] = useState<Record<number, boolean>>({});
  const [targetStep, setTargetStep] = useState(0);
  const [displayedStep, setDisplayedStep] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const stickyDistance = rect.height - viewportHeight;
            if (stickyDistance > 0) {
              let p = -rect.top / stickyDistance;
              p = Math.max(0, Math.min(1, p));

              // Map scroll progress to 0..5 cards
              const nextTarget = p >= 0.70 ? 5 : p >= 0.54 ? 4 : p >= 0.38 ? 3 : p >= 0.22 ? 2 : p >= 0.08 ? 1 : 0;
              setTargetStep(nextTarget);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Smooth step-chaser: opens cards 1-by-1 sequentially on scroll down,
  // and closes cards 1-by-1 sequentially in reverse order on scroll up.
  useEffect(() => {
    if (displayedStep === targetStep) return;
    const timer = setTimeout(() => {
      setDisplayedStep(prev => {
        if (prev < targetStep) return prev + 1;
        if (prev > targetStep) return prev - 1;
        return prev;
      });
    }, 110);
    return () => clearTimeout(timer);
  }, [displayedStep, targetStep]);

  const cardsData = [
    { icon: 'badge-solid' as IconName, stat: '500+', label: 'Verified Enterprises', desc: 'Across global supply chains', color: '#3b82f6' },
    { icon: 'chart-solid' as IconName, stat: '$2.5B+', label: 'Spend Managed', desc: 'Annually across all modules', color: '#10b981' },
    { icon: 'receipt-solid' as IconName, stat: '10M+', label: 'Monthly Transactions', desc: 'Instant POs & invoices', color: '#f59e0b' },
    { icon: 'savings-solid' as IconName, stat: '₹120Cr+', label: 'Savings Generated', desc: 'Through automated negotiations', color: '#8b5cf6' },
    { icon: 'users-solid' as IconName, stat: '800+', label: 'Procurement Leaders', desc: 'Active daily users', color: '#ec4899' },
  ];

  return (
    <div ref={containerRef} className="trust-sequence-container" style={{ height: '240vh', position: 'relative', width: '100%' }}>
      <div className="trust-sequence-sticky" style={{
        position: 'sticky',
        top: '0px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        paddingTop: '60px',
        paddingBottom: '80px',
        background: '#ffffff',
        zIndex: 5,
        boxSizing: 'border-box'
      }}>

        {/* CARDS GRID */}
        <div className="trust-cards-grid" style={{ width: '100%', margin: '0 auto 80px auto', maxWidth: '1300px', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {cardsData.map((card, i) => {
            // Force open if hovered, OR if reached in displayedStep
            const isAutoOpen = hoveredCard === i || i < displayedStep;
            const isOpen = toggledCards[i] !== undefined ? toggledCards[i] : isAutoOpen;

            return (
              <div
                key={i}
                className={`u-card ${isOpen ? 'force-open' : ''}`}
                onClick={() => setToggledCards(prev => ({ ...prev, [i]: !isOpen }))}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                style={{
                  border: `1px solid ${card.color}50`
                }}
              >
                <button 
                  className="mail" 
                  aria-label={isOpen ? "Close card details" : "Open card details"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setToggledCards(prev => ({ ...prev, [i]: !isOpen }));
                  }}
                >
                  <Icon name="arrow-down-right" size={24} />
                </button>
                <div className="profile-pic" style={{ background: `${card.color}15`, color: card.color }}>
                  <Icon name={card.icon} size={30} />
                </div>

                {/* Base Title (Visible before hover) */}
                <div className="u-card-base-title">
                  <span className="u-card-base-label">{card.label}</span>
                  <span className="u-card-tap-cue">Tap for stats ↗</span>
                </div>

                <div className="bottom">
                  <div className="content">
                    <span className="name">{card.stat}</span>
                    <span className="label">{card.label}</span>
                    <span className="about-me">{card.desc}</span>
                    <span className="u-card-close-cue">Tap to close ✕</span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* TRUSTED BRANDS INCLUDED IN STICKY */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="trusted-brands"
          style={{ marginTop: '0', position: 'relative', paddingTop: '10px', paddingBottom: '20px' }}
        >
          {/* Handshake Background Image: positioned strictly behind brand pills without overlapping cards */}
          <div style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            opacity: 0.20,
            width: '280px',
            height: '280px',
            backgroundImage: 'url(/handshake.gif)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            pointerEvents: 'none'
          }}></div>

          <div className="trusted-label" style={{ justifyContent: 'flex-start', position: 'relative', zIndex: 2 }}>
            <span className="green-dot"></span> TRUSTED BY GLOBAL ENTERPRISES & PROCUREMENT TEAMS
          </div>

          <div className="brand-pills-wrapper" style={{ position: 'relative', zIndex: 2 }}>
            <div className="brand-pills-track">
              {/* Original Set */}
              <div className="brand-pills">
                <div className="brand-pill"><div className="brand-logo bg-blue"><Icon name="activity" size={20} /></div><div><strong>Apex Global</strong><span>Manufacturing</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-green"><Icon name="layers" size={20} /></div><div><strong>Nova Systems</strong><span>Technology</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-amber"><Icon name="grid" size={20} /></div><div><strong>Meridian</strong><span>Logistics</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-navy"><Icon name="shield" size={20} /></div><div><strong>Vanguard</strong><span>Financial</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-blue"><Icon name="file" size={20} /></div><div><strong>Horizon</strong><span>Healthcare</span></div></div>
              </div>

              {/* Duplicated Set for Infinite Loop */}
              <div className="brand-pills" aria-hidden="true">
                <div className="brand-pill"><div className="brand-logo bg-blue"><Icon name="activity" size={20} /></div><div><strong>Apex Global</strong><span>Manufacturing</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-green"><Icon name="layers" size={20} /></div><div><strong>Nova Systems</strong><span>Technology</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-amber"><Icon name="grid" size={20} /></div><div><strong>Meridian</strong><span>Logistics</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-navy"><Icon name="shield" size={20} /></div><div><strong>Vanguard</strong><span>Financial</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-blue"><Icon name="file" size={20} /></div><div><strong>Horizon</strong><span>Healthcare</span></div></div>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

const comparisonRows = [
  {
    dimension: 'Spend Authorization',
    legacy: 'Manual spreadsheet tracking; overspend discovered weeks after commitment',
    procuresphere: 'Pre-approval budget reservation distinguishing available, reserved, and actual spend to prevent silent overspend',
    advantage: 'Zero Silent Overspend'
  },
  {
    dimension: 'Supplier Sourcing',
    legacy: 'Uncontrolled email quote exchanges with fragmented pricing records',
    procuresphere: 'Restricted vendor portal with sealed bid submissions and weighted technical and commercial scoring',
    advantage: 'Sealed Bidding & Objective Scoring'
  },
  {
    dimension: 'Invoice Processing',
    legacy: 'Manual 3-way matching on paper, prone to quantity and pricing discrepancies',
    procuresphere: 'Automated 3-way matching comparing PO, receipt, and invoice with configurable tolerance rules',
    advantage: 'Automated Tolerance Matching'
  },
  {
    dimension: 'Audit & Compliance',
    legacy: 'Painful retrospective audit sampling taking days of document gathering',
    procuresphere: 'Immutable audit logging capturing actor, state changes, and timestamps with instant audit export',
    advantage: 'Comprehensive Audit Readiness'
  },
  {
    dimension: 'Contract Expirations',
    legacy: 'Forgotten contracts autorenewing at unfavorable rates without review',
    procuresphere: 'Proactive contract renewal alerts, milestone tracking, and vendor obligation governance',
    advantage: 'Proactive Renewal Governance'
  }
];

const BenefitsComparison = () => {
  return (
    <section className="benefits-comparison-section" style={{
      width: '100%',
      background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
      padding: 'clamp(70px, 8vh, 100px) 20px clamp(70px, 8vh, 100px)',
      borderTop: '1px solid #e2e8f0',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 16px',
            borderRadius: '999px',
            background: '#eff6ff',
            color: '#1d68f6',
            border: '1px solid #dbeafe',
            fontSize: '11.5px',
            fontWeight: 750,
            letterSpacing: '0.08em',
            marginBottom: '14px',
            textTransform: 'uppercase'
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1d68f6', boxShadow: '0 0 6px #1d68f6' }} />
            PROVEN ARCHITECTURAL DIFFERENCE
          </div>

          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(30px, 3.8vw, 44px)',
            color: '#0F1B2D',
            fontWeight: 700,
            margin: '0 0 14px 0',
            lineHeight: 1.2
          }}>
            Legacy Procurement vs. ProcureSphere 360
          </h2>
          <p style={{
            color: '#334155',
            fontSize: '18px',
            maxWidth: '780px',
            margin: '0 auto',
            lineHeight: 1.6,
            fontWeight: 500
          }}>
            Why disconnected ERP modules and spreadsheet trackers fail modern global enterprises.
          </p>
        </div>

        <div
          className="benefits-table-wrapper"
          style={{
            background: '#ffffff',
            border: '2px solid #cbd5e1',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 48px rgba(15, 27, 45, 0.12), 0 6px 16px rgba(15, 27, 45, 0.06)',
          }}
        >
          <div className="benefits-table-card">
            {/* Table Header */}
            <div
              className="benefits-table-head"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1.6fr 1.8fr 1.2fr',
                gap: '18px',
                padding: '22px 32px',
                background: '#0F1B2D',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '14.5px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              <div>Process Domain</div>
              <div>Traditional / Legacy Mode</div>
              <div style={{ color: '#60a5fa' }}>ProcureSphere 360 Approach</div>
              <div>Strategic Outcome</div>
            </div>

            {/* Table Rows */}
            {comparisonRows.map((row, idx) => (
              <div
                key={row.dimension}
                className="benefits-table-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1.6fr 1.8fr 1.2fr',
                  gap: '18px',
                  padding: '24px 32px',
                  borderBottom: idx === comparisonRows.length - 1 ? 'none' : '1.5px solid #e2e8f0',
                  background: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                  alignItems: 'start',
                }}
              >
                <div style={{ fontWeight: 800, color: '#0F1B2D', fontSize: '17px', lineHeight: 1.55 }}>
                  {row.dimension}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  color: '#475569',
                  fontSize: '15.5px',
                  lineHeight: 1.55,
                  fontWeight: 500
                }}>
                  <span style={{ color: '#dc2626', fontWeight: 800, fontSize: '17px', lineHeight: 1.55, flexShrink: 0, width: '16px', textAlign: 'center' }}>✕</span>
                  <span style={{ flex: 1 }}>{row.legacy}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  color: '#0F1B2D',
                  fontSize: '15.5px',
                  fontWeight: 650,
                  lineHeight: 1.55
                }}>
                  <span style={{ color: '#16a34a', fontWeight: 800, fontSize: '17px', lineHeight: 1.55, flexShrink: 0, width: '16px', textAlign: 'center' }}>✓</span>
                  <span style={{ flex: 1 }}>{row.procuresphere}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    style={{
                      background: '#eff6ff',
                      color: '#1d4ed8',
                      border: '1px solid #bfdbfe',
                      fontWeight: 750,
                      fontSize: '13.5px',
                      padding: '7px 14px',
                      borderRadius: '999px',
                      display: 'inline-block',
                      fontFamily: '"DM Mono", monospace',
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {row.advantage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function App() {
  const location = useLocation();

  // Intro video should ONLY play on actual browser refresh (F5/reload) or initial entry.
  // In-app SPA navigation (clicking Home link, logo, navigating back from another page) must NEVER trigger the intro video.
  const isInternalNavigation = typeof window !== 'undefined' && Boolean((window as any).__ps360_intro_completed);
  const skipIntro = isInternalNavigation || Boolean(location.state && (location.state as any).skipIntro);
  const [introFinished, setIntroFinished] = useState(skipIntro);
  const [sequenceFinished, setSequenceFinished] = useState(skipIntro);
  const [scrolled, setScrolled] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState<RoleKey>('REQUESTER');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formIsActive, setFormIsActive] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const roleScrollRef = useRef<HTMLDivElement>(null);
  const [roleScrollProgress, setRoleScrollProgress] = useState(0);
  const handleRoleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollWidth - target.clientWidth;
    if (maxScroll > 0) {
      setRoleScrollProgress(target.scrollLeft / maxScroll);
    }
  };

  // Ensure every refresh starts cleanly at Hero section with scroll position at top
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__ps360_intro_completed = true;
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);

      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  const handleIntroComplete = () => {
    if (typeof window !== 'undefined') {
      (window as any).__ps360_intro_completed = true;
    }
    setIntroFinished(true);
    setSequenceFinished(true);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (introFinished && heroVideoRef.current) {
      heroVideoRef.current.currentTime = 0;
      heroVideoRef.current.play().catch(() => {});
      setSequenceFinished(true);
      window.scrollTo(0, 0);
    }
  }, [introFinished])

  useEffect(() => {
    if (!sequenceFinished) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }
    return () => { document.body.style.overflow = ''; };
  }, [sequenceFinished]);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (currentScrollY / max) * 100 : 0);
      setScrolled(currentScrollY > 24);

      if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        setNavbarHidden(true);
      } else {
        setNavbarHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const roleTitle = role === 'REQUESTER' ? 'My Requests' : role === 'PROCUREMENT' ? 'Procurement overview' : role === 'FINANCE' ? 'Financial control' : role === 'LEGAL' ? 'Contract obligations' : role === 'STORES' ? 'Receiving workspace' : role === 'VENDOR' ? 'Vendor workspace' : 'Compliance overview';

  return <>
    {!introFinished && <IntroScreen onComplete={handleIntroComplete} />}
    <div className={`site-shell ${introFinished ? 'intro-finished' : ''} ${!sequenceFinished ? 'sequence-running' : ''}`} id="top">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <Navbar
        scrolled={scrolled}
        navbarHidden={navbarHidden}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onOpenLogin={() => setLoginOpen(true)}
      />

      <OverlayMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} onOpenLogin={() => setLoginOpen(true)} />

      <main className="site-main relative">
        {/* Slide 1 & Slide 2 Presentation Deck */}
        <div className="slides-deck">
          {/* Slide 1: Hero */}
          <section
            className="hero section-pad slide-hero"
            aria-labelledby="hero-heading"
          >
            <div className="hero-copy">
              <h1 id="hero-heading" className="hero-title"><span style={{ color: 'inherit', whiteSpace: 'nowrap' }}>The Intelligent</span><br />Enterprise<br />Procurement<br /><span>Platform</span></h1>
              <p className="hero-lede">Connect requests, approvals, suppliers, sourcing, purchase orders, invoices, contracts and financial control in one intelligent procurement platform.</p>
              <div className="hero-actions">
                <Button href="#modules" icon="arrow-down-right">Discover more</Button>
              </div>

              <div className="hero-proof">
                <div>
                  <span className="proof-mark"><Icon name="activity" size={16} /></span>
                  <span><strong>One connected system</strong><small>for every procurement decision</small></span>
                </div>
                <div className="proof-rule" />
                <small className="proof-caption">SCROLL TO ENTER THE SYSTEM <Icon name="arrow" size={14} /></small>
              </div>
            </div>
            <div className="hero-visual">
              <video
                ref={heroVideoRef}
                muted
                loop
                playsInline
                className="hero-video"
                style={{
                  width: '100%',
                  maxWidth: '920px',
                  height: 'auto',
                  objectFit: 'contain',
                  maskImage: 'linear-gradient(to bottom, #000 82%, rgba(0,0,0,0.2) 87%, transparent 91%), linear-gradient(135deg, #000 78%, rgba(0,0,0,0.2) 84%, transparent 88%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, #000 82%, rgba(0,0,0,0.2) 87%, transparent 91%), linear-gradient(135deg, #000 78%, rgba(0,0,0,0.2) 84%, transparent 88%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'destination-in',
                  mixBlendMode: 'multiply'
                }}
              >
                <source src="/hero-video-matched.mp4" type="video/mp4" />
              </video>

              <div className="hero-stat" style={{ pointerEvents: 'auto' }}>
                <strong className="animated-text">
                  {"13,000+".split('').map((char, i) => (
                    <span key={`num-${i}`} style={{ animationDelay: `${2.8 + i * 0.15}s` }}>
                      {char}
                    </span>
                  ))}
                </strong>
                <span style={{ opacity: 0, animation: 'slideUpFade 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards', animationDelay: '3.6s' }}>ENTERPRISES USE OUR PROCUREMENT PLATFORM</span>
              </div>
            </div>
          </section>

          {/* Slide 2: Capability Layer + The Cost of Disconnection (Solution) */}
          <div className="solution-slide" id="solution">
            <CinematicStats />



            <AnimatedModulesStack />
          </div>
        </div>

        {/* Section 4: Benefits - Animated Dark Section */}
        <AnimatedBenefits />

        {/* Benefits Comparison - Proven Architectural Difference */}
        <BenefitsComparison />

        {/* Section 6: Roles - Normal Scroll */}
        <section className={`roles section-pad role-${role.toLowerCase()}`} id="roles">
          <div className="roles-top" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '48px' }}>
            <SectionTitle eyebrow="WHO IS IT FOR" title="One platform. Every team." copy="One connected system adapts to the decisions each team owns." align="center" />
            <div className="role-avatar-wrapper" style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '100%' }}>
                <div
                  ref={roleScrollRef}
                  onScroll={handleRoleScroll}
                  className="role-avatar-selector"
                  role="tablist"
                  style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', justifyContent: 'center', maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}
                >
                  {Object.keys(roles).map((item) => {
                    const isActive = role === item;
                    const roleLower = item.toLowerCase();
                    const imgSrc = `/roles/${roleLower}/${isActive ? 'active.webp' : 'idle.webp'}`;
                    
                    return (
                      <button 
                        key={item} 
                        onClick={() => setRole(item as RoleKey)} 
                        role="tab" 
                        aria-selected={isActive}
                        aria-label={`Open ${item} dashboard`}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '12px',
                          opacity: isActive ? 1 : 0.7,
                          transition: 'opacity 0.3s ease',
                          minWidth: '140px',
                          padding: '8px'
                        }}
                      >
                        <motion.div
                          initial={false}
                          animate={{
                            scale: isActive ? 1 : 0.96,
                            y: isActive ? 0 : 4,
                            filter: isActive ? 'drop-shadow(0 8px 16px rgba(36, 86, 214, 0.25))' : 'drop-shadow(0 0px 0px rgba(0,0,0,0))'
                          }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            width: '140px',
                            height: '140px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: isActive ? '#f0f4ff' : 'transparent',
                            marginBottom: '8px'
                          }}
                        >
                          <img 
                            src={imgSrc} 
                            alt=""
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain'
                            }}
                          />
                        </motion.div>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? '#0f1b2d' : '#64748b',
                          textTransform: 'capitalize'
                        }}>
                          {roleLower}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Sleek Mobile Scrollbar Track Underneath */}
                <div className="role-scroll-track">
                  <div
                    className="role-scroll-thumb"
                    style={{
                      transform: `translateX(${roleScrollProgress * 38}px)`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div 
              key={role}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`role-interface role-${role.toLowerCase()}`}
            >
            <div className="role-sidebar">
              <Logo compact />
              <span className="sidebar-label">WORKSPACE</span>
              {roles[role].map((item, index) => <div className={`sidebar-item ${index === 0 ? 'selected' : ''}`} key={item}><Icon name={index === 0 ? 'grid' : index === 1 ? 'file' : 'activity'} size={18} />{item}</div>)}
              <span className="sidebar-label bottom">ACCOUNT</span>
              <div className="sidebar-item"><Icon name="shield" size={18} />Controls</div>
            </div>
            <div className="role-main">
              <div className="role-toolbar">
                <div><small>{role} WORKSPACE</small><strong>{roleTitle}</strong></div>
                <span className="toolbar-avatar">{role.charAt(0)}</span>
              </div>
              <div className="role-insights">
                <div className="role-stat"><small>OPEN ITEMS</small><strong>{role === 'FINANCE' ? '18' : role === 'LEGAL' ? '07' : '24'}</strong><span>Illustrative view</span></div>
                <div className="role-stat"><small>ON TRACK</small><strong>84<em>%</em></strong><span>Illustrative view</span></div>
                <div className="role-stat"><small>NEXT ACTION</small><strong>06</strong><span>needs your review</span></div>
              </div>
              <div className="role-table">
                <div className="table-head"><span>WORK ITEM</span><span>OWNER</span><span>STATUS</span><span>VALUE</span></div>
                {['Operations services', 'Marketing production', 'Cloud infrastructure', 'Lab equipment'].map((item, index) => <div className="table-row" key={item}><span><i className="table-file" />{item}</span><span>{['Procurement', 'Finance', 'IT Ops', 'Stores'][index]}</span><span><b className={`table-status ${index === 2 ? 'amber' : index === 3 ? 'green' : ''}`} />{index === 0 ? 'In review' : index === 1 ? 'Approved' : index === 2 ? 'Attention' : 'Received'}</span><span>${['28,400', '8,240', '64,100', '12,890'][index]}</span></div>)}
              </div>
              <div className="app-bottom-note"><Icon name="activity" size={15} /> This is illustrative demo content — not live company performance.</div>
            </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Section 7: Editorial Testimonials */}
        <section className="testimonials section-pad" id="testimonials" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
          <SectionTitle eyebrow="ILLUSTRATIVE PERSPECTIVES" title="Perspectives from every side of procurement." copy="One connected experience for procurement teams, finance stakeholders and suppliers." align="center" />
          <EditorialTestimonials />
        </section>


        {/* Section 8: FAQ - Normal Scroll */}
        <section className="faq section-pad" id="faq" style={{ background: "var(--soft)", paddingTop: '60px', paddingBottom: "100px" }}>
          <SectionTitle eyebrow="FAQ" title="Clarity before the first conversation." copy="A few practical answers for teams evaluating a connected procurement operating system." align="center" />
          <AnimatedFAQ />
        </section>

        {/* Section 9: Contact - Normal Scroll */}
        <section className="contact section-pad" id="contact">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="contact-copy"
          >
            <div className="section-title align-left">
              <Eyebrow centered={false}>CONTACT / RFP</Eyebrow>
              <h2 style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600 }}>
                <PremiumHeading text="Bring us the workflow you want to connect." />
              </h2>
            </div>
            
            <div style={{ marginTop: '-40px', maxWidth: '300px', display: 'flex', justifyContent: 'center' }}>
              <img 
                src={`/roles/vendor/${submitted ? 'active.webp' : 'idle.webp'}`}
                alt="Vendor Status"
                style={{
                  width: '100%',
                  height: 'auto',
                  transition: 'opacity 0.4s ease, transform 0.4s ease, filter 0.4s ease',
                  transform: submitted ? 'scale(1.02)' : 'scale(1)',
                  filter: submitted ? 'drop-shadow(0 12px 24px rgba(36, 86, 214, 0.2))' : 'drop-shadow(0 4px 12px rgba(15, 27, 45, 0.05))',
                  borderRadius: '16px',
                  clipPath: 'inset(0 0 20% 0)',
                  marginBottom: '-20%'
                }}
              />
            </div>
          </motion.div>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="contact-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rfp-form" 
                onSubmit={handleSubmit}
              >
                <div className="form-grid">
                  <label><span>Name</span><input required name="name" placeholder="Your name" /></label>
                  <label><span>Email</span><input required type="email" name="email" placeholder="yourname@gmail.com" /></label>
                  <label><span>Company</span><input required name="company" placeholder="Company name" /></label>
                  <label><span>Procurement scope</span><select required name="scope" defaultValue=""><option value="" disabled>Select a scope</option><option>Source-to-pay</option><option>Supplier management</option><option>Invoice and financial control</option><option>Contract lifecycle</option><option>Vendor participation</option></select></label>
                </div>
                <label><span>Message</span><textarea required name="message" rows={5} placeholder="Tell us what you want to connect..." /></label>
                <div className="form-actions">
                  <button className="button button-primary" type="submit">Request a Demo <Icon name="arrow" size={16} /></button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="rfp-form"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  minHeight: '440px',
                  padding: '48px 32px'
                }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.1 }}
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 32px rgba(16, 185, 129, 0.35), 0 0 0 10px rgba(16, 185, 129, 0.12)',
                    marginBottom: '20px'
                  }}
                >
                  <svg 
                    width="38" 
                    height="38" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#ffffff" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>

                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#059669',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '14px'
                }}>
                  <i style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                  Request Received
                </span>

                <h3 style={{
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  fontSize: 'clamp(26px, 3.2vw, 36px)',
                  fontWeight: 600,
                  color: '#0f172a',
                  margin: '0 0 12px 0'
                }}>
                  Successfully Submitted!
                </h3>

                <p style={{
                  fontSize: '16px',
                  color: '#64748b',
                  maxWidth: '460px',
                  lineHeight: 1.65,
                  margin: '0 0 32px 0'
                }}>
                  Thank you! Your RFP brief and workflow details have been successfully received.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="button button-primary"
                  style={{
                    padding: '14px 28px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 24px rgba(36, 86, 214, 0.25)'
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  Resubmit / Back to Form
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Site Footer - Normal Scroll */}
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
              objectPosition: 'bottom' // Aligns the video to show from the bottom
            }}
          >
            <source src="/footer-video.mp4" type="video/mp4" />
          </video>
          <div className="footer-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(10, 18, 32, 0.75) 0%, rgba(10, 18, 32, 0.4) 50%, rgba(10, 18, 32, 0.75) 100%)', zIndex: 1, pointerEvents: 'none' }}></div>
          
          {/* Absolutely positioned content over the video */}
          <div className="footer-content" style={{ 
            position: 'absolute', 
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 2, 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '72px max(24px, calc((100vw - 1240px) / 2)) 25px'
          }}>
            {/* Desktop Original Footer (100% Untouched on Desktop) */}
            <div className="desktop-footer" style={{ width: '100%' }}>
              <div className="footer-top">
                <div className="footer-brand"><Logo /><p>One connected system for every procurement decision.</p></div>
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
                  <a href="#testimonials">Testimonials</a>
                  <a href="/faq">FAQ</a>
                  <a href="#contact">Contact</a>
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
                  <Logo />
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
                  <a href="#testimonials">› Testimonials</a>
                  <a href="/faq">› FAQ</a>
                  <a href="#contact">› Contact Us</a>
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
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
        onLoginSuccess={(user) => {
          setLoginOpen(false);
          const rolesElem = document.getElementById('roles');
          if (rolesElem) {
            rolesElem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
      <LegalModal
        isOpen={legalModal !== null}
        initialTab={legalModal || 'privacy'}
        onClose={() => setLegalModal(null)}
      />
    </div>
  </>
}
import { AboutPage } from './pages/AboutPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { BenefitsPage } from './pages/BenefitsPage';
import { RolesPage } from './pages/RolesPage';
import { ProcessPage } from './pages/ProcessPage';
import { FAQPage } from './pages/FAQPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash]);

  return null;
}

export function HomePage() {
  return <App />;
}

export function RootApp() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/benefits" element={<BenefitsPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RootApp;





