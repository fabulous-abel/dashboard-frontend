import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import SuperAdminDashboard from '../pages/superadmin/SuperAdminDashboard';
import UserManagement from '../pages/superadmin/UserManagement';
import Departments from '../pages/superadmin/Departments';
import SystemSettings from '../pages/superadmin/SystemSettings';
import AuditLogs from '../pages/superadmin/AuditLogs';
import { SUPERADMIN_NAV } from '../config/navigation';

function App() {
  return (
    <BrowserRouter basename="/superadmin">
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout
              navItems={SUPERADMIN_NAV}
              basePath="/"
              brandTitle="Super Admin"
              brandSubtitle="System Control"
            />
          }
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="departments" element={<Departments />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="audit-logs" element={<AuditLogs />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
