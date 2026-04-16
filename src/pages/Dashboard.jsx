import PageHeader from '../components/ui/PageHeader';
import { useLanguage } from '../context/LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="page-container">
      <PageHeader
        title={t('dashboard.title')}
        subtitle={t('dashboard.subtitle')}
      />
      <div className="dashboard-grid animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="stat-card glass-panel">
          <h3>{t('dashboard.totalStudents')}</h3>
          <div className="stat-value text-cyan">156</div>
        </div>
        <div className="stat-card glass-panel">
          <h3>{t('dashboard.activeTeachers')}</h3>
          <div className="stat-value text-indigo">12</div>
        </div>
        <div className="stat-card glass-panel">
          <h3>{t('dashboard.classesToday')}</h3>
          <div className="stat-value text-purple">4</div>
        </div>
      </div>
      <div className="content-panel glass-panel mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2>{t('dashboard.recentActivity')}</h2>
        <p className="text-secondary mt-2">{t('dashboard.recentActivityPlaceholder')}</p>
      </div>
    </div>
  );
};

export default Dashboard;
