import React from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';

const techPillars = [
  {
    tag: 'TRANSACTIONAL INTEGRITY',
    title: 'ACID Relational Core',
    desc: 'Structured relational data model enforcing foreign keys, unique constraints, and strict transaction isolation. Zero orphaned procurement records.',
    highlights: ['ACID-compliant transactions', 'Normalized schema constraints', 'Zero silent overspend locks']
  },
  {
    tag: 'EVENT-DRIVEN ASYNC',
    title: 'Asynchronous Job Queue',
    desc: 'Offloads resource-intensive processing including contract expiry scanning, background PDF generation, and automated compliance alert delivery.',
    highlights: ['Proactive contract renewal alerts', 'Scalable background queue', 'Instant UI response time']
  },
  {
    tag: 'IMMUTABLE AUDITING',
    title: 'Append-Only Audit Trails',
    desc: 'Every approval, line-item edit, budget override, and status change is immutably logged with actor, timestamp, prior state, and resulting state.',
    highlights: ['Non-repudiation guarantee', 'Complete version history', 'Exportable compliance reports']
  },
  {
    tag: 'ZERO-TRUST SECURITY',
    title: 'Server-Side Policy Engine',
    desc: 'Strict authorization rules evaluated entirely on the backend. No client-side bypasses or spoofed roles can alter procurement thresholds.',
    highlights: ['Server-enforced limits', 'Encrypted data layers', 'CSRF & Injection protection']
  }
];

export const ArchitecturePage: React.FC = () => {
  return (
    <PageLayout
      badge="ENTERPRISE ENGINE"
      title="High-Integrity ERP Architecture"
      subtitle="Engineered for institutional scale. Discover how ProcureSphere 360 balances real-time business speed with bulletproof compliance and data governance."
    >
      {/* 4 Architectural Pillars Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginTop: '40px',
        }}
      >
        {techPillars.map((p, idx) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            style={{
              background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'border-color 0.3s ease',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#60a5fa',
                  background: 'rgba(59, 130, 246, 0.12)',
                  padding: '4px 12px',
                  borderRadius: '999px',
                }}
              >
                {p.tag}
              </span>
              <h3
                style={{
                  fontSize: '24px',
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: '18px 0 12px 0',
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px' }}>
                {p.desc}
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '18px' }}>
              {p.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#10b981', fontSize: '12px' }}>✓</span>
                  <span style={{ fontSize: '13px', color: '#cbd5e1' }}>{h}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
};
