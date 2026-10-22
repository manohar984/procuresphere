import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { motion } from 'framer-motion';

const aboutPillars = [
  {
    tag: 'THE MISSION',
    title: 'Transforming Disconnected Procurement',
    desc: 'ProcureSphere 360 was built to eliminate disconnected emails, uncontrolled spreadsheet trackers, and siloed approvals. We provide enterprises with a single, verifiable operating system that connects intent with execution.',
    icon: '🏢'
  },
  {
    tag: 'FINANCIAL ASSURANCE',
    title: 'Pre-Approval Spend Control',
    desc: 'Traditional ERP systems record spend only after money has already been committed. ProcureSphere 360 validates budget ceilings at the requisition stage, ensuring zero silent overspend.',
    icon: '🛡️'
  },
  {
    tag: 'END-TO-END TRACEABILITY',
    title: 'From Requisition to 3-Way Match',
    desc: 'Every requisition, supplier bid, purchase order, inspection acceptance, and invoice is strictly tracked with timestamped logs, states, and responsible approvers.',
    icon: '⚡'
  }
];

const capabilities = [
  {
    title: 'Requisitions & Approvals',
    desc: 'Pre-budget validation, catalog punchouts, and dynamic multi-tier approval chains that prevent rogue departmental spending.',
    tag: 'INTAKE & POLICY',
    color: '#2456D6'
  },
  {
    title: 'Sourcing & Bids',
    desc: 'Competitive RFQ/RFP events, sealed bid vaults, and commercial normalization that ensure fair supplier competition.',
    tag: 'SOURCING ENGINE',
    color: '#10b981'
  },
  {
    title: 'Orders & Invoicing',
    desc: 'Automated PO generation, physical receipt inspection, and 3-way matching across PO, receipt, and invoice lines.',
    tag: 'AP EXECUTION',
    color: '#f59e0b'
  },
  {
    title: 'Contracts & Compliance',
    desc: 'Centralized agreements, SLA obligations, version-controlled change histories, and automated renewal deadline alerts.',
    tag: 'LEGAL & CLM',
    color: '#8b5cf6'
  }
];

export const AboutPage: React.FC = () => {
  return (
    <PageLayout
      badge="ABOUT PLATFORM"
      title="A New Era of Enterprise Procurement"
      subtitle="Elevating enterprise procurement from a tactical back-office headache to a strategic, transparent advantage."
    >
      <div style={{ maxWidth: '1200px', margin: '20px auto 0' }}>
        {/* Mission Pillars with prominent borders and rich shadows */}
        <div className="about-pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {aboutPillars.map((p, i) => (
            <motion.div
              key={p.tag}
              className="about-pillar-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: '#ffffff',
                border: '2px solid #cbd5e1',
                borderRadius: '24px',
                padding: '42px 36px',
                boxShadow: '0 20px 48px rgba(15, 27, 45, 0.14), 0 6px 16px rgba(15, 27, 45, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#1d4ed8',
                    letterSpacing: '0.12em',
                    display: 'inline-block',
                    marginBottom: '18px',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontFamily: '"DM Mono", monospace',
                  }}
                >
                  {p.tag}
                </span>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '27px', color: '#0f172a', margin: '0 0 18px 0', fontWeight: 700, lineHeight: 1.3 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '18px', color: '#1e293b', lineHeight: 1.75, margin: 0, fontWeight: 500 }}>
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4 Core Platform Capabilities */}
        <div style={{ marginTop: '90px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', color: '#0f172a', fontWeight: 700 }}>
              The Four Connected Pillars
            </h2>
            <p style={{ color: '#1e293b', fontSize: '19px', maxWidth: '780px', margin: '0 auto', fontWeight: 500, lineHeight: 1.6 }}>
              How ProcureSphere 360 brings every procurement activity into one shared operating picture.
            </p>
          </div>

          <div className="about-capabilities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '26px' }}>
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                className="about-capability-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  background: '#ffffff',
                  border: '2px solid #cbd5e1',
                  borderRadius: '22px',
                  padding: '36px 30px',
                  boxShadow: '0 16px 40px rgba(15, 27, 45, 0.12), 0 4px 12px rgba(15, 27, 45, 0.06)'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '13px',
                    fontWeight: 800,
                    color: c.color,
                    letterSpacing: '0.08em',
                    marginBottom: '16px',
                    background: `${c.color}15`,
                    border: `1px solid ${c.color}35`,
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontFamily: '"DM Mono", monospace',
                  }}
                >
                  {c.tag}
                </span>
                <h4 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 14px 0', lineHeight: 1.3 }}>
                  {c.title}
                </h4>
                <p style={{ fontSize: '17px', color: '#1e293b', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Principles Banner */}
        <div
          className="about-banner"
          style={{
            marginTop: '80px',
            background: 'linear-gradient(135deg, #1e3a8a, #0f172a)',
            borderRadius: '26px',
            padding: '56px 46px',
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 24px 60px rgba(15, 27, 45, 0.25)'
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#93c5fd', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            CORE DESIGN PHILOSOPHY
          </span>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '38px', margin: '16px 0 18px 0', color: '#ffffff', fontWeight: 700 }}>
            Built for clarity. Designed for control.
          </h2>
          <p style={{ fontSize: '20px', color: '#f1f5f9', maxWidth: '780px', margin: '0 auto', lineHeight: 1.75, fontWeight: 500 }}>
            Every critical action captures the actor, state change, and timestamp — ensuring audit-readiness and enterprise governance without slowing down daily business operations.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};
