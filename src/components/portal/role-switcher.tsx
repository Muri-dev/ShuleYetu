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

export function RoleSwitcher({ currentRole }: RoleSwitcherProps) {
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
        toast.success(`Switched role to ${ROLE_LABELS[role]}`);
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to switch demo role");
      }
    } catch {
      toast.error("Error switching role");
    } finally {
      setLoadingRole(null);
    }
  };

  const CurrentIcon = roleIcons[currentRole] || Shield;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-semibold transition-all shadow-xs"
      >
        <CurrentIcon className="w-4 h-4 text-primary-200" />
        <span>Switch Persona: {ROLE_LABELS[currentRole]}</span>
        <ChevronDown className="w-3.5 h-3.5 text-primary-200 ml-1" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-surface-200 py-2 z-50 text-surface-900 animate-in fade-in zoom-in-95 duration-100">
            <div className="px-3 py-1.5 border-b border-surface-100 text-[11px] font-semibold text-surface-500 uppercase tracking-wider">
              Switch User Persona
            </div>
            <div className="p-1 space-y-0.5">
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
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isCurrent
                        ? "bg-primary-50 text-primary-900 font-semibold"
                        : "hover:bg-surface-100 text-surface-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                          isCurrent
                            ? "bg-primary-600 text-white"
                            : "bg-surface-100 text-surface-600"
                        }`}
                      >
                        {isLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Icon className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <span>{ROLE_LABELS[role]}</span>
                    </div>
                    {isCurrent && <Check className="w-4 h-4 text-primary-600" />}
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
