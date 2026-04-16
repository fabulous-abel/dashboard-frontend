import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import SearchBar from '../components/ui/SearchBar';
import { useLanguage } from '../context/LanguageContext';
import './PageStyles.css';

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

const createInitialForm = () => ({
  name: '',
  roleKey: 'registration',
  phone: '',
  status: 'active',
});

const Facilitators = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [facilitators, setFacilitators] = useState(FACILITATOR_SEED);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formValues, setFormValues] = useState(createInitialForm());

  const copy =
    language === 'am'
      ? {
          directoryTitle: 'የአስተባባሪዎች ዝርዝር',
          summary: (count) => `${count} አስተባባሪዎች በዝርዝሩ ውስጥ አሉ።`,
          searchPlaceholder: 'አስተባባሪ ወይም ኃላፊነት ፈልግ...',
          formTitle: 'አዲስ አስተባባሪ ጨምር',
          fields: {
            name: 'ስም',
            role: 'ኃላፊነት',
            phone: 'ስልክ',
            status: 'ሁኔታ',
          },
          roles: {
            registration: 'ምዝገባ ኃላፊ',
            curriculum: 'ትምህርት ክፍል አስተባባሪ',
            family: 'የቤተሰብ ግንኙነት አስተባባሪ',
            logistics: 'ሎጂስቲክስ አስተባባሪ',
          },
          table: {
            name: 'ስም',
            id: 'መለያ',
            role: 'ኃላፊነት',
            phone: 'ስልክ',
            status: 'ሁኔታ',
          },
          save: 'አስቀምጥ',
          cancel: 'ይቅር',
          noResults: 'ከፍለጋዎ ጋር የሚዛመዱ አስተባባሪዎች አልተገኙም።',
        }
      : {
          directoryTitle: 'Facilitators Directory',
          summary: (count) => `${count} facilitator${count === 1 ? '' : 's'} available in the directory.`,
          searchPlaceholder: 'Search facilitators or responsibilities...',
          formTitle: 'Add New Facilitator',
          fields: {
            name: 'Name',
            role: 'Responsibility',
            phone: 'Phone',
            status: 'Status',
          },
          roles: {
            registration: 'Registration Lead',
            curriculum: 'Curriculum Coordinator',
            family: 'Family Liaison',
            logistics: 'Logistics Coordinator',
          },
          table: {
            name: 'Name',
            id: 'ID',
            role: 'Responsibility',
            phone: 'Phone',
            status: 'Status',
          },
          save: 'Save Facilitator',
          cancel: 'Cancel',
          noResults: 'No facilitators found matching your search.',
        };

  const roleOptions = ['registration', 'curriculum', 'family', 'logistics'];

  const filteredFacilitators = facilitators.filter((facilitator) => {
    const query = searchTerm.toLowerCase();
    const roleLabel = copy.roles[facilitator.roleKey].toLowerCase();

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
            <h2 className="text-xl font-semibold">{copy.directoryTitle}</h2>
            <p className="directory-meta mt-2">{copy.summary(filteredFacilitators.length)}</p>
          </div>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={copy.searchPlaceholder}
          />
        </div>

        {isFormOpen && (
          <form className="inline-form-panel mt-6" onSubmit={handleSubmit}>
            <h3 className="form-title">{copy.formTitle}</h3>
            <div className="form-grid">
              <label className="form-field">
                <span className="form-label">{copy.fields.name}</span>
                <input
                  type="text"
                  className="form-input"
                  value={formValues.name}
                  onChange={(event) => handleFormChange('name', event.target.value)}
                  required
                />
              </label>

              <label className="form-field">
                <span className="form-label">{copy.fields.role}</span>
                <select
                  className="form-input"
                  value={formValues.roleKey}
                  onChange={(event) => handleFormChange('roleKey', event.target.value)}
                >
                  {roleOptions.map((roleKey) => (
                    <option key={roleKey} value={roleKey}>
                      {copy.roles[roleKey]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field">
                <span className="form-label">{copy.fields.phone}</span>
                <input
                  type="tel"
                  className="form-input"
                  value={formValues.phone}
                  onChange={(event) => handleFormChange('phone', event.target.value)}
                  required
                />
              </label>

              <label className="form-field">
                <span className="form-label">{copy.fields.status}</span>
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
                {copy.cancel}
              </button>
              <button type="submit" className="btn btn-primary">
                {copy.save}
              </button>
            </div>
          </form>
        )}

        <div className="table-container mt-6">
          <table>
            <thead>
              <tr>
                <th>{copy.table.name}</th>
                <th>{copy.table.id}</th>
                <th>{copy.table.role}</th>
                <th>{copy.table.phone}</th>
                <th>{copy.table.status}</th>
              </tr>
            </thead>
            <tbody>
              {filteredFacilitators.map((facilitator) => (
                <tr key={facilitator.id}>
                  <td>
                    <div className="font-semibold">{facilitator.name}</div>
                  </td>
                  <td className="text-secondary">{facilitator.id}</td>
                  <td>{copy.roles[facilitator.roleKey]}</td>
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
          <div className="text-center p-8 text-secondary">{copy.noResults}</div>
        )}
      </div>
    </div>
  );
};

export default Facilitators;
