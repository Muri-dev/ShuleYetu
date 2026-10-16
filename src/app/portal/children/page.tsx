import { getCurrentUser } from "@/lib/auth/authorization";
import { DEMO_STUDENTS, DEMO_RESULT_SUBMISSIONS } from "@/lib/demo-data";
import Link from "next/link";
import {
  Users,
  FileText,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  BookOpen,
  HeartPulse,
  UserCheck,
} from "lucide-react";

export default async function MyChildrenPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  // The parent (Robert Ochieng) has two linked children: Liam (Form 3) and Maya (Form 1)
  const myChildren = DEMO_STUDENTS.filter(
    (s) => s.guardian_name.toLowerCase().includes("robert") || s.id === "std-001" || s.id === "std-002"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900">
          My Children &bull; Parent Portal
        </h1>
        <p className="text-surface-500 text-sm mt-0.5">
          View official academic progress reports, daily attendance, class schedules, and health records for your linked students.
        </p>
      </div>

      {/* Children Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myChildren.map((child) => (
          <div
            key={child.id}
            className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs hover:border-primary-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-white flex items-center justify-center font-bold text-xl shadow-xs">
                    {child.first_name[0]}
                    {child.last_name[0]}
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-surface-900 text-lg">
                      {child.first_name} {child.middle_name} {child.last_name}
                    </h2>
                    <p className="text-xs text-surface-500 font-mono">
                      Reg: {child.admission_number} &bull; {child.class_name}
                    </p>
                  </div>
                </div>
                <span className="badge-success text-xs">Active Student</span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-surface-50 p-3.5 rounded-2xl border border-surface-100 text-center text-xs mb-4">
                <div>
                  <span className="text-surface-500 block text-[11px]">Stream</span>
                  <span className="font-semibold text-surface-900">{child.stream_name}</span>
                </div>
                <div>
                  <span className="text-surface-500 block text-[11px]">Attendance</span>
                  <span className="font-semibold text-emerald-600">98.4% Present</span>
                </div>
                <div>
                  <span className="text-surface-500 block text-[11px]">Latest Status</span>
                  <span className="font-semibold text-primary-700">Good Standing</span>
                </div>
              </div>

              {child.medical_info && (
                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2 mb-4">
                  <HeartPulse className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[11px]">Medical Care Note:</strong>
                    <span>{child.medical_info}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-surface-100 flex flex-col sm:flex-row gap-2">
              <Link
                href={`/portal/children/${child.id}`}
                className="btn-primary text-xs flex-1 justify-center py-2"
              >
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                Comprehensive 360&deg; Profile
              </Link>
              <Link
                href="/portal/assessments/reports"
                className="btn-secondary text-xs flex-1 justify-center py-2"
              >
                <FileText className="w-3.5 h-3.5 mr-1.5" />
                Published Report Card
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Published Results Security Notice */}
      <div className="bg-primary-50/60 border border-primary-200/80 rounded-2xl p-5 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
        <div className="text-xs text-primary-900">
          <h4 className="font-semibold text-sm mb-0.5">Strict Examination Verification Policy</h4>
          <p className="leading-relaxed">
            In accordance with Framer Elite academic governance protocols, marks and terminal grade averages are only visible to parents after formal review and digital approval by the Headteacher and School Board of Examiners. Draft or unverified teacher scores remain securely confidential until official release.
          </p>
        </div>
      </div>
    </div>
  );
}
