"use client";

import { useState } from "react";
import { DEMO_USERS } from "@/lib/demo-data";
import { ROLE_LABELS, UserRole } from "@/lib/types";
import {
  UserCircle,
  Mail,
  Phone,
  Shield,
  Plus,
  Search,
  CheckCircle2,
  X,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function StaffDirectoryPage() {
  const staffList = Object.values(DEMO_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "teacher" as UserRole,
  });

  const filteredStaff = staffList.filter(
    (s) =>
      s.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setShowInviteModal(false);
    toast.success(`Invitation email dispatched to ${inviteForm.email}!`);
    setInviteForm({ firstName: "", lastName: "", email: "", role: "teacher" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Faculty &amp; Staff Administration
          </h1>
          <p className="text-surface-500 text-sm mt-0.5">
            Manage instructional staff, department heads, system roles, and invitation onboarding.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowInviteModal(true)}
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Invite Staff Member
          </button>
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
            placeholder="Search staff members by name, role or institutional email..."
            className="input-field pl-10 text-xs py-2"
          />
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((staff) => {
          const role = staff.roles[0] as UserRole;

          return (
            <div
              key={staff.id}
              className="bg-white border border-surface-200 rounded-3xl p-5 shadow-xs hover:border-primary-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-base">
                      {staff.first_name[0]}
                      {staff.last_name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-900 text-sm">
                        {staff.first_name} {staff.last_name}
                      </h3>
                      <span className="badge-primary text-[10px] mt-0.5">
                        {ROLE_LABELS[role] || role}
                      </span>
                    </div>
                  </div>
                  <span className="badge-success text-[10px]">Active</span>
                </div>

                <div className="space-y-1.5 mt-4 text-xs text-surface-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-surface-400" />
                    <span className="font-mono text-[11px] truncate">{staff.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-surface-400" />
                    <span className="font-mono text-[11px]">{staff.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-surface-100 flex items-center justify-between text-xs text-surface-400">
                <span>Access: Multi-factor Enabled</span>
                <button
                  type="button"
                  onClick={() => toast.info(`Account details for ${staff.first_name}`)}
                  className="text-primary-600 font-medium hover:underline text-xs"
                >
                  Manage Permissions &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-surface-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-100 mb-4">
              <h3 className="font-display font-bold text-base text-surface-900">
                Invite Staff Member
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded-lg hover:bg-surface-100 text-surface-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-3 text-xs">
              <div>
                <label className="label label-required">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nicholas"
                  value={inviteForm.firstName}
                  onChange={(e) => setInviteForm({ ...inviteForm, firstName: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label label-required">Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kiprono"
                  value={inviteForm.lastName}
                  onChange={(e) => setInviteForm({ ...inviteForm, lastName: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label label-required">Institutional Email</label>
                <input
                  type="email"
                  required
                  placeholder="nkiprono@framerelite.edu"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label label-required">Assigned System Role</label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value as UserRole })}
                  className="input-field py-2"
                >
                  <option value="teacher">Teacher</option>
                  <option value="headteacher">Headteacher</option>
                  <option value="school_admin">School Administrator</option>
                  <option value="inventory_officer">Inventory Officer</option>
                  <option value="accountant">Accountant</option>
                  <option value="non_teaching_staff">Support Staff</option>
                </select>
              </div>

              <div className="pt-4 border-t border-surface-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Send Onboarding Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
