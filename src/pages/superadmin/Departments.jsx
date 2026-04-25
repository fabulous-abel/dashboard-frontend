import { useMemo, useState } from 'react';
import { Edit, Plus, Trash2, X } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const STORAGE_KEY = 'superadmin-departments';

const DEPARTMENT_SEED = [
  { id: 'DEP-001', name: 'Sunday School', head: 'Abebe Kebede', members: 45, status: 'Active' },
  { id: 'DEP-002', name: 'Human Resources', head: 'Tigist Hailu', members: 8, status: 'Active' },
  { id: 'DEP-003', name: 'Youth Ministry', head: 'Dawit Tadesse', members: 32, status: 'Active' },
  { id: 'DEP-004', name: 'Choir', head: 'Meron Alemu', members: 28, status: 'Active' },
  { id: 'DEP-005', name: 'Finance', head: 'Sara Mengistu', members: 5, status: 'Active' },
  { id: 'DEP-006', name: 'Outreach', head: 'Yohannes Bekele', members: 15, status: 'Inactive' },
];

const EMPTY_FORM = {
  name: '',
  head: '',
  members: '',
  status: 'Active',
};

const readDepartments = () => {
  if (typeof window === 'undefined') {
    return DEPARTMENT_SEED;
  }

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || DEPARTMENT_SEED;
  } catch {
    return DEPARTMENT_SEED;
  }
};

const persistDepartments = (departments) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(departments));
};

const getNextDepartmentId = (departments) => {
  const nextNumber = departments.reduce((highestNumber, department) => {
    const numericId = Number(String(department.id).replace('DEP-', ''));
    return Number.isFinite(numericId) ? Math.max(highestNumber, numericId) : highestNumber;
  }, 0) + 1;

  return `DEP-${String(nextNumber).padStart(3, '0')}`;
};

const Departments = () => {
  const { t } = useLanguage();
  const [departments, setDepartments] = useState(readDepartments);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const activeCount = useMemo(
    () => departments.filter((department) => department.status === 'Active').length,
    [departments],
  );

  const updateDepartments = (nextDepartments) => {
    setDepartments(nextDepartments);
    persistDepartments(nextDepartments);
  };

  const openCreateForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setIsFormOpen(true);
  };

  const openEditForm = (department) => {
    setEditingId(department.id);
    setForm({
      name: department.name,
      head: department.head,
      members: String(department.members),
      status: department.status,
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

    const trimmedName = form.name.trim();
    const trimmedHead = form.head.trim();

    if (!trimmedName || !trimmedHead) {
      return;
    }

    if (editingId) {
      updateDepartments(
        departments.map((department) =>
          department.id === editingId
            ? {
                ...department,
                name: trimmedName,
                head: trimmedHead,
                members: Number(form.members) || 0,
                status: form.status,
              }
            : department,
        ),
      );
    } else {
      updateDepartments([
        ...departments,
        {
          id: getNextDepartmentId(departments),
          name: trimmedName,
          head: trimmedHead,
          members: Number(form.members) || 0,
          status: form.status,
        },
      ]);
    }

    closeForm();
  };

  const handleDelete = (departmentId) => {
    updateDepartments(departments.filter((department) => department.id !== departmentId));
  };

  return (
    <div className="page-container">
      <PageHeader
        title={t('superadmin.departments.title')}
        subtitle={t('superadmin.departments.subtitle')}
      >
        <button type="button" className="btn btn-primary gap-2" onClick={openCreateForm}>
          <Plus size={16} />
          <span>Add Department</span>
        </button>
      </PageHeader>

      {isFormOpen && (
        <form className="inline-form-panel glass-panel animate-fade-in" onSubmit={handleSubmit}>
          <div className="directory-header">
            <h2 className="form-title">{editingId ? 'Edit Department' : 'Add Department'}</h2>
            <button type="button" className="btn-icon" onClick={closeForm} aria-label="Close form">
              <X size={16} />
            </button>
          </div>

          <div className="form-grid">
            <label className="form-field">
              <span className="form-label">Department Name</span>
              <input
                className="form-input"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                required
              />
            </label>
            <label className="form-field">
              <span className="form-label">{t('superadmin.departments.headLabel')}</span>
              <input
                className="form-input"
                value={form.head}
                onChange={(event) => setForm((current) => ({ ...current, head: event.target.value }))}
                required
              />
            </label>
            <label className="form-field">
              <span className="form-label">Members</span>
              <input
                className="form-input"
                type="number"
                min="0"
                value={form.members}
                onChange={(event) => setForm((current) => ({ ...current, members: event.target.value }))}
              />
            </label>
            <label className="form-field">
              <span className="form-label">Status</span>
              <select
                className="form-input"
                value={form.status}
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={closeForm}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Save Changes' : 'Create Department'}
            </button>
          </div>
        </form>
      )}

      <div className="content-panel glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="directory-header">
          <div>
            <h2>Department Directory</h2>
            <p className="directory-meta mt-2">
              Showing {departments.length} departments. {activeCount} active.
            </p>
          </div>
        </div>

        <div className="table-container" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th>Department</th>
                <th>ID</th>
                <th>{t('superadmin.departments.headLabel')}</th>
                <th>Members</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department.id}>
                  <td style={{ fontWeight: 600 }}>{department.name}</td>
                  <td className="text-secondary">{department.id}</td>
                  <td>{department.head}</td>
                  <td>{department.members}</td>
                  <td>
                    <span className={department.status === 'Active' ? 'badge badge-active' : 'badge badge-inactive'}>
                      {department.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button
                        type="button"
                        className="btn-icon"
                        title={t('common.actions.edit')}
                        onClick={() => openEditForm(department)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon"
                        title={t('common.actions.delete')}
                        onClick={() => handleDelete(department.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Departments;
