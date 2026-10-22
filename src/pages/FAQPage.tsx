import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { AnimatedFAQ } from '../components/AnimatedFAQ';
import { motion } from 'framer-motion';

const extraFaqs = [
  {
    q: "How does the system ensure zero silent overspend?",
    a: "Every Purchase Requisition runs a server-side budget check. Funds are placed into 'Reserved' status immediately upon submission, preventing departments from committing spend beyond approved limits."
  },
  {
    q: "How is vendor confidential data protected during bidding?",
    a: "Vendor submissions are sealed until the deadline closes. Competing suppliers can never see each other's submissions, and buyers evaluate commercial terms only after technical clearance."
  },
  {
    q: "What is 3-Way Matching and how does it prevent overbilling?",
    a: "The system compares the original Purchase Order line items, the warehouse Goods Receipt (GRN) quantities, and the vendor Invoice amounts within configurable tolerance rules. Any variance triggers an approval workflow."
  },
  {
    q: "How does contract lifecycle management alert against renewal deadlines?",
    a: "Our scheduled workflow monitors active agreements and triggers proactive notifications to legal and procurement teams at 90, 60, and 30-day thresholds before expiry."
  }
];

export const FAQPage: React.FC = () => {
  return (
    <PageLayout
      badge="FAQ"
      title="Frequently Asked Questions"
      subtitle="Clear answers about how ProcureSphere 360 brings enterprise control, structured governance, and complete financial clarity."
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <AnimatedFAQ />

        <div style={{ marginTop: '60px' }}>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', color: '#0f172a', marginBottom: '24px', textAlign: 'center' }}>
            Workflow & Enterprise Policy Questions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {extraFaqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: '#ffffff',
                  border: '2px solid #cbd5e1',
                  borderRadius: '18px',
                  padding: '28px 32px',
                  boxShadow: '0 12px 32px rgba(15, 27, 45, 0.12), 0 4px 10px rgba(15, 27, 45, 0.05)'
                }}
              >
                <h4 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 12px 0', fontWeight: 800 }}>
                  {faq.q}
                </h4>
                <p style={{ fontSize: '18px', color: '#1e293b', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
