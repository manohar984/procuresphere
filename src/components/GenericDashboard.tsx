import React from 'react';
import { IconName, Icon, Logo } from '../App';

interface GenericDashboardProps {
  role: string;
}

export const GenericDashboard: React.FC<GenericDashboardProps> = ({ role }) => {
  let eyebrow = '';
  let title = '';
  let workspaceItems = [];
  let userInitial = 'U';

  switch (role) {
    case 'manager':
      eyebrow = 'EXECUTIVE WORKSPACE';
      title = 'Manager overview';
      workspaceItems = ['Executive Desk', 'Approvals', 'Team Performance'];
      userInitial = 'M';
      break;
    case 'REQUESTER':
      eyebrow = 'REQUESTER WORKSPACE';
      title = 'My Requests';
      workspaceItems = ['My Requests', 'Policy guidance', 'Budget visibility'];
      userInitial = 'R';
      break;
    case 'PROCUREMENT':
      eyebrow = 'PROCUREMENT WORKSPACE';
      title = 'Procurement overview';
      workspaceItems = ['Sourcing', 'Suppliers', 'Purchase Orders'];
      userInitial = 'P';
      break;
    case 'FINANCE':
      eyebrow = 'FINANCE WORKSPACE';
      title = 'Finance overview';
      workspaceItems = ['Invoices', 'Match Exceptions', 'Spend Ledger'];
      userInitial = 'F';
      break;
    case 'LEGAL':
      eyebrow = 'LEGAL WORKSPACE';
      title = 'Legal overview';
      workspaceItems = ['Contracts', 'Compliance', 'Vendor Risk'];
      userInitial = 'L';
      break;
    case 'STORES':
      eyebrow = 'STORES WORKSPACE';
      title = 'Stores overview';
      workspaceItems = ['Goods Receipt', 'Inventory', 'Quality Control'];
      userInitial = 'S';
      break;
    case 'VENDOR':
      eyebrow = 'VENDOR WORKSPACE';
      title = 'Vendor overview';
      workspaceItems = ['My Bids', 'Purchase Orders', 'Invoices'];
      userInitial = 'V';
      break;
    default:
      eyebrow = `${role} WORKSPACE`;
      title = `${role} overview`;
      workspaceItems = ['Dashboard', 'Activity', 'Settings'];
      userInitial = role.charAt(0).toUpperCase();
  }

  return (
    <>
      <div className="role-sidebar">
        <Logo compact />
        <span className="sidebar-label" style={{ marginTop: '30px' }}>WORKSPACE</span>
        {workspaceItems.map((item, i) => (
          <div key={item} className={`sidebar-item ${i === 0 ? 'selected' : ''}`}>
            <Icon name={(i === 0 ? 'grid' : 'file') as IconName} size={18} />{item}
          </div>
        ))}
        <span className="sidebar-label" style={{ marginTop: '30px' }}>ACCOUNT</span>
        <div className="sidebar-item"><Icon name="shield" size={18} />Controls</div>
      </div>
      
      <div className="role-main generic-dashboard-wrapper" style={{ background: '#fff', height: '100%', padding: '34px 38px', borderRadius: '16px 0 0 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <small style={{ color: '#64748b', fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase' }}>{eyebrow}</small>
            <h2 style={{ fontSize: '28px', fontWeight: 750, color: '#0f1b2d', margin: '6px 0 0 0', letterSpacing: '-0.02em' }}>{title}</h2>
          </div>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#eff6ff', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 750, fontSize: '16px', border: '1.5px solid #dbeafe' }}>
            {userInitial}
          </div>
        </div>

        <div className="generic-dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
          <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '22px 24px', background: '#fff', boxShadow: '0 2px 8px rgba(15,23,42,0.03)' }}>
            <small style={{ color: '#64748b', fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.06em' }}>OPEN ITEMS</small>
            <strong style={{ display: 'block', fontSize: '38px', fontWeight: 800, color: '#0f1b2d', margin: '8px 0', letterSpacing: '-0.03em', lineHeight: 1.1 }}>24</strong>
            <span style={{ color: 'var(--blue)', fontSize: '13.5px', fontWeight: 600 }}>Illustrative view</span>
          </div>
          <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '22px 24px', background: '#fff', boxShadow: '0 2px 8px rgba(15,23,42,0.03)' }}>
            <small style={{ color: '#64748b', fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.06em' }}>ON TRACK</small>
            <strong style={{ display: 'block', fontSize: '38px', fontWeight: 800, color: '#0f1b2d', margin: '8px 0', letterSpacing: '-0.03em', lineHeight: 1.1 }}>84<span style={{ fontSize: '22px', color: '#64748b', fontWeight: 600 }}>%</span></strong>
            <span style={{ color: 'var(--blue)', fontSize: '13.5px', fontWeight: 600 }}>Illustrative view</span>
          </div>
          <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '22px 24px', background: '#fff', boxShadow: '0 2px 8px rgba(15,23,42,0.03)' }}>
            <small style={{ color: '#64748b', fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.06em' }}>NEXT ACTION</small>
            <strong style={{ display: 'block', fontSize: '38px', fontWeight: 800, color: '#0f1b2d', margin: '8px 0', letterSpacing: '-0.03em', lineHeight: 1.1 }}>06</strong>
            <span style={{ color: 'var(--amber)', fontSize: '13.5px', fontWeight: 600 }}>needs your review</span>
          </div>
        </div>

        <div className="generic-dashboard-table-wrap" style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', marginBottom: '18px', flex: 1, background: '#fff' }}>
          <div className="generic-dashboard-table-inner">
            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr 1.1fr .8fr', padding: '16px 22px', background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', fontSize: '12.5px', fontWeight: 700, color: '#475569', letterSpacing: '0.05em' }}>
              <span>WORK ITEM</span>
              <span>OWNER</span>
              <span>STATUS</span>
              <span style={{ textAlign: 'right' }}>VALUE</span>
            </div>
            
            {[
              { item: 'Operations services', owner: 'Procurement', status: 'In review', statusColor: 'var(--blue)', value: '$28,400' },
              { item: 'Marketing production', owner: 'Finance', status: 'Approved', statusColor: 'var(--blue)', value: '$8,240' },
              { item: 'Cloud infrastructure', owner: 'IT Ops', status: 'Attention', statusColor: 'var(--amber)', value: '$64,100' },
              { item: 'Lab equipment', owner: 'Stores', status: 'Received', statusColor: 'var(--green)', value: '$12,890' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr 1.1fr .8fr', padding: '16px 22px', borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none', fontSize: '14.5px', fontWeight: 550, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '18px', height: '18px', border: '2px solid var(--blue)', borderRadius: '4px', flexShrink: 0 }}></div>
                  <span style={{ color: '#0f1b2d', fontWeight: 650 }}>{row.item}</span>
                </div>
                <span style={{ color: '#475569' }}>{row.owner}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f1b2d', fontWeight: 500 }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: row.statusColor, flexShrink: 0 }}></span>
                  {row.status}
                </span>
                <strong style={{ textAlign: 'right', color: '#0f1b2d', fontWeight: 800, fontSize: '16px' }}>{row.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px', fontWeight: 500 }}>
          <Icon name="activity" size={15} />
          <span>This is illustrative demo content — not live company performance.</span>
        </div>
      </div>
    </>
  );
};
