"use client";

import { useState } from "react";
import { DEMO_SCHOOL } from "@/lib/demo-data";
import {
  Settings,
  Building,
  Shield,
  Bell,
  Save,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [form, setForm] = useState({
    name: DEMO_SCHOOL.name,
    code: DEMO_SCHOOL.code,
    motto: DEMO_SCHOOL.motto || "",
    address: DEMO_SCHOOL.address || "",
    phone: DEMO_SCHOOL.phone || "",
    email: DEMO_SCHOOL.email || "",
    website: DEMO_SCHOOL.website || "",
    gradingSystem: "hybrid",
    mfaEnforced: true,
    autoAbsentSms: true,
    resultsEmailAlert: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Institutional settings saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900">
          Institutional Settings &amp; Configuration
        </h1>
        <p className="text-surface-500 text-sm mt-0.5">
          Institution profile, academic grading schema, security parameters, and notification triggers.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Institution Profile */}
        <div className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-100">
            <Building className="w-5 h-5 text-primary-600" />
            <h2 className="font-semibold text-surface-900 text-sm">School Profile &amp; Identifiers</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="label label-required">School Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="label label-required">Institutional Code</label>
              <input
                type="text"
                required
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="input-field font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label">Institutional Motto</label>
              <input
                type="text"
                value={form.motto}
                onChange={(e) => setForm({ ...form, motto: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Contact Telephone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field font-mono"
              />
            </div>

            <div>
              <label className="label">Official Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label">Physical Campus Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Security & RLS Policies */}
        <div className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-surface-100">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h2 className="font-semibold text-surface-900 text-sm">Security &amp; Authorization Enforcements</h2>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-3 p-3 rounded-2xl bg-surface-50 border border-surface-100 cursor-pointer">
              <input
                type="checkbox"
                checked={form.mfaEnforced}
                onChange={(e) => setForm({ ...form, mfaEnforced: e.target.checked })}
                className="rounded text-primary-600 focus:ring-primary-500 mt-0.5"
              />
              <div>
                <span className="font-bold text-surface-900 block">Enforce Multi-Factor Authentication (MFA) for Administrative Roles</span>
                <span className="text-surface-500 text-[11px]">
                  Requires super admins, headteachers, and finance officers to verify via authenticator app.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-2xl bg-surface-50 border border-surface-100 cursor-pointer">
              <input
                type="checkbox"
                checked={form.autoAbsentSms}
                onChange={(e) => setForm({ ...form, autoAbsentSms: e.target.checked })}
                className="rounded text-primary-600 focus:ring-primary-500 mt-0.5"
              />
              <div>
                <span className="font-bold text-surface-900 block">Instant Automated Parent SMS upon Unexcused Student Absence</span>
                <span className="text-surface-500 text-[11px]">
                  Dispatches emergency notification SMS to primary guardian if student is marked absent during morning roll-call.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-2xl bg-surface-50 border border-surface-100 cursor-pointer">
              <input
                type="checkbox"
                checked={form.resultsEmailAlert}
                onChange={(e) => setForm({ ...form, resultsEmailAlert: e.target.checked })}
                className="rounded text-primary-600 focus:ring-primary-500 mt-0.5"
              />
              <div>
                <span className="font-bold text-surface-900 block">Notify Parents Automatically when Term Report Cards are Published</span>
                <span className="text-surface-500 text-[11px]">
                  Triggers encrypted link via Resend/SMTP to parents when results status moves to Published.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <button type="submit" className="btn-primary text-xs inline-flex items-center gap-1.5 px-6">
            <Save className="w-4 h-4" />
            Save Institutional Settings
          </button>
        </div>
      </form>
    </div>
  );
}
