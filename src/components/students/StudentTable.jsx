import React from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const StudentTable = ({ students, onViewStudent }) => {
  const { t } = useLanguage();

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>{t('students.table.studentName')}</th>
            <th>{t('students.table.id')}</th>
            <th>{t('students.table.grade')}</th>
            <th>{t('students.table.parentContact')}</th>
            <th>{t('students.table.status')}</th>
            <th>{t('students.table.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <div className="font-semibold">{student.name}</div>
              </td>
              <td className="text-secondary">{student.id}</td>
              <td>{t('common.grades.grade', { number: student.grade })}</td>
              <td className="text-secondary">{student.contact}</td>
              <td>
                <span className={`badge ${student.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
                  {t(`common.status.${student.status}`)}
                </span>
              </td>
              <td className="actions-cell">
                <button
                  type="button"
                  className="btn-icon"
                  title={t('common.actions.viewDetails')}
                  onClick={() => onViewStudent?.(student)}
                >
                  <Eye size={16} />
                </button>
                <button type="button" className="btn-icon" title={t('common.actions.edit')}>
                  <Edit2 size={16} />
                </button>
                <button type="button" className="btn-icon" title={t('common.actions.delete')}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
