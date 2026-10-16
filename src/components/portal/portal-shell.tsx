"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { UserWithRoles, ROLE_LABELS } from "@/lib/types";
import { getInitials, cn } from "@/lib/utils";
import { toast } from "sonner";
import { RoleSwitcher } from "./role-switcher";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardCheck,
  Calendar,
  Package,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  UserCircle,
  BarChart3,
  FileText,
  MessageSquare,
  Shield,
  School,
  ClipboardList,
  UserCheck,
  Home,
} from "lucide-react";

interface PortalShellProps {
  user: UserWithRoles;
  children: React.ReactNode;
}

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
  children?: Omit<SidebarItem, "children">[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/portal",
    icon: LayoutDashboard,
  },
  {
    label: "Academics",
    href: "/portal/academics",
    icon: BookOpen,
    roles: ["super_admin", "school_admin", "headteacher", "teacher"],
    children: [
      { label: "Classes", href: "/portal/academics/classes", icon: School },
      { label: "Subjects", href: "/portal/academics/subjects", icon: BookOpen },
      { label: "Timetable", href: "/portal/academics/timetable", icon: Calendar },
      { label: "Academic Years", href: "/portal/academics/years", icon: Calendar },
    ],
  },
  {
    label: "Students",
    href: "/portal/students",
    icon: Users,
    roles: ["super_admin", "school_admin", "headteacher", "teacher"],
    children: [
      { label: "All Students", href: "/portal/students", icon: Users },
      { label: "Admissions", href: "/portal/students/admissions", icon: UserCheck },
      { label: "Enrollments", href: "/portal/students/enrollments", icon: ClipboardList },
    ],
  },
  {
    label: "Assessments",
    href: "/portal/assessments",
    icon: ClipboardCheck,
    roles: ["super_admin", "school_admin", "headteacher", "teacher"],
    children: [
      { label: "Marks Entry", href: "/portal/assessments/marks", icon: ClipboardCheck },
      { label: "Results", href: "/portal/assessments/results", icon: FileText },
      { label: "Report Cards", href: "/portal/assessments/reports", icon: FileText },
    ],
  },
  {
    label: "Attendance",
    href: "/portal/attendance",
    icon: UserCheck,
    roles: ["super_admin", "school_admin", "headteacher", "teacher"],
  },
  {
    label: "My Children",
    href: "/portal/children",
    icon: Users,
    roles: ["parent"],
  },
  {
    label: "Inventory",
    href: "/portal/inventory",
    icon: Package,
    roles: ["super_admin", "school_admin", "inventory_officer", "accountant"],
    children: [
      { label: "Stock Items", href: "/portal/inventory/items", icon: Package },
      { label: "Requisitions", href: "/portal/inventory/requisitions", icon: ClipboardList },
      { label: "Stock Movements", href: "/portal/inventory/movements", icon: BarChart3 },
      { label: "Assets", href: "/portal/inventory/assets", icon: Shield },
    ],
  },
  {
    label: "Staff",
    href: "/portal/staff",
    icon: UserCircle,
    roles: ["super_admin", "school_admin", "headteacher"],
  },
  {
    label: "Communication",
    href: "/portal/communication",
    icon: MessageSquare,
    children: [
      { label: "Announcements", href: "/portal/communication/announcements", icon: Bell },
      { label: "Events", href: "/portal/communication/events", icon: Calendar },
    ],
  },
  {
    label: "Reports",
    href: "/portal/reports",
    icon: BarChart3,
    roles: ["super_admin", "school_admin", "headteacher", "accountant"],
  },
  {
    label: "Settings",
    href: "/portal/settings",
    icon: Settings,
    roles: ["super_admin", "school_admin"],
  },
];

export function PortalShell({ user, children }: PortalShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [profileOpen, setProfileOpen] = useState(false);

  const filteredItems = sidebarItems.filter(
    (item) => !item.roles || item.roles.some((role) => user.roles.includes(role as UserWithRoles["roles"][number]))
  );

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore
    }
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    toast.success("Signed out successfully");
    router.push("/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/portal") return pathname === "/portal";
    return pathname.startsWith(href);
  };

  const primaryRole = user.roles[0];

  return (
    <div className="min-h-screen flex bg-surface-50">
      {/* ─── Mobile Overlay ─────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ────────────────────────────────────────────── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] bg-white border-r border-surface-100 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-surface-100 shrink-0">
          <Link href="/portal" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
              <GraduationCap className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-display font-bold text-base text-surface-900">
              Framer Elite
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-surface-100 text-surface-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {filteredItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={cn(
                      "nav-item w-full justify-between",
                      isActive(item.href) && "text-primary-700"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-[18px] h-[18px] shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        expandedItems.includes(item.label) && "rotate-180"
                      )}
                    />
                  </button>
                  {expandedItems.includes(item.label) && (
                    <div className="ml-8 mt-0.5 space-y-0.5 animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "nav-item text-[13px] py-2",
                            isActive(child.href) && "nav-item-active"
                          )}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <child.icon className="w-4 h-4 shrink-0" />
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "nav-item",
                    isActive(item.href) && "nav-item-active"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-[18px] h-[18px] shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-surface-100 shrink-0">
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                <span className="text-primary-700 font-semibold text-sm">
                  {getInitials(user.first_name, user.last_name)}
                </span>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-surface-900 truncate">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-xs text-surface-500 truncate">
                  {ROLE_LABELS[primaryRole] || primaryRole}
                </p>
              </div>
              <ChevronDown className={cn("w-4 h-4 text-surface-400 transition-transform", profileOpen && "rotate-180")} />
            </button>

            {profileOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-xl border border-surface-100 shadow-lg p-1.5 animate-scale-in">
                <Link
                  href="/portal/profile"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-surface-600 hover:bg-surface-50 rounded-lg transition-colors"
                  onClick={() => setProfileOpen(false)}
                >
                  <UserCircle className="w-4 h-4" />
                  My Profile
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-surface-600 hover:bg-surface-50 rounded-lg transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Public Website
                </Link>
                <hr className="my-1 border-surface-100" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ─── Main Content ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-surface-100 flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-100 text-surface-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-sm font-medium text-surface-900">
                Welcome, {user.first_name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RoleSwitcher currentRole={primaryRole} />
            <Link
              href="/portal/notifications"
              className="relative p-2 rounded-lg hover:bg-surface-100 text-surface-600 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
