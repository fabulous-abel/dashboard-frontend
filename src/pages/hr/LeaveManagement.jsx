import { useState } from 'react';
import { Check, X } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const MOCK_REQUESTS = [
  { id: 'LV-001', name: 'Sara Mengistu', type: 'Annual Leave', from: 'Apr 20, 2026', to: 'Apr 25, 2026', days: 5, status: 'Pending' },
  { id: 'LV-002', name: 'Dawit Tadesse', type: 'Sick Leave', from: 'Apr 18, 2026', to: 'Apr 19, 2026', days: 2, status: 'Approved' },
  { id: 'LV-003', name: 'Meron Alemu', type: 'Personal Leave', from: 'Apr 22, 2026', to: 'Apr 22, 2026', days: 1, status: 'Pending' },
  { id: 'LV-004', name: 'Yohannes Bekele', type: 'Annual Leave', from: 'May 01, 2026', to: 'May 10, 2026', days: 10, status: 'Pending' },
  { id: 'LV-005', name: 'Hanna Gebremedhin', type: 'Maternity Leave', from: 'Mar 15, 2026', to: 'Jun 15, 2026', days: 90, status: 'Approved' },
  { id: 'LV-006', name: 'Abebe Kebede', type: 'Sick Leave', from: 'Apr 10, 2026', to: 'Apr 11, 2026', days: 2, status: 'Rejected' },
];

const LeaveManagement = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? MOCK_REQUESTS
    : MOCK_REQUESTS.filter((r) => r.status === filter);

  const getBadgeClass = (status) => {
    if (status === 'Approved') return 'badge badge-active';
    if (status === 'Rejected') return 'badge badge-inactive';
    return 'badge badge-secondary';
  };

  return (
    <div className="page-container">
      <PageHeader
        title={t('hr.leave.title')}
        subtitle={t('hr.leave.subtitle')}
      />
      <div className="content-panel glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="directory-header">
          <h2>{t('hr.leave.listTitle')}</h2>
          <div className="grade-tabs">
            {['All', 'Pending', 'Approved', 'Rejected'].map((tab) => (
              <button
                key={tab}
                className={`grade-tab ${filter === tab ? 'active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {t(`hr.leave.filters.${tab.toLowerCase()}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="table-container" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th>{t('hr.leave.table.employee')}</th>
                <th>{t('hr.leave.table.type')}</th>
                <th>{t('hr.leave.table.from')}</th>
                <th>{t('hr.leave.table.to')}</th>
                <th>{t('hr.leave.table.days')}</th>
                <th>{t('hr.leave.table.status')}</th>
                <th>{t('hr.leave.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-secondary" style={{ padding: '2rem' }}>
                    {t('hr.leave.noResults')}
                  </td>
                </tr>
              ) : (
                filtered.map((req) => (
                  <tr key={req.id}>
                    <td style={{ fontWeight: 600 }}>{req.name}</td>
                    <td>{req.type}</td>
                    <td style={{ fontSize: '0.82rem' }}>{req.from}</td>
                    <td style={{ fontSize: '0.82rem' }}>{req.to}</td>
                    <td style={{ fontWeight: 600 }}>{req.days}</td>
                    <td><span className={getBadgeClass(req.status)}>{req.status}</span></td>
                    <td>
                      {req.status === 'Pending' ? (
                        <div className="actions-cell">
                          <button className="btn-icon" title="Approve" style={{ color: 'var(--accent-green)' }}>
                            <Check size={16} />
                          </button>
                          <button className="btn-icon" title="Reject" style={{ color: 'var(--accent-secondary)' }}>
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
