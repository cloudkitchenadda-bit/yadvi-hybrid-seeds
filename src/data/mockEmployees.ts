export interface Employee {
  id: string;
  empId: string;
  name: string;
  role: 'Field Executive' | 'Senior Field Officer' | 'Sales Executive' | 'Territory Manager';
  phone: string;
  email: string;
  location: string;
  lat: number;
  lng: number;
  status: 'Active' | 'On Leave' | 'Inactive';
  attendanceStatus: 'Present' | 'In Field' | 'In Office' | 'Late' | 'Absent' | 'On Leave';
  checkInTime?: string;
  checkOutTime?: string;
  distanceCoveredTodayKm: number;
  assignedShopsCount: number;
  completedVisitsCount: number;
  batteryLevel: number;
  avatar: string;
  lastLocationUpdate: string;
  routeCoordinates: [number, number][];
}

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    empId: 'EMP001',
    name: 'Ramesh Kumar',
    role: 'Field Executive',
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@yadviseeds.com',
    location: 'Nuzvid',
    lat: 16.7850,
    lng: 80.8467,
    status: 'Active',
    attendanceStatus: 'Present',
    checkInTime: '09:12 AM',
    checkOutTime: '05:48 PM',
    distanceCoveredTodayKm: 12.2,
    assignedShopsCount: 6,
    completedVisitsCount: 5,
    batteryLevel: 82,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    lastLocationUpdate: '2 mins ago',
    routeCoordinates: [
      [16.7800, 80.8400],
      [16.7830, 80.8440],
      [16.7850, 80.8467],
    ]
  },
  {
    id: 'emp-2',
    empId: 'EMP002',
    name: 'Suresh Babu',
    role: 'Field Executive',
    phone: '+91 98765 43211',
    email: 'suresh.babu@yadviseeds.com',
    location: 'Guntur',
    lat: 16.3067,
    lng: 80.4365,
    status: 'Active',
    attendanceStatus: 'In Field',
    checkInTime: '09:18 AM',
    distanceCoveredTodayKm: 9.7,
    assignedShopsCount: 5,
    completedVisitsCount: 3,
    batteryLevel: 68,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    lastLocationUpdate: 'Just now',
    routeCoordinates: [
      [16.3000, 80.4300],
      [16.3040, 80.4330],
      [16.3067, 80.4365],
    ]
  },
  {
    id: 'emp-3',
    empId: 'EMP003',
    name: 'Vikram Reddy',
    role: 'Field Executive',
    phone: '+91 98765 43212',
    email: 'vikram.reddy@yadviseeds.com',
    location: 'Tenali',
    lat: 16.2430,
    lng: 80.6400,
    status: 'Active',
    attendanceStatus: 'In Office',
    checkInTime: '09:05 AM',
    distanceCoveredTodayKm: 15.2,
    assignedShopsCount: 7,
    completedVisitsCount: 6,
    batteryLevel: 91,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    lastLocationUpdate: '5 mins ago',
    routeCoordinates: [
      [16.2380, 80.6350],
      [16.2410, 80.6380],
      [16.2430, 80.6400],
    ]
  },
  {
    id: 'emp-4',
    empId: 'EMP004',
    name: 'Mahesh Yadav',
    role: 'Field Executive',
    phone: '+91 98765 43213',
    email: 'mahesh.yadav@yadviseeds.com',
    location: 'Vijayawada',
    lat: 16.5062,
    lng: 80.6480,
    status: 'On Leave',
    attendanceStatus: 'On Leave',
    checkInTime: undefined,
    distanceCoveredTodayKm: 0,
    assignedShopsCount: 5,
    completedVisitsCount: 0,
    batteryLevel: 45,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80',
    lastLocationUpdate: 'Yesterday',
    routeCoordinates: []
  },
  {
    id: 'emp-5',
    empId: 'EMP005',
    name: 'Gopi Krishna',
    role: 'Field Executive',
    phone: '+91 98765 43214',
    email: 'gopi.krishna@yadviseeds.com',
    location: 'Nuzvid',
    lat: 16.7900,
    lng: 80.8520,
    status: 'Active',
    attendanceStatus: 'Absent',
    checkInTime: undefined,
    distanceCoveredTodayKm: 0,
    assignedShopsCount: 4,
    completedVisitsCount: 0,
    batteryLevel: 74,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    lastLocationUpdate: '1 hr ago',
    routeCoordinates: []
  },
  {
    id: 'emp-6',
    empId: 'EMP006',
    name: 'Lakshmi Devi',
    role: 'Sales Executive',
    phone: '+91 98765 43215',
    email: 'lakshmi.devi@yadviseeds.com',
    location: 'Guntur',
    lat: 16.3120,
    lng: 80.4420,
    status: 'Active',
    attendanceStatus: 'Present',
    checkInTime: '08:55 AM',
    checkOutTime: '05:30 PM',
    distanceCoveredTodayKm: 18.4,
    assignedShopsCount: 8,
    completedVisitsCount: 7,
    batteryLevel: 89,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    lastLocationUpdate: '10 mins ago',
    routeCoordinates: [
      [16.3050, 80.4350],
      [16.3090, 80.4390],
      [16.3120, 80.4420],
    ]
  },
  {
    id: 'emp-7',
    empId: 'EMP007',
    name: 'Anil Varma',
    role: 'Territory Manager',
    phone: '+91 98765 43216',
    email: 'anil.varma@yadviseeds.com',
    location: 'Eluru',
    lat: 16.7107,
    lng: 81.0952,
    status: 'Active',
    attendanceStatus: 'In Field',
    checkInTime: '09:20 AM',
    distanceCoveredTodayKm: 22.5,
    assignedShopsCount: 6,
    completedVisitsCount: 4,
    batteryLevel: 62,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    lastLocationUpdate: '1 min ago',
    routeCoordinates: [
      [16.7020, 81.0850],
      [16.7060, 81.0900],
      [16.7107, 81.0952],
    ]
  }
];

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  empId: string;
  leaveType: 'Sick Leave' | 'Casual Leave' | 'Emergency Leave';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'leave-1',
    employeeId: 'emp-4',
    employeeName: 'Mahesh Yadav',
    empId: 'EMP004',
    leaveType: 'Casual Leave',
    startDate: '2026-09-22',
    endDate: '2026-09-23',
    days: 2,
    reason: 'Family function in hometown',
    status: 'Approved',
    appliedOn: '2026-09-20'
  },
  {
    id: 'leave-2',
    employeeId: 'emp-5',
    employeeName: 'Gopi Krishna',
    empId: 'EMP005',
    leaveType: 'Sick Leave',
    startDate: '2026-09-22',
    endDate: '2026-09-22',
    days: 1,
    reason: 'Sudden fever and medical consultation',
    status: 'Pending',
    appliedOn: '2026-09-22'
  },
  {
    id: 'leave-3',
    employeeId: 'emp-2',
    employeeName: 'Suresh Babu',
    empId: 'EMP002',
    leaveType: 'Casual Leave',
    startDate: '2026-09-28',
    endDate: '2026-09-29',
    days: 2,
    reason: 'Personal travel and house renovation',
    status: 'Pending',
    appliedOn: '2026-09-21'
  }
];
