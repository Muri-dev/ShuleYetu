import { getCurrentUser } from "@/lib/auth/authorization";
import { ROLE_LABELS, UserRole } from "@/lib/types";
import {
  UserCircle,
  Mail,
  Phone,
  Shield,
  Key,
  Calendar,
  Building,
} from "lucide-react";

export default async function UserProfilePage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const primaryRole = user.roles[0] as UserRole;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900">
          User Account &amp; Profile
        </h1>
        <p className="text-surface-500 text-sm mt-0.5">
          Personal identification, institutional credentials, and assigned role access permissions.
        </p>
      </div>

      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-surface-100">
          <div className="w-16 h-16 rounded-3xl bg-primary-700 text-white flex items-center justify-center font-bold text-2xl font-display">
            {user.first_name[0]}
            {user.last_name[0]}
          </div>
          <div>
            <h2 className="font-display font-bold text-surface-900 text-xl">
              {user.first_name} {user.last_name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="badge-primary text-xs">
                {ROLE_LABELS[primaryRole] || primaryRole}
              </span>
              <span className="badge-success text-xs">Active Session</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-surface-500 block mb-1">Institutional Email</span>
            <div className="font-medium text-surface-900 font-mono bg-surface-50 p-2.5 rounded-xl border border-surface-100 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-primary-600" />
              {user.email}
            </div>
          </div>

          <div>
            <span className="text-surface-500 block mb-1">Contact Telephone</span>
            <div className="font-medium text-surface-900 font-mono bg-surface-50 p-2.5 rounded-xl border border-surface-100 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-primary-600" />
              {user.phone || "Not set"}
            </div>
          </div>

          <div>
            <span className="text-surface-500 block mb-1">Assigned Institution</span>
            <div className="font-medium text-surface-900 bg-surface-50 p-2.5 rounded-xl border border-surface-100 flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-primary-600" />
              Framer Elite Academy (FEIA)
            </div>
          </div>

          <div>
            <span className="text-surface-500 block mb-1">Security Authentication Level</span>
            <div className="font-medium text-surface-900 bg-surface-50 p-2.5 rounded-xl border border-surface-100 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Server-Side RBAC Verified
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-surface-100">
          <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider block mb-2">
            Active Permissions Granted
          </span>
          <div className="flex flex-wrap gap-1.5">
            {user.permissions.slice(0, 10).map((perm) => (
              <span key={perm} className="badge-neutral font-mono text-[10px]">
                {perm}
              </span>
            ))}
            {user.permissions.length > 10 && (
              <span className="badge-neutral text-[10px]">
                +{user.permissions.length - 10} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
