"use client";

import { useState } from "react";
import Link from "next/link";
import { Student } from "@/lib/types";
import {
  Users,
  FileText,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  BookOpen,
  HeartPulse,
  CreditCard,
  Receipt,
  Download,
  AlertCircle,
} from "lucide-react";
import { FeePaymentModal } from "./fee-payment-modal";
import { toast } from "sonner";

interface ChildrenPortalViewProps {
  initialChildren: (Student & {
    class_name: string;
    stream_name: string;
    guardian_name: string;
    guardian_phone: string;
  })[];
}

export function ChildrenPortalView({ initialChildren }: ChildrenPortalViewProps) {
  const [children, setChildren] = useState(initialChildren);
  const [selectedChildForPayment, setSelectedChildForPayment] = useState<
    (Student & { class_name: string }) | null
  >(null);

  const handlePaymentSuccess = (amount: number, transactionId: string) => {
    if (!selectedChildForPayment) return;

    setChildren((prev) =>
      prev.map((c) => {
        if (c.id === selectedChildForPayment.id) {
          const newPaid = (c.amount_paid || 0) + amount;
          const newBal = Math.max(0, (c.fee_balance || 0) - amount);
          return {
            ...c,
            amount_paid: newPaid,
            fee_balance: newBal,
            fee_status: newBal === 0 ? "cleared" : "partial",
            last_payment_date: new Date().toISOString(),
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Children Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.map((child) => (
          <div
            key={child.id}
            className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs hover:border-primary-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
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

              {/* Academic & Attendance Telemetry */}
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
                  <span className="text-surface-500 block text-[11px]">Standing</span>
                  <span className="font-semibold text-primary-700">Honours List</span>
                </div>
              </div>

              {/* Student Fee Account & Payment Widget (Crucial Parent Highlight) */}
              <div className="p-4 rounded-2xl border border-surface-200 bg-gradient-to-b from-white to-surface-50 mb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-surface-900 text-xs">
                      Term 1 Tuition &amp; Fee Account
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      child.fee_status === "cleared"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : child.fee_status === "partial"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-rose-100 text-rose-800 border border-rose-200"
                    }`}
                  >
                    {child.fee_status === "cleared"
                      ? "✓ 100% Cleared"
                      : `⚡ Bal: KES ${(child.fee_balance || 0).toLocaleString()}`}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <span className="text-surface-500 block">Total Billed:</span>
                    <strong className="text-surface-900 font-mono">
                      KES {(child.term_tuition || 85000).toLocaleString()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-surface-500 block">Paid to Date:</span>
                    <strong className="text-emerald-700 font-mono">
                      KES {(child.amount_paid || 0).toLocaleString()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-surface-500 block">Balance Due:</span>
                    <strong
                      className={`font-mono ${
                        (child.fee_balance || 0) > 0 ? "text-rose-600" : "text-surface-900"
                      }`}
                    >
                      KES {(child.fee_balance || 0).toLocaleString()}
                    </strong>
                  </div>
                </div>

                {/* Instant Online Payment CTA */}
                {(child.fee_balance || 0) > 0 ? (
                  <button
                    type="button"
                    onClick={() => setSelectedChildForPayment(child)}
                    className="w-full btn-primary text-xs py-2 justify-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 shadow-xs inline-flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Pay Outstanding Fees (KES {(child.fee_balance || 0).toLocaleString()})
                  </button>
                ) : (
                  <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50/70 border border-emerald-100 rounded-xl px-3 py-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Zero arrears on file for Term 1
                    </span>
                    <button
                      type="button"
                      onClick={() => toast.success(`Official Terminal Statement downloaded for ${child.first_name}`)}
                      className="text-[11px] text-emerald-700 hover:underline font-semibold"
                    >
                      Receipt
                    </button>
                  </div>
                )}
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

      {/* Interactive Payment Modal */}
      {selectedChildForPayment && (
        <FeePaymentModal
          student={selectedChildForPayment}
          isOpen={!!selectedChildForPayment}
          onClose={() => setSelectedChildForPayment(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
