import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import { useLanguage } from '../context/LanguageContext';
import './PageStyles.css';

const Attendance = () => {
  const { t } = useLanguage();

  return (
    <div className="page-container">
      <PageHeader title={t('attendance.title')} subtitle={t('attendance.subtitle')} />
      <div className="content-panel glass-panel mt-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="table-placeholder">
          <p className="text-secondary text-center">{t('attendance.placeholder')}</p>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
