import Link from "next/link";
import { Student, UserRole } from "@/lib/types";
import {
  GraduationCap,
  Calendar,
  HeartPulse,
  Phone,
  Mail,
  User,
  BookOpen,
  CheckCircle2,
  FileText,
  ArrowLeft,
  Award,
  Clock,
  Shield,
  Printer,
  CreditCard,
  AlertCircle,
  Receipt,
  Lock,
} from "lucide-react";

interface StudentProfileViewProps {
  student: Student & {
    class_name: string;
    stream_name: string;
    guardian_name: string;
    guardian_phone: string;
  };
  backUrl: string;
  viewerRole?: UserRole;
}

export function StudentProfileView({ student, backUrl, viewerRole }: StudentProfileViewProps) {
  const canViewFinancials = !viewerRole || ["super_admin", "school_admin", "accountant", "parent"].includes(viewerRole);
  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          href={backUrl}
          className="text-xs text-surface-500 hover:text-surface-700 inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to List
        </Link>
      </div>

      {/* Main Student Header Card */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-700 to-primary-900 text-white flex items-center justify-center font-display font-bold text-3xl shadow-sm shrink-0">
            {student.first_name[0]}
            {student.last_name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge-primary text-xs">{student.class_name}</span>
              <span className="badge-neutral text-xs">{student.stream_name}</span>
              <span className="badge-success text-xs capitalize">{student.status}</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-surface-900">
              {student.first_name} {student.middle_name} {student.last_name}
            </h1>
            <p className="text-xs text-surface-500 font-mono mt-0.5">
              Admission No: {student.admission_number} &bull; Enrolled: {new Date(student.admission_date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/portal/assessments/reports"
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            Official Report Card
          </Link>
        </div>
      </div>

      {/* Key Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs text-center">
          <span className="text-[11px] text-surface-500 block uppercase font-medium">Cumulative Average</span>
          <span className="text-2xl font-bold text-primary-700 mt-0.5 block">88.5% (A)</span>
          <span className="text-[11px] text-emerald-600 font-semibold">Honours List</span>
        </div>
        <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs text-center">
          <span className="text-[11px] text-surface-500 block uppercase font-medium">Stream Ranking</span>
          <span className="text-2xl font-bold text-surface-900 mt-0.5 block">3rd</span>
          <span className="text-[11px] text-surface-400">Of 30 Students</span>
        </div>
        <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs text-center">
          <span className="text-[11px] text-surface-500 block uppercase font-medium">Attendance Presence</span>
          <span className="text-2xl font-bold text-emerald-600 mt-0.5 block">98.4%</span>
          <span className="text-[11px] text-surface-400">Term 1 Record</span>
        </div>
        <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs text-center">
          <span className="text-[11px] text-surface-500 block uppercase font-medium">Disciplinary Standing</span>
          <span className="text-2xl font-bold text-surface-900 mt-0.5 block">Clean</span>
          <span className="text-[11px] text-emerald-600 font-semibold">House Captain</span>
        </div>
      </div>

      {/* Two Column Layout: Student Details & Guardian Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal & Medical Info */}
        <div className="bg-white border border-surface-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-semibold text-surface-900 text-sm border-b border-surface-100 pb-3">
            Demographic &amp; Health Records
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-surface-500 block">Date of Birth</span>
              <span className="font-medium text-surface-900">{student.date_of_birth}</span>
            </div>
            <div>
              <span className="text-surface-500 block">Gender</span>
              <span className="font-medium text-surface-900 capitalize">{student.gender}</span>
            </div>
            <div>
              <span className="text-surface-500 block">Nationality</span>
              <span className="font-medium text-surface-900">{student.nationality || "Kenyan"}</span>
            </div>
            <div>
              <span className="text-surface-500 block">Religion</span>
              <span className="font-medium text-surface-900">{student.religion || "Christian"}</span>
            </div>
            <div className="col-span-2">
              <span className="text-surface-500 block">Previous Primary / Preparatory School</span>
              <span className="font-medium text-surface-900">{student.previous_school || "N/A"}</span>
            </div>
          </div>

          {student.medical_info && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <HeartPulse className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Medical Record &amp; Care Protocol:</strong>
                <span>{student.medical_info}</span>
              </div>
            </div>
          )}
        </div>

        {/* Guardian & Emergency Contact */}
        <div className="bg-white border border-surface-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-semibold text-surface-900 text-sm border-b border-surface-100 pb-3">
            Primary Guardian &amp; Emergency Contact
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-surface-500 block">Guardian Full Name</span>
              <span className="font-medium text-surface-900 text-sm">{student.guardian_name}</span>
            </div>
            <div>
              <span className="text-surface-500 block">Emergency Mobile Phone</span>
              <span className="font-mono font-medium text-surface-900 flex items-center gap-1.5 mt-0.5">
                <Phone className="w-3.5 h-3.5 text-primary-600" />
                {student.guardian_phone}
              </span>
            </div>
            <div>
              <span className="text-surface-500 block">Relationship</span>
              <span className="font-medium text-surface-900">Father / Legal Guardian</span>
            </div>
            <div>
              <span className="text-surface-500 block">Residential Address</span>
              <span className="font-medium text-surface-900">14 Acacia Gardens, Karen, Nairobi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financials & Fee Clearance - Strictly Restricted by Role */}
      {canViewFinancials ? (
        <div className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-100 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-surface-900 text-sm">
                  Institutional Fee &amp; Tuition Account
                </h3>
                <p className="text-xs text-surface-500">
                  Official terminal billing status &bull; Managed by Bursary &amp; Accounts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  student.fee_status === "cleared"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : student.fee_status === "partial"
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                {student.fee_status === "cleared"
                  ? "✓ Tuition 100% Cleared"
                  : student.fee_status === "partial"
                  ? "⚡ Partial Balance Pending"
                  : "⚠ Payment Overdue"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-surface-50 border border-surface-100">
              <span className="text-surface-500 block text-[11px]">Term 1 Billed Tuition</span>
              <span className="text-base font-bold text-surface-900 mt-0.5 block">
                KES {(student.term_tuition || 85000).toLocaleString()}
              </span>
              <span className="text-[10px] text-surface-400">Standard Boarding &amp; Tuition</span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-50 border border-surface-100">
              <span className="text-surface-500 block text-[11px]">Total Paid to Date</span>
              <span className="text-base font-bold text-emerald-600 mt-0.5 block">
                KES {(student.amount_paid ?? 85000).toLocaleString()}
              </span>
              <span className="text-[10px] text-surface-400">Verified by Bank Slip</span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-50 border border-surface-100">
              <span className="text-surface-500 block text-[11px]">Outstanding Arrears</span>
              <span
                className={`text-base font-bold mt-0.5 block ${
                  (student.fee_balance || 0) > 0 ? "text-rose-600" : "text-surface-900"
                }`}
              >
                KES {(student.fee_balance || 0).toLocaleString()}
              </span>
              <span className="text-[10px] text-surface-400">
                {(student.fee_balance || 0) > 0 ? "Due before mid-term exams" : "Zero balance"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-50 border border-surface-100">
              <span className="text-surface-500 block text-[11px]">Last Payment Receipt</span>
              <span className="text-base font-bold text-surface-900 mt-0.5 block font-mono">
                {student.last_payment_date ? new Date(student.last_payment_date).toLocaleDateString() : "2026-01-10"}
              </span>
              <span className="text-[10px] text-primary-600 font-semibold">Receipt #RCT-89410</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 text-xs text-surface-500 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-surface-400" />
            Student financial balances &amp; tuition receipts are securely sequestered from teaching faculty.
          </span>
          <span className="text-[11px] font-medium text-surface-400">Institutional Governance Policy</span>
        </div>
      )}
    </div>
  );
}
