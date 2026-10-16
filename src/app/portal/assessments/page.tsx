import { getCurrentUser } from "@/lib/auth/authorization";
import { DEMO_ASSESSMENTS, DEMO_ASSESSMENT_TYPES, DEMO_RESULT_SUBMISSIONS } from "@/lib/demo-data";
import Link from "next/link";
import {
  ClipboardCheck,
  FileText,
  Calendar,
  Layers,
  ArrowRight,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export default async function AssessmentsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Assessments &amp; Examination Engine
          </h1>
          <p className="text-surface-500 text-sm mt-0.5">
            Configure examination frameworks, enter class marks, and manage multi-stage approval lifecycles.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/portal/assessments/marks"
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            <ClipboardCheck className="w-4 h-4" />
            Marks Entry Grid
          </Link>
          <Link
            href="/portal/assessments/results"
            className="btn-secondary text-xs inline-flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            Results Approvals
          </Link>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/portal/assessments/marks"
          className="bg-white border border-surface-200 rounded-2xl p-5 hover:border-primary-400 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-surface-900 text-sm mb-1 group-hover:text-primary-700">
            Marks Entry Spreadsheet
          </h3>
          <p className="text-xs text-surface-500 leading-relaxed">
            Record student scores with auto-grading, real-time validation, and submission for admin review.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary-600">
            Open Marks Grid <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/portal/assessments/results"
          className="bg-white border border-surface-200 rounded-2xl p-5 hover:border-primary-400 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-surface-900 text-sm mb-1 group-hover:text-amber-700">
            Multi-Stage Approval Workflow
          </h3>
          <p className="text-xs text-surface-500 leading-relaxed">
            Headteacher review, approval signatures, audit trails, and publication separate from approvals.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-600">
            Review Submissions <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/portal/assessments/reports"
          className="bg-white border border-surface-200 rounded-2xl p-5 hover:border-primary-400 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-surface-900 text-sm mb-1 group-hover:text-emerald-700">
            Printable Report Cards
          </h3>
          <p className="text-xs text-surface-500 leading-relaxed">
            Generate official term transcripts with school seals, GPA rankings, and teacher commentary.
          </p>
          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600">
            Generate Reports <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* Assessment Frameworks & Weightages */}
      <div className="bg-white border border-surface-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-base font-bold text-surface-900">
              Configured Assessment Frameworks
            </h2>
            <p className="text-xs text-surface-500">Grading weights and maximum mark scales</p>
          </div>
          <span className="badge-info text-xs">Standard Term 1 Schema</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_ASSESSMENT_TYPES.map((type) => (
            <div
              key={type.id}
              className="p-4 rounded-xl border border-surface-100 bg-surface-50/60"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-surface-500">
                  {type.category.toUpperCase()}
                </span>
                <span className="text-xs font-bold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-md">
                  Weight: {type.weight_percentage}%
                </span>
              </div>
              <h4 className="font-semibold text-surface-900 text-sm mb-1">{type.name}</h4>
              <p className="text-xs text-surface-500">
                Max Marks: <strong className="text-surface-800">{type.max_marks} pts</strong>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Scheduled Assessments */}
      <div className="bg-white border border-surface-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-base font-bold text-surface-900">
            Term 1 Active Exam Schedule
          </h2>
          <span className="text-xs text-surface-500">{DEMO_ASSESSMENTS.length} Scheduled</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-surface-100 text-surface-500">
                <th className="pb-3 font-semibold">Assessment Title</th>
                <th className="pb-3 font-semibold">Subject &amp; Class</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Exam Date</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {DEMO_ASSESSMENTS.map((asm) => (
                <tr key={asm.id} className="hover:bg-surface-50/50">
                  <td className="py-3 font-medium text-surface-900">{asm.title}</td>
                  <td className="py-3 text-surface-600">
                    {asm.subject_name} &bull; {asm.class_name}
                  </td>
                  <td className="py-3">
                    <span className="badge-neutral text-[11px]">{asm.type_name}</span>
                  </td>
                  <td className="py-3 text-surface-500">{asm.date}</td>
                  <td className="py-3 text-right">
                    <Link
                      href="/portal/assessments/marks"
                      className="btn-secondary text-xs px-2.5 py-1"
                    >
                      Enter Marks
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
