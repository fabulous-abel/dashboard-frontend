import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import SearchBar from '../components/ui/SearchBar';
import StudentTable from '../components/students/StudentTable';
import { useLanguage } from '../context/LanguageContext';
import './PageStyles.css';

const MOCK_STUDENTS = [
  { name: 'Abel Mekonnen', id: 'SS-001', grade: 1, contact: '+251 911 223 344', status: 'active' },
  { name: 'Bethel Tadesse', id: 'SS-002', grade: 2, contact: '+251 922 334 455', status: 'active' },
  { name: 'Caleb Desta', id: 'SS-003', grade: 3, contact: '+251 933 445 566', status: 'inactive' },
  { name: 'Dagmawit Tesfaye', id: 'SS-004', grade: 4, contact: '+251 944 556 677', status: 'active' },
  { name: 'Eden Habte', id: 'SS-005', grade: 5, contact: '+251 955 667 788', status: 'active' },
  { name: 'Filmon Samuel', id: 'SS-006', grade: 6, contact: '+251 966 778 899', status: 'active' },
  { name: 'Hanna Tsegaye', id: 'SS-007', grade: 7, contact: '+251 977 889 900', status: 'active' },
  { name: 'Isaac Daniel', id: 'SS-008', grade: 8, contact: '+251 988 990 011', status: 'inactive' },
  { name: 'Jerusalem Hailu', id: 'SS-009', grade: 9, contact: '+251 912 100 122', status: 'active' },
  { name: 'Kaleb Birhanu', id: 'SS-010', grade: 10, contact: '+251 923 211 233', status: 'active' },
  { name: 'Lidya Amanuel', id: 'SS-011', grade: 11, contact: '+251 934 322 344', status: 'active' },
  { name: 'Mikias Yosef', id: 'SS-012', grade: 12, contact: '+251 945 433 455', status: 'inactive' },
];

const Students = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');

  const gradeTabs = ['all', ...Array.from({ length: 12 }, (_, index) => index + 1)];

  const getGradeLabel = (grade) =>
    grade === 'all' ? t('common.grades.all') : t('common.grades.grade', { number: grade });

  const filteredStudents = MOCK_STUDENTS.filter((student) => {
    const query = searchTerm.toLowerCase();

    return (
      (student.name.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query) ||
        getGradeLabel(student.grade).toLowerCase().includes(query)) &&
      (gradeFilter === 'all' || student.grade === gradeFilter)
    );
  });

  return (
    <div className="page-container">
      <PageHeader title={t('students.title')} subtitle={t('students.subtitle')}>
        <button className="btn btn-primary">+ {t('students.addButton')}</button>
      </PageHeader>

      <div className="content-panel glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="directory-header">
          <div>
            <h2 className="text-xl font-semibold">{t('students.directoryTitle')}</h2>
            <p className="directory-meta mt-2">
              {t('students.summary', {
                count: filteredStudents.length,
                grade: getGradeLabel(gradeFilter),
              })}
            </p>
          </div>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={t('students.searchPlaceholder', {
              target: gradeFilter === 'all' ? t('students.searchTarget') : getGradeLabel(gradeFilter),
            })}
          />
        </div>

        <div className="grade-tabs mt-6">
          {gradeTabs.map((grade) => (
            <button
              key={grade}
              type="button"
              className={`grade-tab ${gradeFilter === grade ? 'active' : ''}`}
              onClick={() => setGradeFilter(grade)}
            >
              {getGradeLabel(grade)}
            </button>
          ))}
        </div>

        <StudentTable students={filteredStudents} />
        {filteredStudents.length === 0 && (
          <div className="text-center p-8 text-secondary">{t('students.noResults')}</div>
        )}
      </div>
    </div>
  );
};

export default Students;
