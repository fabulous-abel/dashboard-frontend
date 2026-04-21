import PageHeader from '../../components/ui/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const DEPARTMENTS = [
  { name: 'Sunday School', head: 'Abebe Kebede', members: 45, status: 'Active' },
  { name: 'Human Resources', head: 'Tigist Hailu', members: 8, status: 'Active' },
  { name: 'Youth Ministry', head: 'Dawit Tadesse', members: 32, status: 'Active' },
  { name: 'Choir', head: 'Meron Alemu', members: 28, status: 'Active' },
  { name: 'Finance', head: 'Sara Mengistu', members: 5, status: 'Active' },
  { name: 'Outreach', head: 'Yohannes Bekele', members: 15, status: 'Inactive' },
];

const Departments = () => {
  const { t } = useLanguage();

  return (
    <div className="page-container">
      <PageHeader
        title={t('superadmin.departments.title')}
        subtitle={t('superadmin.departments.subtitle')}
      />
      <div className="dashboard-grid animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {DEPARTMENTS.map((dept) => (
          <div key={dept.name} className="stat-card glass-panel" style={{ gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ textTransform: 'none', letterSpacing: 0 }}>{dept.name}</h3>
              <span className={dept.status === 'Active' ? 'badge badge-active' : 'badge badge-inactive'}>
                {dept.status}
              </span>
            </div>
            <div className="stat-value text-indigo" style={{ fontSize: '1.75rem' }}>{dept.members}</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              {t('superadmin.departments.headLabel')}: {dept.head}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
