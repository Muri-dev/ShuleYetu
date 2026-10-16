import { getCurrentUser } from "@/lib/auth/authorization";
import {
  DEMO_STUDENTS,
  DEMO_RESULT_SUBMISSIONS,
  DEMO_INVENTORY_ITEMS,
  DEMO_REQUISITIONS,
  DEMO_ANNOUNCEMENTS,
  DEMO_AUDIT_LOGS,
  DEMO_TIMETABLE,
  DEMO_TERMS,
  DEMO_STOCK_MOVEMENTS,
  DEMO_ASSETS,
} from "@/lib/demo-data";
import { ROLE_LABELS, UserRole } from "@/lib/types";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  ClipboardCheck,
  Package,
  TrendingUp,
  AlertCircle,
  Clock,
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileText,
  School,
  ArrowUpRight,
  Shield,
  Bell,
  Sparkles,
  Receipt,
  CreditCard,
  Layers,
  Truck,
  Check,
  Building,
  UserCheck,
} from "lucide-react";
import { RoleSwitcher } from "@/components/portal/role-switcher";

export default async function PortalDashboard() {
  const user = await getCurrentUser();
  if (!user) return null;

  const primaryRole = (user.roles[0] || "school_admin") as UserRole;
  const currentTerm = DEMO_TERMS.find((t) => t.is_current) || DEMO_TERMS[0];
  const pendingApprovals = DEMO_RESULT_SUBMISSIONS.filter(
    (s) => s.status === "under_review" || s.status === "submitted"
  );
  const lowStockItems = DEMO_INVENTORY_ITEMS.filter(
    (i) => i.current_stock <= i.reorder_level
  );
  const totalInventoryValuation = DEMO_INVENTORY_ITEMS.reduce(
    (acc, i) => acc + i.current_stock * (i.unit_cost || 0),
    0
  );
  const totalAssetValuation = DEMO_ASSETS.reduce(
    (acc, a) => acc + (a.purchase_cost || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Top Greeting & Role Switcher Banner */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-surface-900 rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/15 text-primary-200">
                {ROLE_LABELS[primaryRole]}
              </span>
              <span className="text-xs text-primary-200/80">
                {currentTerm.name}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back, {user.first_name} {user.last_name}
            </h1>
            <p className="text-primary-200 text-sm mt-1 max-w-xl">
              {primaryRole === "teacher"
                ? "Academic Instruction & Assessment • Real-time marks entry & class roll-call."
                : primaryRole === "inventory_officer"
                ? "Warehouse Logistics & Asset Ledger • Consumable stocks, equipment tagging & requisitions."
                : primaryRole === "accountant"
                ? "Bursary & Financial Intelligence • Tuition fee collections, arrears & asset valuation."
                : primaryRole === "headteacher"
                ? "Academic Dean & Governance • Result verification, timetable oversight & curriculum."
                : primaryRole === "parent"
                ? "Guardian Portal • Live presence, academic reports & terminal performance."
                : primaryRole === "non_teaching_staff"
                ? "Support Staff Portal • Departmental requests, attendance & institutional notices."
                : "Institutional Operations & Governance • Multi-tenant academy oversight."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <RoleSwitcher currentRole={primaryRole} />
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          1. PARENT DASHBOARD
      ────────────────────────────────────────────────────────────────────────── */}
      {primaryRole === "parent" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-surface-900">
              My Enrolled Children
            </h2>
            <Link
              href="/portal/children"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
            >
              View Full Profiles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEMO_STUDENTS.slice(0, 2).map((child) => (
              <div
                key={child.id}
                className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs hover:border-primary-300 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 border border-primary-200 text-primary-700 flex items-center justify-center font-bold text-lg">
                      {child.first_name[0]}
                      {child.last_name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-900 text-base">
                        {child.first_name} {child.middle_name} {child.last_name}
                      </h3>
                      <p className="text-xs text-surface-500 font-mono">
                        {child.admission_number} &bull; {child.stream_name}
                      </p>
                    </div>
                  </div>
                  <span className="badge-success text-xs">Active</span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-surface-50 p-3 rounded-xl border border-surface-100 text-center text-xs mb-4">
                  <div>
                    <span className="text-surface-500 block text-[11px]">Attendance</span>
                    <span className="font-semibold text-surface-900">98.4%</span>
                  </div>
                  <div>
                    <span className="text-surface-500 block text-[11px]">Term 1 GPA</span>
                    <span className="font-semibold text-emerald-600">3.88 (A)</span>
                  </div>
                  <div>
                    <span className="text-surface-500 block text-[11px]">Class Rank</span>
                    <span className="font-semibold text-surface-900">3rd of 30</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/portal/children`}
                    className="btn-primary text-xs flex-1 justify-center py-2"
                  >
                    <FileText className="w-3.5 h-3.5 mr-1.5" />
                    View Report Cards
                  </Link>
                  <Link
                    href={`/portal/attendance`}
                    className="btn-secondary text-xs flex-1 justify-center py-2"
                  >
                    Attendance Record
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          2. TEACHER DASHBOARD (Strictly: No Finances, No System Audit, No Warehouse Valuations)
      ────────────────────────────────────────────────────────────────────────── */}
      {primaryRole === "teacher" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
              <span className="text-xs text-surface-500 font-medium">Assigned Classes</span>
              <p className="text-2xl font-bold text-surface-900 mt-1">2 Classes</p>
              <p className="text-xs text-primary-600 mt-0.5">Form 3 West, Form 2 East</p>
            </div>
            <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
              <span className="text-xs text-surface-500 font-medium">Pending Marks Entry</span>
              <p className="text-2xl font-bold text-amber-600 mt-1">1 Draft</p>
              <p className="text-xs text-surface-500 mt-0.5">Physics Mid-Term Exam</p>
            </div>
            <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
              <span className="text-xs text-surface-500 font-medium">Under Review</span>
              <p className="text-2xl font-bold text-primary-600 mt-1">1 Submission</p>
              <p className="text-xs text-surface-500 mt-0.5">Pure Mathematics (Form 3)</p>
            </div>
            <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
              <span className="text-xs text-surface-500 font-medium">Approved Submissions</span>
              <p className="text-2xl font-bold text-emerald-600 mt-1">1 Approved</p>
              <p className="text-xs text-surface-500 mt-0.5">Ready for publication</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions & Timetable */}
            <div className="lg:col-span-2 bg-white border border-surface-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-surface-900 text-sm">Today&apos;s Class Schedule</h3>
                <Link href="/portal/academics/timetable" className="text-xs text-primary-600 font-medium">
                  Full Timetable &rarr;
                </Link>
              </div>
              <div className="space-y-2.5">
                {DEMO_TIMETABLE.slice(0, 3).map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface-50 border border-surface-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-semibold text-xs">
                        {slot.start_time}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-surface-900">{slot.subject_name}</p>
                        <p className="text-xs text-surface-500">
                          {slot.class_name} &bull; {slot.room}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href="/portal/attendance"
                        className="btn-secondary text-xs px-2.5 py-1"
                      >
                        Roll Call
                      </Link>
                      <Link
                        href="/portal/assessments/marks"
                        className="btn-primary text-xs px-2.5 py-1"
                      >
                        Enter Marks
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-surface-900 text-sm mb-3">Academic Shortcuts</h3>
                <div className="space-y-2">
                  <Link
                    href="/portal/assessments/marks"
                    className="flex items-center justify-between p-2.5 rounded-xl border border-surface-200 hover:border-primary-400 hover:bg-primary-50/50 text-xs font-medium text-surface-800 transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <ClipboardCheck className="w-4 h-4 text-primary-600" />
                      Spreadsheet Marks Entry
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-surface-400" />
                  </Link>
                  <Link
                    href="/portal/attendance"
                    className="flex items-center justify-between p-2.5 rounded-xl border border-surface-200 hover:border-primary-400 hover:bg-primary-50/50 text-xs font-medium text-surface-800 transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Class Attendance Register
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-surface-400" />
                  </Link>
                  <Link
                    href="/portal/inventory/requisitions"
                    className="flex items-center justify-between p-2.5 rounded-xl border border-surface-200 hover:border-primary-400 hover:bg-primary-50/50 text-xs font-medium text-surface-800 transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-amber-600" />
                      Request Teaching Supplies
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-surface-400" />
                  </Link>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-surface-100 text-[11px] text-surface-500">
                Student financial accounts and fee statuses are confidential to the bursary office.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          3. INVENTORY OFFICER DASHBOARD (Strictly: No Academic Performance, No Exam Grades)
      ────────────────────────────────────────────────────────────────────────── */}
      {primaryRole === "inventory_officer" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Consumable Stock Value</span>
              <p className="text-xl sm:text-2xl font-bold text-surface-900 mt-1">
                KES {totalInventoryValuation.toLocaleString()}
              </p>
              <span className="text-[11px] text-surface-400 mt-0.5 block">{DEMO_INVENTORY_ITEMS.length} Catalog SKUs</span>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Fixed Capital Assets</span>
              <p className="text-xl sm:text-2xl font-bold text-primary-700 mt-1">
                KES {totalAssetValuation.toLocaleString()}
              </p>
              <span className="text-[11px] text-surface-400 mt-0.5 block">{DEMO_ASSETS.length} Tagged Items</span>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Reorder Threshold Alerts</span>
              <p className="text-xl sm:text-2xl font-bold text-amber-600 mt-1">
                {lowStockItems.length} Low Items
              </p>
              <span className="text-[11px] text-amber-600 mt-0.5 block">Requires Purchase Orders</span>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Requisitions to Fulfill</span>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
                {DEMO_REQUISITIONS.filter((r) => r.status === "pending").length} Pending
              </p>
              <span className="text-[11px] text-surface-400 mt-0.5 block">Awaiting Dispatch</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Requisitions Queue */}
            <div className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-surface-900 text-sm">
                    Supply Requisitions Queue
                  </h3>
                  <p className="text-xs text-surface-500">Staff material and equipment orders</p>
                </div>
                <Link
                  href="/portal/inventory/requisitions"
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                >
                  Manage All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {DEMO_REQUISITIONS.map((req) => (
                  <div
                    key={req.id}
                    className="p-3.5 rounded-xl border border-surface-100 bg-surface-50 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-surface-900 text-xs line-clamp-1">
                        {req.quantity}x {req.item_name}
                      </p>
                      <p className="text-[11px] text-surface-500 mt-0.5 line-clamp-1">
                        Requested by {req.requester_name} &bull; {req.reason}
                      </p>
                    </div>

                    <div>
                      {req.status === "pending" && (
                        <span className="badge-warning text-xs">Pending Review</span>
                      )}
                      {req.status === "approved" && (
                        <span className="badge-info text-xs">Approved</span>
                      )}
                      {req.status === "fulfilled" && (
                        <span className="badge-success text-xs">Fulfilled</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Stock Movement Ledger */}
            <div className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-surface-900 text-sm">
                    Recent Stock Movements
                  </h3>
                  <p className="text-xs text-surface-500">Tamper-evident warehouse ledger</p>
                </div>
                <Link
                  href="/portal/inventory/movements"
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                >
                  Full Ledger <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {DEMO_STOCK_MOVEMENTS.slice(0, 4).map((mov) => (
                  <div
                    key={mov.id}
                    className="p-3.5 rounded-xl border border-surface-100 bg-surface-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-surface-900">{mov.item_name}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            mov.movement_type === "receipt"
                              ? "bg-emerald-100 text-emerald-800"
                              : mov.movement_type === "issue"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {mov.movement_type}
                        </span>
                      </div>
                      <p className="text-[11px] text-surface-500 mt-0.5">
                        Qty: {mov.quantity} &bull; Reason: {mov.reason}
                      </p>
                    </div>

                    <span className="text-[11px] text-surface-400 font-mono">
                      {new Date(mov.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          4. ACCOUNTANT DASHBOARD (Strictly: No Academic Marks, Exam Curves, or Pass Rates)
      ────────────────────────────────────────────────────────────────────────── */}
      {primaryRole === "accountant" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Term 1 Billed Revenue</span>
              <p className="text-xl sm:text-2xl font-bold text-surface-900 mt-1">
                KES 28,450,000
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-surface-500">
                336 Enrolled Candidates
              </div>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Total Fees Collected</span>
              <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
                KES 24,180,000
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-700 font-semibold">
                ✓ 85.0% Collection Rate
              </div>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Outstanding Arrears</span>
              <p className="text-xl sm:text-2xl font-bold text-rose-600 mt-1">
                KES 4,270,000
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-rose-600 font-medium">
                50 Student Defaulters
              </div>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Total Physical Assets</span>
              <p className="text-xl sm:text-2xl font-bold text-primary-700 mt-1">
                KES {(totalInventoryValuation + totalAssetValuation).toLocaleString()}
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-surface-500">
                Consumables &amp; Equipment
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Class Fee Clearance Progress */}
            <div className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-surface-900 text-sm">
                    Fee Clearance by Grade Level
                  </h3>
                  <p className="text-xs text-surface-500">Terminal collection compliance breakdown</p>
                </div>
                <Link
                  href="/portal/students"
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                >
                  View Student Ledger &rarr;
                </Link>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between text-surface-700 mb-1">
                    <span className="font-semibold">Form 4 (Candidate Classes)</span>
                    <strong>93% Cleared (KES 7.5M / 8.1M)</strong>
                  </div>
                  <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: "93%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-surface-700 mb-1">
                    <span className="font-semibold">Form 3 (Grade 11)</span>
                    <strong>84% Cleared (KES 6.1M / 7.2M)</strong>
                  </div>
                  <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: "84%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-surface-700 mb-1">
                    <span className="font-semibold">Form 2 (Grade 10)</span>
                    <strong>88% Cleared (KES 5.8M / 6.6M)</strong>
                  </div>
                  <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-surface-700 mb-1">
                    <span className="font-semibold">Form 1 (Freshmen)</span>
                    <strong>91% Cleared (KES 4.7M / 5.2M)</strong>
                  </div>
                  <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: "91%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Procurement Liabilities & Requisition Invoices */}
            <div className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-surface-900 text-sm">
                    Procurement Invoices &amp; Asset Valuation
                  </h3>
                  <p className="text-xs text-surface-500">Departmental expenditure &amp; capital logistics</p>
                </div>
                <Link
                  href="/portal/reports"
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                >
                  Financial Reports &rarr;
                </Link>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-surface-100 bg-surface-50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-surface-900">Laboratory Consumables &amp; Reagents</span>
                    <p className="text-[11px] text-surface-500">Science Dept &bull; Verified PO-8910</p>
                  </div>
                  <span className="font-semibold text-surface-900">KES 84,500</span>
                </div>

                <div className="p-3.5 rounded-xl border border-surface-100 bg-surface-50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-surface-900">Stationery &amp; Examination Booklets</span>
                    <p className="text-[11px] text-surface-500">Examination Secretariat &bull; PO-8912</p>
                  </div>
                  <span className="font-semibold text-surface-900">KES 42,000</span>
                </div>

                <div className="p-3.5 rounded-xl border border-surface-100 bg-surface-50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-surface-900">Server Hardware &amp; IT Equipment</span>
                    <p className="text-[11px] text-surface-500">ICT &amp; Robotics Lab &bull; PO-8890</p>
                  </div>
                  <span className="font-semibold text-emerald-700">KES 220,000 (Capitalized)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          5. HEADTEACHER DASHBOARD (Strictly: Academics, Approvals, Teaching Faculty — No Warehouse Health)
      ────────────────────────────────────────────────────────────────────────── */}
      {primaryRole === "headteacher" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Total Enrolled</span>
              <p className="text-2xl sm:text-3xl font-bold text-surface-900 mt-1">
                {DEMO_STUDENTS.length * 48}
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                +8.4% vs last academic year
              </div>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Results Approvals</span>
              <p className="text-2xl sm:text-3xl font-bold text-surface-900 mt-1">
                {pendingApprovals.length} Pending
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                Awaiting Headteacher review
              </div>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Attendance Rate</span>
              <p className="text-2xl sm:text-3xl font-bold text-surface-900 mt-1">96.2%</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-surface-500">
                Daily roll calls verified
              </div>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Teaching Faculty</span>
              <p className="text-2xl sm:text-3xl font-bold text-surface-900 mt-1">32 Teachers</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-primary-600 font-medium">
                8 Academic Departments
              </div>
            </div>
          </div>

          {/* Pending Approval Callout Banner */}
          {pendingApprovals.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 text-sm">
                    Results Approval Queue Requires Action
                  </h3>
                  <p className="text-xs text-amber-700 mt-0.5">
                    {pendingApprovals[0].teacher_name} submitted {pendingApprovals[0].assessment_title} for {pendingApprovals[0].class_name} (Class Avg: {pendingApprovals[0].class_average} / 50).
                  </p>
                </div>
              </div>
              <Link
                href="/portal/assessments/results"
                className="btn-primary text-xs whitespace-nowrap bg-amber-600 hover:bg-amber-700 border-amber-600 shadow-none"
              >
                Review &amp; Approve Marks &rarr;
              </Link>
            </div>
          )}

          {/* Assessment Workflow Status */}
          <div className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-surface-900 text-sm">
                  Academic Assessment &amp; Results Workflow
                </h3>
                <p className="text-xs text-surface-500">Live teacher submission verification queue</p>
              </div>
              <Link
                href="/portal/assessments/results"
                className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
              >
                Full Approval Workflow <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {DEMO_RESULT_SUBMISSIONS.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-xl border border-surface-100 bg-surface-50 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-surface-900 text-xs">
                        {sub.subject_name}
                      </span>
                      <span className="text-surface-400 text-xs">&bull;</span>
                      <span className="text-xs text-surface-600">{sub.class_name}</span>
                    </div>
                    <p className="text-[11px] text-surface-500 mt-0.5">
                      By {sub.teacher_name} &bull; Pass Rate: {sub.pass_rate}%
                    </p>
                  </div>

                  <div>
                    {sub.status === "approved" && (
                      <span className="badge-success text-xs">Approved</span>
                    )}
                    {sub.status === "under_review" && (
                      <span className="badge-warning text-xs">Under Review</span>
                    )}
                    {sub.status === "draft" && (
                      <span className="badge-neutral text-xs">Draft</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          6. NON-TEACHING STAFF DASHBOARD
      ────────────────────────────────────────────────────────────────────────── */}
      {primaryRole === "non_teaching_staff" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">My Attendance</span>
              <p className="text-2xl font-bold text-emerald-600 mt-1">99.2%</p>
              <div className="text-xs text-surface-500 mt-0.5">Presence Verified</div>
            </div>
            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Active Requisitions</span>
              <p className="text-2xl font-bold text-surface-900 mt-1">1 Pending</p>
              <div className="text-xs text-amber-600 mt-0.5">Awaiting Fulfillment</div>
            </div>
            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Department</span>
              <p className="text-lg font-bold text-surface-900 mt-1">Campus Operations</p>
              <div className="text-xs text-primary-600 mt-0.5">Support Secretariat</div>
            </div>
            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-xs font-medium text-surface-500">Staff Bulletins</span>
              <p className="text-2xl font-bold text-surface-900 mt-1">{DEMO_ANNOUNCEMENTS.length}</p>
              <div className="text-xs text-surface-500 mt-0.5">Active Circulars</div>
            </div>
          </div>

          <div className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-surface-900 text-sm">My Material Requisitions</h3>
                <p className="text-xs text-surface-500">Track items requested from warehouse inventory</p>
              </div>
              <Link
                href="/portal/inventory/requisitions"
                className="btn-primary text-xs"
              >
                New Requisition Request
              </Link>
            </div>

            <div className="space-y-3">
              {DEMO_REQUISITIONS.slice(0, 2).map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-xl border border-surface-100 bg-surface-50 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-surface-900 text-xs">
                      {req.quantity}x {req.item_name}
                    </p>
                    <p className="text-[11px] text-surface-500 mt-0.5">{req.reason}</p>
                  </div>
                  <span className="badge-warning text-xs capitalize">{req.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          7. EXECUTIVE ADMIN (Super Admin / School Admin)
      ────────────────────────────────────────────────────────────────────────── */}
      {["super_admin", "school_admin"].includes(primaryRole) && (
        <div className="space-y-6">
          {/* Key KPI Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-surface-500">Total Enrolled</span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-surface-900">
                {DEMO_STUDENTS.length * 48}
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                +8.4% vs last academic year
              </div>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-surface-500">Results Approvals</span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <ClipboardCheck className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-surface-900">
                {pendingApprovals.length} Pending
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                Awaiting Headteacher review
              </div>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-surface-500">Attendance Rate</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-surface-900">96.2%</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-surface-500">
                Daily roll calls recorded
              </div>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-surface-500">Inventory Health</span>
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-surface-900">
                {lowStockItems.length} Low Stock
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-purple-600 font-medium">
                Reorder alerts triggered
              </div>
            </div>
          </div>

          {/* Pending Approval Callout Banner */}
          {pendingApprovals.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 text-sm">
                    Results Approval Queue Requires Action
                  </h3>
                  <p className="text-xs text-amber-700 mt-0.5">
                    {pendingApprovals[0].teacher_name} submitted {pendingApprovals[0].assessment_title} for {pendingApprovals[0].class_name} (Class Avg: {pendingApprovals[0].class_average} / 50).
                  </p>
                </div>
              </div>
              <Link
                href="/portal/assessments/results"
                className="btn-primary text-xs whitespace-nowrap bg-amber-600 hover:bg-amber-700 border-amber-600 shadow-none"
              >
                Review &amp; Approve Marks &rarr;
              </Link>
            </div>
          )}

          {/* Dual Column Layout: Assessment Workflow & Requisitions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-surface-900 text-sm">
                    Assessment &amp; Results Workflow
                  </h3>
                  <p className="text-xs text-surface-500">Live submission lifecycle</p>
                </div>
                <Link
                  href="/portal/assessments/results"
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                >
                  Full Workflow <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {DEMO_RESULT_SUBMISSIONS.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-xl border border-surface-100 bg-surface-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-surface-900 text-xs">
                          {sub.subject_name}
                        </span>
                        <span className="text-surface-400 text-xs">&bull;</span>
                        <span className="text-xs text-surface-600">{sub.class_name}</span>
                      </div>
                      <p className="text-[11px] text-surface-500 mt-0.5">
                        By {sub.teacher_name} &bull; Pass Rate: {sub.pass_rate}%
                      </p>
                    </div>

                    <div>
                      {sub.status === "approved" && (
                        <span className="badge-success text-xs">Approved</span>
                      )}
                      {sub.status === "under_review" && (
                        <span className="badge-warning text-xs">Under Review</span>
                      )}
                      {sub.status === "draft" && (
                        <span className="badge-neutral text-xs">Draft</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-surface-900 text-sm">
                    Recent Inventory Requisitions
                  </h3>
                  <p className="text-xs text-surface-500">Supplies &amp; equipment orders</p>
                </div>
                <Link
                  href="/portal/inventory/requisitions"
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                >
                  Manage <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {DEMO_REQUISITIONS.map((req) => (
                  <div
                    key={req.id}
                    className="p-3.5 rounded-xl border border-surface-100 bg-surface-50 flex items-center justify-between"
                  >
                    <div className="pr-3">
                      <p className="font-semibold text-surface-900 text-xs line-clamp-1">
                        {req.quantity}x {req.item_name}
                      </p>
                      <p className="text-[11px] text-surface-500 mt-0.5 line-clamp-1">
                        Requested by {req.requester_name} &bull; {req.reason}
                      </p>
                    </div>

                    <div className="shrink-0">
                      {req.status === "pending" && (
                        <span className="badge-warning text-xs">Pending</span>
                      )}
                      {req.status === "approved" && (
                        <span className="badge-info text-xs">Approved</span>
                      )}
                      {req.status === "fulfilled" && (
                        <span className="badge-success text-xs">Fulfilled</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────
          8. COMMON BOTTOM SECTION: Notices & Role-Specific Sidebar Widget
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* School Announcements — Common for All Roles */}
        <div className="lg:col-span-2 bg-white border border-surface-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary-600" />
              <h3 className="font-semibold text-surface-900 text-sm">Institutional Notices</h3>
            </div>
            <Link href="/portal/communication" className="text-xs text-primary-600 font-medium">
              Broadcasts &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {DEMO_ANNOUNCEMENTS.map((ann) => (
              <div
                key={ann.id}
                className="p-4 rounded-xl border border-surface-100 bg-surface-50/60"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-surface-900 text-xs">{ann.title}</h4>
                  <span className="text-[10px] text-surface-400">
                    {new Date(ann.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-surface-600 leading-relaxed line-clamp-2">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Widget: Security Audit Stream (ONLY for Super Admin & School Admin), otherwise Calendar/Key Dates */}
        {["super_admin", "school_admin"].includes(primaryRole) ? (
          <div className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-600" />
                <h3 className="font-semibold text-surface-900 text-sm">Audit Stream</h3>
              </div>
              <Link href="/portal/audit" className="text-xs text-primary-600 font-medium">
                All Logs &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {DEMO_AUDIT_LOGS.slice(0, 4).map((log) => (
                <div key={log.id} className="text-xs border-b border-surface-100 pb-2.5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between font-medium text-surface-900">
                    <span className="font-mono text-[11px] text-primary-700">{log.action}</span>
                    <span className="text-[10px] text-surface-400">
                      {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-surface-500 mt-0.5">
                    By {log.user_name} ({log.role})
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-600" />
                <h3 className="font-semibold text-surface-900 text-sm">Upcoming Academic Dates</h3>
              </div>
              <span className="text-xs text-surface-400 font-medium">Term 1</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-50 border border-surface-100">
                <span className="font-semibold text-surface-900 block">Mid-Term Assessment Window</span>
                <span className="text-[11px] text-primary-700 font-medium">Nov 4 – Nov 8, 2026</span>
                <p className="text-[11px] text-surface-500 mt-0.5">Faculty marks submission deadline</p>
              </div>

              <div className="p-3 rounded-xl bg-surface-50 border border-surface-100">
                <span className="font-semibold text-surface-900 block">Form 4 Science Congress Olympiad</span>
                <span className="text-[11px] text-primary-700 font-medium">Nov 14, 2026</span>
                <p className="text-[11px] text-surface-500 mt-0.5">National STEM competition</p>
              </div>

              <div className="p-3 rounded-xl bg-surface-50 border border-surface-100">
                <span className="font-semibold text-surface-900 block">Parents Consultative Forum</span>
                <span className="text-[11px] text-primary-700 font-medium">Nov 22, 2026</span>
                <p className="text-[11px] text-surface-500 mt-0.5">Terminal transcript release</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
