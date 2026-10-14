import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useLocation } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { AnimatedModulesStack } from '../components/AnimatedModulesStack';

interface Step {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  features: string[];
  metrics: { label: string; value: string };
  statusTag: string;
}

const s2pSteps: Step[] = [
  {
    id: 'vendors',
    number: '01',
    title: 'Vendor Management & KYC Onboarding',
    category: 'SUPPLIER GOVERNANCE',
    summary: 'Self-service vendor portal with automated tax, banking, and KYC verification. Establishes verified vendor profiles before any purchasing activity.',
    features: [
      'Self-service digital vendor onboarding portal',
      'Automated KYC, tax identification & banking verification',
      'Continuous compliance monitoring & expiry alerts',
      'Vendor performance ratings & delivery scorecards'
    ],
    metrics: { label: 'Onboarding Speed', value: '3x Faster' },
    statusTag: 'VERIFIED & ACTIVE'
  },
  {
    id: 'pr',
    number: '02',
    title: 'Purchase Requisition & Budget Reserve',
    category: 'PLANNING & REQUISITION',
    summary: 'Line items and services captured with instant department budget validation. Distinguishes available vs reserved spend prior to approvals.',
    features: [
      'Multi-line requisition with catalog & custom items',
      'Instant departmental budget check & lock',
      'Dynamic threshold routing (Manager -> Finance review)',
      'Immutable submission timestamp & attachment auditing'
    ],
    metrics: { label: 'Approval Speed', value: '4.2x Faster' },
    statusTag: 'BUDGET RESERVED'
  },
  {
    id: 'sourcing',
    number: '03',
    title: 'RFQ / RFP Sourcing & Sealed Bids',
    category: 'SOURCING & EVALUATION',
    summary: 'Direct conversion from approved PR into competitive market events. Vendors participate via a restricted, blind portal until event close.',
    features: [
      'Invited & public bidding tracks with strict deadlines',
      'Sealed bid vaults - no premature pricing disclosures',
      'Weighted technical scoring & commercial normalization',
      'Automated award memo & audit-ready decision trails'
    ],
    metrics: { label: 'Spend Savings', value: '18.4% Average' },
    statusTag: 'SEALED & VERIFIED'
  },
  {
    id: 'po',
    number: '04',
    title: 'Purchase Order Generation & Versioning',
    category: 'ORDER MANAGEMENT',
    summary: 'Formal PO creation with tax schedules, terms, delivery milestones, and automated change-order version tracking.',
    features: [
      'Direct PO release upon sourcing approval',
      'Vendor digital acknowledgement tracking',
      'Amendment control with prior-version preservation',
      'Split deliveries & multi-location release schedules'
    ],
    metrics: { label: 'Fulfillment Accuracy', value: '99.8%' },
    statusTag: 'ACKNOWLEDGED'
  },
  {
    id: 'grn',
    number: '05',
    title: 'Physical Goods Receipt & Quality Inspection',
    category: 'INVENTORY & STORES',
    summary: 'Warehouse goods inspection capturing accepted quantity, rejected counts, inspection notes, and discrepancy flags.',
    features: [
      'Stores receipt against line items with barcode scanning',
      'Partial receipt tracking with balance updates',
      'Return-to-vendor (RTV) automated documentation',
      'Inspection certificates linked directly to PO'
    ],
    metrics: { label: 'Receipt Verification', value: 'Full-Scope Audited' },
    statusTag: 'INSPECTED & ACCEPTED'
  },
  {
    id: 'match',
    number: '06',
    title: 'Automated 3-Way Invoice Matching',
    category: 'ACCOUNTS PAYABLE',
    summary: 'Exact cross-check comparing Purchase Order lines, Physical Receipt logs, and Vendor Invoice charges within tolerance boundaries.',
    features: [
      'Item-level price & quantity automated reconciliation',
      'Configurable tolerance limits for tax & freight variance',
      'Exception queues for unmatched invoices with buyer routing',
      'Payment scheduling only after three-way lock verification'
    ],
    metrics: { label: 'Touchless Match', value: '92% Automated' },
    statusTag: 'CLEARED FOR PAYMENT'
  },
  {
    id: 'clm',
    number: '07',
    title: 'Contract Lifecycle Management & SLA Control',
    category: 'LEGAL & COMPLIANCE',
    summary: 'Centralized repository of master service agreements, non-disclosure pacts, rate cards, and automated renewal milestone alerts.',
    features: [
      'Clause repository & template authorization',
      'Digital signature execution & version archiving',
      'Milestone obligation tracking with penalty alerts',
      'Proactive renewal notices at 90, 60, and 30 days'
    ],
    metrics: { label: 'Compliance Adherence', value: 'Zero Missed Renewals' },
    statusTag: 'ACTIVE & MONITORED'
  }
];

export const SolutionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const stepParam = searchParams.get('step');
  const [selectedStep, setSelectedStep] = useState<string>(stepParam || 'pr');

  useEffect(() => {
    const target = searchParams.get('step') || (location.hash ? location.hash.replace('#', '') : null);
    if (target) {
      const matched = s2pSteps.find((s) => s.id === target || s.id.toLowerCase() === target.toLowerCase());
      if (matched) {
        setSelectedStep(matched.id);
      }
      setTimeout(() => {
        const el = document.getElementById('lifecycle-detail');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }, [searchParams, location]);

  const selected = s2pSteps.find((s) => s.id === selectedStep) || s2pSteps[0];

  return (
    <PageLayout
      badge="CONNECTED SOLUTIONS"
      title="Source-to-Pay Operating System"
      subtitle="From the first departmental request to the final settled payment, every transaction is synchronized in one verifiable architecture."
    >
      {/* Landing Page Animated Modules Stack */}
      <div style={{ marginBottom: '60px' }}>
        <AnimatedModulesStack hideHeader={true} />
      </div>

      {/* Deep-Dive Lifecycle Stages Target Anchor */}
      <div id="lifecycle-detail" style={{ textAlign: 'center', marginBottom: '36px', scrollMarginTop: '100px' }}>
        <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '14px' }}>
          <span className="eyebrow-line" />
          MODULE DEEP DIVE
          <span className="eyebrow-line" />
        </div>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', color: '#0f172a', fontWeight: 600 }}>
          Interactive Source-to-Pay Lifecycle
        </h2>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Select any stage to inspect the workflow automation, verification controls, and business rules.
        </p>
      </div>

      {/* Step Selector Horizontal Bar */}
      <div
        className="solutions-step-selector"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '14px',
          marginBottom: '36px',
        }}
      >
        {s2pSteps.map((step) => {
          const isActive = step.id === selectedStep;
          return (
            <button
              key={step.id}
              onClick={() => setSelectedStep(step.id)}
              style={{
                background: isActive ? '#2456D6' : '#ffffff',
                color: isActive ? '#ffffff' : '#0f172a',
                border: isActive ? '3px solid #1d4ed8' : '2px solid #cbd5e1',
                borderRadius: '16px',
                padding: '18px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isActive
                  ? '0 16px 36px rgba(36, 86, 214, 0.28), 0 4px 12px rgba(36, 86, 214, 0.14)'
                  : '0 8px 24px rgba(15, 27, 45, 0.08), 0 2px 6px rgba(15, 27, 45, 0.04)',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  opacity: isActive ? 0.95 : 0.7,
                  fontFamily: '"DM Mono", monospace',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                STAGE {step.number}
              </span>
              <span style={{ fontSize: '15px', fontWeight: 800, display: 'block', lineHeight: 1.35 }}>
                {step.title.split('&')[0].trim()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Step Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          className="solutions-detail-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          style={{
            background: '#ffffff',
            border: '2px solid #cbd5e1',
            borderRadius: '26px',
            padding: '48px',
            boxShadow: '0 24px 56px rgba(15, 27, 45, 0.16), 0 8px 20px rgba(15, 27, 45, 0.08)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '40px',
          }}
        >
          {/* Left Column: Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span
                style={{
                  background: '#eff6ff',
                  color: '#2563eb',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  letterSpacing: '0.06em',
                }}
              >
                {selected.category}
              </span>
              <span
                style={{
                  background: '#ecfdf5',
                  color: '#059669',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  letterSpacing: '0.04em',
                }}
              >
                ✓ {selected.statusTag}
              </span>
            </div>

            <h2
              style={{
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 600,
                color: '#0f172a',
                margin: '0 0 16px 0',
              }}
            >
              {selected.title}
            </h2>

            <p style={{ fontSize: '18px', color: '#1e293b', lineHeight: 1.7, marginBottom: '28px' }}>
              {selected.summary}
            </p>

            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Core Functional Controls:
            </h4>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selected.features.map((f, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontSize: '16px',
                    color: '#1e293b',
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: '#eff6ff',
                      color: '#2456D6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontWeight: 800,
                      fontSize: '13px',
                    }}
                  >
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Metric Callout */}
          <div
            className="solutions-metric-card"
            style={{
              background: '#f8fafc',
              border: '2px solid #cbd5e1',
              borderRadius: '22px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', letterSpacing: '0.1em' }}>
                ENTERPRISE METRIC IMPACT
              </span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
            </div>

            <div
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                padding: '32px 24px',
                border: '2px solid #93c5fd',
                textAlign: 'center',
                boxShadow: '0 12px 30px rgba(37, 99, 235, 0.12)',
              }}
            >
              <div style={{ fontSize: '15px', color: '#475569', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px' }}>
                {selected.metrics.label}
              </div>
              <div
                style={{
                  fontSize: 'clamp(36px, 4vw, 52px)',
                  fontWeight: 800,
                  color: '#2456D6',
                  fontFamily: '"DM Mono", monospace',
                }}
              >
                {selected.metrics.value}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '18px' }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                System Verification Guarantee:
              </div>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                Every action is verified server-side with zero silent overspend, strict boundary validation, and immutable audit logs.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};
