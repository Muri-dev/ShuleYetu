"use client";

import { useState } from "react";
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  Users,
  Package,
} from "lucide-react";
import { toast } from "sonner";

export default function ReportsAndAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("term-1");
  const [userRole, setUserRole] = useState<string>("school_admin");
  const [activeTab, setActiveTab] = useState<"all" | "academic" | "financial" | "inventory">("all");

  useState(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/framer_demo_role=([^;]+)/);
      if (match) {
        setUserRole(match[1]);
      }
    }
  });

  const isAccountant = userRole === "accountant";
  const isInventory = userRole === "inventory_officer";
  const isHeadteacher = userRole === "headteacher";
  const isExecutiveAdmin = ["super_admin", "school_admin"].includes(userRole);

  const handleExport = (reportName: string) => {
    toast.success(`Exporting "${reportName}" to CSV. Download starting...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            {isAccountant
              ? "Bursary & Financial Intelligence Reports"
              : isInventory
              ? "Inventory Logistics & Asset Reports"
              : isHeadteacher
              ? "Academic & Examination Telemetry"
              : "Institutional Reports & Analytics"}
          </h1>
          <p className="text-surface-500 text-sm mt-0.5">
            {isAccountant
              ? "Tuition collection compliance, outstanding arrears, and institutional asset valuation sheets."
              : isInventory
              ? "Consumable stock velocity, requisition fulfillment metrics, and capital asset condition reports."
              : isHeadteacher
              ? "Grade distributions, subject performance curves, and terminal attendance audit data."
              : "Cross-departmental telemetry, academic performance curves, attendance trends, and inventory financials."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              handleExport(
                isAccountant
                  ? "Bursary & Financial Audit Dossier"
                  : isInventory
                  ? "Logistics & Procurement Ledger"
                  : isHeadteacher
                  ? "Academic Examination Ledger"
                  : "Master Institutional Audit Dossier"
              )
            }
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Download {isAccountant ? "Fee Ledger" : isInventory ? "Asset Ledger" : "Audit Dossier"}
          </button>
        </div>
      </div>

      {/* Admin Tab Switcher if Executive Admin */}
      {isExecutiveAdmin && (
        <div className="flex items-center gap-2 border-b border-surface-200 pb-3">
          {[
            { id: "all", label: "All Institutional Reports" },
            { id: "academic", label: "Academic Grade Curve" },
            { id: "financial", label: "Bursary & Tuition Ledger" },
            { id: "inventory", label: "Inventory & Assets" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary-900 text-white shadow-xs"
                  : "bg-surface-100 text-surface-600 hover:bg-surface-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1. ACADEMIC GRADE CURVE — Hidden from Accountant and Inventory Officer */}
        {(!isAccountant && !isInventory) && (activeTab === "all" || activeTab === "academic") && (
          <div className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-surface-900 text-sm">Academic Grade Curve (Term 1)</h3>
              <span className="badge-primary text-[10px]">684 Candidates</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-surface-600 mb-1">
                  <span>Distinction (A &amp; A-)</span>
                  <strong className="text-surface-900">38% (260 students)</strong>
                </div>
                <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "38%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-surface-600 mb-1">
                  <span>Credit Honours (B+ to B-)</span>
                  <strong className="text-surface-900">42% (287 students)</strong>
                </div>
                <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: "42%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-surface-600 mb-1">
                  <span>Satisfactory Pass (C+ to C-)</span>
                  <strong className="text-surface-900">16% (110 students)</strong>
                </div>
                <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: "16%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-surface-600 mb-1">
                  <span>Remedial Support Required (D to E)</span>
                  <strong className="text-surface-900">4% (27 students)</strong>
                </div>
                <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: "4%" }} />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleExport("Academic Grade Distribution Report")}
              className="w-full btn-secondary text-xs py-1.5 mt-2 justify-center"
            >
              Export Grade Ledger (.CSV)
            </button>
          </div>
        )}

        {/* 2. ATTENDANCE RATES BY FORM — Shown for Headteacher, Admin, or General Overview */}
        {(!isInventory && !isAccountant) && (activeTab === "all" || activeTab === "academic") && (
          <div className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-surface-900 text-sm">Attendance Presence by Form</h3>
              <span className="badge-success text-[10px]">96.2% Avg</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-surface-600 mb-1">
                  <span>Form 4 (Candidate Classes)</span>
                  <strong className="text-emerald-600">98.1%</strong>
                </div>
                <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: "98.1%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-surface-600 mb-1">
                  <span>Form 3 (Grade 11)</span>
                  <strong className="text-emerald-600">96.8%</strong>
                </div>
                <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: "96.8%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-surface-600 mb-1">
                  <span>Form 2 (Grade 10)</span>
                  <strong className="text-emerald-600">95.4%</strong>
                </div>
                <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: "95.4%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-surface-600 mb-1">
                  <span>Form 1 (Freshmen)</span>
                  <strong className="text-emerald-600">94.7%</strong>
                </div>
                <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: "94.7%" }} />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleExport("Institutional Attendance Audit")}
              className="w-full btn-secondary text-xs py-1.5 mt-2 justify-center"
            >
              Export Attendance Register (.CSV)
            </button>
          </div>
        )}

        {/* 3. TUITION & BURSARY REVENUE — Exclusively for Accountant & Admin (Hidden from Teachers/Inventory) */}
        {(isAccountant || isExecutiveAdmin) && (activeTab === "all" || activeTab === "financial") && (
          <div className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-surface-900 text-sm">Tuition &amp; Fee Collection Status</h3>
              <span className="badge-success text-[10px]">85.0% Cleared</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-50 border border-surface-100 flex items-center justify-between">
                <div>
                  <span className="text-surface-500 block text-[11px]">Total Term 1 Invoiced</span>
                  <strong className="text-surface-900 text-sm">KES 28,450,000</strong>
                </div>
                <span className="badge-neutral text-[10px]">336 Students</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-emerald-700 block text-[11px]">Fees Collected &amp; Banked</span>
                  <strong className="text-emerald-800 text-sm">KES 24,180,000</strong>
                </div>
                <span className="badge-success text-[10px]">85.0% Collected</span>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 flex items-center justify-between">
                <div>
                  <span className="text-rose-700 block text-[11px]">Outstanding Fee Arrears</span>
                  <strong className="text-rose-800 text-sm">KES 4,270,000</strong>
                </div>
                <span className="badge-warning text-[10px]">50 Defaulters</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleExport("Terminal Tuition and Fee Clearance Ledger")}
              className="w-full btn-secondary text-xs py-1.5 mt-2 justify-center text-emerald-800 border-emerald-200 hover:bg-emerald-50"
            >
              Export Bursary Fee Ledger (.CSV)
            </button>
          </div>
        )}

        {/* 4. FEE COMPLIANCE BY FORM — Shown for Accountant */}
        {isAccountant && (
          <div className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-surface-900 text-sm">Fee Clearance by Grade Level</h3>
              <span className="badge-primary text-[10px]">Form 1 - Form 4</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-surface-600 mb-1">
                  <span>Form 4 (Candidates)</span>
                  <strong className="text-surface-900">93% (KES 7.5M of KES 8.1M)</strong>
                </div>
                <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "93%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-surface-600 mb-1">
                  <span>Form 3 (Grade 11)</span>
                  <strong className="text-surface-900">84% (KES 6.1M of KES 7.2M)</strong>
                </div>
                <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: "84%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-surface-600 mb-1">
                  <span>Form 2 (Grade 10)</span>
                  <strong className="text-surface-900">88% (KES 5.8M of KES 6.6M)</strong>
                </div>
                <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "88%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-surface-600 mb-1">
                  <span>Form 1 (Freshmen)</span>
                  <strong className="text-surface-900">91% (KES 4.7M of KES 5.2M)</strong>
                </div>
                <div className="w-full bg-surface-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "91%" }} />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleExport("Fee Compliance by Form")}
              className="w-full btn-secondary text-xs py-1.5 mt-2 justify-center"
            >
              Export Class Fee Sheets (.CSV)
            </button>
          </div>
        )}

        {/* 5. INVENTORY & ASSET VALUATION — Shown for Accountant, Inventory Officer, or Admin (Hidden from Headteacher) */}
        {(!isHeadteacher) && (activeTab === "all" || activeTab === "financial" || activeTab === "inventory") && (
          <div className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-surface-900 text-sm">Procurement &amp; Valuation</h3>
              <span className="badge-neutral text-[10px]">KES 5.1M Total</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-50 border border-surface-100 flex items-center justify-between">
                <div>
                  <span className="text-surface-500 block text-[11px]">Consumable Stock</span>
                  <strong className="text-surface-900 text-sm">KES 1,120,400</strong>
                </div>
                <span className="badge-neutral text-[10px]">48 SKUs</span>
              </div>

              <div className="p-3 rounded-xl bg-surface-50 border border-surface-100 flex items-center justify-between">
                <div>
                  <span className="text-surface-500 block text-[11px]">Fixed Capital Equipment</span>
                  <strong className="text-surface-900 text-sm">KES 4,000,000</strong>
                </div>
                <span className="badge-neutral text-[10px]">120 Assets</span>
              </div>

              <div className="p-3 rounded-xl bg-surface-50 border border-surface-100 flex items-center justify-between">
                <div>
                  <span className="text-surface-500 block text-[11px]">Requisitions Fulfilled</span>
                  <strong className="text-emerald-700 text-sm">94.2% On-Time</strong>
                </div>
                <span className="badge-success text-[10px]">High Efficiency</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleExport("Inventory Valuation and Procurement Ledger")}
              className="w-full btn-secondary text-xs py-1.5 mt-2 justify-center"
            >
              Export Financial Asset Sheet (.CSV)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
