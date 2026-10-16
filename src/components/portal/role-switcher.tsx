"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRole, ROLE_LABELS } from "@/lib/types";
import { toast } from "sonner";
import {
  ChevronDown,
  Shield,
  Building,
  BookOpen,
  User,
  Users,
  Package,
  Calculator,
  UserCheck,
  Check,
  Loader2,
} from "lucide-react";

interface RoleSwitcherProps {
  currentRole: UserRole;
  variant?: "dark" | "light";
}

const roleIcons: Record<UserRole, React.ElementType> = {
  super_admin: Shield,
  school_admin: Building,
  headteacher: BookOpen,
  teacher: User,
  parent: Users,
  inventory_officer: Package,
  accountant: Calculator,
  non_teaching_staff: UserCheck,
};

const roleDescriptions: Record<UserRole, string> = {
  super_admin: "System & security governance",
  school_admin: "Admissions, staff & campus operations",
  headteacher: "Academic dean & results approvals",
  teacher: "Marks entry, attendance & syllabus",
  parent: "Children reports, fee balances & payments",
  inventory_officer: "Warehouse stock & asset logistics",
  accountant: "Tuition collection, arrears & ledger",
  non_teaching_staff: "Departmental requisitions & duty",
};

export function RoleSwitcher({ currentRole, variant = "light" }: RoleSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loadingRole, setLoadingRole] = useState<UserRole | null>(null);

  const handleSwitch = async (role: UserRole) => {
    if (role === currentRole) {
      setIsOpen(false);
      return;
    }

    setLoadingRole(role);
    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        toast.success(`Switched active view to ${ROLE_LABELS[role]}`);
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to switch demo persona");
      }
    } catch {
      toast.error("Error switching persona");
    } finally {
      setLoadingRole(null);
    }
  };

  const CurrentIcon = roleIcons[currentRole] || Shield;

  const triggerButtonStyles =
    variant === "dark"
      ? "bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/25 text-white"
      : "bg-surface-50 hover:bg-surface-100 border-surface-200 hover:border-primary-300 text-surface-900";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch User Persona"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-xs ${triggerButtonStyles}`}
      >
        <div
          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
            variant === "dark" ? "bg-white/20 text-white" : "bg-primary-100 text-primary-700"
          }`}
        >
          <CurrentIcon className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <span className="block text-[11px] font-semibold leading-tight">
            {ROLE_LABELS[currentRole]}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 ml-1 transition-transform ${
            isOpen ? "rotate-180" : ""
          } ${variant === "dark" ? "text-primary-200" : "text-surface-500"}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-surface-200 py-2 z-50 text-surface-900 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3.5 py-2 border-b border-surface-100">
              <span className="text-[11px] font-bold text-surface-500 uppercase tracking-wider block">
                Switch User Persona
              </span>
              <p className="text-[11px] text-surface-400 mt-0.5">
                Test role-based access control &amp; tailored workflows
              </p>
            </div>
            <div className="p-1.5 space-y-1 max-h-80 overflow-y-auto">
              {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => {
                const Icon = roleIcons[role];
                const isCurrent = role === currentRole;
                const isLoading = loadingRole === role;

                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleSwitch(role)}
                    disabled={loadingRole !== null}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all ${
                      isCurrent
                        ? "bg-primary-50 text-primary-900 font-semibold border border-primary-200/60"
                        : "hover:bg-surface-50 text-surface-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isCurrent
                            ? "bg-primary-600 text-white shadow-xs"
                            : "bg-surface-100 text-surface-600"
                        }`}
                      >
                        {isLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="block font-semibold text-xs truncate text-surface-900">
                          {ROLE_LABELS[role]}
                        </span>
                        <span className="block text-[10px] text-surface-500 truncate">
                          {roleDescriptions[role]}
                        </span>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center shrink-0 ml-1">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
