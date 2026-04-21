import PageHeader from '../../components/ui/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const DEPARTMENTS = [
  { name: 'Administration', headcount: 5, budget: '$45,000', head: 'Abebe Kebede' },
  { name: 'Human Resources', headcount: 8, budget: '$38,000', head: 'Tigist Hailu' },
  { name: 'Sunday School', headcount: 45, budget: '$22,000', head: 'Dawit Tadesse' },
  { name: 'Youth Ministry', headcount: 32, budget: '$18,500', head: 'Yohannes Bekele' },
  { name: 'Finance', headcount: 5, budget: '$52,000', head: 'Sara Mengistu' },
  { name: 'Choir', headcount: 28, budget: '$12,000', head: 'Meron Alemu' },
];

const HRDepartments = () => {
  const { t } = useLanguage();

  return (
    <div className="page-container">
      <PageHeader
        title={t('hr.departments.title')}
        subtitle={t('hr.departments.subtitle')}
      />
      <div className="content-panel glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2>{t('hr.departments.listTitle')}</h2>
        <div className="table-container" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th>{t('hr.departments.table.name')}</th>
                <th>{t('hr.departments.table.head')}</th>
                <th>{t('hr.departments.table.headcount')}</th>
                <th>{t('hr.departments.table.budget')}</th>
              </tr>
            </thead>
            <tbody>
              {DEPARTMENTS.map((dept) => (
                <tr key={dept.name}>
                  <td style={{ fontWeight: 600 }}>{dept.name}</td>
                  <td>{dept.head}</td>
                  <td>
                    <span className="badge badge-secondary">{dept.headcount}</span>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--accent-green)' }}>{dept.budget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HRDepartments;
