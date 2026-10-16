"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DEMO_STUDENTS,
  DEMO_ASSESSMENTS,
  DEMO_MARKS,
  DEMO_CLASSES,
  DEMO_SUBJECTS,
} from "@/lib/demo-data";
import {
  ClipboardCheck,
  Save,
  Send,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileSpreadsheet,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

interface StudentMarkRow {
  studentId: string;
  admissionNo: string;
  name: string;
  marks: number | "";
  remarks: string;
}

export default function MarksEntryPage() {
  const [selectedAssessmentId, setSelectedAssessmentId] = useState("asm-mat-f3");
  const currentAssessment =
    DEMO_ASSESSMENTS.find((a) => a.id === selectedAssessmentId) || DEMO_ASSESSMENTS[0];
  const maxMarks = currentAssessment.max_marks;

  // Initial student rows with marks
  const [rows, setRows] = useState<StudentMarkRow[]>(() => {
    const existing = DEMO_MARKS[selectedAssessmentId] || [];
    return DEMO_STUDENTS.slice(0, 5).map((std) => {
      const markEntry = existing.find((m) => m.student_id === std.id);
      return {
        studentId: std.id,
        admissionNo: std.admission_number,
        name: `${std.first_name} ${std.last_name}`,
        marks: markEntry ? markEntry.marks : "",
        remarks: markEntry ? markEntry.remarks : "",
      };
    });
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"draft" | "submitted">("draft");

  // Calculate live statistics
  const validMarks = rows.map((r) => r.marks).filter((m): m is number => typeof m === "number");
  const count = validMarks.length;
  const sum = validMarks.reduce((a, b) => a + b, 0);
  const average = count > 0 ? (sum / count).toFixed(1) : "0.0";
  const highest = count > 0 ? Math.max(...validMarks) : 0;
  const lowest = count > 0 ? Math.min(...validMarks) : 0;
  const passRate =
    count > 0 ? ((validMarks.filter((m) => m >= maxMarks * 0.5).length / count) * 100).toFixed(0) : "0";

  const calculateGrade = (mark: number | "") => {
    if (mark === "" || typeof mark !== "number") return "-";
    const pct = (mark / maxMarks) * 100;
    if (pct >= 80) return "A";
    if (pct >= 70) return "B";
    if (pct >= 55) return "C";
    if (pct >= 40) return "D";
    return "E";
  };

  const handleMarkChange = (studentId: string, val: string) => {
    const num = val === "" ? "" : Number(val);
    if (typeof num === "number" && num > maxMarks) {
      toast.error(`Mark cannot exceed maximum of ${maxMarks}`);
      return;
    }
    if (typeof num === "number" && num < 0) {
      return;
    }

    setRows((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, marks: num } : r))
    );
  };

  const handleRemarksChange = (studentId: string, remarks: string) => {
    setRows((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, remarks } : r))
    );
  };

  const handleSaveDraft = () => {
    toast.success("Marks saved as draft (Auto-saved locally)");
  };

  const handleSubmitForReview = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStatus("submitted");
      toast.success(
        "Marks submitted successfully! Forwarded to Headteacher & Administrator for review."
      );
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header & Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/portal/assessments"
              className="text-xs text-surface-500 hover:text-surface-700 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Assessments
            </Link>
            <span className="text-surface-300">&bull;</span>
            <span className="text-xs text-primary-600 font-medium">Marks Entry Module</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Spreadsheet Marks Entry
          </h1>
          <p className="text-surface-500 text-sm">
            Enter individual assessment marks with automatic grading and submission verification.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="btn-secondary text-xs inline-flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button
            type="button"
            onClick={handleSubmitForReview}
            disabled={isSubmitting || submissionStatus === "submitted"}
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            {submissionStatus === "submitted" ? "Submitted for Review" : "Submit for Approval"}
          </button>
        </div>
      </div>

      {/* Assessment Selector & Meta Bar */}
      <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div>
          <label className="text-xs font-semibold text-surface-500 uppercase tracking-wider block mb-1">
            Select Assessment
          </label>
          <select
            value={selectedAssessmentId}
            onChange={(e) => setSelectedAssessmentId(e.target.value)}
            className="input-field text-xs py-2"
          >
            {DEMO_ASSESSMENTS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title} ({a.class_name})
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider block mb-1">
            Subject &amp; Stream
          </span>
          <p className="text-xs font-medium text-surface-900">
            {currentAssessment.subject_name} &bull; Form 3 West
          </p>
        </div>

        <div>
          <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider block mb-1">
            Maximum Marks
          </span>
          <span className="badge-primary text-xs">{maxMarks} Points</span>
        </div>

        <div>
          <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider block mb-1">
            Workflow Status
          </span>
          {submissionStatus === "submitted" ? (
            <span className="badge-warning text-xs">Submitted &bull; Pending Review</span>
          ) : (
            <span className="badge-neutral text-xs">Draft &bull; In Progress</span>
          )}
        </div>
      </div>

      {/* Live Class Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white border border-surface-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] text-surface-500 block">Class Average</span>
          <span className="text-lg font-bold text-primary-700">{average} / {maxMarks}</span>
        </div>
        <div className="bg-white border border-surface-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] text-surface-500 block">Pass Rate</span>
          <span className="text-lg font-bold text-emerald-600">{passRate}%</span>
        </div>
        <div className="bg-white border border-surface-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] text-surface-500 block">Highest Mark</span>
          <span className="text-lg font-bold text-surface-900">{highest}</span>
        </div>
        <div className="bg-white border border-surface-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] text-surface-500 block">Lowest Mark</span>
          <span className="text-lg font-bold text-surface-900">{lowest}</span>
        </div>
        <div className="bg-white border border-surface-200 rounded-xl p-3 text-center shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[11px] text-surface-500 block">Marks Logged</span>
          <span className="text-lg font-bold text-surface-900">{count} / {rows.length}</span>
        </div>
      </div>

      {/* Interactive Spreadsheet Grid */}
      <div className="bg-white border border-surface-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-surface-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-primary-600" />
            <h2 className="font-display font-semibold text-sm text-surface-900">
              Student Marks Register
            </h2>
          </div>
          <span className="text-xs text-surface-400">
            Scores update automatically on keystroke
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 text-surface-600 border-b border-surface-100">
              <tr>
                <th className="py-3 px-4 font-semibold w-12 text-center">#</th>
                <th className="py-3 px-4 font-semibold w-32">Admission No</th>
                <th className="py-3 px-4 font-semibold">Student Name</th>
                <th className="py-3 px-4 font-semibold w-36">
                  Marks Obtained (/{maxMarks})
                </th>
                <th className="py-3 px-4 font-semibold w-24 text-center">Grade</th>
                <th className="py-3 px-4 font-semibold">Teacher Remarks / Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {rows.map((row, idx) => {
                const grade = calculateGrade(row.marks);
                const isOverMax = typeof row.marks === "number" && row.marks > maxMarks;

                return (
                  <tr key={row.studentId} className="hover:bg-primary-50/20 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-surface-400">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-surface-700">
                      {row.admissionNo}
                    </td>
                    <td className="py-3 px-4 font-semibold text-surface-900">
                      {row.name}
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative">
                        <input
                          type="number"
                          min={0}
                          max={maxMarks}
                          value={row.marks}
                          onChange={(e) => handleMarkChange(row.studentId, e.target.value)}
                          placeholder="0"
                          className={`w-28 px-3 py-1.5 rounded-lg border text-xs font-semibold focus:outline-none focus:ring-2 ${
                            isOverMax
                              ? "border-danger-500 bg-danger-50 text-danger-700 focus:ring-danger-500"
                              : "border-surface-200 focus:border-primary-500 focus:ring-primary-100"
                          }`}
                        />
                        <span className="ml-2 text-surface-400 font-medium">/ {maxMarks}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md font-bold text-xs ${
                          grade === "A"
                            ? "bg-emerald-100 text-emerald-800"
                            : grade === "B"
                            ? "bg-blue-100 text-blue-800"
                            : grade === "C"
                            ? "bg-amber-100 text-amber-800"
                            : grade === "D"
                            ? "bg-orange-100 text-orange-800"
                            : grade === "E"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-surface-100 text-surface-500"
                        }`}
                      >
                        {grade}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={row.remarks}
                        onChange={(e) => handleRemarksChange(row.studentId, e.target.value)}
                        placeholder="e.g. Excellent grasp of calculus..."
                        className="w-full px-3 py-1.5 rounded-lg border border-surface-200 text-xs focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-surface-50/70 border-t border-surface-100 flex flex-col sm:flex-row items-center justify-between text-xs text-surface-500 gap-3">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Audit Trail Enabled: Every mark change is snapshot and tracked by timestamp.</span>
          </div>
          <button
            type="button"
            onClick={handleSubmitForReview}
            disabled={isSubmitting || submissionStatus === "submitted"}
            className="btn-primary text-xs"
          >
            Confirm &amp; Submit Marks
          </button>
        </div>
      </div>
    </div>
  );
}
