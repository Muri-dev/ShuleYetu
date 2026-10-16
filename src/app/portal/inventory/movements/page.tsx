import { DEMO_STOCK_MOVEMENTS } from "@/lib/demo-data";
import Link from "next/link";
import {
  BarChart3,
  ArrowLeft,
  ArrowDownRight,
  ArrowUpRight,
  RefreshCw,
  AlertOctagon,
  ShieldCheck,
} from "lucide-react";

export default function StockMovementsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/portal/inventory"
              className="text-xs text-surface-500 hover:text-surface-700 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Inventory
            </Link>
            <span className="text-surface-300">&bull;</span>
            <span className="text-xs text-primary-600 font-medium">Audit Trail</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Immutable Stock Movement Ledger
          </h1>
          <p className="text-surface-500 text-sm">
            Cryptographically sealed transaction logs of all receipts, issues, inter-store transfers, and write-offs.
          </p>
        </div>
      </div>

      {/* Movement Table */}
      <div className="bg-white border border-surface-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 text-surface-600 border-b border-surface-100">
              <tr>
                <th className="py-3 px-4 font-semibold">Reference #</th>
                <th className="py-3 px-4 font-semibold">Movement Type</th>
                <th className="py-3 px-4 font-semibold">Item &amp; Quantity</th>
                <th className="py-3 px-4 font-semibold">Origin &rarr; Destination</th>
                <th className="py-3 px-4 font-semibold">Authorizing Officer</th>
                <th className="py-3 px-4 font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {DEMO_STOCK_MOVEMENTS.map((mov) => {
                const isReceipt = mov.movement_type === "receipt";

                return (
                  <tr key={mov.id} className="hover:bg-surface-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-surface-800">
                      {mov.reference_number}
                    </td>
                    <td className="py-3 px-4">
                      {isReceipt ? (
                        <span className="badge-success text-[11px] inline-flex items-center gap-1">
                          <ArrowDownRight className="w-3 h-3" />
                          Goods Receipt
                        </span>
                      ) : (
                        <span className="badge-warning text-[11px] inline-flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" />
                          Stock Issue
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-surface-900">{mov.item_name}</div>
                      <span className="text-[11px] text-primary-700 font-semibold">
                        {isReceipt ? `+${mov.quantity}` : `-${mov.quantity}`} Units
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-surface-600">From: {mov.from_location}</div>
                      <div className="text-surface-900 font-medium">To: {mov.to_location}</div>
                    </td>
                    <td className="py-3 px-4 text-surface-700 font-medium">{mov.operator_name}</td>
                    <td className="py-3 px-4 text-surface-400 font-mono text-[11px]">
                      {new Date(mov.created_at).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
