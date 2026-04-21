import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import HRDashboard from '../pages/hr/HRDashboard';
import Employees from '../pages/hr/Employees';
import HRDepartments from '../pages/hr/HRDepartments';
import LeaveManagement from '../pages/hr/LeaveManagement';
import Payroll from '../pages/hr/Payroll';
import Recruitment from '../pages/hr/Recruitment';
import { HR_NAV } from '../config/navigation';

function App() {
  return (
    <BrowserRouter basename="/hr">
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout
              navItems={HR_NAV}
              basePath="/"
              brandTitle="HR Portal"
              brandSubtitle="People Management"
            />
          }
        >
          <Route index element={<HRDashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="departments" element={<HRDepartments />} />
          <Route path="leave" element={<LeaveManagement />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="recruitment" element={<Recruitment />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
