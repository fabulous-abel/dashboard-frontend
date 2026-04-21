import PageHeader from '../../components/ui/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const PAYROLL_DATA = [
  { name: 'Abebe Kebede', department: 'Administration', baseSalary: '$4,200', allowances: '$800', deductions: '$620', netPay: '$4,380' },
  { name: 'Tigist Hailu', department: 'HR', baseSalary: '$3,800', allowances: '$600', deductions: '$540', netPay: '$3,860' },
  { name: 'Dawit Tadesse', department: 'Sunday School', baseSalary: '$3,200', allowances: '$400', deductions: '$430', netPay: '$3,170' },
  { name: 'Sara Mengistu', department: 'Finance', baseSalary: '$3,500', allowances: '$500', deductions: '$480', netPay: '$3,520' },
  { name: 'Yohannes Bekele', department: 'Youth Ministry', baseSalary: '$2,900', allowances: '$350', deductions: '$380', netPay: '$2,870' },
  { name: 'Meron Alemu', department: 'Choir', baseSalary: '$2,800', allowances: '$300', deductions: '$360', netPay: '$2,740' },
];

const Payroll = () => {
  const { t } = useLanguage();

  const summaryStats = [
    { label: t('hr.payroll.totalGross'), value: '$124,200', colorClass: 'text-indigo' },
    { label: t('hr.payroll.totalDeductions'), value: '$18,400', colorClass: 'text-red' },
    { label: t('hr.payroll.totalNet'), value: '$105,800', colorClass: 'text-cyan' },
  ];

  return (
    <div className="page-container">
      <PageHeader
        title={t('hr.payroll.title')}
        subtitle={t('hr.payroll.subtitle')}
      />
      <div className="dashboard-grid animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {summaryStats.map((stat) => (
          <div key={stat.label} className="stat-card glass-panel">
            <h3>{stat.label}</h3>
            <div className={`stat-value ${stat.colorClass}`}>{stat.value}</div>
          </div>
        ))}
      </div>
      <div className="content-panel glass-panel mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2>{t('hr.payroll.listTitle')}</h2>
        <div className="table-container" style={{ marginTop: '1.25rem' }}>
          <table>
            <thead>
              <tr>
                <th>{t('hr.payroll.table.employee')}</th>
                <th>{t('hr.payroll.table.department')}</th>
                <th>{t('hr.payroll.table.baseSalary')}</th>
                <th>{t('hr.payroll.table.allowances')}</th>
                <th>{t('hr.payroll.table.deductions')}</th>
                <th>{t('hr.payroll.table.netPay')}</th>
              </tr>
            </thead>
            <tbody>
              {PAYROLL_DATA.map((emp) => (
                <tr key={emp.name}>
                  <td style={{ fontWeight: 600 }}>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.baseSalary}</td>
                  <td style={{ color: 'var(--accent-green)' }}>{emp.allowances}</td>
                  <td style={{ color: 'var(--accent-secondary)' }}>{emp.deductions}</td>
                  <td style={{ fontWeight: 700 }}>{emp.netPay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
