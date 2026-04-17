import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  CheckCircle,
  Settings,
  Languages,
  Sun,
  Moon,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from 'lucide-react';
import brandLogo from '../../assets/logo.png';
import { useLanguage } from '../../context/LanguageContext';
import './Sidebar.css';

const NavigationItem = ({ to, icon: Icon, label, onClick, isCollapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
    onClick={onClick}
    aria-label={label}
    title={isCollapsed ? label : undefined}
  >
    <Icon size={20} className="nav-icon" />
    <span className="nav-label">{label}</span>
  </NavLink>
);

const Sidebar = ({
  theme,
  onToggleTheme,
  isCollapsed,
  onToggleCollapse,
  isOpen,
  onClose,
}) => {
  const { t, language, toggleLanguage } = useLanguage();
  const isDarkTheme = theme === 'dark';
  const userRole = t('sidebar.administrator');
  const collapseLabel = isCollapsed ? 'Expand sidebar' : 'Collapse sidebar';
  const nextLanguageLabel =
    language === 'en' ? t('common.languages.amharic') : t('common.languages.english');

  return (
    <aside className={`sidebar glass-panel ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-header-actions">
          <button
            type="button"
            className="mobile-close-button"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="logo-container">
          <div className="logo-mark">
            <img src={brandLogo} alt={t('sidebar.brandTitle')} className="brand-logo" />
          </div>
          <div className="logo-copy">
            <h1 className="logo-text">{t('sidebar.brandTitle')}</h1>
            <p className="logo-subtitle">{t('sidebar.brandSubtitle')}</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavigationItem
          to="/"
          icon={LayoutDashboard}
          label={t('sidebar.dashboard')}
          onClick={onClose}
          isCollapsed={isCollapsed}
        />
        <NavigationItem
          to="/students"
          icon={Users}
          label={t('sidebar.students')}
          onClick={onClose}
          isCollapsed={isCollapsed}
        />
        <NavigationItem
          to="/teachers"
          icon={GraduationCap}
          label={t('sidebar.teachers')}
          onClick={onClose}
          isCollapsed={isCollapsed}
        />
        <NavigationItem
          to="/schedule"
          icon={Calendar}
          label={t('sidebar.schedule')}
          onClick={onClose}
          isCollapsed={isCollapsed}
        />
        <NavigationItem
          to="/attendance"
          icon={CheckCircle}
          label={t('sidebar.attendance')}
          onClick={onClose}
          isCollapsed={isCollapsed}
        />
        <NavigationItem
          to="/facilitators"
          icon={Settings}
          label={t('sidebar.facilitators')}
          onClick={onClose}
          isCollapsed={isCollapsed}
        />
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile" title={isCollapsed ? t('sidebar.adminUser') : undefined}>
          <div className="avatar">A</div>
          <div className="user-info">
            <span className="user-name">{t('sidebar.adminUser')}</span>
            {userRole ? <span className="user-role">{userRole}</span> : null}
          </div>
        </div>

        <div className="footer-actions">
          <button
            type="button"
            className="theme-switch"
            onClick={onToggleTheme}
            aria-label={t('common.appearance.label')}
            title={isCollapsed ? t('common.appearance.label') : undefined}
          >
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

          <button
            type="button"
            className="language-switch"
            onClick={toggleLanguage}
            aria-label={nextLanguageLabel}
            title={isCollapsed ? nextLanguageLabel : undefined}
          >
            <Languages size={18} />
            <span className="sidebar-action-text">{nextLanguageLabel}</span>
          </button>

          <button
            type="button"
            className="sign-out-button"
            aria-label={t('sidebar.signOut')}
            title={isCollapsed ? t('sidebar.signOut') : undefined}
          >
            <LogOut size={18} />
            <span className="sidebar-action-text">{t('sidebar.signOut')}</span>
          </button>
        </div>

        <button
          type="button"
          className="desktop-toggle-button collapse-toggle-button"
          onClick={onToggleCollapse}
          aria-label={collapseLabel}
          title={collapseLabel}
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
