"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GraduationCap,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Shield,
  User,
  Users,
  BookOpen,
  Package,
  Calculator,
  UserCheck,
  Building,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { UserRole } from "@/lib/types";

const demoAccounts: { role: UserRole; title: string; email: string; icon: React.ElementType; badge: string }[] = [
  { role: "super_admin", title: "Super Admin", email: "superadmin@framerelite.edu", icon: Shield, badge: "Platform Control" },
  { role: "school_admin", title: "School Admin", email: "admin@framerelite.edu", icon: Building, badge: "Full Operations" },
  { role: "headteacher", title: "Headteacher", email: "headteacher@framerelite.edu", icon: BookOpen, badge: "Academic & Approvals" },
  { role: "teacher", title: "Teacher", email: "teacher@framerelite.edu", icon: User, badge: "Marks & Attendance" },
  { role: "parent", title: "Parent / Guardian", email: "parent@framerelite.edu", icon: Users, badge: "Children & Results" },
  { role: "inventory_officer", title: "Inventory Officer", email: "inventory@framerelite.edu", icon: Package, badge: "Stock & Requisitions" },
  { role: "accountant", title: "Accountant", email: "accountant@framerelite.edu", icon: Calculator, badge: "Finance & Reports" },
  { role: "non_teaching_staff", title: "Support Staff", email: "staff@framerelite.edu", icon: UserCheck, badge: "Staff Portal" },
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/portal";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [switchingRole, setSwitchingRole] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if matches one of demo accounts
      const matchedDemo = demoAccounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
      if (matchedDemo) {
        await handleQuickDemoLogin(matchedDemo.role);
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Welcome back!");
      router.push(redirect);
      router.refresh();
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (role: UserRole) => {
    setSwitchingRole(role);
    try {
      const res = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        toast.success(`Logged in as ${role.replace("_", " ").toUpperCase()}`);
        router.push(redirect);
        router.refresh();
      } else {
        toast.error("Failed to switch demo session");
      }
    } catch {
      toast.error("Demo login connection failed");
    } finally {
      setSwitchingRole(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-surface-50">
      {/* Left: Login Form & Demo Quick-Select */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-10">
        <div className="w-full max-w-xl">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-xl text-surface-900 block leading-tight">
                  Framer Elite
                </span>
                <span className="text-xs text-surface-500 uppercase tracking-widest font-medium">
                  School Ecosystem
                </span>
              </div>
            </Link>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-surface-900 mb-2">
              Sign In to Your Portal
            </h1>
            <p className="text-surface-600 text-sm">
              Enter your institutional credentials or test instantly with a demo persona below.
            </p>
          </div>

          {/* Quick Demo Switcher Grid */}
          <div className="mb-8 bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-surface-700 uppercase tracking-wider">
                Instant Demo Access (All 8 Roles)
              </span>
              <span className="text-xs text-primary-600 font-medium">Click to Launch</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {demoAccounts.map((item) => {
                const Icon = item.icon;
                const isSelected = switchingRole === item.role;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleQuickDemoLogin(item.role)}
                    disabled={switchingRole !== null}
                    className="flex flex-col items-center text-center p-2.5 rounded-xl border border-surface-200 hover:border-primary-400 hover:bg-primary-50/50 transition-all text-xs group disabled:opacity-50"
                  >
                    <div className="w-7 h-7 rounded-lg bg-surface-100 group-hover:bg-primary-600 group-hover:text-white flex items-center justify-center text-surface-600 transition-colors mb-1.5">
                      {isSelected ? (
                        <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
                      ) : (
                        <Icon className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <span className="font-medium text-surface-900 line-clamp-1">{item.title}</span>
                    <span className="text-[10px] text-surface-500 line-clamp-1">{item.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Email / Password Form */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface-50 px-3 text-surface-500 font-medium">Or enter credentials</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="label label-required text-xs font-medium text-surface-700">
                Institutional Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@framerelite.edu"
                required
                autoComplete="email"
                disabled={loading || switchingRole !== null}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="label label-required mb-0 text-xs font-medium text-surface-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-primary-600 hover:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  disabled={loading || switchingRole !== null}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full btn-lg mt-2 justify-center"
              disabled={loading || switchingRole !== null}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-surface-500">
            Protected by Framer Elite Multi-Tenant RBAC & Supabase Row Level Security.
          </p>
        </div>
      </div>

      {/* Right: Modern Decorative Showcase */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-950 via-primary-900 to-surface-950 p-12 flex-col justify-between relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 right-10 w-80 h-80 rounded-full border border-primary-400/40 blur-sm" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full border border-primary-500/30 blur-md" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-primary-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Active Term 1 — Academic Session 2026/2027
          </div>
        </div>

        <div className="relative z-10 max-w-lg my-auto">
          <h2 className="font-display text-3xl font-bold tracking-tight mb-4 text-white">
            Comprehensive School Management for Modern Educational Institutions
          </h2>
          <p className="text-primary-200 text-sm leading-relaxed mb-8">
            Experience end-to-end administration: from double-blind results approval workflows and automated report cards to immutable inventory tracking, student 360 profiles, and real-time parent portals.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "Academic Oversight", desc: "Syllabus, timetables & grades" },
              { title: "Approval Workflow", desc: "Teacher submission to publication" },
              { title: "Inventory & Assets", desc: "Requisitions, receipts & audit" },
              { title: "Parent Portal", desc: "Live report cards & attendance" },
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                <p className="font-semibold text-white text-xs">{feature.title}</p>
                <p className="text-[11px] text-primary-200/80 mt-0.5">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-primary-300/80 border-t border-white/10 pt-4">
          <span>Framer Elite Ecosystem v2.4</span>
          <span>Encrypted PostgreSQL • Role-Level Security</span>
        </div>
      </div>
    </div>
  );
}
