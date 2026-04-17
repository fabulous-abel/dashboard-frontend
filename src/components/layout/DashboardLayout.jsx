import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Check, Languages, Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import { useLanguage } from '../../context/LanguageContext';

const LANGUAGE_OPTIONS = [
  { code: 'en', labelKey: 'common.languages.english' },
  { code: 'am', labelKey: 'common.languages.amharic' },
];

const DashboardLayout = () => {
  const { language, setLanguage, t } = useLanguage();
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    return window.localStorage.getItem('dashboard-theme') || 'light';
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem('dashboard-sidebar-collapsed') === 'true';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed((prev) => !prev);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('dashboard-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem('dashboard-sidebar-collapsed', String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  useEffect(() => {
    if (!isLanguageMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!languageMenuRef.current?.contains(event.target)) {
        setIsLanguageMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', handlePointerDown);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isLanguageMenuOpen]);

  const handleThemeToggle = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLanguageSelect = (nextLanguage) => {
    setLanguage(nextLanguage);
    setIsLanguageMenuOpen(false);
  };

  return (
    <div className="app-container">
      <Sidebar
        theme={theme}
        onToggleTheme={handleThemeToggle}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="mobile-overlay active" 
          onClick={closeSidebar} 
          aria-hidden="true" 
        />
      )}

      <main className="main-content">
        <div className="app-topbar">
          <button
            type="button"
            className="mobile-menu-trigger glass-panel"
            onClick={toggleSidebar}
            aria-label="Toggle Menu"
          >
            <Menu size={24} />
          </button>

          <div className="language-menu" ref={languageMenuRef}>
            <button
              type="button"
              className="language-icon-button glass-panel"
              aria-label={t('topbar.languageMenuLabel')}
              aria-expanded={isLanguageMenuOpen}
              onClick={() => setIsLanguageMenuOpen((open) => !open)}
            >
              <Languages size={18} />
              <span className="language-current">{language.toUpperCase()}</span>
            </button>

            {isLanguageMenuOpen && (
              <div className="language-dropdown glass-panel" role="menu">
                {LANGUAGE_OPTIONS.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    className={`language-menu-item ${language === option.code ? 'active' : ''}`}
                    onClick={() => handleLanguageSelect(option.code)}
                  >
                    <span>{t(option.labelKey)}</span>
                    {language === option.code && <Check size={16} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
