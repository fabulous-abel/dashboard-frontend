import React, { useState } from 'react';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { useLanguage } from '../context/LanguageContext';
import './PageStyles.css';

const SCHEDULE_TABS = ['saturday', 'sunday', 'extension', 'virtual'];

const SCHEDULE_ENTRIES = [
  {
    id: 'SCH-001',
    session: 'saturday',
    time: '08:00 AM - 08:45 AM',
    teacher: 'Selamawit Bekele',
    arrangementKey: 'opening',
  },
  {
    id: 'SCH-002',
    session: 'saturday',
    time: '08:50 AM - 09:35 AM',
    teacher: 'Yonas Alemu',
    arrangementKey: 'classroom',
  },
  {
    id: 'SCH-003',
    session: 'sunday',
    time: '09:40 AM - 10:25 AM',
    teacher: 'Rahel Teshome',
    arrangementKey: 'discussion',
  },
  {
    id: 'SCH-004',
    session: 'sunday',
    time: '10:30 AM - 11:15 AM',
    teacher: 'Henok Fikru',
    arrangementKey: 'project',
  },
  {
    id: 'SCH-005',
    session: 'extension',
    time: '11:20 AM - 12:05 PM',
    teacher: 'Martha Hailu',
    arrangementKey: 'scripture',
  },
  {
    id: 'SCH-006',
    session: 'virtual',
    time: '12:10 PM - 12:55 PM',
    teacher: 'Nahom Girma',
    arrangementKey: 'mentoring',
  },
];

const Schedule = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('saturday');
  const [scheduleEntries, setScheduleEntries] = useState(SCHEDULE_ENTRIES);

  const arrangementOptions = [
    'opening',
    'classroom',
    'discussion',
    'project',
    'scripture',
    'mentoring',
  ];

  const filteredEntries = scheduleEntries.filter((entry) => entry.session === activeTab);
  const activeTabLabel = t(`common.sessions.${activeTab}`);

  const handleArrangementChange = (entryId, nextArrangementKey) => {
    setScheduleEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.id === entryId ? { ...entry, arrangementKey: nextArrangementKey } : entry
      )
    );
  };

  return (
    <div className="page-container">
      <PageHeader title={t('schedule.title')} subtitle={t('schedule.subtitle')}>
        <button className="btn btn-primary gap-2">
          <Plus size={16} />
          <span>{t('schedule.addButton')}</span>
        </button>
      </PageHeader>

      <div className="content-panel glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="directory-header">
          <div>
            <h2 className="text-xl font-semibold">{t('schedule.listTitle')}</h2>
            <p className="directory-meta mt-2">
              {t('schedule.summary', {
                count: filteredEntries.length,
                session: activeTabLabel,
              })}
            </p>
          </div>
        </div>

        <div className="grade-tabs mt-6">
          {SCHEDULE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`grade-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {t(`common.sessions.${tab}`)}
            </button>
          ))}
        </div>

        <div className="table-container mt-6">
          <table>
            <thead>
              <tr>
                <th>{t('schedule.table.time')}</th>
                <th>{t('schedule.table.teacher')}</th>
                <th>{t('schedule.table.arrangement')}</th>
                <th>{t('schedule.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.time}</td>
                  <td>
                    <div className="font-semibold">{entry.teacher}</div>
                  </td>
                  <td>
                    <select
                      className="table-select arrangement-select"
                      value={entry.arrangementKey}
                      onChange={(event) => handleArrangementChange(entry.id, event.target.value)}
                    >
                      {arrangementOptions.map((option) => (
                        <option key={option} value={option}>
                          {t(`schedule.arrangements.${option}`)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="actions-cell">
                    <button className="btn-icon" title={t('common.actions.edit')}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-icon" title={t('common.actions.delete')}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center p-8 text-secondary">
            {t('schedule.empty', { session: activeTabLabel })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
