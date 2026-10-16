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

  const handleExport = (reportName: string) => {
    toast.success(`Exporting "${reportName}" to CSV. Download starting...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Institutional Reports &amp; Analytics
          </h1>
          <p className="text-surface-500 text-sm mt-0.5">
            Cross-departmental telemetry, academic grade distributions, attendance trends, and inventory financials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleExport("Master Institutional Audit Report")}
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Download Complete Audit Dossier
          </button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Academic Performance Distribution */}
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

        {/* Attendance Rates by Form */}
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

        {/* Inventory & Asset Financials */}
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
      </div>
    </div>
  );
}
