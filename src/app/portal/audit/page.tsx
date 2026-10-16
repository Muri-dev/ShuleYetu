"use client";

import { useState } from "react";
import { DEMO_AUDIT_LOGS } from "@/lib/demo-data";
import {
  Shield,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  User,
  Key,
  Database,
  Lock,
} from "lucide-react";

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = DEMO_AUDIT_LOGS.filter(
    (log) =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            System Security &amp; Audit Logs
          </h1>
          <p className="text-surface-500 text-sm mt-0.5">
            Tamper-evident chronological transaction trail of institutional actions, mark approvals, and role updates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-success text-xs inline-flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Audit Logging Enforced &bull; PostgreSQL WAL
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-surface-200 rounded-2xl p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search audit trail by action (e.g. APPROVE_RESULTS), actor name, or entity..."
            className="input-field pl-10 text-xs py-2"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-surface-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-50 text-surface-600 border-b border-surface-100">
              <tr>
                <th className="py-3 px-4 font-semibold">Action / Event</th>
                <th className="py-3 px-4 font-semibold">Actor</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Target Entity</th>
                <th className="py-3 px-4 font-semibold">Payload Snapshot</th>
                <th className="py-3 px-4 font-semibold">Network IP</th>
                <th className="py-3 px-4 font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-sans font-medium text-surface-900">
                    {log.user_name}
                  </td>
                  <td className="py-3 px-4 font-sans text-surface-500">
                    {log.role}
                  </td>
                  <td className="py-3 px-4 text-surface-700">
                    {log.entity_type} ({log.entity_id})
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-[11px] text-surface-500">
                    {JSON.stringify(log.new_values)}
                  </td>
                  <td className="py-3 px-4 text-surface-400">{log.ip_address}</td>
                  <td className="py-3 px-4 text-surface-400 font-sans text-[11px]">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
