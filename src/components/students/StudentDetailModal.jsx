import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const StudentDetailModal = ({ student, onClose }) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (!student) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [student, onClose]);

  if (!student) {
    return null;
  }

  const history = student.history || [];
  const firstHistory = history[0];
  const latestHistory = history[history.length - 1];

  const profileItems = [
    { label: t('students.modal.labels.studentId'), value: student.id },
    { label: t('students.modal.labels.guardian'), value: `${student.guardianName} (${student.guardianRelationship})` },
    { label: t('students.modal.labels.guardianPhone'), value: student.contact },
    { label: t('students.modal.labels.emergencyContact'), value: student.emergencyContact },
    { label: t('students.modal.labels.dateOfBirth'), value: student.dateOfBirth },
    { label: t('students.modal.labels.gender'), value: student.gender },
    { label: t('students.modal.labels.address'), value: student.address },
    { label: t('students.modal.labels.enrollmentYear'), value: student.enrollmentYear },
    { label: t('students.modal.labels.attendance'), value: student.attendanceRate },
    { label: t('students.modal.labels.notes'), value: student.notes },
  ];

  return (
    <div className="student-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="student-modal glass-panel animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`student-modal-title-${student.id}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="student-modal-header">
          <div className="student-modal-header-copy">
            <p className="student-modal-kicker">{t('students.modal.title')}</p>
            <h2 className="student-modal-title" id={`student-modal-title-${student.id}`}>
              {student.name}
            </h2>
            <div className="student-modal-meta">
              <span className="badge badge-secondary">{student.id}</span>
              <span className={`badge ${student.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
                {t(`common.status.${student.status}`)}
              </span>
              <span className="badge badge-secondary">
                {t('common.grades.grade', { number: student.grade })}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="student-modal-close"
            aria-label={t('students.modal.close')}
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="student-modal-body">
          <div className="student-overview-grid">
            <div className="student-overview-card">
              <span className="student-overview-label">{t('students.modal.overview.entryGrade')}</span>
              <div className="student-overview-value">
                {t('common.grades.grade', { number: student.entryGrade })}
              </div>
            </div>
            <div className="student-overview-card">
              <span className="student-overview-label">{t('students.modal.overview.currentGrade')}</span>
              <div className="student-overview-value">
                {t('common.grades.grade', { number: student.grade })}
              </div>
            </div>
            <div className="student-overview-card">
              <span className="student-overview-label">{t('students.modal.overview.progressionSpan')}</span>
              <div className="student-overview-value">
                {firstHistory ? `${firstHistory.startYear} - ${latestHistory.endYear}` : '-'}
              </div>
            </div>
          </div>

          <section className="student-modal-section">
            <h3 className="student-section-title">{t('students.modal.sections.profile')}</h3>
            <div className="student-detail-grid">
              {profileItems.map((item) => (
                <div className="student-detail-item" key={item.label}>
                  <span className="student-detail-label">{item.label}</span>
                  <div className="student-detail-value">{item.value}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="student-modal-section">
            <h3 className="student-section-title">{t('students.modal.sections.history')}</h3>
            {history.length > 0 ? (
              <div className="student-history-list">
                {history.map((record, index) => (
                  <article
                    className={`student-history-card ${index === history.length - 1 ? 'current' : ''}`}
                    key={`${student.id}-${record.grade}-${record.startYear}`}
                  >
                    <div className="student-history-grade">
                      {t('common.grades.grade', { number: record.grade })}
                    </div>
                    <div className="student-history-period">
                      <span className="student-history-label">{t('students.modal.history.academicYear')}</span>
                      <div className="student-history-value">{record.startYear} - {record.endYear}</div>
                    </div>
                    <div className="student-history-content">
                      <div>
                        <span className="student-history-label">{t('students.modal.history.classTeacher')}</span>
                        <div className="student-history-value">{record.teacher}</div>
                      </div>
                      <div>
                        <span className="student-history-label">{t('students.modal.history.result')}</span>
                        <p className="student-history-result">{record.result}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="student-history-empty">{t('students.modal.history.empty')}</div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;
