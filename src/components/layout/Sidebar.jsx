import { createElement } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from 'lucide-react';
import brandLogo from '../../assets/logo.png';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const buildNavPath = (basePath = '/', itemPath = '') => {
  const normalizedBase = basePath === '/' ? '' : basePath.replace(/\/+$/, '');
  const normalizedItem = itemPath.replace(/^\/+/, '');

  return normalizedItem ? `${normalizedBase}/${normalizedItem}` : normalizedBase || '/';
};

const NavigationItem = ({ to, icon, label, onClick, isCollapsed, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
    onClick={onClick}
    aria-label={label}
    title={isCollapsed ? label : undefined}
  >
    {createElement(icon, { size: 20, className: 'nav-icon' })}
    <span className="nav-label">{label}</span>
  </NavLink>
);

const Sidebar = ({
  isCollapsed,
  onToggleCollapse,
  isOpen,
  onClose,
  navItems,
  basePath,
  brandTitle,
  brandSubtitle,
}) => {
  const { t } = useLanguage();
  const { roleMeta } = useAuth();
  const collapseLabel = isCollapsed ? 'Expand sidebar' : 'Collapse sidebar';

  const displayTitle = brandTitle?.startsWith('sidebar.') ? t(brandTitle) : (brandTitle || t('sidebar.brandTitle'));
  const displaySubtitle = brandSubtitle?.startsWith('sidebar.') ? t(brandSubtitle) : (brandSubtitle || t('sidebar.brandSubtitle'));
  const avatarLetter = roleMeta?.avatarLetter || 'A';

  return (
    <aside className={`sidebar glass-panel ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-header-actions">
          <button
            type="button"
            className="desktop-toggle-button collapse-toggle-button"
            onClick={onToggleCollapse}
            aria-label={collapseLabel}
            title={collapseLabel}
          >
            {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>

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
            <img src={brandLogo} alt={displayTitle} className="brand-logo" />
          </div>
          <div className="logo-copy">
            <h1 className="logo-text">{displayTitle}</h1>
            <p className="logo-subtitle">{displaySubtitle}</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavigationItem
            key={item.path}
            to={buildNavPath(basePath, item.path)}
            icon={item.icon}
            label={t(item.labelKey)}
            onClick={onClose}
            isCollapsed={isCollapsed}
            end={item.end}
          />
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile" title={isCollapsed ? t('sidebar.adminUser') : undefined}>
          <div className="avatar">{avatarLetter}</div>
          <div className="user-info">
            <span className="user-name">{t('sidebar.adminUser')}</span>
            <span className="user-role">{roleMeta?.label || t('sidebar.administrator')}</span>
          </div>
        </div>

        <div className="footer-actions">
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

      </div>
    </aside>
  );
};

export default Sidebar;
