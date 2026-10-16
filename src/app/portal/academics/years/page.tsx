import { DEMO_ACADEMIC_YEARS, DEMO_TERMS } from "@/lib/demo-data";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Layers,
} from "lucide-react";

export default function AcademicYearsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/portal/academics"
              className="text-xs text-surface-500 hover:text-surface-700 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Academics
            </Link>
            <span className="text-surface-300">&bull;</span>
            <span className="text-xs text-primary-600 font-medium">Session Governance</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Academic Years &amp; Terms
          </h1>
          <p className="text-surface-500 text-sm">
            Institutional school calendar, term milestones, start/end dates, and session status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-primary text-xs inline-flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            Add Academic Year
          </button>
        </div>
      </div>

      {/* Academic Year Details */}
      <div className="space-y-6">
        {DEMO_ACADEMIC_YEARS.map((year) => {
          const terms = DEMO_TERMS.filter((t) => t.academic_year_id === year.id);

          return (
            <div
              key={year.id}
              className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-display font-bold text-surface-900 text-lg">
                      {year.name}
                    </h2>
                    {year.is_current && (
                      <span className="badge-success text-xs">Current Active Session</span>
                    )}
                  </div>
                  <p className="text-xs text-surface-500">
                    Runs from {year.start_date} to {year.end_date}
                  </p>
                </div>

                <div className="text-xs font-semibold text-primary-700">
                  {terms.length} Instructional Terms
                </div>
              </div>

              {/* Terms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {terms.map((term) => (
                  <div
                    key={term.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      term.is_current
                        ? "border-primary-400 bg-primary-50/40 shadow-xs"
                        : "border-surface-200 bg-surface-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-surface-500 uppercase tracking-wider">
                        Term {term.term_number}
                      </span>
                      {term.is_current ? (
                        <span className="badge-primary text-[10px]">In Session</span>
                      ) : (
                        <span className="badge-neutral text-[10px]">Upcoming / Past</span>
                      )}
                    </div>
                    <h3 className="font-bold text-surface-900 text-sm mb-1">{term.name}</h3>
                    <p className="text-xs text-surface-500">
                      {term.start_date} &bull; {term.end_date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
