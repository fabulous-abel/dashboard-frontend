import PageHeader from '../../components/ui/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const HRDashboard = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t('hr.dashboard.totalEmployees'), value: '384', colorClass: 'text-indigo' },
    { label: t('hr.dashboard.onLeave'), value: '18', colorClass: 'text-red' },
    { label: t('hr.dashboard.openPositions'), value: '7', colorClass: 'text-cyan' },
    { label: t('hr.dashboard.payrollDue'), value: '$124K', colorClass: 'text-purple' },
  ];

  const recentHires = [
    { name: 'Hanna Gebremedhin', department: 'Youth Ministry', date: 'Apr 18, 2026' },
    { name: 'Samuel Tesfaye', department: 'Finance', date: 'Apr 15, 2026' },
    { name: 'Bethlehem Assefa', department: 'Sunday School', date: 'Apr 10, 2026' },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title={t('hr.dashboard.title')}
        subtitle={t('hr.dashboard.subtitle')}
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
        <h2>{t('hr.dashboard.recentHires')}</h2>
        <div className="table-container" style={{ marginTop: '1rem' }}>
          <table>
            <thead>
              <tr>
                <th>{t('hr.dashboard.table.name')}</th>
                <th>{t('hr.dashboard.table.department')}</th>
                <th>{t('hr.dashboard.table.date')}</th>
              </tr>
            </thead>
            <tbody>
              {recentHires.map((hire, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{hire.name}</td>
                  <td>{hire.department}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{hire.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
