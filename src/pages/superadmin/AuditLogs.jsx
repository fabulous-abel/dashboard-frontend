import { useState } from 'react';
import { Search } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const MOCK_LOGS = [
  { id: 'LOG-001', action: 'User Login', user: 'Abebe Kebede', ip: '192.168.1.45', timestamp: '2026-04-20 14:32:10', severity: 'info' },
  { id: 'LOG-002', action: 'Role Changed', user: 'Admin', ip: '192.168.1.1', timestamp: '2026-04-20 14:15:22', severity: 'warning' },
  { id: 'LOG-003', action: 'Password Reset', user: 'Tigist Hailu', ip: '192.168.2.88', timestamp: '2026-04-20 13:50:05', severity: 'info' },
  { id: 'LOG-004', action: 'Failed Login Attempt', user: 'Unknown', ip: '10.0.0.55', timestamp: '2026-04-20 13:22:41', severity: 'error' },
  { id: 'LOG-005', action: 'Settings Updated', user: 'Admin', ip: '192.168.1.1', timestamp: '2026-04-20 12:10:30', severity: 'info' },
  { id: 'LOG-006', action: 'User Account Deleted', user: 'Admin', ip: '192.168.1.1', timestamp: '2026-04-20 11:05:18', severity: 'warning' },
  { id: 'LOG-007', action: 'Backup Created', user: 'System', ip: '—', timestamp: '2026-04-20 06:00:00', severity: 'info' },
];

const AuditLogs = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const filtered = MOCK_LOGS.filter((log) =>
    `${log.action} ${log.user} ${log.ip}`.toLowerCase().includes(search.toLowerCase())
  );

  const severityBadge = (severity) => {
    if (severity === 'error') return 'badge badge-inactive';
    if (severity === 'warning') return 'badge badge-secondary';
    return 'badge badge-active';
  };

  return (
    <div className="page-container">
      <PageHeader
        title={t('superadmin.auditLogs.title')}
        subtitle={t('superadmin.auditLogs.subtitle')}
      />
      <div className="content-panel glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="directory-header">
          <h2>{t('superadmin.auditLogs.listTitle')}</h2>
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder={t('superadmin.auditLogs.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th>{t('superadmin.auditLogs.table.id')}</th>
                <th>{t('superadmin.auditLogs.table.action')}</th>
                <th>{t('superadmin.auditLogs.table.user')}</th>
                <th>{t('superadmin.auditLogs.table.ip')}</th>
                <th>{t('superadmin.auditLogs.table.timestamp')}</th>
                <th>{t('superadmin.auditLogs.table.severity')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-secondary" style={{ padding: '2rem' }}>
                    {t('superadmin.auditLogs.noResults')}
                  </td>
                </tr>
              ) : (
                filtered.map((log) => (
                  <tr key={log.id}>
                    <td style={{ color: 'var(--text-muted)' }}>{log.id}</td>
                    <td style={{ fontWeight: 600 }}>{log.action}</td>
                    <td>{log.user}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{log.ip}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{log.timestamp}</td>
                    <td><span className={severityBadge(log.severity)}>{log.severity}</span></td>
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

export default AuditLogs;
