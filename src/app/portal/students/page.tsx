"use client";

import { useState } from "react";
import Link from "next/link";
import { DEMO_STUDENTS, DEMO_CLASSES } from "@/lib/demo-data";
import {
  Users,
  Search,
  Filter,
  UserPlus,
  ArrowRight,
  Eye,
  FileSpreadsheet,
  Download,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function StudentsRegistryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredStudents = DEMO_STUDENTS.filter((std) => {
    const matchesSearch =
      std.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.admission_number.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      classFilter === "all" || std.class_name.toLowerCase().includes(classFilter.toLowerCase());

    const matchesStatus = statusFilter === "all" || std.status === statusFilter;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleExportCSV = () => {
    toast.success("Exported 7 student records to CSV successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Student Admissions &amp; Registry
          </h1>
          <p className="text-surface-500 text-sm mt-0.5">
            Central repository of all enrolled students, biological profiles, and academic allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="btn-secondary text-xs inline-flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <Link
            href="/portal/students/admissions"
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            Admit New Student
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name or admission number (e.g. FE-2024-001)..."
            className="input-field pl-10 text-xs py-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="input-field text-xs py-2 w-44"
          >
            <option value="all">All Class Levels</option>
            <option value="form 1">Form 1 (Grade 9)</option>
            <option value="form 2">Form 2 (Grade 10)</option>
            <option value="form 3">Form 3 (Grade 11)</option>
            <option value="form 4">Form 4 (Grade 12)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field text-xs py-2 w-32"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="transferred">Transferred</option>
          </select>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white border border-surface-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 text-surface-600 border-b border-surface-100">
              <tr>
                <th className="py-3 px-4 font-semibold">Admission No</th>
                <th className="py-3 px-4 font-semibold">Student Name</th>
                <th className="py-3 px-4 font-semibold">Class &amp; Stream</th>
                <th className="py-3 px-4 font-semibold">Gender</th>
                <th className="py-3 px-4 font-semibold">Guardian Contact</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filteredStudents.map((std) => (
                <tr key={std.id} className="hover:bg-surface-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-surface-900">
                    {std.admission_number}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-surface-900">
                      {std.first_name} {std.middle_name} {std.last_name}
                    </div>
                    <span className="text-[11px] text-surface-400">
                      Born {std.date_of_birth}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-surface-900">{std.class_name}</span>
                    <span className="block text-[11px] text-surface-500">{std.stream_name}</span>
                  </td>
                  <td className="py-3 px-4 capitalize text-surface-600">{std.gender}</td>
                  <td className="py-3 px-4">
                    <div className="text-surface-900 font-medium">{std.guardian_name}</div>
                    <div className="text-[11px] font-mono text-surface-500">{std.guardian_phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="badge-success text-[11px] capitalize">{std.status}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/portal/students/${std.id}`}
                      className="btn-secondary text-xs px-2.5 py-1 inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View 360&deg;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-surface-100 flex items-center justify-between text-xs text-surface-500">
          <span>Showing {filteredStudents.length} of {DEMO_STUDENTS.length} registered students</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded border border-surface-200 text-surface-400 disabled:opacity-50" disabled>Previous</button>
            <span className="px-2 font-medium text-surface-900">1</span>
            <button className="px-2 py-1 rounded border border-surface-200 text-surface-400 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
