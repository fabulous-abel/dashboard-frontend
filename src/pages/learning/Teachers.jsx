import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import SearchBar from '../../components/ui/SearchBar';
import { useLanguage } from '../../context/LanguageContext';
import '../PageStyles.css';

const MOCK_TEACHERS = [
  { id: 'TC-001', name: 'Selamawit Bekele', grades: [1, 2], phone: '+251 911 456 780', day: 'sundayAm', status: 'active' },
  { id: 'TC-002', name: 'Yonas Alemu', grades: [3, 4], phone: '+251 922 567 891', day: 'sundayAm', status: 'active' },
  { id: 'TC-003', name: 'Rahel Teshome', grades: [5, 6], phone: '+251 933 678 912', day: 'sundayPm', status: 'assistant' },
  { id: 'TC-004', name: 'Henok Fikru', grades: [7, 8], phone: '+251 944 789 123', day: 'saturdayPm', status: 'active' },
  { id: 'TC-005', name: 'Martha Hailu', grades: [9, 10], phone: '+251 955 890 234', day: 'sundayPm', status: 'onLeave' },
  { id: 'TC-006', name: 'Nahom Girma', grades: [11, 12], phone: '+251 966 901 345', day: 'sundayAm', status: 'active' },
];

const statusClassName = {
  active: 'badge-active',
  assistant: 'badge-secondary',
  onLeave: 'badge-inactive',
};

const Teachers = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const getGradeRange = (grades) =>
    t('common.grades.range', { start: grades[0], end: grades[1] });

  const filteredTeachers = MOCK_TEACHERS.filter((teacher) => {
    const query = searchTerm.toLowerCase();
    const gradeLabel = getGradeRange(teacher.grades).toLowerCase();
    const dayLabel = t(`common.serviceDays.${teacher.day}`).toLowerCase();

    return (
      teacher.name.toLowerCase().includes(query) ||
      teacher.id.toLowerCase().includes(query) ||
      gradeLabel.includes(query) ||
      dayLabel.includes(query)
    );
  });

  return (
    <div className="page-container">
      <PageHeader title={t('teachers.title')} subtitle={t('teachers.subtitle')}>
        <button className="btn btn-primary">+ {t('teachers.addButton')}</button>
      </PageHeader>

      <div className="content-panel glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="directory-header">
          <div>
            <h2 className="text-xl font-semibold">{t('teachers.listTitle')}</h2>
            <p className="directory-meta mt-2">
              {t('teachers.summary', { count: filteredTeachers.length })}
            </p>
          </div>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={t('teachers.searchPlaceholder')}
          />
        </div>

        <div className="table-container mt-6">
          <table>
            <thead>
              <tr>
                <th>{t('teachers.table.teacherName')}</th>
                <th>{t('teachers.table.id')}</th>
                <th>{t('teachers.table.assignedGrades')}</th>
                <th>{t('teachers.table.phone')}</th>
                <th>{t('teachers.table.serviceDay')}</th>
                <th>{t('teachers.table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>
                    <div className="font-semibold">{teacher.name}</div>
                  </td>
                  <td className="text-secondary">{teacher.id}</td>
                  <td>{getGradeRange(teacher.grades)}</td>
                  <td className="text-secondary">{teacher.phone}</td>
                  <td>{t(`common.serviceDays.${teacher.day}`)}</td>
                  <td>
                    <span className={`badge ${statusClassName[teacher.status]}`}>
                      {t(`common.status.${teacher.status}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center p-8 text-secondary">{t('teachers.noResults')}</div>
        )}
      </div>
    </div>
  );
};

export default Teachers;
