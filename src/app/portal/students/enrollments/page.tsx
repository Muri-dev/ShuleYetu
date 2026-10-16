import { DEMO_CLASSES, DEMO_STREAMS, DEMO_STUDENTS, DEMO_TERMS } from "@/lib/demo-data";
import Link from "next/link";
import {
  ClipboardList,
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";

export default function StudentEnrollmentsPage() {
  const currentTerm = DEMO_TERMS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Term Enrollments &amp; Class Promotions
          </h1>
          <p className="text-surface-500 text-sm mt-0.5">
            Active session allocations across academic streams for {currentTerm.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/portal/students/admissions"
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            Admit to Stream
          </Link>
        </div>
      </div>

      {/* Class Stream Enrolment Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DEMO_CLASSES.map((cls) => {
          const streams = DEMO_STREAMS.filter((s) => s.class_id === cls.id);
          const totalCapacity = streams.reduce((acc, s) => acc + (s.capacity || 30), 0);
          const studentCount = DEMO_STUDENTS.filter((s) =>
            s.class_name.toLowerCase().includes(cls.name.toLowerCase().slice(0, 6))
          ).length * 12 + 20;

          return (
            <div
              key={cls.id}
              className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="badge-primary text-[11px] font-mono">Level {cls.level}</span>
                <span className="text-xs text-emerald-600 font-semibold">Active Term 1</span>
              </div>
              <h3 className="font-bold text-surface-900 text-base">{cls.name}</h3>
              <p className="text-xs text-surface-500 mt-1 line-clamp-1">{cls.description}</p>

              <div className="mt-4 pt-3 border-t border-surface-100 flex items-center justify-between text-xs">
                <span className="text-surface-500">Enrolled Students:</span>
                <strong className="text-surface-900">{studentCount} / {totalCapacity}</strong>
              </div>

              <div className="mt-2 w-full bg-surface-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, (studentCount / totalCapacity) * 100)}%` }}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {streams.map((st) => (
                  <span key={st.id} className="badge-neutral text-[10px]">
                    {st.name} ({st.capacity} cap)
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Enrollment Management Policies */}
      <div className="bg-white border border-surface-200 rounded-2xl p-6 shadow-xs">
        <h3 className="font-display font-semibold text-sm text-surface-900 mb-3">
          Automated Promotion &amp; Transition Protocol
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-surface-600">
          <div className="p-4 rounded-xl bg-surface-50 border border-surface-100">
            <strong className="text-surface-900 block mb-1">End of Year Transition</strong>
            <p className="leading-relaxed">
              Upon publication of Term 3 examinations, students meeting the mean grade threshold of D+ or higher are automatically advanced to the next academic level.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-surface-50 border border-surface-100">
            <strong className="text-surface-900 block mb-1">Stream Balancing</strong>
            <p className="leading-relaxed">
              Streams (East, West, North) maintain an equitable student-teacher ratio with strict maximum cap of 35 learners per stream.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-surface-50 border border-surface-100">
            <strong className="text-surface-900 block mb-1">National Exam Registration</strong>
            <p className="leading-relaxed">
              Form 4 candidate profiles are automatically verified against KNEC / Cambridge assessment index registry requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
