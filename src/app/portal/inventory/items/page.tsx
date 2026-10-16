"use client";

import { useState } from "react";
import Link from "next/link";
import { DEMO_INVENTORY_ITEMS } from "@/lib/demo-data";
import {
  Package,
  ArrowLeft,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";
import { toast } from "sonner";

export default function InventoryItemsPage() {
  const [items, setItems] = useState(DEMO_INVENTORY_ITEMS);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    sku: "",
    category: "Stationery",
    unit: "Units",
    currentStock: 50,
    reorderLevel: 10,
    unitCost: 1500,
    location: "Main Store Room",
  });

  const filteredItems = items.filter(
    (i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: `inv-${Date.now()}`,
      school_id: "sch-001",
      category_id: "cat-general",
      name: newItem.name,
      sku: newItem.sku || `SKU-${Date.now().toString().slice(-4)}`,
      unit: newItem.unit,
      current_stock: Number(newItem.currentStock),
      reorder_level: Number(newItem.reorderLevel),
      unit_cost: Number(newItem.unitCost),
      location: newItem.location,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setItems([created, ...items]);
    setShowAddModal(false);
    toast.success(`Inventory item "${newItem.name}" added to catalog!`);
    setNewItem({
      name: "",
      sku: "",
      category: "Stationery",
      unit: "Units",
      currentStock: 50,
      reorderLevel: 10,
      unitCost: 1500,
      location: "Main Store Room",
    });
  };

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
            <span className="text-xs text-primary-600 font-medium">Stock Catalog</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Stock Consumables &amp; Supplies
          </h1>
          <p className="text-surface-500 text-sm">
            Track real-time stock balances, SKUs, reorder thresholds, and warehouse shelf locations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add Stock Item
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search catalog by item description, name or SKU code..."
            className="input-field pl-10 text-xs py-2"
          />
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white border border-surface-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 text-surface-600 border-b border-surface-100">
              <tr>
                <th className="py-3 px-4 font-semibold">SKU</th>
                <th className="py-3 px-4 font-semibold">Item Name</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold text-right">Unit Cost</th>
                <th className="py-3 px-4 font-semibold text-center">Available Stock</th>
                <th className="py-3 px-4 font-semibold text-center">Reorder Point</th>
                <th className="py-3 px-4 font-semibold">Stock Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filteredItems.map((item) => {
                const isLow = item.current_stock <= item.reorder_level;

                return (
                  <tr key={item.id} className="hover:bg-surface-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-surface-700">
                      {item.sku}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-surface-900">{item.name}</div>
                      <span className="text-[11px] text-surface-400">{item.description}</span>
                    </td>
                    <td className="py-3 px-4 text-surface-600">{item.location || "Store"}</td>
                    <td className="py-3 px-4 text-right font-medium text-surface-900">
                      KES {item.unit_cost?.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-surface-900">
                      {item.current_stock} {item.unit}
                    </td>
                    <td className="py-3 px-4 text-center text-surface-500">
                      {item.reorder_level} {item.unit}
                    </td>
                    <td className="py-3 px-4">
                      {isLow ? (
                        <span className="badge-danger text-[11px] inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Low Stock Alert
                        </span>
                      ) : (
                        <span className="badge-success text-[11px] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-surface-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-100 mb-4">
              <h3 className="font-display font-bold text-base text-surface-900">
                Register New Stock Item
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-surface-100 text-surface-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4 text-xs">
              <div>
                <label className="label label-required">Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bunsen Burners (Pack of 6)"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">SKU Code</label>
                  <input
                    type="text"
                    placeholder="e.g. LAB-BUN-010"
                    value={newItem.sku}
                    onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
                    className="input-field font-mono"
                  />
                </div>
                <div>
                  <label className="label label-required">Stock Unit</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Units, Reams, Boxes"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="label label-required">Initial Stock</label>
                  <input
                    type="number"
                    required
                    value={newItem.currentStock}
                    onChange={(e) => setNewItem({ ...newItem, currentStock: Number(e.target.value) })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label label-required">Reorder Threshold</label>
                  <input
                    type="number"
                    required
                    value={newItem.reorderLevel}
                    onChange={(e) => setNewItem({ ...newItem, reorderLevel: Number(e.target.value) })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label label-required">Unit Cost (KES)</label>
                  <input
                    type="number"
                    required
                    value={newItem.unitCost}
                    onChange={(e) => setNewItem({ ...newItem, unitCost: Number(e.target.value) })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="label">Warehouse Storage Location</label>
                <input
                  type="text"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="pt-4 border-t border-surface-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Save Item to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
