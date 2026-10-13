import { CSSProperties, FormEvent, ReactNode, useEffect, useState, useRef } from 'react'
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
  return <a className={`brand ${compact ? 'brand-compact' : ''}`} href="#top" aria-label="ProcureSphere 360 home">
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
  return <div className={`section-title align-${align}`}><Eyebrow centered={align === 'center'}>{eyebrow}</Eyebrow><h2 style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600 }}><PremiumHeading text={title} /></h2>{copy && <p>{copy}</p>}</div>
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

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.onended = () => {
        setShouldSlide(true);
        setTimeout(onComplete, 800);
      };

      const onPlayFailed = () => {
        setTimeout(() => {
          setShouldSlide(true);
          setTimeout(onComplete, 800);
        }, 1000);
      };

      const timeout = setTimeout(() => {
        if (!shouldSlide && video.currentTime === 0) {
          setShouldSlide(true);
          setTimeout(onComplete, 800);
        }
      }, 5000);

      video.addEventListener('error', onPlayFailed);

      return () => {
        clearTimeout(timeout);
        video.removeEventListener('error', onPlayFailed);
      };
    }
  }, [onComplete, shouldSlide]);

  return (
    <div className={`intro-screen ${shouldSlide ? 'slide-up' : ''}`}>
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        autoPlay
        muted
        playsInline
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
            onClick={() => {
              setMobileOpen(false);
              setActiveHash(href);
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

const CinematicStats = () => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);



  // LERP state for buttery smooth scrolling even with mouse wheels
  const targetP = useRef({ eP: 0, sP: 0 });
  const currentP = useRef({ eP: 0, sP: 0 });

  useEffect(() => {
    // 1. Scroll listener only updates target values (no React state updates)
    const handleScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const eP = Math.max(0, Math.min(1, (viewportHeight - rect.top) / viewportHeight));

        let sP = 0;
        const stickyDistance = rect.height - viewportHeight;
        if (stickyDistance > 0) {
          sP = Math.max(0, Math.min(1, -rect.top / stickyDistance));
        }

        targetP.current = { eP, sP };
      }
    };

    // 2. Continuous render loop to apply LERP and mutate DOM
    let animationFrameId: number;
    const renderLoop = () => {
      // ULTRA SMOOTH PHYSICS (90+ FPS feel)
      // Lower factor = heavier, more fluid cinematic camera.
      // 0.03 absorbs absolutely all mouse wheel jumps.
      const smoothFactor = 0.35;
      currentP.current.eP += (targetP.current.eP - currentP.current.eP) * smoothFactor;
      currentP.current.sP += (targetP.current.sP - currentP.current.sP) * smoothFactor;

      const { sP } = currentP.current;
      const animationP = sP;

      // Phase 1: Grow and Center (0 to 0.16)
      const growP = Math.max(0, Math.min(1, animationP / 0.16));

      // Phase 3: Show Stats & Cards (activates cleanly when image is docked on the left)
      const isStatsActive = animationP >= 0.40;

      // Phase 2: Move Left (0.16 to 0.40)
      // ZERO OVERLAP GUARANTEE: On reverse scroll up, image is LOCKED 100% on the left (moveLeftP = 1)
      // as long as cards/text are visible (isStatsActive).
      // The image can ONLY begin gliding to the center AFTER cards are 100% gone!
      const moveLeftP = isStatsActive ? 1 : Math.max(0, Math.min(1, (animationP - 0.16) / 0.24));

      // Image grows from 0.5 to 1.0 during Phase 1
      const scale = (0.5 + (0.5 * growP)).toFixed(3);

      // Image starts at 55vh (giving more gap from the text) and moves up to 0vh during Phase 1
      const imgTranslateY = 55 * (1 - growP);

      // Moves left ONLY during Phase 2
      const translateX = `calc((50vw - 50vh) * ${1 - moveLeftP})`;

      // Text immediately starts moving UP and out of the screen (-60vh) during Phase 1
      const textOpacity = (1 - growP).toFixed(3);
      const textTranslateY = -60 * growP; // vh unit

      if (textWrapperRef.current) {
        textWrapperRef.current.style.opacity = textOpacity.toString();
        textWrapperRef.current.style.transform = `translateY(${textTranslateY}vh)`;
      }

      // DOM MUTATION 1: Image Wrapper
      if (imageWrapperRef.current) {
        imageWrapperRef.current.style.transform = `translate3d(${translateX}, ${imgTranslateY}vh, 0) scale(${scale})`;
        imageWrapperRef.current.style.boxShadow = moveLeftP > 0.5 ? '0 30px 60px rgba(0,0,0,0.15)' : 'none';
      }

      // DOM MUTATION 2: Stats Cards and Text (Solid 100% full opacity, instant on/off - no fractional blur or fading)
      if (rightContainerRef.current) {
        if (isStatsActive) {
          rightContainerRef.current.style.opacity = '1';
          rightContainerRef.current.style.visibility = 'visible';
          rightContainerRef.current.style.pointerEvents = 'auto';
        } else {
          rightContainerRef.current.style.opacity = '0';
          rightContainerRef.current.style.visibility = 'hidden';
          rightContainerRef.current.style.pointerEvents = 'none';
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init target
    currentP.current = { ...targetP.current }; // snap immediately on load
    renderLoop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="cinematic-wrapper" style={{ position: 'relative', background: 'var(--bg-base, #fefeff)' }}>

        {/* STICKY SECTION - 360vh scroll space with generous hold time */}
        <div ref={stickyRef} style={{ height: '360vh', position: 'relative' }}>
          <div className="cinematic-sticky" style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', background: '#ffffff' }}>

            {/* TEXT LAYER (Now inside sticky container) */}
            <div ref={textWrapperRef} style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              paddingTop: '15vh',
              zIndex: 2,
              pointerEvents: 'none',
              willChange: 'transform, opacity'
            }}>
              <div style={{ width: '90vw', margin: '0 auto', paddingBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>

                  <SobhaHeading
                    text="A NEW ERA OF ENTERPRISE PROCUREMENT"
                    delayOffset={0}
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: 'var(--blue, #2456D6)',
                      marginBottom: '24px',
                    }}
                  />

                  <h2 style={{
                    fontFamily: '"Playfair Display", "Georgia", serif',
                    fontSize: 'clamp(36px, 5vw, 72px)',
                    fontWeight: 600,
                    lineHeight: 1.1,
                    color: '#0F1B2D',
                    margin: '0 0 24px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    <SobhaHeading text="PROCUREMENT," delayOffset={100} />
                    <SobhaHeading
                      text="REIMAGINED."
                      delayOffset={200}
                      style={{ color: 'var(--blue, #2456D6)' }}
                    />
                  </h2>

                </div>
              </div>
            </div>

            {/* Image Layer (GPU Accelerated No-Crop Morph) */}
            <div ref={imageWrapperRef} style={{
              position: 'absolute',
              left: '0',
              top: '0vh',
              width: '100vh',
              height: '100vh',
              transformOrigin: 'center top',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              overflow: 'hidden',
              zIndex: 1,
              boxShadow: 'none',
            }}>
              <img
                src="/logistics_hero_9.jpg"
                alt="ProcureSphere Logistics"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  imageRendering: '-webkit-optimize-contrast'
                }}
              />

              {/* Top Area: Premium 3-line Luxury Text */}
              <div style={{
                position: 'absolute',
                top: '26%', /* Adjusted top gap based on feedback */
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 'clamp(20px, 3vh, 32px)', /* Noticeably larger for a luxury statement */
                  fontWeight: 600,
                  fontFamily: '"Playfair Display", "Georgia", serif', /* Premium editorial serif */
                  color: '#0a1629', /* Deep navy */
                  lineHeight: 1.4,
                  textShadow: '0 2px 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.7)' /* Strong white glow for legibility */
                }}>
                  Elevating enterprise procurement <br />
                  from a tactical function <br />
                  to a strategic advantage.
                </div>
              </div>

              {/* Bottom Description */}
              <div style={{
                position: 'absolute',
                bottom: '18%', /* Safely inside the bottom edge of the baked-in poster frame */
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40%', /* Fits perfectly inside the frame */
                textAlign: 'center',
                color: '#0a1629', /* Deep premium navy */
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontSize: 'clamp(11px, 1.45vh, 16px)',
                lineHeight: 1.7,
                fontWeight: 600,
                letterSpacing: '0.01em',
                textShadow: '0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,255,255,0.8), 0 1px 2px rgba(255,255,255,1)'
              }}>
                Connecting every procurement decision into one seamless workflow. From intelligent sourcing and automated approvals to financial control, we bridge the gap between intent and execution.
              </div>
            </div>

            {/* About Layer (Right Side) */}
            <div ref={rightContainerRef} style={{
              position: 'absolute',
              left: `calc(50vh + 50vh * 1 + 4vw)`,
              top: '50%',
              transform: 'translateY(-50%)',
              width: `calc(100vw - (50vh + 50vh * 1 + 8vw))`,
              maxWidth: '780px',
              zIndex: 3,
              pointerEvents: 'none',
              opacity: 0,
              visibility: 'hidden',
              transition: 'none',
            }}>
              <div className="stat-title-wrap" style={{
                marginBottom: 'clamp(16px, 2.2vh, 24px)'
              }}>
                <div className="eyebrow" style={{ marginBottom: '8px', marginLeft: '4px', fontSize: '15px', letterSpacing: '2px' }}>ABOUT PLATFORM</div>
                <h2 style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0 8px',
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  fontSize: 'clamp(24px, 2.6vw, 35px)',
                  lineHeight: 1.12,
                  marginTop: 0,
                  marginBottom: '12px',
                  color: '#0F1B2D',
                  fontWeight: 600
                }}>
                  Replacing chaos with a controlled{' '}
                  <span className="highlight-underline">
                    source-to-pay
                  </span>{' '}
                  workflow.
                </h2>
                <p style={{ fontSize: 'clamp(14px, 1.15vw, 17px)', color: '#4b5563', lineHeight: 1.55, margin: 0 }}>
                  ProcureSphere 360 eliminates disconnected emails, spreadsheets, and manual approvals, bringing total traceability to every transaction across your enterprise.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div className="stat-card-wrap-1">
                  <div className="uiverse-card card-theme-1">
                    <div className="logo"><Icon name="file" /></div>
                    <div className="title">Purchase & Approvals</div>
                    <div className="box box3"></div>
                    <div className="box box2"></div>
                    <div className="box box1">
                      <div className="content">
                        <span className="box-title">Purchase & Approvals</span>
                        <span className="box-text">Policy-driven requisition routing, budget checks, and multi-tier department approvals.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stat-card-wrap-2">
                  <div className="uiverse-card card-theme-2">
                    <div className="logo"><Icon name="users" /></div>
                    <div className="title">Sourcing & Vendors</div>
                    <div className="box box3"></div>
                    <div className="box box2"></div>
                    <div className="box box1">
                      <div className="content">
                        <span className="box-title">Sourcing & Vendors</span>
                        <span className="box-text">Automated vendor onboarding, secure bid portals, and weighted technical evaluations.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stat-card-wrap-3">
                  <div className="uiverse-card card-theme-3">
                    <div className="logo"><Icon name="finance" /></div>
                    <div className="title">Orders & Invoicing</div>
                    <div className="box box3"></div>
                    <div className="box box2"></div>
                    <div className="box box1">
                      <div className="content">
                        <span className="box-title">Orders & Invoicing</span>
                        <span className="box-text">Seamless PO generation and 3-way matching across receipts and supplier invoices.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stat-card-wrap-4">
                  <div className="uiverse-card card-theme-4">
                    <div className="logo"><Icon name="shield" /></div>
                    <div className="title">Contracts & Compliance</div>
                    <div className="box box3"></div>
                    <div className="box box2"></div>
                    <div className="box box1">
                      <div className="content">
                        <span className="box-title">Contracts & Compliance</span>
                        <span className="box-text">Immutable audit trails, SLA milestones, and contract lifecycle management.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of About Layer */}
          </div>
          {/* End of cinematic-sticky */}
        </div>
        {/* End of 400vh scroll container */}
      </div>
      {/* End of cinematic-wrapper */}

      <section className="trust-stats-section" style={{ paddingTop: '100px', paddingBottom: '0px' }}>
        <div className="trust-stats-header">
          <div>
            <div className="eyebrow" style={{ marginBottom: '16px', marginLeft: '4px' }}>PROVEN AT SCALE</div>
            <h2 style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1.1, marginTop: 0, marginBottom: '20px', color: '#0F1B2D', fontWeight: 700 }}>
              <PremiumHeading text="The Standard for Enterprises That Expect More" highlightWord="Enterprises" highlightClassName="highlight-underline" highlightStyle={{ color: '#0052cc' }} />
            </h2>
            <p style={{ fontSize: '22px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
              Delivering frictionless sourcing, automated billing, and seamless procurement for over 500+ global enterprises.
            </p>
          </div>
          <div className="trust-animation-container">
            <img src="/animation.webp" alt="ProcureSphere Animation" />
          </div>
        </div>
        <TrustCardsSequence />
      </section>
    </>
  );
};

const OverlayMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const contentRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} style={{ height: '240vh', position: 'relative', width: '100%' }}>
      <div style={{
        position: 'sticky',
        top: '0px',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '90px',
        paddingBottom: '70px',
        background: '#ffffff',
        zIndex: 5
      }}>

        {/* CARDS GRID */}
        <div className="trust-cards-grid" style={{ width: '100%', margin: '0 auto 100px auto', maxWidth: '1300px', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {cardsData.map((card, i) => {
            // Force open if hovered, OR if reached in displayedStep
            const isAutoOpen = hoveredCard === i || i < displayedStep;
            const isOpen = toggledCards[i] !== undefined ? toggledCards[i] : isAutoOpen;

            return (
              <div
                key={i}
                className={`u-card ${isOpen ? 'force-open' : ''}`}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  border: `1px solid ${card.color}50`
                }}
              >
                <button className="mail" onClick={(e) => {
                  e.stopPropagation();
                  setToggledCards(prev => ({ ...prev, [i]: !isOpen }));
                }}>
                  <Icon name="arrow-down-right" size={24} />
                </button>
                <div className="profile-pic" style={{ background: `${card.color}15`, color: card.color }}>
                  <Icon name={card.icon} size={30} />
                </div>

                {/* Base Title (Visible before hover) */}
                <div className="u-card-base-title">
                  {card.label}
                </div>

                <div className="bottom">
                  <div className="content">
                    <span className="name">{card.stat}</span>
                    <span className="label">{card.label}</span>
                    <span className="about-me">{card.desc}</span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* TRUSTED BRANDS INCLUDED IN STICKY */}
        <div className="trusted-brands" style={{ marginTop: '0', position: 'relative' }}>
          {/* Handshake Background Image */}
          <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: -1, opacity: 0.3, width: '300px', height: '300px', backgroundImage: 'url(/handshake.gif)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', pointerEvents: 'none' }}></div>

          <div className="trusted-label" style={{ justifyContent: 'flex-start' }}><span className="green-dot"></span> TRUSTED BY GLOBAL ENTERPRISES & PROCUREMENT TEAMS</div>

          <div className="brand-pills-wrapper">
            <div className="brand-pills-track">
              {/* Original Set */}
              <div className="brand-pills">
                <div className="brand-pill"><div className="brand-logo bg-blue"><Icon name="activity" size={16} /></div><div><strong>Apex Global</strong><span>Manufacturing</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-green"><Icon name="layers" size={16} /></div><div><strong>Nova Systems</strong><span>Technology</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-amber"><Icon name="grid" size={16} /></div><div><strong>Meridian</strong><span>Logistics</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-navy"><Icon name="shield" size={16} /></div><div><strong>Vanguard</strong><span>Financial</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-blue"><Icon name="file" size={16} /></div><div><strong>Horizon</strong><span>Healthcare</span></div></div>
              </div>

              {/* Duplicated Set for Infinite Loop */}
              <div className="brand-pills" aria-hidden="true">
                <div className="brand-pill"><div className="brand-logo bg-blue"><Icon name="activity" size={16} /></div><div><strong>Apex Global</strong><span>Manufacturing</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-green"><Icon name="layers" size={16} /></div><div><strong>Nova Systems</strong><span>Technology</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-amber"><Icon name="grid" size={16} /></div><div><strong>Meridian</strong><span>Logistics</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-navy"><Icon name="shield" size={16} /></div><div><strong>Vanguard</strong><span>Financial</span></div></div>
                <div className="brand-pill"><div className="brand-logo bg-blue"><Icon name="file" size={16} /></div><div><strong>Horizon</strong><span>Healthcare</span></div></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

function App() {
  const isIntroSeen = typeof window !== 'undefined' && sessionStorage.getItem('ps360_intro_seen') === 'true';
  const [introFinished, setIntroFinished] = useState(isIntroSeen)
  const [sequenceFinished, setSequenceFinished] = useState(isIntroSeen)
  const [scrolled, setScrolled] = useState(false)
  const [navbarHidden, setNavbarHidden] = useState(false)
  const lastScrollY = useRef(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [role, setRole] = useState<RoleKey>('REQUESTER')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [formIsActive, setFormIsActive] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  const handleIntroComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ps360_intro_seen', 'true');
    }
    setIntroFinished(true);
    setSequenceFinished(true);
  };

  useEffect(() => {
    if (introFinished && heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
      setSequenceFinished(true);
    }
  }, [introFinished])

  useEffect(() => {
    if (!sequenceFinished) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
        }
      }
    }
    return () => { document.body.style.overflow = ''; };
  }, [sequenceFinished]);

  const [heroCovered, setHeroCovered] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? (currentScrollY / max) * 100 : 0)
      setScrolled(currentScrollY > 24)
      setHeroCovered(currentScrollY > window.innerHeight * 1.05)

      if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        setNavbarHidden(true)
      } else {
        setNavbarHidden(false)
      }
      lastScrollY.current = currentScrollY
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const roleTitle = role === 'REQUESTER' ? 'My Requests' : role === 'PROCUREMENT' ? 'Procurement overview' : role === 'FINANCE' ? 'Financial control' : role === 'LEGAL' ? 'Contract obligations' : role === 'STORES' ? 'Receiving workspace' : role === 'VENDOR' ? 'Vendor workspace' : 'Compliance overview'

  return <>
    {!introFinished && <IntroScreen onComplete={handleIntroComplete} />}
    <div className={`site-shell ${introFinished ? 'intro-finished' : ''} ${!sequenceFinished ? 'sequence-running' : ''}`} id="top">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <header
        className={`site-nav ${scrolled ? 'is-scrolled' : ''} ${mobileOpen ? 'menu-open' : ''} ${navbarHidden ? 'nav-hidden' : ''}`}
        style={{ zIndex: 100 }}
      >
        <div className="nav-inner" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', width: '100%' }}>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="sobha-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name="menu" size={24} />
              <span className="sobha-menu-text" style={{ letterSpacing: '1px' }}>{mobileOpen ? 'CLOSE' : 'MENU'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Logo />
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
            <Button href="#contact">Request a Demo</Button>
          </div>
        </div>
      </header>

      <OverlayMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className="site-main relative">
        {/* Slide 1 & Slide 2 Presentation Deck */}
        <div className="slides-deck">
          {/* Slide 1: Hero */}
          <section
            className="hero section-pad slide-hero sticky top-0"
            aria-labelledby="hero-heading"
            style={{
              visibility: heroCovered ? 'hidden' : 'visible',
              pointerEvents: heroCovered ? 'none' : 'auto'
            }}
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

        {/* Section 6: Roles - Normal Scroll */}
        <section className={`roles section-pad role-${role.toLowerCase()}`} id="roles">
          <div className="roles-top" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '48px' }}>
            <SectionTitle eyebrow="WHO IS IT FOR" title="One platform. Every team." copy="One connected system adapts to the decisions each team owns." align="center" />
            <div className="role-avatar-selector" role="tablist" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', justifyContent: 'center', maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}>
              {Object.keys(roles).map((item) => {
                const isActive = role === item;
                const roleLower = item.toLowerCase();
                const imgSrc = `/roles/${roleLower}/${isActive ? 'active.png' : 'idle.png'}`;
                
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
          <div className="contact-copy">
            <div className="section-title align-left">
              <Eyebrow centered={false}>CONTACT / RFP</Eyebrow>
              <h2 style={{ fontFamily: '"Playfair Display", "Georgia", serif', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600 }}>
                <PremiumHeading text="Bring us the workflow you want to connect." />
              </h2>
            </div>
            
            <div style={{ marginTop: '-40px', maxWidth: '300px', display: 'flex', justifyContent: 'center' }}>
              <img 
                src={`/roles/vendor/${submitted ? 'active.png' : 'idle.png'}`}
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
          </div>
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
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(10, 18, 32, 0.75) 0%, rgba(10, 18, 32, 0.4) 50%, rgba(10, 18, 32, 0.75) 100%)', zIndex: 1, pointerEvents: 'none' }}></div>
          
          {/* Absolutely positioned content over the video */}
          <div style={{ 
            position: 'absolute', 
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 2, 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '72px max(24px, calc((100vw - 1240px) / 2)) 25px'
          }}>
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

export function HomePage() {
  return <App />;
}

export function RootApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/benefits" element={<BenefitsPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RootApp;





