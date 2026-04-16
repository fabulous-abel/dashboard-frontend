import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  CheckCircle,
  Settings,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react';
import brandLogo from '../../assets/logo.png';
import { useLanguage } from '../../context/LanguageContext';
import './Sidebar.css';

const NavigationItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
  >
    <Icon size={20} className="nav-icon" />
    <span className="nav-label">{label}</span>
  </NavLink>
);

const Sidebar = ({ theme, onToggleTheme }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const isDarkTheme = theme === 'dark';
  const userRole = t('sidebar.administrator');

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-mark">
            <img src={brandLogo} alt={t('sidebar.brandTitle')} className="brand-logo" />
          </div>
          <div>
            <h1 className="logo-text">{t('sidebar.brandTitle')}</h1>
            <p className="logo-subtitle">{t('sidebar.brandSubtitle')}</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavigationItem to="/" icon={LayoutDashboard} label={t('sidebar.dashboard')} />
        <NavigationItem to="/students" icon={Users} label={t('sidebar.students')} />
        <NavigationItem to="/teachers" icon={GraduationCap} label={t('sidebar.teachers')} />
        <NavigationItem to="/schedule" icon={Calendar} label={t('sidebar.schedule')} />
        <NavigationItem to="/attendance" icon={CheckCircle} label={t('sidebar.attendance')} />
        <NavigationItem to="/facilitators" icon={Settings} label={t('sidebar.facilitators')} />
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">A</div>
          <div className="user-info">
            <span className="user-name">{t('sidebar.adminUser')}</span>
            {userRole ? <span className="user-role">{userRole}</span> : null}
          </div>
        </div>

        <div className="footer-actions">
          <button type="button" className="theme-switch" onClick={onToggleTheme}>
            <div className="theme-switch-copy">
              <span className="theme-switch-label">{t('common.appearance.label')}</span>
              <span className="theme-switch-value">
                {isDarkTheme ? t('common.appearance.dark') : t('common.appearance.bright')}
              </span>
            </div>
            <div className={`theme-switch-track ${isDarkTheme ? 'is-dark' : ''}`}>
              <span className="theme-switch-icon">
                {isDarkTheme ? <Moon size={14} /> : <Sun size={14} />}
              </span>
            </div>
          </button>

          <button type="button" className="language-switch" onClick={toggleLanguage}>
            <Languages size={18} />
            <span>{language === 'en' ? 'አማርኛ' : 'English'}</span>
          </button>

          <button type="button" className="sign-out-button">
            <LogOut size={18} />
            <span>{t('sidebar.signOut')}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
