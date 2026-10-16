"use client";

import { useState } from "react";
import { DEMO_STUDENTS, DEMO_CLASSES, DEMO_STREAMS } from "@/lib/demo-data";
import { AttendanceStatus } from "@/lib/types";
import {
  UserCheck,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  Save,
  Filter,
  Users,
} from "lucide-react";
import { toast } from "sonner";

interface StudentAttendanceRecord {
  studentId: string;
  admissionNo: string;
  name: string;
  status: AttendanceStatus;
  remarks: string;
}

export default function AttendancePage() {
  const [selectedClassId, setSelectedClassId] = useState("cls-f3");
  const [selectedDate, setSelectedDate] = useState("2026-03-02");

  const [records, setRecords] = useState<StudentAttendanceRecord[]>(() =>
    DEMO_STUDENTS.slice(0, 6).map((std, i) => ({
      studentId: std.id,
      admissionNo: std.admission_number,
      name: `${std.first_name} ${std.last_name}`,
      status: i === 3 ? "late" : i === 5 ? "absent" : "present",
      remarks: i === 3 ? "Bus delayed in morning traffic" : "",
    }))
  );

  const presentCount = records.filter((r) => r.status === "present").length;
  const lateCount = records.filter((r) => r.status === "late").length;
  const absentCount = records.filter((r) => r.status === "absent").length;
  const excusedCount = records.filter((r) => r.status === "excused").length;
  const total = records.length;
  const rate = total > 0 ? (((presentCount + lateCount) / total) * 100).toFixed(1) : "0";

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setRecords((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, status } : r))
    );
  };

  const handleRemarksChange = (studentId: string, remarks: string) => {
    setRecords((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, remarks } : r))
    );
  };

  const handleMarkAllPresent = () => {
    setRecords((prev) => prev.map((r) => ({ ...r, status: "present" })));
    toast.success("All students marked as Present");
  };

  const handleSaveAttendance = () => {
    toast.success("Attendance register saved & synchronized with school database!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Daily Attendance Register
          </h1>
          <p className="text-surface-500 text-sm mt-0.5">
            Conduct morning roll-calls, track tardiness, and maintain digital student presence logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleMarkAllPresent}
            className="btn-secondary text-xs inline-flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Mark All Present
          </button>
          <button
            type="button"
            onClick={handleSaveAttendance}
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            Save Roll Call
          </button>
        </div>
      </div>

      {/* Selector & Rate Bar */}
      <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
        <div>
          <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider block mb-1">
            Class &amp; Stream
          </label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="input-field text-xs py-2"
          >
            <option value="cls-f3">Form 3 West (Grade 11)</option>
            <option value="cls-f2">Form 2 East (Grade 10)</option>
            <option value="cls-f1">Form 1 East (Grade 9)</option>
            <option value="cls-f4">Form 4 East (Grade 12)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider block mb-1">
            Roll Call Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field text-xs py-2"
          />
        </div>

        <div>
          <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider block mb-1">
            Today&apos;s Attendance Rate
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-emerald-600">{rate}%</span>
            <span className="text-xs text-surface-500">
              ({presentCount + lateCount} / {total} students)
            </span>
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider block mb-1">
            Roll Call Officer
          </span>
          <span className="text-xs font-medium text-surface-900 block">
            Ms. Sarah Jenkins (Class Teacher)
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-surface-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] text-emerald-600 font-semibold block uppercase">Present</span>
          <span className="text-xl font-bold text-surface-900 mt-0.5">{presentCount}</span>
        </div>
        <div className="bg-white border border-surface-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] text-amber-600 font-semibold block uppercase">Late Arrival</span>
          <span className="text-xl font-bold text-surface-900 mt-0.5">{lateCount}</span>
        </div>
        <div className="bg-white border border-surface-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] text-rose-600 font-semibold block uppercase">Unexcused Absent</span>
          <span className="text-xl font-bold text-surface-900 mt-0.5">{absentCount}</span>
        </div>
        <div className="bg-white border border-surface-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] text-blue-600 font-semibold block uppercase">Excused / Medical</span>
          <span className="text-xl font-bold text-surface-900 mt-0.5">{excusedCount}</span>
        </div>
      </div>

      {/* Students Roll Call List */}
      <div className="bg-white border border-surface-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-surface-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-primary-600" />
            <h2 className="font-display font-semibold text-sm text-surface-900">
              Form 3 West Attendance Sheet
            </h2>
          </div>
          <span className="text-xs text-surface-400">
            Click status pills to toggle student state
          </span>
        </div>

        <div className="divide-y divide-surface-100">
          {records.map((rec) => (
            <div
              key={rec.studentId}
              className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-surface-50/50 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-surface-900 text-sm">{rec.name}</h3>
                  <span className="text-xs font-mono text-surface-400">({rec.admissionNo})</span>
                </div>
                <input
                  type="text"
                  value={rec.remarks}
                  onChange={(e) => handleRemarksChange(rec.studentId, e.target.value)}
                  placeholder="Add optional incident remark or late excuse..."
                  className="mt-1.5 text-xs text-surface-800 bg-surface-50 border border-surface-200 hover:border-surface-300 focus:border-primary-500 focus:bg-white rounded-lg px-2.5 py-1 w-full sm:w-80 focus:outline-none transition-colors"
                />
              </div>

              {/* Status Toggle Pills */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleStatusChange(rec.studentId, "present")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    rec.status === "present"
                      ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                      : "bg-surface-50 text-surface-700 border-surface-200 hover:bg-surface-100"
                  }`}
                >
                  Present
                </button>

                <button
                  type="button"
                  onClick={() => handleStatusChange(rec.studentId, "late")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    rec.status === "late"
                      ? "bg-amber-600 text-white border-amber-700 shadow-xs"
                      : "bg-surface-50 text-surface-700 border-surface-200 hover:bg-surface-100"
                  }`}
                >
                  Late
                </button>

                <button
                  type="button"
                  onClick={() => handleStatusChange(rec.studentId, "absent")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    rec.status === "absent"
                      ? "bg-rose-600 text-white border-rose-700 shadow-xs"
                      : "bg-surface-50 text-surface-700 border-surface-200 hover:bg-surface-100"
                  }`}
                >
                  Absent
                </button>

                <button
                  type="button"
                  onClick={() => handleStatusChange(rec.studentId, "excused")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    rec.status === "excused"
                      ? "bg-blue-600 text-white border-blue-700 shadow-xs"
                      : "bg-surface-50 text-surface-700 border-surface-200 hover:bg-surface-100"
                  }`}
                >
                  Excused
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
