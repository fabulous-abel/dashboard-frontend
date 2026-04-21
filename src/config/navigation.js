import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  CheckCircle,
  Settings,
  Building2,
  Shield,
  FileText,
  ClipboardList,
  UserPlus,
  Briefcase,
  CalendarOff,
  DollarSign,
  UserCheck,
} from 'lucide-react';

export const LEARNING_NAV = [
  { path: '', icon: LayoutDashboard, labelKey: 'sidebar.dashboard', end: true },
  { path: 'students', icon: Users, labelKey: 'sidebar.students' },
  { path: 'teachers', icon: GraduationCap, labelKey: 'sidebar.teachers' },
  { path: 'schedule', icon: Calendar, labelKey: 'sidebar.schedule' },
  { path: 'attendance', icon: CheckCircle, labelKey: 'sidebar.attendance' },
  { path: 'facilitators', icon: Settings, labelKey: 'sidebar.facilitators' },
];

export const SUPERADMIN_NAV = [
  { path: '', icon: LayoutDashboard, labelKey: 'superadmin.nav.dashboard', end: true },
  { path: 'users', icon: Users, labelKey: 'superadmin.nav.users' },
  { path: 'departments', icon: Building2, labelKey: 'superadmin.nav.departments' },
  { path: 'settings', icon: Shield, labelKey: 'superadmin.nav.settings' },
  { path: 'audit-logs', icon: FileText, labelKey: 'superadmin.nav.auditLogs' },
];

export const HR_NAV = [
  { path: '', icon: LayoutDashboard, labelKey: 'hr.nav.dashboard', end: true },
  { path: 'employees', icon: UserCheck, labelKey: 'hr.nav.employees' },
  { path: 'departments', icon: Building2, labelKey: 'hr.nav.departments' },
  { path: 'leave', icon: CalendarOff, labelKey: 'hr.nav.leave' },
  { path: 'payroll', icon: DollarSign, labelKey: 'hr.nav.payroll' },
  { path: 'recruitment', icon: UserPlus, labelKey: 'hr.nav.recruitment' },
];
