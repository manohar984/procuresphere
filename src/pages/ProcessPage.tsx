import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';

interface StepDetail {
  id: string;
  stepNum: string;
  title: string;
  subtitle: string;
  summary: string;
  actions: string[];
  output: string;
  timeline: string;
}

const lifecycleSteps: StepDetail[] = [
  {
    id: 'step-1',
    stepNum: '01',
    title: 'Requirement & Budget Verification',
    subtitle: 'Requisition Initialization',
    summary: 'Departments draft purchase requests with specified item lists, specifications, and project allocations. The system checks available budget allocations prior to submission.',
    actions: [
      'Department user creates structured requisition',
      'Automatic cost-center budget allocation check',
      'Initial supervisor and department head approval routing'
    ],
    output: 'Approved Requisition with reserved budget allotment',
    timeline: 'Standard cycle: 2-4 business hours'
  },
  {
    id: 'step-2',
    stepNum: '02',
    title: 'Sourcing & Vendor Quotations',
    subtitle: 'Market Inquiries & Bidding',
    summary: 'Procurement teams issue RFQ (Request for Quotation) packages to qualified suppliers. Suppliers submit quotations with pricing, delivery schedules, and technical catalogs.',
    actions: [
      'RFQ published to selected supplier categories',
      'Supplier portal submission for sealed quotes and timelines',
      'Side-by-side commercial and technical comparison matrix'
    ],
    output: 'Comparative Bid Analysis & Supplier Selection Record',
    timeline: 'Standard cycle: 2-5 business days'
  },
  {
    id: 'step-3',
    stepNum: '03',
    title: 'Purchase Order Generation',
    subtitle: 'Formal Order Issuance',
    summary: 'Once a quotation is selected, a formal Purchase Order is generated with clear line-item descriptions, payment schedules, delivery dates, and terms of service.',
    actions: [
      'PO document generated with unique reference tracking',
      'Digital dispatch to supplier via connected workspace',
      'Supplier formal acknowledgement and delivery confirmation'
    ],
    output: 'Dispatched & Confirmed Purchase Order (PO)',
    timeline: 'Standard cycle: Same-day turnaround'
  },
  {
    id: 'step-4',
    stepNum: '04',
    title: 'Shipment, Receiving & Inspection',
    subtitle: 'Goods Receipt Processing',
    summary: 'Upon arrival of physical goods or completion of services, warehouse and operations teams inspect delivery quantities against PO specifications.',
    actions: [
      'Receiving team logs quantity count and physical condition',
      'Quality checklist verification and acceptance record',
      'Goods Receipt Note (GRN) created for matched items'
    ],
    output: 'Verified Goods Receipt Note (GRN)',
    timeline: 'Standard cycle: Upon delivery arrival'
  },
  {
    id: 'step-5',
    stepNum: '05',
    title: 'Invoice Review & 3-Way Reconciliation',
    subtitle: 'Accounts Payable Validation',
    summary: 'Finance matches the vendor invoice against both the original Purchase Order and the Goods Receipt Note to confirm item quantities, rates, and totals match.',
    actions: [
      'Line-by-line item rate verification against Purchase Order',
      'Quantity received reconciliation against Goods Receipt Note',
      'Variance detection flag for unexpected price or quantity deviations'
    ],
    output: 'Reconciled Invoice Package Ready for Payment',
    timeline: 'Standard cycle: 1 business day'
  },
  {
    id: 'step-6',
    stepNum: '06',
    title: 'Payment Settlement & Order Closeout',
    subtitle: 'Financial Disbursement & Archival',
    summary: 'Accounts payable releases payment according to agreed payment terms, updates financial ledgers, and archives the completed order dossier for historical reference.',
    actions: [
      'Payment scheduling according to vendor terms',
      'Remittance advice generated and shared with supplier',
      'Order status updated to Completed with complete document history'
    ],
    output: 'Settlement Confirmation & Archived Order History',
    timeline: 'Standard cycle: As per contract terms'
  }
];

export const ProcessPage: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<string>('step-1');
  const activeStep = lifecycleSteps.find(s => s.id === activeStepId) || lifecycleSteps[0];

  return (
    <PageLayout
      badge="OPERATING WORKFLOW"
      title="End-to-End Procurement Lifecycle"
      subtitle="A clear, structured walkthrough of how purchasing requests move from initial department requisition to final delivery, invoice reconciliation, and settlement."
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto', paddingBottom: '50px' }}>

        {/* Process Flow Overview Ribbon Buttons */}
        <div className="process-steps-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '16px',
          marginBottom: '44px'
        }}>
          {lifecycleSteps.map((step) => {
            const isSelected = activeStep.id === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                style={{
                  background: isSelected ? '#ffffff' : '#f8fafc',
                  border: isSelected ? '3px solid #2456D6' : '2px solid #cbd5e1',
                  borderRadius: '18px',
                  padding: '22px 18px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: isSelected
                    ? '0 16px 36px rgba(36, 86, 214, 0.22), 0 4px 12px rgba(36, 86, 214, 0.12)'
                    : '0 8px 24px rgba(15, 27, 45, 0.08), 0 2px 6px rgba(15, 27, 45, 0.04)',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: isSelected ? '#2456D6' : '#e2e8f0',
                  color: isSelected ? '#ffffff' : '#0f172a',
                  fontSize: '16px',
                  fontWeight: 800,
                  fontFamily: '"DM Mono", monospace'
                }}>
                  {step.stepNum}
                </div>
                <strong style={{
                  fontSize: '17px',
                  color: isSelected ? '#0f172a' : '#1e293b',
                  fontWeight: 800,
                  lineHeight: 1.35
                }}>
                  {step.title.split('&')[0].trim()}
                </strong>
                <span style={{ fontSize: '14px', color: isSelected ? '#2456D6' : '#475569', fontWeight: 600 }}>
                  {step.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Active Step Spotlight Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            className="process-active-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              background: '#ffffff',
              border: '2px solid #cbd5e1',
              borderRadius: '26px',
              padding: '48px 42px',
              boxShadow: '0 24px 56px rgba(15, 27, 45, 0.16), 0 8px 20px rgba(15, 27, 45, 0.08)',
              marginBottom: '54px'
            }}
          >
            <div className="process-active-card-header" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              borderBottom: '2px solid #e2e8f0',
              paddingBottom: '26px',
              marginBottom: '30px'
            }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(36, 86, 214, 0.12)',
                  color: '#1d4ed8',
                  fontSize: '14px',
                  fontWeight: 800,
                  padding: '6px 14px',
                  borderRadius: '100px',
                  letterSpacing: '0.06em',
                  marginBottom: '12px'
                }}>
                  PHASE {activeStep.stepNum} • {activeStep.subtitle.toUpperCase()}
                </span>
                <h3 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '34px',
                  color: '#0f172a',
                  fontWeight: 700,
                  margin: 0
                }}>
                  {activeStep.title}
                </h3>
              </div>

              <div style={{
                background: '#f1f5f9',
                border: '2px solid #cbd5e1',
                borderRadius: '14px',
                padding: '12px 20px',
                fontSize: '15px',
                color: '#0f172a',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#2456D6' }} />
                <span>{activeStep.timeline}</span>
              </div>
            </div>

            <p style={{
              fontSize: '20px',
              color: '#0f172a',
              lineHeight: 1.75,
              marginBottom: '36px',
              fontWeight: 500
            }}>
              {activeStep.summary}
            </p>

            <div className="process-activities-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '20px',
              padding: '32px'
            }}>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '18px' }}>
                  Key Activities in This Stage:
                </h4>
                <ul style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {activeStep.actions.map((act, idx) => (
                    <li key={idx} style={{ fontSize: '17px', color: '#1e293b', lineHeight: 1.6, fontWeight: 500 }}>
                      {act}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="process-deliverable-box" style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '28px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
                  Stage Output & Deliverable:
                </h4>
                <div style={{
                  background: '#ffffff',
                  border: '2px solid #93c5fd',
                  borderRadius: '14px',
                  padding: '18px 20px',
                  fontSize: '17px',
                  color: '#0f172a',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 6px 16px rgba(37, 99, 235, 0.1)'
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2456D6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{activeStep.output}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Informational Guidance Cards */}
        <div style={{ marginTop: '30px' }}>
          <h3 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '28px',
            color: '#0f172a',
            fontWeight: 700,
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Operational Principles Across the Lifecycle
          </h3>
          <div className="process-principles-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <div
              style={{
                background: '#ffffff',
                border: '2px solid #cbd5e1',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 12px 32px rgba(15, 27, 45, 0.12), 0 4px 10px rgba(15, 27, 45, 0.06)'
              }}
            >
              <h4 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 12px 0', fontWeight: 800 }}>
                Transparent Tracking
              </h4>
              <p style={{ fontSize: '17px', color: '#1e293b', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                Requisitions and purchase orders carry unique reference numbers, enabling teams to check current status without needing back-and-forth email inquiries.
              </p>
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '2px solid #cbd5e1',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 12px 32px rgba(15, 27, 45, 0.12), 0 4px 10px rgba(15, 27, 45, 0.06)'
              }}
            >
              <h4 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 12px 0', fontWeight: 800 }}>
                Structured Review Stages
              </h4>
              <p style={{ fontSize: '17px', color: '#1e293b', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                Department requisitions and supplier quotes follow standardized review steps to ensure decisions are documented clearly before orders are dispatched.
              </p>
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '2px solid #cbd5e1',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: '0 12px 32px rgba(15, 27, 45, 0.12), 0 4px 10px rgba(15, 27, 45, 0.06)'
              }}
            >
              <h4 style={{ fontSize: '20px', color: '#0f172a', margin: '0 0 12px 0', fontWeight: 800 }}>
                Accurate Record Keeping
              </h4>
              <p style={{ fontSize: '17px', color: '#1e293b', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                Completed purchase orders, inspection notes, and settlement records remain stored within the system for quick retrieval during regular internal reviews.
              </p>
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
};
