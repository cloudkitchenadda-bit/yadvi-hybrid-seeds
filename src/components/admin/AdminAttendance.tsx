import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import {
  CalendarCheck,
  CalendarX2,
  Clock,
  UserCheck,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

export const AdminAttendance: React.FC = () => {
  const { employees, leaves, approveLeave, rejectLeave } = useAppState();
  const [activeSubTab, setActiveSubTab] = useState<'daily' | 'leaves'>('daily');
  const [searchTerm, setSearchTerm] = useState('');

  const presentCount = employees.filter((e) => e.attendanceStatus === 'Present' || e.attendanceStatus === 'In Field').length;
  const lateCount = employees.filter((e) => e.attendanceStatus === 'Late').length || 6;
  const onLeaveCount = employees.filter((e) => e.attendanceStatus === 'On Leave').length;
  const absentCount = employees.filter((e) => e.attendanceStatus === 'Absent').length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Attendance & Leave Management</h2>
          <p className="text-xs text-slate-500">Biometric and mobile GPS verified employee attendance logs</p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveSubTab('daily')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
              activeSubTab === 'daily' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Daily Attendance (78)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('leaves')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
              activeSubTab === 'leaves' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarX2 className="w-3.5 h-3.5" />
            <span>Leave Requests ({leaves.length})</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'daily' ? (
        <>
          {/* 4 Attendance Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Present Today</div>
              <div className="text-2xl font-black text-emerald-700 mt-1">62</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">79.49% on duty</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Late Arrivals</div>
              <div className="text-2xl font-black text-orange-600 mt-1">6</div>
              <div className="text-[10px] text-orange-500 font-semibold mt-0.5">&gt;15 min delayed</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Approved Leave</div>
              <div className="text-2xl font-black text-amber-600 mt-1">5</div>
              <div className="text-[10px] text-amber-500 font-semibold mt-0.5">Casual / Medical</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Uninformed Absent</div>
              <div className="text-2xl font-black text-red-600 mt-1">5</div>
              <div className="text-[10px] text-red-500 font-semibold mt-0.5">Alert dispatched</div>
            </div>
          </div>

          {/* Daily Logs Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Punch In / Out Feed</h3>
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter employee..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">Role & Territory</th>
                    <th className="py-3 px-4 font-mono">Check In</th>
                    <th className="py-3 px-4 font-mono">Check Out</th>
                    <th className="py-3 px-4 text-center">Working Hours</th>
                    <th className="py-3 px-4 text-center">Distance</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <div className="font-bold text-slate-900">{emp.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{emp.empId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-800">{emp.role}</div>
                        <div className="text-[10px] text-slate-400">📍 {emp.location}</div>
                      </td>
                      <td className="py-3 px-4 font-mono font-medium">{emp.checkInTime || '--:--'}</td>
                      <td className="py-3 px-4 font-mono font-medium">{emp.checkOutTime || '--:--'}</td>
                      <td className="py-3 px-4 text-center font-mono font-medium">
                        {emp.checkInTime ? '8h 24m' : '--'}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-semibold text-slate-800">
                        {emp.distanceCoveredTodayKm > 0 ? `${emp.distanceCoveredTodayKm} km` : '0 km'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                            emp.attendanceStatus === 'Present' || emp.attendanceStatus === 'In Field'
                              ? 'bg-emerald-100 text-emerald-800'
                              : emp.attendanceStatus === 'In Office'
                              ? 'bg-blue-100 text-blue-800'
                              : emp.attendanceStatus === 'On Leave'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {emp.attendanceStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Leave Requests Section with Approve/Reject interactive actions */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Leave Applications</h3>
              <p className="text-xs text-slate-500">Approve or reject pending field force leave requests</p>
            </div>
          </div>

          <div className="space-y-3">
            {leaves.map((leave) => (
              <div
                key={leave.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{leave.employeeName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200 font-mono text-slate-700">
                      {leave.empId}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        leave.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : leave.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {leave.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    <b>{leave.leaveType}</b>: {leave.startDate} to {leave.endDate} ({leave.days} Days)
                  </div>
                  <div className="text-xs text-slate-500 italic mt-0.5">"{leave.reason}"</div>
                </div>

                {leave.status === 'Pending' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approveLeave(leave.id)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => rejectLeave(leave.id)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
