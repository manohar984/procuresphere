import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { GenericDashboard } from '../components/GenericDashboard';

const roleList = ['REQUESTER', 'PROCUREMENT', 'FINANCE', 'LEGAL', 'STORES', 'VENDOR'];

const governanceTiers = [
  {
    role: 'Requester',
    key: 'REQUESTER',
    scope: 'Department Requisitions',
    responsibility: 'Create and track purchase requisitions for authorized departments within policy guidance and real-time budget visibility.',
    guardrail: 'Restricted view. Cannot view supplier bid comparisons or modify organizational approval thresholds.',
    avatar: '/roles/requester/active.webp'
  },
  {
    role: 'Procurement',
    key: 'PROCUREMENT',
    scope: 'Sourcing & PO Execution',
    responsibility: 'Manage vendor relations, run competitive RFQ events, evaluate supplier bids, negotiate commercial terms, and issue purchase orders.',
    guardrail: 'Strict segregation. Cannot bypass budget thresholds or approve unbudgeted contracts unilaterally.',
    avatar: '/roles/procurement/active.webp'
  },
  {
    role: 'Finance',
    key: 'FINANCE',
    scope: 'Budget & 3-Way Match',
    responsibility: 'Review departmental budgets, conduct invoice validation against PO and physical receipt, and resolve exception workflows.',
    guardrail: 'Automated lock. Invoices with unmatched quantities or unauthorized variance are blocked from payment.',
    avatar: '/roles/finance/active.webp'
  },
  {
    role: 'Legal',
    key: 'LEGAL',
    scope: 'Contracts & Obligations',
    responsibility: 'Oversee master agreements, track version histories, enforce terms, manage obligations, and monitor renewal deadlines.',
    guardrail: 'Version locking. Signed contract versions are locked; revisions require an explicit amendment trail.',
    avatar: '/roles/legal/active.webp'
  },
  {
    role: 'Stores',
    key: 'STORES',
    scope: 'Receiving & Inspection',
    responsibility: 'Receive shipments, perform itemized quantity and quality inspections, log partial receipts, and record rejections.',
    guardrail: 'Inventory gate. Goods cannot enter payable status until inspection is logged.',
    avatar: '/roles/stores/active.webp'
  },
  {
    role: 'Vendor',
    key: 'VENDOR',
    scope: 'Restricted Supplier Portal',
    responsibility: 'Complete self-service onboarding, submit KYC documentation, participate in sealed RFPs, and acknowledge purchase orders.',
    guardrail: 'Zero competitor access. Blind bidding enforces data segregation between competing suppliers.',
    avatar: '/roles/vendor/active.webp'
  }
];

export const RolesPage: React.FC = () => {
  const [activeRole, setActiveRole] = useState('REQUESTER');

  return (
    <PageLayout
      badge="ROLES & TEAMS"
      title="One Platform. Every Team."
      subtitle="One connected system adapts to the decisions each team owns — from requester to procurement, finance, legal, stores, and external suppliers."
    >
      {/* Interactive Avatar Selector from Landing page */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div
          role="tablist"
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '16px',
            justifyContent: 'center',
            maxWidth: '100%',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {roleList.map((item) => {
            const isActive = activeRole === item;
            const roleLower = item.toLowerCase();
            const imgSrc = `/roles/${roleLower}/${isActive ? 'active.webp' : 'idle.webp'}`;

            return (
              <button
                key={item}
                onClick={() => setActiveRole(item)}
                role="tab"
                aria-selected={isActive}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  opacity: isActive ? 1 : 0.65,
                  transition: 'opacity 0.25s ease',
                  minWidth: '120px',
                  padding: '6px'
                }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.05 : 0.95,
                    filter: isActive ? 'drop-shadow(0 8px 16px rgba(36, 86, 214, 0.25))' : 'drop-shadow(0 0px 0px rgba(0,0,0,0))'
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isActive ? '#eff6ff' : '#f1f5f9',
                    border: isActive ? '2px solid #2456D6' : '2px solid transparent',
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={item}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </motion.div>
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#0f172a' : '#64748b',
                    textTransform: 'capitalize'
                  }}
                >
                  {roleLower}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Role Dashboard Preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: '24px',
              maxWidth: '1080px',
              margin: '24px auto 0',
              textAlign: 'left'
            }}
          >
            <GenericDashboard role={activeRole} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Role Segregation & Access Boundaries Cards */}
      <div style={{ marginTop: '70px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '30px', color: '#0f172a', fontWeight: 600 }}>
            Enterprise Access & Role Segregation
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Multi-tier separation of duties strictly enforces corporate policy across all functions.
          </p>
        </div>

        <div className="governance-tiers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {governanceTiers.map((tier) => (
            <motion.div
              key={tier.role}
              className="governance-tier-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{
                background: '#ffffff',
                border: activeRole === tier.key ? '2px solid #2456D6' : '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '28px 24px',
                boxShadow: '0 4px 20px rgba(15, 27, 45, 0.04)',
                cursor: 'pointer',
                transition: 'border 0.2s ease, transform 0.2s ease'
              }}
              onClick={() => setActiveRole(tier.key)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <img
                  src={tier.avatar}
                  alt={tier.role}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#eff6ff', padding: '4px' }}
                />
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    {tier.role}
                  </h3>
                  <span style={{ fontSize: '12px', color: '#2456D6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {tier.scope}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '17px', color: '#334155', lineHeight: 1.7, margin: '0 0 16px 0' }}>
                {tier.responsibility}
              </p>

              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  fontSize: '14px',
                  color: '#475569',
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '4px' }}>🛡️ Segregation Guardrail:</strong>
                {tier.guardrail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
