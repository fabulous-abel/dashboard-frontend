import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import SearchBar from '../../components/ui/SearchBar';
import { useLanguage } from '../../context/LanguageContext';
import '../PageStyles.css';

const FACILITATOR_SEED = [
  {
    id: 'FC-001',
    name: 'Meseret Desta',
    roleKey: 'registration',
    phone: '+251 911 301 221',
    status: 'active',
  },
  {
    id: 'FC-002',
    name: 'Samuel Tsegaye',
    roleKey: 'curriculum',
    phone: '+251 922 411 332',
    status: 'active',
  },
  {
    id: 'FC-003',
    name: 'Rahel Bekele',
    roleKey: 'family',
    phone: '+251 933 522 443',
    status: 'onLeave',
  },
];

const statusClassName = {
  active: 'badge-active',
  onLeave: 'badge-inactive',
};

const roleOptions = ['registration', 'curriculum', 'family', 'logistics'];

const createInitialForm = () => ({
  name: '',
  roleKey: 'registration',
  phone: '',
  status: 'active',
});

const Facilitators = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [facilitators, setFacilitators] = useState(FACILITATOR_SEED);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formValues, setFormValues] = useState(createInitialForm());

  const getRoleLabel = (roleKey) => t(`facilitators.roles.${roleKey}`);

  const filteredFacilitators = facilitators.filter((facilitator) => {
    const query = searchTerm.toLowerCase();
    const roleLabel = getRoleLabel(facilitator.roleKey).toLowerCase();

    return (
      facilitator.name.toLowerCase().includes(query) ||
      facilitator.id.toLowerCase().includes(query) ||
      roleLabel.includes(query) ||
      facilitator.phone.toLowerCase().includes(query)
    );
  });

  const handleFormChange = (field, value) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleFormCancel = () => {
    setFormValues(createInitialForm());
    setIsFormOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextId = `FC-${String(facilitators.length + 1).padStart(3, '0')}`;

    setFacilitators((currentFacilitators) => [
      ...currentFacilitators,
      {
        id: nextId,
        ...formValues,
      },
    ]);

    setFormValues(createInitialForm());
    setIsFormOpen(false);
  };

  return (
    <div className="page-container">
      <PageHeader title={t('facilitators.title')} subtitle={t('facilitators.subtitle')}>
        <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
          + {t('facilitators.addButton')}
        </button>
      </PageHeader>

      <div className="content-panel glass-panel mt-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="directory-header">
          <div>
            <h2 className="text-xl font-semibold">{t('facilitators.directoryTitle')}</h2>
            <p className="directory-meta mt-2">
              {t('facilitators.summary', { count: filteredFacilitators.length })}
            </p>
          </div>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={t('facilitators.searchPlaceholder')}
          />
        </div>

        {isFormOpen && (
          <form className="inline-form-panel mt-6" onSubmit={handleSubmit}>
            <h3 className="form-title">{t('facilitators.formTitle')}</h3>
            <div className="form-grid">
              <label className="form-field">
                <span className="form-label">{t('facilitators.fields.name')}</span>
                <input
                  type="text"
                  className="form-input"
                  value={formValues.name}
                  onChange={(event) => handleFormChange('name', event.target.value)}
                  required
                />
              </label>

              <label className="form-field">
                <span className="form-label">{t('facilitators.fields.role')}</span>
                <select
                  className="form-input"
                  value={formValues.roleKey}
                  onChange={(event) => handleFormChange('roleKey', event.target.value)}
                >
                  {roleOptions.map((roleKey) => (
                    <option key={roleKey} value={roleKey}>
                      {getRoleLabel(roleKey)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field">
                <span className="form-label">{t('facilitators.fields.phone')}</span>
                <input
                  type="tel"
                  className="form-input"
                  value={formValues.phone}
                  onChange={(event) => handleFormChange('phone', event.target.value)}
                  required
                />
              </label>

              <label className="form-field">
                <span className="form-label">{t('facilitators.fields.status')}</span>
                <select
                  className="form-input"
                  value={formValues.status}
                  onChange={(event) => handleFormChange('status', event.target.value)}
                >
                  <option value="active">{t('common.status.active')}</option>
                  <option value="onLeave">{t('common.status.onLeave')}</option>
                </select>
              </label>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={handleFormCancel}>
                {t('facilitators.cancel')}
              </button>
              <button type="submit" className="btn btn-primary">
                {t('facilitators.save')}
              </button>
            </div>
          </form>
        )}

        <div className="table-container mt-6">
          <table>
            <thead>
              <tr>
                <th>{t('facilitators.table.name')}</th>
                <th>{t('facilitators.table.id')}</th>
                <th>{t('facilitators.table.role')}</th>
                <th>{t('facilitators.table.phone')}</th>
                <th>{t('facilitators.table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredFacilitators.map((facilitator) => (
                <tr key={facilitator.id}>
                  <td>
                    <div className="font-semibold">{facilitator.name}</div>
                  </td>
                  <td className="text-secondary">{facilitator.id}</td>
                  <td>{getRoleLabel(facilitator.roleKey)}</td>
                  <td className="text-secondary">{facilitator.phone}</td>
                  <td>
                    <span className={`badge ${statusClassName[facilitator.status]}`}>
                      {t(`common.status.${facilitator.status}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFacilitators.length === 0 && (
          <div className="text-center p-8 text-secondary">{t('facilitators.noResults')}</div>
        )}
      </div>
    </div>
  );
};

export default Facilitators;
