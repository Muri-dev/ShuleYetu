import { DEMO_ASSETS } from "@/lib/demo-data";
import Link from "next/link";
import {
  Shield,
  ArrowLeft,
  Plus,
  Search,
  Tag,
  CheckCircle2,
  Calendar,
  DollarSign,
} from "lucide-react";

export default function AssetsRegistryPage() {
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
            <span className="text-xs text-primary-600 font-medium">Fixed Assets</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Capital Asset Registry &amp; Custody
          </h1>
          <p className="text-surface-500 text-sm">
            Tagged instructional technology, laboratory equipment, musical instruments, and serial numbers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-primary text-xs inline-flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            Tag New Asset
          </button>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_ASSETS.map((asset) => (
          <div
            key={asset.id}
            className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-primary-800 bg-primary-50 px-2.5 py-1 rounded-lg">
                  {asset.asset_tag}
                </span>
                <span className="badge-success text-xs capitalize">{asset.condition}</span>
              </div>

              <h3 className="font-display font-bold text-surface-900 text-base mb-1">
                {asset.name}
              </h3>
              <p className="text-xs text-surface-500 font-mono">
                Serial No: {asset.serial_number}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-4 p-3 bg-surface-50 rounded-2xl border border-surface-100 text-xs">
                <div>
                  <span className="text-surface-500 block text-[11px]">Location</span>
                  <strong className="text-surface-900">{asset.location}</strong>
                </div>
                <div>
                  <span className="text-surface-500 block text-[11px]">Assigned Custodian</span>
                  <strong className="text-surface-900">{asset.assigned_to}</strong>
                </div>
                <div>
                  <span className="text-surface-500 block text-[11px]">Purchase Date</span>
                  <span className="text-surface-700">{asset.purchase_date}</span>
                </div>
                <div>
                  <span className="text-surface-500 block text-[11px]">Capital Value</span>
                  <span className="text-primary-700 font-bold">
                    KES {asset.purchase_cost?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-surface-100 flex items-center justify-between text-xs text-surface-500">
              <span>Status: <strong>Active in Service</strong></span>
              <button className="text-primary-600 font-medium hover:underline text-xs">
                Audit Inspection Log &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
