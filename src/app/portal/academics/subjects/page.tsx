import { DEMO_SUBJECTS } from "@/lib/demo-data";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  Plus,
  Layers,
  Sparkles,
  CheckCircle2,
  Bookmark,
} from "lucide-react";

export default function SubjectsPage() {
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
            <span className="text-xs text-primary-600 font-medium">Curriculum Catalog</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Subject Catalog &amp; Disciplines
          </h1>
          <p className="text-surface-500 text-sm">
            Core compulsory disciplines and elective specialty tracks offered across secondary forms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-primary text-xs inline-flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            Add New Subject
          </button>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_SUBJECTS.map((sub) => (
          <div
            key={sub.id}
            className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs hover:border-primary-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-lg">
                  {sub.code}
                </span>
                {sub.is_elective ? (
                  <span className="badge-warning text-[10px]">Elective Course</span>
                ) : (
                  <span className="badge-success text-[10px]">Mandatory Core</span>
                )}
              </div>

              <h3 className="font-display font-bold text-surface-900 text-base mb-1">
                {sub.name}
              </h3>
              <p className="text-xs text-surface-500">
                Department: {sub.name.includes("Math") ? "Mathematics" : sub.name.includes("Physics") || sub.name.includes("Chem") || sub.name.includes("Bio") ? "Sciences" : sub.name.includes("Computer") ? "Applied Tech" : "Languages & Humanities"}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-surface-100 flex items-center justify-between text-xs text-surface-500">
              <span>Weekly Periods: <strong>5 Sessions</strong></span>
              <Link href="/portal/academics/timetable" className="text-primary-600 font-medium hover:underline">
                Timetable &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
