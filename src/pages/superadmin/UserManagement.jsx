import { useMemo, useState } from 'react';
import { Edit, Plus, Search, Trash2, X } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const USERS_KEY = 'superadmin-dashboard-users';
const DEPARTMENTS_KEY = 'superadmin-departments';

const DEPARTMENT_FALLBACK = [
  { id: 'DEP-001', name: 'Sunday School' },
  { id: 'DEP-002', name: 'Human Resources' },
  { id: 'DEP-003', name: 'Youth Ministry' },
  { id: 'DEP-004', name: 'Choir' },
  { id: 'DEP-005', name: 'Finance' },
  { id: 'DEP-006', name: 'Outreach' },
];

const USER_SEED = [
  {
    id: 'USR-001',
    name: 'Abebe Kebede',
    email: 'abebe@church.org',
    username: 'abebe.admin',
    password: 'Admin@123',
    department: 'Sunday School',
    dashboard: 'Super Admin',
    role: 'Super Admin',
    status: 'Active',
  },
  {
    id: 'USR-002',
    name: 'Tigist Hailu',
    email: 'tigist@church.org',
    username: 'tigist.hr',
    password: 'Hr@12345',
    department: 'Human Resources',
    dashboard: 'HR',
    role: 'HR Manager',
    status: 'Active',
  },
  {
    id: 'USR-003',
    name: 'Dawit Tadesse',
    email: 'dawit@church.org',
    username: 'dawit.learning',
    password: 'Learn@123',
    department: 'Sunday School',
    dashboard: 'Learning',
    role: 'Teacher',
    status: 'Active',
  },
];

const EMPTY_FORM = {
  name: '',
  email: '',
  username: '',
  password: '',
  department: '',
  dashboard: 'Learning',
  role: '',
  status: 'Active',
};

const DASHBOARD_OPTIONS = ['Super Admin', 'HR', 'Learning'];
const STATUS_OPTIONS = ['Active', 'Inactive', 'On Leave'];

const readJson = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    return JSON.parse(window.localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

const getNextUserId = (users) => {
  const nextNumber = users.reduce((highestNumber, user) => {
    const numericId = Number(String(user.id).replace('USR-', ''));
    return Number.isFinite(numericId) ? Math.max(highestNumber, numericId) : highestNumber;
  }, 0) + 1;

  return `USR-${String(nextNumber).padStart(3, '0')}`;
};

const UserManagement = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState(() => readJson(USERS_KEY, USER_SEED));
  const [departments] = useState(() => readJson(DEPARTMENTS_KEY, DEPARTMENT_FALLBACK));
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const departmentOptions = useMemo(
    () => departments.map((department) => department.name).filter(Boolean),
    [departments],
  );

  const filtered = users.filter((user) =>
    `${user.name} ${user.email} ${user.username} ${user.department} ${user.dashboard} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const persistUsers = (nextUsers) => {
    setUsers(nextUsers);
    window.localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
  };

  const openCreateForm = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, department: departmentOptions[0] || '' });
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
      department: user.department,
      dashboard: user.dashboard,
      role: user.role,
      status: user.status,
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextUser = {
      name: form.name.trim(),
      email: form.email.trim(),
      username: form.username.trim(),
      password: form.password,
      department: form.department,
      dashboard: form.dashboard,
      role: form.role.trim() || form.dashboard,
      status: form.status,
    };

    if (!nextUser.name || !nextUser.email || !nextUser.username || !nextUser.password) {
      return;
    }

    if (editingId) {
      persistUsers(users.map((user) => (user.id === editingId ? { ...user, ...nextUser } : user)));
    } else {
      persistUsers([
        ...users,
        {
          id: getNextUserId(users),
          ...nextUser,
        },
      ]);
    }

    closeForm();
  };

  const handleDelete = (userId) => {
    persistUsers(users.filter((user) => user.id !== userId));
  };

  const getBadgeClass = (status) => {
    if (status === 'Active') return 'badge badge-active';
    if (status === 'Inactive') return 'badge badge-inactive';
    return 'badge badge-secondary';
  };

  return (
    <div className="page-container">
      <PageHeader
        title={t('superadmin.users.title')}
        subtitle="Create dashboard login accounts and control department access."
      >
        <button type="button" className="btn btn-primary gap-2" onClick={openCreateForm}>
          <Plus size={16} />
          <span>Create Login</span>
        </button>
      </PageHeader>

      {isFormOpen && (
        <form className="inline-form-panel glass-panel animate-fade-in" onSubmit={handleSubmit}>
          <div className="directory-header">
            <h2 className="form-title">{editingId ? 'Edit Login Account' : 'Create Dashboard Login'}</h2>
            <button type="button" className="btn-icon" onClick={closeForm} aria-label="Close form">
              <X size={16} />
            </button>
          </div>

          <div className="form-grid">
            <label className="form-field">
              <span className="form-label">Full Name</span>
              <input
                className="form-input"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                required
              />
            </label>
            <label className="form-field">
              <span className="form-label">Email</span>
              <input
                className="form-input"
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </label>
            <label className="form-field">
              <span className="form-label">Username</span>
              <input
                className="form-input"
                value={form.username}
                onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
                required
              />
            </label>
            <label className="form-field">
              <span className="form-label">Password</span>
              <input
                className="form-input"
                type="text"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                required
              />
            </label>
            <label className="form-field">
              <span className="form-label">Department</span>
              <select
                className="form-input"
                value={form.department}
                onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))}
              >
                {departmentOptions.map((department) => (
                  <option key={department}>{department}</option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span className="form-label">Dashboard Access</span>
              <select
                className="form-input"
                value={form.dashboard}
                onChange={(event) => setForm((current) => ({ ...current, dashboard: event.target.value }))}
              >
                {DASHBOARD_OPTIONS.map((dashboard) => (
                  <option key={dashboard}>{dashboard}</option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span className="form-label">Role / Permission</span>
              <input
                className="form-input"
                value={form.role}
                placeholder="Example: HR Manager"
                onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
              />
            </label>
            <label className="form-field">
              <span className="form-label">Status</span>
              <select
                className="form-input"
                value={form.status}
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={closeForm}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Save Changes' : 'Create Login'}
            </button>
          </div>
        </form>
      )}

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
              placeholder="Search users, departments, dashboards, or usernames..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="table-container" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th>{t('superadmin.users.table.name')}</th>
                <th>Username</th>
                <th>Password</th>
                <th>Department</th>
                <th>Dashboard</th>
                <th>{t('superadmin.users.table.role')}</th>
                <th>{t('superadmin.users.table.status')}</th>
                <th>{t('superadmin.users.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-secondary" style={{ padding: '2rem' }}>
                    {t('superadmin.users.noResults')}
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{user.name}</div>
                      <div className="text-secondary" style={{ fontSize: '0.78rem' }}>{user.email}</div>
                    </td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.department}</td>
                    <td><span className="badge badge-secondary">{user.dashboard}</span></td>
                    <td>{user.role}</td>
                    <td><span className={getBadgeClass(user.status)}>{user.status}</span></td>
                    <td>
                      <div className="actions-cell">
                        <button
                          type="button"
                          className="btn-icon"
                          title={t('common.actions.edit')}
                          onClick={() => openEditForm(user)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon"
                          title={t('common.actions.delete')}
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 size={16} />
                        </button>
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
