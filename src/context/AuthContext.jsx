import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const ROLE_KEY = 'dashboard-active-role';

export const ROLES = {
  SUPERADMIN: 'superadmin',
  HR: 'hr',
  LEARNING: 'learning',
};

export const ROLE_META = {
  [ROLES.SUPERADMIN]: {
    label: 'Super Admin',
    description: 'Full system access and management',
    basePath: '/superadmin/',
    brandTitle: 'Super Admin',
    brandSubtitle: 'System Control',
    avatarLetter: 'S',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  [ROLES.HR]: {
    label: 'HR Management',
    description: 'Human resources and employee management',
    basePath: '/hr/',
    brandTitle: 'HR Portal',
    brandSubtitle: 'People Management',
    avatarLetter: 'H',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
  },
  [ROLES.LEARNING]: {
    label: 'Learning',
    description: 'Student learning department',
    basePath: '/learning/',
    brandTitle: 'sidebar.brandTitle',
    brandSubtitle: 'sidebar.brandSubtitle',
    avatarLetter: 'A',
    gradient: 'linear-gradient(135deg, #1a2b8a, #ed1c24)',
  },
};

export const AuthProvider = ({ children }) => {
  const [role, setRoleState] = useState(() => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(ROLE_KEY) || null;
  });

  const setRole = useCallback((newRole) => {
    setRoleState(newRole);
    if (newRole) {
      window.localStorage.setItem(ROLE_KEY, newRole);
    } else {
      window.localStorage.removeItem(ROLE_KEY);
    }
  }, []);

  const logout = useCallback(() => {
    setRoleState(null);
    window.localStorage.removeItem(ROLE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole, logout, roleMeta: role ? ROLE_META[role] : null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
