import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { AnimatedBenefits } from '../components/AnimatedBenefits';

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

export const BenefitsPage: React.FC = () => {
  return (
    <PageLayout>
      {/* Visual Animated Hero Section with video */}
      <div style={{ marginBottom: '60px' }}>
        <AnimatedBenefits />
      </div>

      {/* Legacy vs ProcureSphere 360 Comparison Section */}
      <div style={{ maxWidth: '1240px', margin: '0 auto 80px', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#2456D6', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            PROVEN ARCHITECTURAL DIFFERENCE
          </span>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(30px, 3.8vw, 42px)', color: '#0f172a', fontWeight: 700, margin: '0 0 14px 0' }}>
            Legacy Procurement vs. ProcureSphere 360
          </h2>
          <p style={{ color: '#1e293b', fontSize: '19px', maxWidth: '780px', margin: '0 auto', lineHeight: 1.7, fontWeight: 500 }}>
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
            boxShadow: '0 20px 48px rgba(15, 27, 45, 0.16), 0 6px 16px rgba(15, 27, 45, 0.08)',
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
                padding: '24px 32px',
                background: '#0f172a',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '15px',
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
                  borderBottom: idx === comparisonRows.length - 1 ? 'none' : '2px solid #e2e8f0',
                  background: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                  alignItems: 'start',
                }}
              >
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '17px', lineHeight: 1.55 }}>
                  {row.dimension}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  color: '#334155',
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
                  color: '#0f172a',
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
                      fontWeight: 800,
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
    </PageLayout>
  );
};
