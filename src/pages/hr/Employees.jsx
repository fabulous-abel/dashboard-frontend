import { useState } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const MOCK_EMPLOYEES = [
  { id: 'EMP-001', name: 'Abebe Kebede', department: 'Administration', position: 'Director', status: 'Active', phone: '+251 911 234 567' },
  { id: 'EMP-002', name: 'Tigist Hailu', department: 'HR', position: 'HR Manager', status: 'Active', phone: '+251 912 345 678' },
  { id: 'EMP-003', name: 'Dawit Tadesse', department: 'Sunday School', position: 'Senior Teacher', status: 'Active', phone: '+251 913 456 789' },
  { id: 'EMP-004', name: 'Sara Mengistu', department: 'Finance', position: 'Accountant', status: 'On Leave', phone: '+251 914 567 890' },
  { id: 'EMP-005', name: 'Yohannes Bekele', department: 'Youth Ministry', position: 'Coordinator', status: 'Active', phone: '+251 915 678 901' },
  { id: 'EMP-006', name: 'Meron Alemu', department: 'Choir', position: 'Director', status: 'Active', phone: '+251 916 789 012' },
  { id: 'EMP-007', name: 'Hanna Gebremedhin', department: 'Outreach', position: 'Volunteer Lead', status: 'Active', phone: '+251 917 890 123' },
];

const Employees = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const filtered = MOCK_EMPLOYEES.filter((e) =>
    `${e.name} ${e.department} ${e.position}`.toLowerCase().includes(search.toLowerCase())
  );

  const getBadgeClass = (status) => {
    if (status === 'Active') return 'badge badge-active';
    if (status === 'On Leave') return 'badge badge-secondary';
    return 'badge badge-inactive';
  };

  return (
    <div className="page-container">
      <PageHeader
        title={t('hr.employees.title')}
        subtitle={t('hr.employees.subtitle')}
      />
      <div className="content-panel glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="directory-header">
          <div>
            <h2>{t('hr.employees.directoryTitle')}</h2>
            <p className="directory-meta mt-2">
              {t('hr.employees.summary', { count: filtered.length })}
            </p>
          </div>
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder={t('hr.employees.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="table-container" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th>{t('hr.employees.table.name')}</th>
                <th>{t('hr.employees.table.id')}</th>
                <th>{t('hr.employees.table.department')}</th>
                <th>{t('hr.employees.table.position')}</th>
                <th>{t('hr.employees.table.phone')}</th>
                <th>{t('hr.employees.table.status')}</th>
                <th>{t('hr.employees.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-secondary" style={{ padding: '2rem' }}>
                    {t('hr.employees.noResults')}
                  </td>
                </tr>
              ) : (
                filtered.map((emp) => (
                  <tr key={emp.id}>
                    <td style={{ fontWeight: 600 }}>{emp.name}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{emp.id}</td>
                    <td>{emp.department}</td>
                    <td>{emp.position}</td>
                    <td style={{ fontSize: '0.82rem' }}>{emp.phone}</td>
                    <td><span className={getBadgeClass(emp.status)}>{emp.status}</span></td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-icon" title={t('common.actions.edit')}><Edit size={16} /></button>
                        <button className="btn-icon" title={t('common.actions.delete')}><Trash2 size={16} /></button>
                      </div>
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

export default Employees;
