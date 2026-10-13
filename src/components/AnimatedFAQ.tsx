import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What does ProcureSphere 360 connect?",
    answer: "Requests, approvals, suppliers, sourcing, purchase orders, receipts, invoices, contracts, finance and governance in one connected workflow."
  },
  {
    question: "Is the interface shown live company data?",
    answer: "No. The interface is illustrative demo content designed to show how the operating picture could work without revealing sensitive information."
  },
  {
    question: "Can vendors participate in the workflow?",
    answer: "Yes. The Vendor workspace brings onboarding, bids, and purchase-order acknowledgement into the same connected experience, creating a seamless bridge between you and your suppliers."
  },
  {
    question: "How does the approval policy engine work?",
    answer: "It routes decisions automatically based on custom rules like department, budget thresholds, or risk categories, ensuring the right owner reviews the request at the exact right time."
  }
];

export function AnimatedFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{ maxWidth: '820px', margin: '60px auto 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              background: '#ffffff',
              border: isOpen ? '2px solid #2563eb' : '2px solid #cbd5e1',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: isOpen 
                ? '0 20px 48px rgba(37, 99, 235, 0.2), 0 4px 12px rgba(37, 99, 235, 0.1)' 
                : '0 10px 28px rgba(15, 27, 45, 0.1), 0 2px 8px rgba(15, 27, 45, 0.05)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              style={{
                width: '100%',
                padding: '24px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: '#0f1b2d',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '-0.02em'
              }}
            >
              <span>{faq.question}</span>
              <motion.div
                animate={{ rotate: isOpen ? 135 : 0, backgroundColor: isOpen ? '#2962ff' : '#f0f4ff', color: isOpen ? '#fff' : '#2962ff' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginLeft: '24px'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 1v12M1 7h12" />
                </svg>
              </motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div style={{ padding: '0 32px 32px 32px', color: '#475569', fontSize: '17px', lineHeight: 1.7, maxWidth: '720px' }}>
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
