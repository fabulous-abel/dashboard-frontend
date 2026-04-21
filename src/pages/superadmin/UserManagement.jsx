import { useState } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const MOCK_USERS = [
  { id: 'USR-001', name: 'Abebe Kebede', email: 'abebe@church.org', role: 'Super Admin', status: 'Active' },
  { id: 'USR-002', name: 'Tigist Hailu', email: 'tigist@church.org', role: 'HR Manager', status: 'Active' },
  { id: 'USR-003', name: 'Dawit Tadesse', email: 'dawit@church.org', role: 'Teacher', status: 'Active' },
  { id: 'USR-004', name: 'Sara Mengistu', email: 'sara@church.org', role: 'HR Staff', status: 'On Leave' },
  { id: 'USR-005', name: 'Yohannes Bekele', email: 'yohannes@church.org', role: 'Teacher', status: 'Active' },
  { id: 'USR-006', name: 'Meron Alemu', email: 'meron@church.org', role: 'Facilitator', status: 'Inactive' },
];

const UserManagement = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const filtered = MOCK_USERS.filter((u) =>
    `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(search.toLowerCase())
  );

  const getBadgeClass = (status) => {
    if (status === 'Active') return 'badge badge-active';
    if (status === 'Inactive') return 'badge badge-inactive';
    return 'badge badge-secondary';
  };

  return (
    <div className="page-container">
      <PageHeader
        title={t('superadmin.users.title')}
        subtitle={t('superadmin.users.subtitle')}
      />
      <div className="content-panel glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="directory-header">
          <div>
            <h2>{t('superadmin.users.directoryTitle')}</h2>
            <p className="directory-meta mt-2">
              {t('superadmin.users.summary', { count: filtered.length })}
            </p>
          </div>
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder={t('superadmin.users.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th>{t('superadmin.users.table.name')}</th>
                <th>{t('superadmin.users.table.id')}</th>
                <th>{t('superadmin.users.table.email')}</th>
                <th>{t('superadmin.users.table.role')}</th>
                <th>{t('superadmin.users.table.status')}</th>
                <th>{t('superadmin.users.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-secondary" style={{ padding: '2rem' }}>
                    {t('superadmin.users.noResults')}
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id}>
                    <td style={{ fontWeight: 600 }}>{user.name}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{user.id}</td>
                    <td>{user.email}</td>
                    <td><span className="badge badge-secondary">{user.role}</span></td>
                    <td><span className={getBadgeClass(user.status)}>{user.status}</span></td>
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

export default UserManagement;
