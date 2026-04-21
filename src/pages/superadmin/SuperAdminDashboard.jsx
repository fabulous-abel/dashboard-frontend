import PageHeader from '../../components/ui/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const SuperAdminDashboard = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t('superadmin.dashboard.totalUsers'), value: '2,847', colorClass: 'text-indigo' },
    { label: t('superadmin.dashboard.activeDepartments'), value: '12', colorClass: 'text-cyan' },
    { label: t('superadmin.dashboard.systemHealth'), value: '99.8%', colorClass: 'text-cyan' },
    { label: t('superadmin.dashboard.pendingApprovals'), value: '23', colorClass: 'text-red' },
  ];

  const recentActivity = [
    { action: 'User role updated', user: 'Abebe Kebede', time: '2 min ago', type: 'update' },
    { action: 'New department created', user: 'System', time: '15 min ago', type: 'create' },
    { action: 'Backup completed', user: 'System', time: '1 hour ago', type: 'system' },
    { action: 'User account suspended', user: 'Admin', time: '2 hours ago', type: 'warning' },
    { action: 'Configuration changed', user: 'Tigist Hailu', time: '3 hours ago', type: 'update' },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title={t('superadmin.dashboard.title')}
        subtitle={t('superadmin.dashboard.subtitle')}
      />
      <div className="dashboard-grid animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card glass-panel">
            <h3>{stat.label}</h3>
            <div className={`stat-value ${stat.colorClass}`}>{stat.value}</div>
          </div>
        ))}
      </div>
      <div className="content-panel glass-panel mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2>{t('superadmin.dashboard.recentActivity')}</h2>
        <div className="table-container" style={{ marginTop: '1rem' }}>
          <table>
            <thead>
              <tr>
                <th>{t('superadmin.dashboard.table.action')}</th>
                <th>{t('superadmin.dashboard.table.user')}</th>
                <th>{t('superadmin.dashboard.table.time')}</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item, i) => (
                <tr key={i}>
                  <td>{item.action}</td>
                  <td>{item.user}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
