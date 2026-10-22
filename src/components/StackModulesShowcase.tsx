import { useState, useEffect, useRef, CSSProperties } from 'react'

export type IconName = 'arrow' | 'chevron' | 'check' | 'shield' | 'activity' | 'layers' | 'grid' | 'file' | 'users' | 'finance' | 'search' | 'menu' | 'close'

function LocalIcon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  if (name === 'arrow') return <svg {...common}><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
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
  return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>
}

export interface StackModule {
  id: number
  counter: string
  name: string
  shortSnippet: string
  category: string
  state: string
  stateColor: string
  icon: IconName
  fullTitle: string
  lede: string
  capabilities: Array<{
    title: string
    desc: string
    icon: IconName
  }>
  metric: {
    value: string
    label: string
  }
  connectedTo: string
  originalModules: string[]
}

const stackModules: StackModule[] = [
  {
    id: 1,
    counter: '1/6',
    name: 'Vendor Onboarding & KYC',
    shortSnippet: 'Automate supplier intake, tax and banking validation, and continuous risk monitoring across sanctions lists and ESG criteria.',
    category: 'SOURCING & GOVERNANCE',
    state: 'KYC ACTIVE',
    stateColor: 'status-blue',
    icon: 'users',
    fullTitle: 'Vendor Onboarding, Master Data & Risk',
    lede: 'Eliminate rogue suppliers and manual compliance checking with an automated self-service vendor intake engine.',
    capabilities: [
      { title: 'Supplier Intake & Sanctions Checks', desc: 'Configurable intake workflows for sanctions declarations, tax forms, and compliance data.', icon: 'shield' },
      { title: 'Bank Account & Tax Verification', desc: 'Pre-flight format validation helps prevent unauthorized or inaccurate payment setups.', icon: 'check' },
      { title: 'Dynamic Supplier Risk Scoring', desc: 'Multi-factor risk indexing across financial, operational, and ESG data.', icon: 'activity' },
      { title: 'Self-Service Supplier Portal', desc: 'Suppliers maintain certifications, compliance docs, and contacts directly.', icon: 'users' },
    ],
    metric: { value: '72%', label: 'Reduction in supplier onboarding turnaround time' },
    connectedTo: 'Purchase Requisitions, RFP Sourcing & Contracts',
    originalModules: ['Vendor Onboarding & KYC', 'Vendor Master & Risk', 'Supplier Performance'],
  },
  {
    id: 2,
    counter: '2/6',
    name: 'Purchase Requisitions & Budget',
    shortSnippet: 'Capture procurement intent with real-time budget verification, pre-commitment encumbrance, and guided catalog purchasing.',
    category: 'PURCHASING INTENT',
    state: 'MANAGER REVIEW',
    stateColor: 'status-amber',
    icon: 'file',
    fullTitle: 'Purchase Requisitions & Budget Control',
    lede: 'Prevent invisible spending by checking GL accounts and soft-reserving department budgets before a purchase order is created.',
    capabilities: [
      { title: 'Live Budget Checking', desc: 'Instantly tests cost center funds and GL codes before requisition submit.', icon: 'finance' },
      { title: 'Catalog & Punchout Buying', desc: 'Integrated with approved rate cards and supplier e-commerce punchouts.', icon: 'grid' },
      { title: 'Smart Commodity Tagging', desc: 'Automated UNSPSC category assignment for clean spend analytics.', icon: 'layers' },
      { title: 'Pre-Commitment Encumbrance', desc: 'Earmarks budget in real time so approved funds cannot be double-spent.', icon: 'shield' },
    ],
    metric: { value: '$0', label: 'Unbudgeted commitment surprises across cost centers' },
    connectedTo: 'Approval Policy Engine & Financial Ledger',
    originalModules: ['Purchase Requisition', 'Budget & Spend Control'],
  },
  {
    id: 3,
    counter: '3/6',
    name: 'Approval Policy Engine',
    shortSnippet: 'Route procurement decisions intelligently based on spend thresholds, department hierarchy, risk levels, and segregation of duties.',
    category: 'GOVERNANCE & CONTROLS',
    state: 'POLICY VERIFIED',
    stateColor: 'status-green',
    icon: 'check',
    fullTitle: 'Autonomous Approval Policy Engine',
    lede: 'No more approvals lost in email threads. Multi-tier approval matrices automatically enforce governance while accelerating sign-offs.',
    capabilities: [
      { title: 'Matrix Threshold Routing', desc: 'Dynamic tiers ($10k, $50k, $250k+) automatically route to authorized signers.', icon: 'layers' },
      { title: 'Segregation of Duties (SOD)', desc: 'Enforces policy rules so the requester, approver, and receiver remain strictly independent.', icon: 'shield' },
      { title: '1-Click Contextual Mobile Sign-off', desc: 'Approvers see contract terms, budget remaining, and vendor history in one tap.', icon: 'check' },
      { title: 'SLA Escalation Automation', desc: 'Dormant requests automatically escalate to secondary approvers.', icon: 'activity' },
    ],
    metric: { value: '3.4x', label: 'Velocity increase from request submission to approval' },
    connectedTo: 'Sourcing Events, PO Dispatch & Audit Logs',
    originalModules: ['Approval Policy Engine', 'Reports & Audit Trail'],
  },
  {
    id: 4,
    counter: '4/6',
    name: 'RFQ / RFP & Sealed Bid Portal',
    shortSnippet: 'Create competitive, transparent sourcing events with sealed electronic bids, automated side-by-side matrices, and award workflows.',
    category: 'STRATEGIC SOURCING',
    state: 'BID WINDOW OPEN',
    stateColor: 'status-blue',
    icon: 'search',
    fullTitle: 'RFQ / RFP Sourcing & Sealed Bid Portal',
    lede: 'Turn scattered bids and spreadsheet negotiations into structured, fair, and fully auditable sourcing rounds.',
    capabilities: [
      { title: 'Sealed Electronic Bidding', desc: 'Vendor submissions remain hidden from competing suppliers until the bidding window closes.', icon: 'shield' },
      { title: 'Side-by-Side Scoring Matrix', desc: 'Automated normalization of pricing, lead times, warranties, and commercial terms.', icon: 'grid' },
      { title: 'Split Technical & Commercial Review', desc: 'Separates technical scoring from commercial price to eliminate cognitive bias.', icon: 'layers' },
      { title: '1-Click Award to Contract/PO', desc: 'Winning supplier bid instantly transforms into contractual commitments.', icon: 'check' },
    ],
    metric: { value: '14.2%', label: 'Average category cost reduction achieved across bids' },
    connectedTo: 'Vendor Portal, Contract Creation & Purchase Orders',
    originalModules: ['RFQ / RFP Sourcing', 'Vendor Bid Portal (sealed bids)', 'Evaluation & Award'],
  },
  {
    id: 5,
    counter: '5/6',
    name: 'Purchase Orders & Delivery Receipt',
    shortSnippet: 'Generate structured purchase orders, capture electronic supplier acknowledgements, and track milestone-based goods receipts.',
    category: 'PURCHASING EXECUTION',
    state: 'ACKNOWLEDGED',
    stateColor: 'status-green',
    icon: 'layers',
    fullTitle: 'Purchase Orders & Warehouse Receiving',
    lede: 'Keep buyer and supplier aligned on deliverables. Every order change, line-item revision, and delivery receipt is synchronized.',
    capabilities: [
      { title: 'Automated PO Dispatch & EDI', desc: 'Clean PDF generation and direct portal delivery to contracted vendors.', icon: 'file' },
      { title: 'Vendor Change & Amendment Logs', desc: 'Suppliers propose delivery dates or quantities with formal audit history.', icon: 'activity' },
      { title: 'Mobile Receiving & Quality Check', desc: 'Warehouse teams log arrival, serial numbers, and damage with photo proof.', icon: 'check' },
      { title: 'Partial Receipt Milestone Tracking', desc: 'Tracks recurring shipments and matches goods delivered against total PO value.', icon: 'layers' },
    ],
    metric: { value: '99.8%', label: 'PO acknowledgement accuracy and delivery compliance' },
    connectedTo: 'Warehouse Stores, Accounts Payable & Matching',
    originalModules: ['Purchase Orders & Amendments', 'Receipt & Inspection'],
  },
  {
    id: 6,
    counter: '6/6',
    name: 'Invoice Verification & 3-Way Match',
    shortSnippet: 'Automate matching between Purchase Orders, Goods Receipts, and Invoices. Flags variances promptly to help prevent billing errors and duplicate payments.',
    category: 'FINANCIAL CONTROL',
    state: '3-WAY MATCHED',
    stateColor: 'status-green',
    icon: 'finance',
    fullTitle: 'Three-Way Match & Invoice Verification',
    lede: 'Never pay for unreceived goods or incorrect rates. AI-assisted three-way verification clears valid invoices and isolates disputes.',
    capabilities: [
      { title: 'Automated 3-Way Tolerance Match', desc: 'Verifies unit price against PO and quantity against confirmed warehouse receipts.', icon: 'check' },
      { title: 'Exception Resolution Queue', desc: 'Isolates price variances or quantity mismatches into a dedicated resolver workflow.', icon: 'shield' },
      { title: 'Early-Payment Discount Engine', desc: 'Recommends optimal payment timing to capture dynamic supplier rebates.', icon: 'finance' },
      { title: 'ERP Direct Posting Bridge', desc: 'Approved vouchers seamlessly post into SAP, Oracle, NetSuite, or Workday.', icon: 'layers' },
    ],
    metric: { value: '94%', label: 'Touchless straight-through invoice processing rate' },
    connectedTo: 'General Ledger, Treasury & Audit Trail',
    originalModules: ['Invoice & 3-Way Match', 'Contract Lifecycle', 'Reports & Audit Trail'],
  },
]

export function StackModulesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const activeModule = stackModules[activeIndex]

  // Track focus and native scroll progress for sticky scrollytelling
  useEffect(() => {
    const handleWindowScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      
      const scrollTotal = rect.height - window.innerHeight;
      if (scrollTotal > 0) {
        let progress = -rect.top / scrollTotal;
        progress = Math.max(0, Math.min(1, progress));
        
        const totalCards = stackModules.length;
        let newIndex = Math.floor(progress * totalCards);
        // We want newIndex to transition sharply at each boundary
        newIndex = Math.min(newIndex, totalCards - 1);
        setActiveIndex(newIndex);
      }

      const inFocus = rect.top <= 120 && rect.bottom >= window.innerHeight * 0.45
      setIsLocked(inFocus)
    }

    window.addEventListener('scroll', handleWindowScroll, { passive: true })
    handleWindowScroll()
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  // Smooth jump to any card
  const jumpToCard = (targetIndex: number) => {
    // Native scroll to the corresponding percentage of the container
    if (containerRef.current) {
      const scrollTotal = containerRef.current.scrollHeight - window.innerHeight;
      const percentage = targetIndex / stackModules.length;
      const scrollY = window.scrollY + containerRef.current.getBoundingClientRect().top + (scrollTotal * percentage) + 10;
      window.scrollTo({ top: scrollY, behavior: 'smooth' });
    }
    setActiveIndex(Math.max(0, Math.min(stackModules.length - 1, targetIndex)))
  }

  const scrollToNextSection = () => {
    document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToPrevSection = () => {
    document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className="modules-section-wrapper"
      ref={containerRef}
      style={{ height: '400vh' }}
    >
      <div style={{ position: 'sticky', top: '76px', height: 'calc(100vh - 76px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="modules-stage-inner">
        <div className="module-heading">
          <div className="section-title">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              SOLUTIONS
            </div>
            <h2>Everything procurement needs, connected.</h2>
            <p>A single operating picture across vendors, sourcing, orders, invoices, contracts and control.</p>
          </div>
          <div className="modules-status-badge">
            <span className={`status-pill ${isLocked ? 'status-blue' : 'status-gray'}`}>
              <i className="status-live-dot" />
              {activeIndex === stackModules.length - 1 ? 'ALL 6 CARDS COMPLETE • SCROLL DOWN FOR NEXT' : `SCROLL TO PEEL: CARD ${activeModule.counter}`}
            </span>
          </div>
        </div>
        <div className="modules-split-container">
          {/* Left Side: Animated Stacked Cards with SVG Falling Rays */}
          <div className="stack-left-column">
            <div className="stack-stage-outer">
              {/* SVG background rays (matching CodePen snippet) */}
              <div className="s__rays" aria-hidden="true">
                <div className="a-rays-wrapper">
                  <svg className="a__scene" width="395px" height="3118px" viewBox="0 0 395 3118">
                    <g className="rays-group">
                      <path stroke="#00F8F1" d="M 1,0 L 1,51 M 1,175 L 1,199 M 1,237 L 1,252 M 1,298 L 1,325 M 1,382 L 1,406 M 1,507 L 1,530 M 1,607 L 1,655 M 1,770 L 1,776 M 1,869 L 1,920 M 1,1042 L 1,1075 M 1,1278 L 1,1285 M 1,1316 L 1,1360 M 1,1459 L 1,1501 M 1,1606 L 1,1615 M 1,1647 L 1,1657 M 1,1685 L 1,1736 M 1,1889 L 1,1897 M 1,2105 L 1,2120 M 1,2266 L 1,2280 M 1,2420 L 1,2452 M 1,2645 L 1,2659 M 1,2705 L 1,2729 M 1,2940 L 1,2943 M 1,3112 L 1,3118 M 1,3118 L 1,3169 M 1,3293 L 1,3317 M 1,3355 L 1,3370 M 1,3416 L 1,3443 M 1,3500 L 1,3524 M 1,3625 L 1,3648 M 1,3725 L 1,3773 M 1,3888 L 1,3894 M 1,3987 L 1,4038 M 1,4160 L 1,4193 M 1,4396 L 1,4403 M 1,4434 L 1,4478 M 1,4577 L 1,4619 M 1,4724 L 1,4733 M 1,4765 L 1,4775 M 1,4803 L 1,4854 M 1,5007 L 1,5015 M 1,5223 L 1,5238 M 1,5384 L 1,5398 M 1,5538 L 1,5570 M 1,5763 L 1,5777 M 1,5823 L 1,5847 M 1,6058 L 1,6061 M 1,6230 L 1,6236 M 1, 3118 z" style={{ '--duration': '85.67s' } as CSSProperties} />
                      <path stroke="#FFBD1E" d="M 16,0 L 16,34 M 16,95 L 16,127 M 16,355 L 16,361 M 16,390 L 16,433 M 16,521 L 16,526 M 16,679 L 16,697 M 16,909 L 16,919 M 16,1020 L 16,1025 M 16,1052 L 16,1077 M 16,1309 L 16,1353 M 16,1432 L 16,1468 M 16,1655 L 16,1690 M 16,1783 L 16,1821 M 16,2015 L 16,2030 M 16,2109 L 16,2159 M 16,2298 L 16,2333 M 16,2410 L 16,2460 M 16,2624 L 16,2663 M 16,2821 L 16,2830 M 16,3050 L 16,3094 M 16,3118 L 16,3152 M 16,3213 L 16,3245 M 16,3473 L 16,3479 M 16,3508 L 16,3551 M 16,3639 L 16,3644 M 16,3797 L 16,3815 M 16,4027 L 16,4037 M 16,4138 L 16,4143 M 16,4170 L 16,4195 M 16,4427 L 16,4471 M 16,4550 L 16,4586 M 16,4773 L 16,4808 M 16,4901 L 16,4939 M 16,5133 L 16,5148 M 16,5227 L 16,5277 M 16,5416 L 16,5451 M 16,5528 L 16,5578 M 16,5742 L 16,5781 M 16,5939 L 16,5948 M 16,6168 L 16,6212 M 16, 3118 z" style={{ '--duration': '64.35s' } as CSSProperties} />
                      <path stroke="#FE848F" d="M 31,0 L 31,32 M 31,198 L 31,248 M 31,470 L 31,475 M 31,701 L 31,722 M 31,835 L 31,877 M 31,919 L 31,953 M 31,1008 L 31,1023 M 31,1181 L 31,1192 M 31,1403 L 31,1427 M 31,1615 L 31,1631 M 31,1734 L 31,1748 M 31,1893 L 31,1930 M 31,2075 L 31,2127 M 31,2226 L 31,2265 M 31,2451 L 31,2504 M 31,2671 L 31,2718 M 31,2753 L 31,2767 M 31,2952 L 31,2958 M 31,3118 L 31,3150 M 31,3316 L 31,3366 M 31,3588 L 31,3593 M 31,3819 L 31,3840 M 31,3953 L 31,3995 M 31,4037 L 31,4071 M 31,4126 L 31,4141 M 31,4299 L 31,4310 M 31,4521 L 31,4545 M 31,4733 L 31,4749 M 31,4852 L 31,4866 M 31,5011 L 31,5048 M 31,5193 L 31,5245 M 31,5344 L 31,5383 M 31,5569 L 31,5622 M 31,5789 L 31,5836 M 31,5871 L 31,5885 M 31,6070 L 31,6076 M 31, 3118 z" style={{ '--duration': '58.30s' } as CSSProperties} />
                      <path stroke="#FFBD1E" d="M 46,0 L 46,17 M 46,91 L 46,111 M 46,248 L 46,272 M 46,486 L 46,499 M 46,604 L 46,647 M 46,777 L 46,793 M 46,909 L 46,927 M 46,1114 L 46,1132 M 46,1243 L 46,1265 M 46,1306 L 46,1310 M 46,1420 L 46,1429 M 46,1528 L 46,1576 M 46,1750 L 46,1759 M 46,1887 L 46,1912 M 46,2003 L 46,2016 M 46,2132 L 46,2181 M 46,2211 L 46,2246 M 46,2335 L 46,2380 M 46,2464 L 46,2470 M 46,2517 L 46,2557 M 46,2620 L 46,2667 M 46,2833 L 46,2858 M 46,3024 L 46,3071 M 46,3118 L 46,3135 M 46,3209 L 46,3229 M 46,3366 L 46,3390 M 46,3604 L 46,3617 M 46,3722 L 46,3765 M 46,3895 L 46,3911 M 46,4027 L 46,4045 M 46,4232 L 46,4250 M 46,4361 L 46,4383 M 46,4424 L 46,4428 M 46,4538 L 46,4547 M 46,4646 L 46,4694 M 46,4868 L 46,4877 M 46,5005 L 46,5030 M 46,5121 L 46,5134 M 46,5250 L 46,5299 M 46,5329 L 46,5364 M 46,5453 L 46,5498 M 46,5582 L 46,5588 M 46,5635 L 46,5675 M 46,5738 L 46,5785 M 46,5951 L 46,5976 M 46,6142 L 46,6189 M 46, 3118 z" style={{ '--duration': '32.70s' } as CSSProperties} />
                      <path stroke="#00F8F1" d="M 61,0 L 61,42 M 61,198 L 61,245 M 61,453 L 61,476 M 61,659 L 61,694 M 61,794 L 61,838 M 61,884 L 61,911 M 61,1138 L 61,1156 M 61,1180 L 61,1210 M 61,1234 L 61,1238 M 61,1398 L 61,1411 M 61,1616 L 61,1668 M 61,1767 L 61,1801 M 61,1941 L 61,1979 M 61,2112 L 61,2140 M 61,2267 L 61,2315 M 61,2424 L 61,2451 M 61,2640 L 61,2648 M 61,2753 L 61,2774 M 61,2857 L 61,2897 M 61,3112 L 61,3118 M 61,3118 L 61,3160 M 61,3316 L 61,3363 M 61,3571 L 61,3594 M 61,3777 L 61,3812 M 61,3912 L 61,3956 M 61,4002 L 61,4029 M 61,4256 L 61,4274 M 61,4298 L 61,4328 M 61,4352 L 61,4356 M 61,4516 L 61,4529 M 61,4734 L 61,4786 M 61,4885 L 61,4919 M 61,5059 L 61,5097 M 61,5230 L 61,5258 M 61,5385 L 61,5433 M 61,5542 L 61,5569 M 61,5758 L 61,5766 M 61,5871 L 61,5892 M 61,5975 L 61,6015 M 61,6230 L 61,6236 M 61, 3118 z" style={{ '--duration': '69.75s' } as CSSProperties} />
                      <path stroke="#FFBD1E" d="M 76,0 L 76,15 M 76,115 L 76,160 M 76,291 L 76,321 M 76,384 L 76,411 M 76,436 L 76,484 M 76,702 L 76,750 M 76,929 L 76,942 M 76,1048 L 76,1082 M 76,1201 L 76,1253 M 76,1368 L 76,1418 M 76,1443 L 76,1485 M 76,1678 L 76,1706 M 76,1758 L 76,1771 M 76,1903 L 76,1908 M 76,2035 L 76,2048 M 76,2280 L 76,2284 M 76,2456 L 76,2486 M 76,2672 L 76,2695 M 76,2718 L 76,2732 M 76,2965 L 76,3016 M 76,3078 L 76,3104 M 76,3118 L 76,3133 M 76,3233 L 76,3278 M 76,3409 L 76,3439 M 76,3502 L 76,3529 M 76,3554 L 76,3602 M 76,3820 L 76,3868 M 76,4047 L 76,4060 M 76,4166 L 76,4200 M 76,4319 L 76,4371 M 76,4486 L 76,4536 M 76,4561 L 76,4603 M 76,4796 L 76,4824 M 76,4876 L 76,4889 M 76,5021 L 76,5026 M 76,5153 L 76,5166 M 76,5398 L 76,5402 M 76,5574 L 76,5604 M 76,5790 L 76,5813 M 76,5836 L 76,5850 M 76,6083 L 76,6134 M 76,6196 L 76,6222 M 76, 3118 z" style={{ '--duration': '59.95s' } as CSSProperties} />
                      <path stroke="#FFBD1E" d="M 91,0 L 91,17 M 91,245 L 91,252 M 91,356 L 91,375 M 91,398 L 91,415 M 91,501 L 91,526 M 91,681 L 91,699 M 91,843 L 91,864 M 91,968 L 91,976 M 91,1058 L 91,1101 M 91,1321 L 91,1361 M 91,1522 L 91,1567 M 91,1632 L 91,1650 M 91,1755 L 91,1775 M 91,1960 L 91,1988 M 91,2218 L 91,2270 M 91,2420 L 91,2463 M 91,2647 L 91,2689 M 91,2886 L 91,2889 M 91,3095 L 91,3118 M 91,3118 L 91,3135 M 91,3363 L 91,3370 M 91,3474 L 91,3493 M 91,3516 L 91,3533 M 91,3619 L 91,3644 M 91,3799 L 91,3817 M 91,3961 L 91,3982 M 91,4086 L 91,4094 M 91,4176 L 91,4219 M 91,4439 L 91,4479 M 91,4640 L 91,4685 M 91,4750 L 91,4768 M 91,4873 L 91,4893 M 91,5078 L 91,5106 M 91,5336 L 91,5388 M 91,5538 L 91,5581 M 91,5765 L 91,5807 M 91,6004 L 91,6007 M 91,6213 L 91,6236 M 91, 3118 z" style={{ '--duration': '35.43s' } as CSSProperties} />
                      <path stroke="#FE848F" d="M 106,0 L 106,15 M 106,239 L 106,248 M 106,473 L 106,483 M 106,675 L 106,681 M 106,890 L 106,897 M 106,1129 L 106,1171 M 106,1256 L 106,1272 M 106,1300 L 106,1322 M 106,1461 L 106,1464 M 106,1609 L 106,1624 M 106,1647 L 106,1689 M 106,1752 L 106,1768 M 106,1891 L 106,1917 M 106,1938 L 106,1947 M 106,2142 L 106,2163 M 106,2241 L 106,2284 M 106,2444 L 106,2472 M 106,2643 L 106,2679 M 106,2800 L 106,2836 M 106,2975 L 106,3026 M 106,3118 L 106,3133 M 106,3357 L 106,3366 M 106,3591 L 106,3601 M 106,3793 L 106,3799 M 106,4008 L 106,4015 M 106,4247 L 106,4289 M 106,4374 L 106,4390 M 106,4418 L 106,4440 M 106,4579 L 106,4582 M 106,4727 L 106,4742 M 106,4765 L 106,4807 M 106,4870 L 106,4886 M 106,5009 L 106,5035 M 106,5056 L 106,5065 M 106,5260 L 106,5281 M 106,5359 L 106,5402 M 106,5562 L 106,5590 M 106,5761 L 106,5797 M 106,5918 L 106,5954 M 106,6093 L 106,6144 M 106, 3118 z" style={{ '--duration': '90.46s' } as CSSProperties} />
                      <path stroke="#00F8F1" d="M 136,0 L 136,45 M 136,265 L 136,294 M 136,502 L 136,519 M 136,553 L 136,598 M 136,773 L 136,777 M 136,903 L 136,950 M 136,982 L 136,1016 M 136,1191 L 136,1195 M 136,1274 L 136,1321 M 136,1483 L 136,1512 M 136,1663 L 136,1690 M 136,1747 L 136,1774 M 136,1925 L 136,1929 M 136,2104 L 136,2116 M 136,2323 L 136,2341 M 136,2441 L 136,2465 M 136,2651 L 136,2672 M 136,2885 L 136,2902 M 136,3118 L 136,3163 M 136,3383 L 136,3412 M 136,3620 L 136,3637 M 136,3671 L 136,3716 M 136,3891 L 136,3895 M 136,4021 L 136,4068 M 136,4100 L 136,4134 M 136,4309 L 136,4313 M 136,4392 L 136,4439 M 136,4601 L 136,4630 M 136,4781 L 136,4808 M 136,4865 L 136,4892 M 136,5043 L 136,5047 M 136,5222 L 136,5234 M 136,5441 L 136,5459 M 136,5559 L 136,5583 M 136,5769 L 136,5790 M 136,6003 L 136,6020 M 136, 3118 z" style={{ '--duration': '40.21s' } as CSSProperties} />
                      <path stroke="#FFBD1E" d="M 181,0 L 181,20 M 181,200 L 181,224 M 181,448 L 181,497 M 181,605 L 181,653 M 181,882 L 181,893 M 181,1043 L 181,1061 M 181,1231 L 181,1275 M 181,1468 L 181,1519 M 181,1605 L 181,1657 M 181,1867 L 181,1874 M 181,2035 L 181,2065 M 181,2296 L 181,2338 M 181,2424 L 181,2449 M 181,2548 L 181,2559 M 181,2584 L 181,2591 M 181,2737 L 181,2780 M 181,2981 L 181,3024 M 181,3078 L 181,3107 M 181,3118 L 181,3138 M 181,3318 L 181,3342 M 181,3566 L 181,3615 M 181,3723 L 181,3771 M 181,4000 L 181,4011 M 181,4161 L 181,4179 M 181,4349 L 181,4393 M 181,4586 L 181,4637 M 181,4723 L 181,4775 M 181,4985 L 181,4992 M 181,5153 L 181,5183 M 181,5414 L 181,5456 M 181,5542 L 181,5567 M 181,5666 L 181,5677 M 181,5702 L 181,5709 M 181,5855 L 181,5898 M 181,6099 L 181,6142 M 181,6196 L 181,6225 M 181, 3118 z" style={{ '--duration': '78.36s' } as CSSProperties} />
                      <path stroke="#00F8F1" d="M 226,0 L 226,22 M 226,195 L 226,236 M 226,340 L 226,363 M 226,542 L 226,583 M 226,673 L 226,721 M 226,760 L 226,791 M 226,947 L 226,994 M 226,1105 L 226,1123 M 226,1231 L 226,1283 M 226,1448 L 226,1487 M 226,1548 L 226,1587 M 226,1665 L 226,1715 M 226,1748 L 226,1773 M 226,1806 L 226,1848 M 226,1951 L 226,1963 M 226,2066 L 226,2089 M 226,2286 L 226,2318 M 226,2531 L 226,2552 M 226,2672 L 226,2684 M 226,2897 L 226,2917 M 226,3018 L 226,3053 M 226,3118 L 226,3140 M 226,3313 L 226,3354 M 226,3458 L 226,3481 M 226,3660 L 226,3701 M 226,3791 L 226,3839 M 226,3878 L 226,3909 M 226,4065 L 226,4112 M 226,4223 L 226,4241 M 226,4349 L 226,4401 M 226,4566 L 226,4605 M 226,4666 L 226,4705 M 226,4783 L 226,4833 M 226,4866 L 226,4891 M 226,4924 L 226,4966 M 226,5069 L 226,5081 M 226,5184 L 226,5207 M 226,5404 L 226,5436 M 226,5649 L 226,5670 M 226,5790 L 226,5802 M 226,6015 L 226,6035 M 226,6136 L 226,6171 M 226, 3118 z" style={{ '--duration': '44.65s' } as CSSProperties} />
                      <path stroke="#FE848F" d="M 271,0 L 271,33 M 271,258 L 271,280 M 271,490 L 271,505 M 271,696 L 271,742 M 271,766 L 271,776 M 271,1001 L 271,1045 M 271,1153 L 271,1156 M 271,1236 L 271,1271 M 271,1497 L 271,1520 M 271,1629 L 271,1663 M 271,1750 L 271,1799 M 271,1851 L 271,1875 M 271,1964 L 271,2007 M 271,2136 L 271,2181 M 271,2325 L 271,2352 M 271,2480 L 271,2523 M 271,2664 L 271,2685 M 271,2905 L 271,2953 M 271,3037 L 271,3062 M 271,3118 L 271,3151 M 271,3376 L 271,3398 M 271,3608 L 271,3623 M 271,3814 L 271,3860 M 271,3884 L 271,3894 M 271,4119 L 271,4163 M 271,4271 L 271,4274 M 271,4354 L 271,4389 M 271,4615 L 271,4638 M 271,4747 L 271,4781 M 271,4868 L 271,4917 M 271,4969 L 271,4993 M 271,5082 L 271,5125 M 271,5254 L 271,5299 M 271,5443 L 271,5470 M 271,5598 L 271,5641 M 271,5782 L 271,5803 M 271,6023 L 271,6071 M 271,6155 L 271,6180 M 271, 3118 z" style={{ '--duration': '84.34s' } as CSSProperties} />
                      <path stroke="#00F8F1" d="M 301,0 L 301,33 M 301,246 L 301,293 M 301,389 L 301,399 M 301,571 L 301,584 M 301,654 L 301,662 M 301,770 L 301,783 M 301,822 L 301,840 M 301,919 L 301,960 M 301,1138 L 301,1174 M 301,1386 L 301,1419 M 301,1475 L 301,1513 M 301,1732 L 301,1755 M 301,1846 L 301,1871 M 301,1948 L 301,1951 M 301,2020 L 301,2043 M 301,2185 L 301,2205 M 301,2398 L 301,2402 M 301,2607 L 301,2640 M 301,2748 L 301,2755 M 301,2976 L 301,2989 M 301,3118 L 301,3151 M 301,3364 L 301,3411 M 301,3507 L 301,3517 M 301,3689 L 301,3702 M 301,3772 L 301,3780 M 301,3888 L 301,3901 M 301,3940 L 301,3958 M 301,4037 L 301,4078 M 301,4256 L 301,4292 M 301,4504 L 301,4537 M 301,4593 L 301,4631 M 301,4850 L 301,4873 M 301,4964 L 301,4989 M 301,5066 L 301,5069 M 301,5138 L 301,5161 M 301,5303 L 301,5323 M 301,5516 L 301,5520 M 301,5725 L 301,5758 M 301,5866 L 301,5873 M 301,6094 L 301,6107 M 301, 3118 z" style={{ '--duration': '67.14s' } as CSSProperties} />
                      <path stroke="#FFBD1E" d="M 361,0 L 361,31 M 361,235 L 361,261 M 361,378 L 361,386 M 361,564 L 361,610 M 361,634 L 361,677 M 361,813 L 361,828 M 361,884 L 361,887 M 361,917 L 361,945 M 361,1073 L 361,1116 M 361,1141 L 361,1172 M 361,1303 L 361,1351 M 361,1398 L 361,1424 M 361,1625 L 361,1640 M 361,1780 L 361,1787 M 361,1995 L 361,2040 M 361,2243 L 361,2265 M 361,2443 L 361,2448 M 361,2662 L 361,2676 M 361,2820 L 361,2864 M 361,3039 L 361,3064 M 361,3118 L 361,3149 M 361,3353 L 361,3379 M 361,3496 L 361,3504 M 361,3682 L 361,3728 M 361,3752 L 361,3795 M 361,3931 L 361,3946 M 361,4002 L 361,4005 M 361,4035 L 361,4063 M 361,4191 L 361,4234 M 361,4259 L 361,4290 M 361,4421 L 361,4469 M 361,4516 L 361,4542 M 361,4743 L 361,4758 M 361,4898 L 361,4905 M 361,5113 L 361,5158 M 361,5361 L 361,5383 M 361,5561 L 361,5566 M 361,5780 L 361,5794 M 361,5938 L 361,5982 M 361,6157 L 361,6182 M 361, 3118 z" style={{ '--duration': '75.18s' } as CSSProperties} />
                      <path stroke="#00F8F1" d="M 391,0 L 391,51 M 391,276 L 391,283 M 391,463 L 391,510 M 391,589 L 391,619 M 391,769 L 391,812 M 391,881 L 391,885 M 391,1116 L 391,1145 M 391,1255 L 391,1289 M 391,1318 L 391,1370 M 391,1458 L 391,1499 M 391,1667 L 391,1704 M 391,1867 L 391,1882 M 391,1957 L 391,1993 M 391,2099 L 391,2148 M 391,2174 L 391,2214 M 391,2358 L 391,2386 M 391,2443 L 391,2463 M 391,2516 L 391,2557 M 391,2763 L 391,2806 M 391,2894 L 391,2897 M 391,3008 L 391,3028 M 391,3085 L 391,3100 M 391,3118 L 391,3169 M 391,3394 L 391,3401 M 391,3581 L 391,3628 M 391,3707 L 391,3737 M 391,3887 L 391,3930 M 391,3999 L 391,4003 M 391,4234 L 391,4263 M 391,4373 L 391,4407 M 391,4436 L 391,4488 M 391,4576 L 391,4617 M 391,4785 L 391,4822 M 391,4985 L 391,5000 M 391,5075 L 391,5111 M 391,5217 L 391,5266 M 391,5292 L 391,5332 M 391,5476 L 391,5504 M 391,5561 L 391,5581 M 391,5634 L 391,5675 M 391,5881 L 391,5924 M 391,6012 L 391,6015 M 391,6126 L 391,6146 M 391,6203 L 391,6218 M 391, 3118 z" style={{ '--duration': '90.49s' } as CSSProperties} />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Stack Cards Collection */}
              <div className="stack-cards">
                {stackModules.map((item, index) => {
                  const isGone = index < activeIndex
                  const isCurrent = index === activeIndex
                  const offset = index - activeIndex

                  return (
                    <div
                      key={item.id}
                      className={`stack-cards__item ${isCurrent ? 'is-active' : ''} ${isGone ? 'is-gone' : ''}`}
                      style={{
                        '--card-offset': offset,
                        '--card-z': isCurrent ? 12 : isGone ? 0 : 12 - offset,
                      } as CSSProperties}
                      onClick={() => jumpToCard(index)}
                      title={`Click to view ${item.name}`}
                    >
                      <div className="inner">
                        <h3>{item.name}:</h3>
                        <p>{item.shortSnippet}</p>
                        <div className="counter">{item.counter}</div>
                      </div>
                      <div className="shadow"></div>
                    </div>
                  )
                })}
              </div>

              {/* Stage bottom footer */}
              <div className="stack-stage-footer">
                <span className="scroll-cue">
                  <LocalIcon name="activity" size={13} />
                  {activeIndex === stackModules.length - 1 ? 'All cards peeled • Scroll down for next section' : `Scroll mouse down to peel card (${activeIndex + 1}/6)`}
                </span>
                <div className="stack-stepper">
                  <button
                    type="button"
                    className="stack-stepper-btn"
                    disabled={activeIndex === 0}
                    onClick={() => jumpToCard(Math.max(0, activeIndex - 1))}
                    aria-label="Previous card"
                  >
                    <LocalIcon name="chevron" size={14} />
                  </button>
                  <span className="stack-stepper-label">{activeModule.counter}</span>
                  <button
                    type="button"
                    className="stack-stepper-btn"
                    disabled={activeIndex === stackModules.length - 1}
                    onClick={() => jumpToCard(Math.min(stackModules.length - 1, activeIndex + 1))}
                    aria-label="Next card"
                  >
                    <LocalIcon name="chevron" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Matter appears according to active card */}
          <div className="stack-right-column">
            <div className="matter-panel" key={activeModule.id}>
              <div className="matter-top-bar">
                <div className="matter-badges">
                  <span className="matter-pill-step">MODULE {activeModule.counter}</span>
                  <span className="matter-pill-cat">{activeModule.category}</span>
                </div>
                <span className={`status-pill ${activeModule.stateColor}`}>
                  <i className="status-live-dot" /> {activeModule.state}
                </span>
              </div>

              <h3 className="matter-title">{activeModule.fullTitle}</h3>
              <p className="matter-lede">{activeModule.lede}</p>

              <div className="matter-capabilities-grid">
                {activeModule.capabilities.map((cap, i) => (
                  <div className="matter-cap-card" key={i}>
                    <span className="matter-cap-icon">
                      <LocalIcon name={cap.icon} size={15} />
                    </span>
                    <div>
                      <strong>{cap.title}</strong>
                      <p>{cap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="matter-bottom-row">
                <div className="matter-metric-card">
                  <span className="matter-metric-number">{activeModule.metric.value}</span>
                  <span className="matter-metric-text">{activeModule.metric.label}</span>
                </div>

                <div className="matter-pipeline-card">
                  <span className="matter-pipe-eyebrow">INTEGRATED PIPELINE</span>
                  <strong className="matter-pipe-flow">{activeModule.connectedTo}</strong>
                  <div className="matter-submodule-pills">
                    {activeModule.originalModules.map((tag) => (
                      <span key={tag} className="module-tag-chip">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick switcher buttons across all 6 modules */}
              <div className="matter-deck-selector">
                <span className="deck-selector-label">JUMP TO MODULE:</span>
                <div className="deck-pills">
                  {stackModules.map((mod, idx) => (
                    <button
                      key={mod.id}
                      type="button"
                      className={`deck-pill-btn ${idx === activeIndex ? 'is-active' : ''}`}
                      onClick={() => jumpToCard(idx)}
                    >
                      <span>0{idx + 1}</span> {mod.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Card Flow Action Bar */}
              <div className="matter-flow-action">
                {activeIndex === stackModules.length - 1 ? (
                  <button
                    type="button"
                    className="next-section-cta"
                    onClick={scrollToNextSection}
                  >
                    <span>All 6 Cards Complete • Continue to Benefits Section</span>
                    <LocalIcon name="arrow" size={16} />
                  </button>
                ) : (
                  <div className="card-scroll-helper">
                    <span>Mouse scroll down to peel Card {activeIndex + 1} of 6</span>
                    <button
                      type="button"
                      className="card-quick-next"
                      onClick={() => jumpToCard(activeIndex + 1)}
                    >
                      Peel Next Card →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
