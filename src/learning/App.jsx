import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Dashboard from '../pages/learning/Dashboard';
import Students from '../pages/learning/Students';
import Teachers from '../pages/learning/Teachers';
import Schedule from '../pages/learning/Schedule';
import Attendance from '../pages/learning/Attendance';
import Facilitators from '../pages/learning/Facilitators';
import { LEARNING_NAV } from '../config/navigation';

function App() {
  return (
    <BrowserRouter basename="/learning">
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout
              navItems={LEARNING_NAV}
              basePath="/"
              brandTitle="sidebar.brandTitle"
              brandSubtitle="sidebar.brandSubtitle"
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="facilitators" element={<Facilitators />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
