import PageHeader from '../../components/ui/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const SETTINGS_SECTIONS = [
  { key: 'general', fields: ['siteName', 'timezone', 'language'] },
  { key: 'security', fields: ['twoFactor', 'sessionTimeout', 'passwordPolicy'] },
  { key: 'notifications', fields: ['emailNotifs', 'smsNotifs', 'systemAlerts'] },
];

const SystemSettings = () => {
  const { t } = useLanguage();

  return (
    <div className="page-container">
      <PageHeader
        title={t('superadmin.settings.title')}
        subtitle={t('superadmin.settings.subtitle')}
      />
      {SETTINGS_SECTIONS.map((section, idx) => (
        <div
          key={section.key}
          className="content-panel glass-panel animate-fade-in"
          style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
        >
          <h2>{t(`superadmin.settings.sections.${section.key}.title`)}</h2>
          <div className="form-grid" style={{ marginTop: '1rem' }}>
            {section.fields.map((field) => (
              <div key={field} className="form-field">
                <label className="form-label">
                  {t(`superadmin.settings.sections.${section.key}.${field}`)}
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="—"
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SystemSettings;
