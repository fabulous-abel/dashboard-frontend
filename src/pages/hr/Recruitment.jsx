import { useState } from 'react';
import { Search } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const MOCK_POSITIONS = [
  { id: 'POS-001', title: 'Senior Teacher', department: 'Sunday School', applicants: 12, status: 'Open', posted: 'Apr 05, 2026' },
  { id: 'POS-002', title: 'Accountant', department: 'Finance', applicants: 8, status: 'Open', posted: 'Apr 08, 2026' },
  { id: 'POS-003', title: 'Youth Coordinator', department: 'Youth Ministry', applicants: 15, status: 'Open', posted: 'Apr 01, 2026' },
  { id: 'POS-004', title: 'Choir Director', department: 'Choir', applicants: 6, status: 'Interviewing', posted: 'Mar 20, 2026' },
  { id: 'POS-005', title: 'Office Assistant', department: 'Administration', applicants: 22, status: 'Open', posted: 'Apr 12, 2026' },
  { id: 'POS-006', title: 'IT Support', department: 'Administration', applicants: 9, status: 'Closed', posted: 'Mar 01, 2026' },
  { id: 'POS-007', title: 'Outreach Volunteer Lead', department: 'Outreach', applicants: 4, status: 'Open', posted: 'Apr 15, 2026' },
];

const Recruitment = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const filtered = MOCK_POSITIONS.filter((p) =>
    `${p.title} ${p.department}`.toLowerCase().includes(search.toLowerCase())
  );

  const getBadgeClass = (status) => {
    if (status === 'Open') return 'badge badge-active';
    if (status === 'Closed') return 'badge badge-inactive';
    return 'badge badge-secondary';
  };

  return (
    <div className="page-container">
      <PageHeader
        title={t('hr.recruitment.title')}
        subtitle={t('hr.recruitment.subtitle')}
      />
      <div className="content-panel glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="directory-header">
          <div>
            <h2>{t('hr.recruitment.listTitle')}</h2>
            <p className="directory-meta mt-2">
              {t('hr.recruitment.summary', { count: filtered.length })}
            </p>
          </div>
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder={t('hr.recruitment.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th>{t('hr.recruitment.table.title')}</th>
                <th>{t('hr.recruitment.table.department')}</th>
                <th>{t('hr.recruitment.table.applicants')}</th>
                <th>{t('hr.recruitment.table.posted')}</th>
                <th>{t('hr.recruitment.table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-secondary" style={{ padding: '2rem' }}>
                    {t('hr.recruitment.noResults')}
                  </td>
                </tr>
              ) : (
                filtered.map((pos) => (
                  <tr key={pos.id}>
                    <td style={{ fontWeight: 600 }}>{pos.title}</td>
                    <td>{pos.department}</td>
                    <td>
                      <span className="badge badge-secondary">{pos.applicants}</span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{pos.posted}</td>
                    <td><span className={getBadgeClass(pos.status)}>{pos.status}</span></td>
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

export default Recruitment;
