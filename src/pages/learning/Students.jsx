import React, { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import SearchBar from '../../components/ui/SearchBar';
import StudentTable from '../../components/students/StudentTable';
import StudentDetailModal from '../../components/students/StudentDetailModal';
import { useLanguage } from '../../context/LanguageContext';
import '../PageStyles.css';

const TEACHER_BY_GRADE = {
  1: 'Selamawit Bekele',
  2: 'Selamawit Bekele',
  3: 'Yonas Alemu',
  4: 'Yonas Alemu',
  5: 'Rahel Teshome',
  6: 'Rahel Teshome',
  7: 'Henok Fikru',
  8: 'Henok Fikru',
  9: 'Martha Hailu',
  10: 'Martha Hailu',
  11: 'Nahom Girma',
  12: 'Nahom Girma',
};

const buildAcademicHistory = ({ entryGrade, grade, enrollmentYear, status }) =>
  Array.from({ length: grade - entryGrade + 1 }, (_, index) => {
    const classGrade = entryGrade + index;
    const startYear = enrollmentYear + index;
    const endYear = startYear + 1;
    const isCurrentClass = classGrade === grade;

    let result = `Promoted to Grade ${classGrade + 1}.`;

    if (isCurrentClass) {
      if (status === 'active') {
        result = 'Currently enrolled in this class.';
      } else if (classGrade === 12) {
        result = 'Completed the class and is awaiting final graduation clearance.';
      } else {
        result = 'Completed the class and is awaiting confirmation for the next intake.';
      }
    }

    return {
      grade: classGrade,
      startYear,
      endYear,
      teacher: TEACHER_BY_GRADE[classGrade],
      result,
    };
  });

const STUDENT_SEED = [
  {
    name: 'Abel Mekonnen',
    id: 'SS-001',
    grade: 1,
    entryGrade: 1,
    enrollmentYear: 2025,
    contact: '+251 911 223 344',
    status: 'active',
    guardianName: 'Mekdes Alemu',
    guardianRelationship: 'Mother',
    emergencyContact: '+251 911 113 344',
    dateOfBirth: '2018-03-11',
    gender: 'Male',
    address: 'Bole, Addis Ababa',
    attendanceRate: '97%',
    notes: 'Shows strong participation during scripture memory sessions.',
  },
  {
    name: 'Bethel Tadesse',
    id: 'SS-002',
    grade: 2,
    entryGrade: 1,
    enrollmentYear: 2024,
    contact: '+251 922 334 455',
    status: 'active',
    guardianName: 'Tadesse Mamo',
    guardianRelationship: 'Father',
    emergencyContact: '+251 922 304 455',
    dateOfBirth: '2017-09-26',
    gender: 'Female',
    address: 'CMC, Addis Ababa',
    attendanceRate: '95%',
    notes: 'Needs a little more confidence when presenting in front of the class.',
  },
  {
    name: 'Caleb Desta',
    id: 'SS-003',
    grade: 3,
    entryGrade: 1,
    enrollmentYear: 2022,
    contact: '+251 933 445 566',
    status: 'inactive',
    guardianName: 'Mimi Desta',
    guardianRelationship: 'Mother',
    emergencyContact: '+251 933 405 566',
    dateOfBirth: '2016-01-15',
    gender: 'Male',
    address: 'Gerji, Addis Ababa',
    attendanceRate: '82%',
    notes: 'Family requested a temporary break after the last quarter.',
  },
  {
    name: 'Dagmawit Tesfaye',
    id: 'SS-004',
    grade: 4,
    entryGrade: 2,
    enrollmentYear: 2022,
    contact: '+251 944 556 677',
    status: 'active',
    guardianName: 'Tesfaye Belay',
    guardianRelationship: 'Father',
    emergencyContact: '+251 944 506 677',
    dateOfBirth: '2015-11-02',
    gender: 'Female',
    address: 'Megenagna, Addis Ababa',
    attendanceRate: '94%',
    notes: 'Transferred in with strong literacy skills and adjusted quickly.',
  },
  {
    name: 'Eden Habte',
    id: 'SS-005',
    grade: 5,
    entryGrade: 1,
    enrollmentYear: 2020,
    contact: '+251 955 667 788',
    status: 'active',
    guardianName: 'Habte Solomon',
    guardianRelationship: 'Father',
    emergencyContact: '+251 955 617 788',
    dateOfBirth: '2014-06-19',
    gender: 'Female',
    address: 'Ayat, Addis Ababa',
    attendanceRate: '96%',
    notes: 'Often mentors younger classmates during group activities.',
  },
  {
    name: 'Filmon Samuel',
    id: 'SS-006',
    grade: 6,
    entryGrade: 2,
    enrollmentYear: 2020,
    contact: '+251 966 778 899',
    status: 'active',
    guardianName: 'Roman Samuel',
    guardianRelationship: 'Mother',
    emergencyContact: '+251 966 728 899',
    dateOfBirth: '2013-10-07',
    gender: 'Male',
    address: 'Jemo, Addis Ababa',
    attendanceRate: '91%',
    notes: 'Responds well to project-based lessons and collaborative tasks.',
  },
  {
    name: 'Hanna Tsegaye',
    id: 'SS-007',
    grade: 7,
    entryGrade: 1,
    enrollmentYear: 2019,
    contact: '+251 977 889 900',
    status: 'active',
    guardianName: 'Tsegaye Bekele',
    guardianRelationship: 'Father',
    emergencyContact: '+251 977 839 900',
    dateOfBirth: '2012-04-12',
    gender: 'Female',
    address: 'Sarbet, Addis Ababa',
    attendanceRate: '93%',
    notes: 'Consistent in attendance and leads prayer circles confidently.',
  },
  {
    name: 'Isaac Daniel',
    id: 'SS-008',
    grade: 8,
    entryGrade: 3,
    enrollmentYear: 2020,
    contact: '+251 988 990 011',
    status: 'inactive',
    guardianName: 'Daniel Assefa',
    guardianRelationship: 'Father',
    emergencyContact: '+251 988 940 011',
    dateOfBirth: '2011-08-21',
    gender: 'Male',
    address: 'Lebu, Addis Ababa',
    attendanceRate: '79%',
    notes: 'Inactive this term while the family relocates.',
  },
  {
    name: 'Jerusalem Hailu',
    id: 'SS-009',
    grade: 9,
    entryGrade: 1,
    enrollmentYear: 2017,
    contact: '+251 912 100 122',
    status: 'active',
    guardianName: 'Hailu Molla',
    guardianRelationship: 'Mother',
    emergencyContact: '+251 912 160 122',
    dateOfBirth: '2010-12-05',
    gender: 'Female',
    address: 'Piassa, Addis Ababa',
    attendanceRate: '98%',
    notes: 'Excellent record in scripture study and peer mentoring.',
  },
  {
    name: 'Kaleb Birhanu',
    id: 'SS-010',
    grade: 10,
    entryGrade: 4,
    enrollmentYear: 2019,
    contact: '+251 923 211 233',
    status: 'active',
    guardianName: 'Birhanu Tesema',
    guardianRelationship: 'Father',
    emergencyContact: '+251 923 261 233',
    dateOfBirth: '2009-07-29',
    gender: 'Male',
    address: 'Kotebe, Addis Ababa',
    attendanceRate: '89%',
    notes: 'Works best with structured revision plans before assessments.',
  },
  {
    name: 'Lidya Amanuel',
    id: 'SS-011',
    grade: 11,
    entryGrade: 5,
    enrollmentYear: 2019,
    contact: '+251 934 322 344',
    status: 'active',
    guardianName: 'Amanuel Desta',
    guardianRelationship: 'Mother',
    emergencyContact: '+251 934 372 344',
    dateOfBirth: '2008-05-17',
    gender: 'Female',
    address: 'Summit, Addis Ababa',
    attendanceRate: '92%',
    notes: 'Supports younger students during combined worship sessions.',
  },
  {
    name: 'Mikias Yosef',
    id: 'SS-012',
    grade: 12,
    entryGrade: 1,
    enrollmentYear: 2014,
    contact: '+251 945 433 455',
    status: 'inactive',
    guardianName: 'Yosef Worku',
    guardianRelationship: 'Father',
    emergencyContact: '+251 945 483 455',
    dateOfBirth: '2007-02-03',
    gender: 'Male',
    address: 'Kolfe, Addis Ababa',
    attendanceRate: '88%',
    notes: 'Completed the final class and is waiting for graduation placement.',
  },
];

const MOCK_STUDENTS = STUDENT_SEED.map((student) => ({
  ...student,
  history: buildAcademicHistory(student),
}));

const Students = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const gradeTabs = ['all', ...Array.from({ length: 12 }, (_, index) => index + 1)];

  const getGradeLabel = (grade) =>
    grade === 'all' ? t('common.grades.all') : t('common.grades.grade', { number: grade });

  const filteredStudents = MOCK_STUDENTS.filter((student) => {
    const query = searchTerm.toLowerCase();

    return (
      (student.name.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query) ||
        student.guardianName.toLowerCase().includes(query) ||
        student.contact.toLowerCase().includes(query) ||
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

        <div className="mt-6">
          <StudentTable students={filteredStudents} onViewStudent={setSelectedStudent} />
        </div>
        {filteredStudents.length === 0 && (
          <div className="text-center p-8 text-secondary">{t('students.noResults')}</div>
        )}
      </div>

      <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </div>
  );
};

export default Students;
