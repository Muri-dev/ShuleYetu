import { DEMO_INVENTORY_ITEMS, DEMO_REQUISITIONS, DEMO_ASSETS, DEMO_STOCK_MOVEMENTS } from "@/lib/demo-data";
import Link from "next/link";
import {
  Package,
  AlertTriangle,
  ClipboardList,
  BarChart3,
  Shield,
  ArrowRight,
  TrendingDown,
  Layers,
  CheckCircle2,
} from "lucide-react";

export default function InventoryOverviewPage() {
  const lowStock = DEMO_INVENTORY_ITEMS.filter((i) => i.current_stock <= i.reorder_level);
  const pendingReqs = DEMO_REQUISITIONS.filter((r) => r.status === "pending");
  const totalValuation = DEMO_INVENTORY_ITEMS.reduce(
    (acc, i) => acc + i.current_stock * (i.unit_cost || 0),
    0
  );
  const totalAssetValuation = DEMO_ASSETS.reduce(
    (acc, a) => acc + (a.purchase_cost || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Inventory &amp; Asset Management
          </h1>
          <p className="text-surface-500 text-sm mt-0.5">
            Procurement logistics, consumable stocks, asset tagging, and multi-tier requisition controls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/portal/inventory/requisitions"
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            <ClipboardList className="w-4 h-4" />
            New Requisition Request
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
          <span className="text-xs text-surface-500 font-medium">Stock Consumables Valuation</span>
          <p className="text-xl sm:text-2xl font-bold text-surface-900 mt-1">
            KES {(totalValuation).toLocaleString()}
          </p>
          <span className="text-[11px] text-surface-400 mt-0.5 block">{DEMO_INVENTORY_ITEMS.length} Catalog Items</span>
        </div>

        <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
          <span className="text-xs text-surface-500 font-medium">Fixed Assets Value</span>
          <p className="text-xl sm:text-2xl font-bold text-primary-700 mt-1">
            KES {(totalAssetValuation).toLocaleString()}
          </p>
          <span className="text-[11px] text-surface-400 mt-0.5 block">Tagged Institutional Equipment</span>
        </div>

        <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
          <span className="text-xs text-surface-500 font-medium">Reorder Threshold Alerts</span>
          <p className="text-xl sm:text-2xl font-bold text-amber-600 mt-1">
            {lowStock.length} Low Items
          </p>
          <span className="text-[11px] text-amber-600 mt-0.5 block">Requires Purchase Order</span>
        </div>

        <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
          <span className="text-xs text-surface-500 font-medium">Requisition Queue</span>
          <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
            {pendingReqs.length} Pending
          </p>
          <span className="text-[11px] text-surface-400 mt-0.5 block">Awaiting Officer Review</span>
        </div>
      </div>

      {/* Submodule Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href="/portal/inventory/items"
          className="bg-white border border-surface-200 rounded-2xl p-5 hover:border-primary-400 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-surface-900 text-sm mb-1 group-hover:text-primary-700">
            Stock Catalog
          </h3>
          <p className="text-xs text-surface-500 leading-relaxed">
            Consumable supplies, laboratory reagents, stationary, and reorder levels.
          </p>
          <span className="mt-3 block text-xs font-semibold text-primary-600">
            View Catalog &rarr;
          </span>
        </Link>

        <Link
          href="/portal/inventory/requisitions"
          className="bg-white border border-surface-200 rounded-2xl p-5 hover:border-primary-400 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <ClipboardList className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-surface-900 text-sm mb-1 group-hover:text-amber-700">
            Requisition Approvals
          </h3>
          <p className="text-xs text-surface-500 leading-relaxed">
            Staff supply request queue, approval status, and warehouse issuance.
          </p>
          <span className="mt-3 block text-xs font-semibold text-amber-600">
            Manage Requests &rarr;
          </span>
        </Link>

        <Link
          href="/portal/inventory/movements"
          className="bg-white border border-surface-200 rounded-2xl p-5 hover:border-primary-400 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-surface-900 text-sm mb-1 group-hover:text-blue-700">
            Stock Movement Trail
          </h3>
          <p className="text-xs text-surface-500 leading-relaxed">
            Immutable log of goods receipts, departmental issues, and adjustments.
          </p>
          <span className="mt-3 block text-xs font-semibold text-blue-600">
            Audit Ledger &rarr;
          </span>
        </Link>

        <Link
          href="/portal/inventory/assets"
          className="bg-white border border-surface-200 rounded-2xl p-5 hover:border-primary-400 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-surface-900 text-sm mb-1 group-hover:text-purple-700">
            Capital Asset Registry
          </h3>
          <p className="text-xs text-surface-500 leading-relaxed">
            Tagged projectors, lab microscopes, pianos, serial numbers, and custodians.
          </p>
          <span className="mt-3 block text-xs font-semibold text-purple-600">
            Asset Inventory &rarr;
          </span>
        </Link>
      </div>

      {/* Critical Reorder Alerts Table */}
      {lowStock.length > 0 && (
        <div className="bg-amber-50/60 border border-amber-200 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-amber-950 text-sm">
              Urgent Restocking Alerts &bull; Below Safety Threshold
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lowStock.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-semibold text-surface-900 text-xs">{item.name}</h4>
                  <p className="text-[11px] text-surface-500 mt-0.5">
                    SKU: {item.sku} &bull; Location: {item.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-rose-600 block">
                    {item.current_stock} {item.unit} Remaining
                  </span>
                  <span className="text-[10px] text-surface-400">
                    Threshold: {item.reorder_level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
