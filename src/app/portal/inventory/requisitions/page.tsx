"use client";

import { useState } from "react";
import Link from "next/link";
import { DEMO_REQUISITIONS, DEMO_INVENTORY_ITEMS } from "@/lib/demo-data";
import { RequisitionStatus } from "@/lib/types";
import {
  ClipboardList,
  ArrowLeft,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Package,
  Send,
  X,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

export default function RequisitionsPage() {
  const [requisitions, setRequisitions] = useState(DEMO_REQUISITIONS);
  const [showModal, setShowModal] = useState(false);
  const [newReq, setNewReq] = useState({
    itemId: DEMO_INVENTORY_ITEMS[0].id,
    quantity: 5,
    reason: "",
  });

  const handleApprove = (id: string) => {
    setRequisitions((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "approved" as RequisitionStatus,
              approved_by: "usr-inventory",
              approved_at: new Date().toISOString(),
            }
          : r
      )
    );
    toast.success("Requisition approved! Awaiting fulfillment and dispatch.");
  };

  const handleFulfill = (id: string) => {
    setRequisitions((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "fulfilled" as RequisitionStatus,
              fulfilled_at: new Date().toISOString(),
            }
          : r
      )
    );
    toast.success("Stock dispatched & requisition marked as Fulfilled!");
  };

  const handleReject = (id: string) => {
    setRequisitions((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "rejected" as RequisitionStatus,
            }
          : r
      )
    );
    toast.error("Requisition rejected.");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const item = DEMO_INVENTORY_ITEMS.find((i) => i.id === newReq.itemId) || DEMO_INVENTORY_ITEMS[0];
    const created = {
      id: `req-${Date.now()}`,
      school_id: "sch-001",
      requested_by: "usr-teacher",
      item_id: item.id,
      quantity: Number(newReq.quantity),
      reason: newReq.reason || "Departmental instructional requirement",
      status: "pending" as RequisitionStatus,
      created_at: new Date().toISOString(),
      item_name: item.name,
      requester_name: "Ms. Sarah Jenkins",
    };

    setRequisitions([created, ...requisitions]);
    setShowModal(false);
    toast.success("Requisition submitted for approval!");
    setNewReq({ itemId: DEMO_INVENTORY_ITEMS[0].id, quantity: 5, reason: "" });
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
            <span className="text-xs text-primary-600 font-medium">Requisition Workflow</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Supply Requisitions &amp; Dispatch
          </h1>
          <p className="text-surface-500 text-sm">
            Staff requisitions, inventory verification, approval authorization, and warehouse fulfillment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Request Supplies
          </button>
        </div>
      </div>

      {/* Requisitions List */}
      <div className="space-y-3">
        {requisitions.map((req) => (
          <div
            key={req.id}
            className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs hover:border-surface-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-semibold text-surface-400">
                  {req.id}
                </span>
                <span className="text-xs text-surface-300">&bull;</span>
                <h3 className="font-bold text-surface-900 text-sm">
                  {req.quantity}x {req.item_name}
                </h3>
                {req.status === "pending" && (
                  <span className="badge-warning text-xs">Awaiting Approval</span>
                )}
                {req.status === "approved" && (
                  <span className="badge-info text-xs">Approved &bull; Ready to Dispatch</span>
                )}
                {req.status === "fulfilled" && (
                  <span className="badge-success text-xs">Fulfilled &amp; Issued</span>
                )}
                {req.status === "rejected" && (
                  <span className="badge-danger text-xs">Declined</span>
                )}
              </div>

              <p className="text-xs text-surface-600 mb-1">
                <strong>Justification:</strong> {req.reason}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-surface-400">
                <span>Requested by: <strong className="text-surface-700">{req.requester_name}</strong></span>
                <span>Date: {new Date(req.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Actions for inventory officer */}
            <div className="flex items-center gap-2 shrink-0">
              {req.status === "pending" && (
                <>
                  <button
                    type="button"
                    onClick={() => handleApprove(req.id)}
                    className="btn-primary text-xs px-3 py-1.5 inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 border-emerald-600"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve Request
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReject(req.id)}
                    className="btn-secondary text-xs px-3 py-1.5 inline-flex items-center gap-1 text-rose-600 hover:bg-rose-50"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Reject
                  </button>
                </>
              )}

              {req.status === "approved" && (
                <button
                  type="button"
                  onClick={() => handleFulfill(req.id)}
                  className="btn-primary text-xs px-3 py-1.5 inline-flex items-center gap-1"
                >
                  <Truck className="w-3.5 h-3.5" />
                  Dispatch &amp; Fulfill
                </button>
              )}

              {req.status === "fulfilled" && (
                <span className="text-xs text-emerald-600 font-semibold inline-flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Dispatched
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Requisition Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-surface-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-100 mb-4">
              <h3 className="font-display font-bold text-base text-surface-900">
                Submit Material Requisition
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg hover:bg-surface-100 text-surface-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="label label-required">Select Catalog Item</label>
                <select
                  value={newReq.itemId}
                  onChange={(e) => setNewReq({ ...newReq, itemId: e.target.value })}
                  className="input-field py-2"
                >
                  {DEMO_INVENTORY_ITEMS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.current_stock} {item.unit} available)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label label-required">Quantity Required</label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  required
                  value={newReq.quantity}
                  onChange={(e) => setNewReq({ ...newReq, quantity: Number(e.target.value) })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label label-required">Institutional Purpose / Reason</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Form 3 West Mid-Term Practical Exam Preparation..."
                  value={newReq.reason}
                  onChange={(e) => setNewReq({ ...newReq, reason: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="pt-4 border-t border-surface-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Submit to Inventory Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
