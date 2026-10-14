import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="legal-modal-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
          backgroundColor: 'rgba(15, 27, 45, 0.65)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        onClick={e => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          className="legal-modal-dialog"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '820px',
            maxHeight: '88vh',
            background: 'var(--surface, #ffffff)',
            borderRadius: '24px',
            boxShadow: '0 24px 60px rgba(15, 27, 45, 0.25), 0 0 1px rgba(0, 0, 0, 0.1)',
            border: '1px solid var(--line, #e1e7f0)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            className="legal-modal-header"
            style={{
              padding: '24px 32px 18px',
              borderBottom: '1px solid var(--line, #e1e7f0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              background: '#ffffff',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--blue, #2858e8)', display: 'flex' }}>
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16h23" />
                    <path d="M16 4v24" />
                    <circle cx="24.8" cy="11" r="2.1" />
                    <circle cx="9.5" cy="21.5" r="2.1" />
                  </svg>
                </span>
                <span style={{ font: "700 13px 'DM Mono', monospace", color: 'var(--blue, #2858e8)', letterSpacing: '1px' }}>
                  PROCURESPHERE 360 LEGAL
                </span>
              </div>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: 'var(--navy, #101a2d)', fontFamily: '"Playfair Display", "Georgia", serif' }}>
                {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h2>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Tab Selector */}
              <div
                style={{
                  display: 'inline-flex',
                  background: 'var(--soft, #eef2f6)',
                  padding: '4px',
                  borderRadius: '12px',
                  border: '1px solid var(--line, #e1e7f0)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab('privacy')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: 'none',
                    background: activeTab === 'privacy' ? '#ffffff' : 'transparent',
                    color: activeTab === 'privacy' ? 'var(--blue, #2858e8)' : 'var(--muted, #526784)',
                    boxShadow: activeTab === 'privacy' ? '0 2px 6px rgba(15, 27, 45, 0.08)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('terms')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: 'none',
                    background: activeTab === 'terms' ? '#ffffff' : 'transparent',
                    color: activeTab === 'terms' ? 'var(--blue, #2858e8)' : 'var(--muted, #526784)',
                    boxShadow: activeTab === 'terms' ? '0 2px 6px rgba(15, 27, 45, 0.08)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Terms & Conditions
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--soft, #eef2f6)',
                  border: '1px solid var(--line, #e1e7f0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--ink, #101a2d)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#e2e8f0')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--soft, #eef2f6)')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable Document Content */}
          <div
            className="legal-modal-body"
            style={{
              padding: '28px 32px 36px',
              overflowY: 'auto',
              fontSize: '14.5px',
              lineHeight: 1.7,
              color: 'var(--ink, #101a2d)',
            }}
          >
            {activeTab === 'privacy' ? (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '10px 0 8px', color: 'var(--navy, #101a2d)' }}>
                  1. Overview
                </h3>
                <p>
                  ProcureSphere 360 is a software platform designed for procurement workflow management and demonstration. We respect the privacy of our visitors and users, and this policy outlines how information is handled.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '20px 0 8px', color: 'var(--navy, #101a2d)' }}>
                  2. Information We Collect
                </h3>
                <p>
                  We only collect basic information necessary to provide and demonstrate platform functionality, including:
                </p>
                <ul style={{ paddingLeft: '22px', margin: '10px 0', color: 'var(--muted, #526784)' }}>
                  <li>Contact details (such as name, email address, and company name) submitted via contact and demo inquiry forms.</li>
                  <li>Account credentials used for accessing role workspaces.</li>
                  <li>Requisition, purchase order, and workflow inputs provided during platform evaluation.</li>
                </ul>

                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '20px 0 8px', color: 'var(--navy, #101a2d)' }}>
                  3. How Information Is Used
                </h3>
                <p>
                  Information collected is used strictly to respond to inquiries, facilitate user sessions, and demonstrate workflow capabilities. We do not sell, rent, or trade personal data to third parties.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '20px 0 8px', color: 'var(--navy, #101a2d)' }}>
                  4. Data Handling & Security
                </h3>
                <p>
                  We apply standard and reasonable administrative and technical measures to protect user information from unauthorized access. Access to role-based workspaces is restricted to designated user accounts.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '20px 0 8px', color: 'var(--navy, #101a2d)' }}>
                  5. Contact
                </h3>
                <p>
                  If you have questions regarding this privacy policy or wish to request updates to your information, please contact us through the website contact form.
                </p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '10px 0 8px', color: 'var(--navy, #101a2d)' }}>
                  1. Acceptance of Terms
                </h3>
                <p>
                  By accessing or using the ProcureSphere 360 platform and website, you agree to these Terms & Conditions. If you do not agree with any part of these terms, please discontinue using the website.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '20px 0 8px', color: 'var(--navy, #101a2d)' }}>
                  2. Purpose & Use of the Platform
                </h3>
                <p>
                  ProcureSphere 360 provides an interactive operating interface for procurement workflow demonstration and evaluation. Users agree to utilize the platform responsibly and for lawful business and educational purposes.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '20px 0 8px', color: 'var(--navy, #101a2d)' }}>
                  3. Account Credentials & Access
                </h3>
                <p>
                  Users accessing role-based workspaces are responsible for maintaining the confidentiality of their credentials and for activities occurring under their login session.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '20px 0 8px', color: 'var(--navy, #101a2d)' }}>
                  4. Intellectual Property
                </h3>
                <p>
                  All website layouts, designs, interface graphics, and brand assets are the property of ProcureSphere 360. Content or data submitted by users remains the property of the respective user.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '20px 0 8px', color: 'var(--navy, #101a2d)' }}>
                  5. General Disclaimer
                </h3>
                <p>
                  The platform and illustrative materials are provided on an "as is" and "as available" basis. These terms may be updated from time to time, and continued use of the platform constitutes acceptance of any revisions.
                </p>
              </div>
            )}
          </div>

          {/* Footer of Modal */}
          <div
            style={{
              padding: '16px 32px',
              borderTop: '1px solid var(--line, #e1e7f0)',
              background: 'var(--soft, #eef2f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '13px', color: 'var(--muted, #526784)' }}>
              ProcureSphere 360 Enterprise ERP Platform
            </span>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 22px',
                borderRadius: '10px',
                background: 'var(--blue, #2858e8)',
                color: '#ffffff',
                border: 'none',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
