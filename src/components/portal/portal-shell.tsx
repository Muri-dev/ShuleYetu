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
  children?: SidebarItem[];
}

interface SidebarGroup {
  category: string;
  items: SidebarItem[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    category: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/portal",
        icon: LayoutDashboard,
      },
      {
        label: "My Children & Fees",
        href: "/portal/children",
        icon: Users,
        roles: ["parent"],
      },
    ],
  },
  {
    category: "Academic Core",
    items: [
      {
        label: "Academics",
        href: "/portal/academics",
        icon: BookOpen,
        roles: ["super_admin", "school_admin", "headteacher", "teacher"],
        children: [
          { label: "Classes", href: "/portal/academics/classes", icon: School, roles: ["super_admin", "school_admin", "headteacher", "teacher"] },
          { label: "Subjects", href: "/portal/academics/subjects", icon: BookOpen, roles: ["super_admin", "school_admin", "headteacher", "teacher"] },
          { label: "Master Timetable", href: "/portal/academics/timetable", icon: Calendar, roles: ["super_admin", "school_admin", "headteacher", "teacher"] },
          { label: "Academic Years", href: "/portal/academics/years", icon: Calendar, roles: ["super_admin", "school_admin", "headteacher"] },
        ],
      },
      {
        label: "Assessments",
        href: "/portal/assessments",
        icon: ClipboardCheck,
        roles: ["super_admin", "school_admin", "headteacher", "teacher"],
        children: [
          { label: "Marks Entry", href: "/portal/assessments/marks", icon: ClipboardCheck, roles: ["super_admin", "school_admin", "headteacher", "teacher"] },
          { label: "Results Approvals", href: "/portal/assessments/results", icon: FileText, roles: ["super_admin", "school_admin", "headteacher", "teacher"] },
          { label: "Report Cards", href: "/portal/assessments/reports", icon: FileText, roles: ["super_admin", "school_admin", "headteacher"] },
        ],
      },
      {
        label: "Daily Attendance",
        href: "/portal/attendance",
        icon: UserCheck,
        roles: ["super_admin", "school_admin", "headteacher", "teacher"],
      },
    ],
  },
  {
    category: "Students & Staff",
    items: [
      {
        label: "Student Directory",
        href: "/portal/students",
        icon: Users,
        roles: ["super_admin", "school_admin", "headteacher", "teacher", "accountant"],
        children: [
          { label: "All Students", href: "/portal/students", icon: Users, roles: ["super_admin", "school_admin", "headteacher", "teacher", "accountant"] },
          { label: "New Admissions", href: "/portal/students/admissions", icon: UserCheck, roles: ["super_admin", "school_admin"] },
          { label: "Enrollments", href: "/portal/students/enrollments", icon: ClipboardList, roles: ["super_admin", "school_admin", "headteacher"] },
        ],
      },
      {
        label: "Teaching Staff",
        href: "/portal/staff",
        icon: UserCircle,
        roles: ["super_admin", "school_admin", "headteacher"],
      },
    ],
  },
  {
    category: "Warehouse & Logistics",
    items: [
      {
        label: "Inventory Logistics",
        href: "/portal/inventory",
        icon: Package,
        roles: ["super_admin", "school_admin", "inventory_officer", "accountant", "teacher", "non_teaching_staff"],
        children: [
          { label: "Catalog Items", href: "/portal/inventory/items", icon: Package, roles: ["super_admin", "school_admin", "inventory_officer", "accountant"] },
          { label: "Requisitions Queue", href: "/portal/inventory/requisitions", icon: ClipboardList, roles: ["super_admin", "school_admin", "inventory_officer", "accountant", "teacher", "non_teaching_staff"] },
          { label: "Stock Movements", href: "/portal/inventory/movements", icon: BarChart3, roles: ["super_admin", "school_admin", "inventory_officer", "accountant"] },
          { label: "Capital Assets", href: "/portal/inventory/assets", icon: Shield, roles: ["super_admin", "school_admin", "inventory_officer", "accountant"] },
        ],
      },
    ],
  },
  {
    category: "Intelligence & Settings",
    items: [
      {
        label: "Bulletins & Circulars",
        href: "/portal/communication",
        icon: MessageSquare,
        children: [
          { label: "Announcements", href: "/portal/communication/announcements", icon: Bell },
          { label: "School Calendar", href: "/portal/communication/events", icon: Calendar },
        ],
      },
      {
        label: "Executive Reports",
        href: "/portal/reports",
        icon: BarChart3,
        roles: ["super_admin", "school_admin", "headteacher", "accountant", "inventory_officer"],
      },
      {
        label: "System Settings",
        href: "/portal/settings",
        icon: Settings,
        roles: ["super_admin", "school_admin"],
      },
    ],
  },
];

export function PortalShell({ user, children }: PortalShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Academics", "Student Directory", "Inventory Logistics"]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const userRoles = user.roles as UserWithRoles["roles"][number][];

  // Filter groups according to user role permissions
  const filteredGroups = sidebarGroups
    .map((group) => {
      const visibleItems = group.items
        .filter((item: SidebarItem) => !item.roles || item.roles.some((r: string) => userRoles.includes(r as UserWithRoles["roles"][number])))
        .map((item: SidebarItem) => ({
          ...item,
          children: item.children?.filter(
            (child: SidebarItem) => !child.roles || child.roles.some((r: string) => userRoles.includes(r as UserWithRoles["roles"][number]))
          ),
        }));

      return {
        ...group,
        items: visibleItems,
      };
    })
    .filter((group) => group.items.length > 0);

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

  // Derive human-readable breadcrumb segments from pathname
  const pathParts = pathname.split("/").filter(Boolean);
  const breadcrumbItems = pathParts.map((part, index) => {
    const url = "/" + pathParts.slice(0, index + 1).join("/");
    let label = part.charAt(0).toUpperCase() + part.slice(1);
    if (part === "portal") label = "Portal";
    if (part === "children") label = "My Children";
    if (part === "marks") label = "Marks Entry";
    if (part === "requisitions") label = "Requisitions";
    if (part === "movements") label = "Stock Movements";
    if (part === "timetable") label = "Timetable";
    if (part === "reports") label = "Reports";
    return { label, url };
  });

  return (
    <div className="min-h-screen flex bg-surface-50 text-surface-900 selection:bg-primary-500 selection:text-white">
      {/* ─── Mobile Overlay (Rule 6: Easy Reversal) ─────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Modern Refined Sidebar (Rule 1 & Rule 8) ──────────────── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[276px] bg-white border-r border-surface-200/90 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto shadow-sm",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand & Crest Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-surface-100 shrink-0 bg-white">
          <Link href="/portal" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-base tracking-tight text-surface-950 block leading-tight">
                Framer Elite
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-primary-700 uppercase block">
                Academy ERP &bull; 2026
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-xl hover:bg-surface-100 text-surface-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Persona Quick Badge */}
        <div className="px-4 py-2.5 bg-surface-50/80 border-b border-surface-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-medium text-surface-600">Active Persona:</span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-100 text-primary-800 border border-primary-200/80">
            {ROLE_LABELS[primaryRole] || primaryRole}
          </span>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-3.5 scrollbar-thin">
          {filteredGroups.map((group) => (
            <div key={group.category} className="space-y-0.5">
              <div className="nav-category-header">
                {group.category}
              </div>

              {group.items.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.label)}
                        className={cn(
                          "nav-item w-full justify-between group",
                          isActive(item.href) && "text-primary-800 font-semibold bg-primary-50/50"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <item.icon className="w-4 h-4 text-surface-500 group-hover:text-primary-600 transition-colors shrink-0" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 text-surface-400 transition-transform duration-200",
                            expandedItems.includes(item.label) && "rotate-180"
                          )}
                        />
                      </button>

                      {expandedItems.includes(item.label) && (
                        <div className="ml-6 pl-2 my-1 border-l-2 border-surface-200 space-y-0.5 animate-fade-in">
                          {item.children?.map((child: SidebarItem) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "nav-item text-xs py-1.5 px-2.5",
                                isActive(child.href) && "nav-item-active"
                              )}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <child.icon className="w-3.5 h-3.5 shrink-0" />
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
                        "nav-item group",
                        isActive(item.href) && "nav-item-active"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="w-4 h-4 text-surface-500 group-hover:text-primary-600 transition-colors shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* User Account & Profile Footer */}
        <div className="p-3 border-t border-surface-200/90 shrink-0 bg-white">
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-surface-50 border border-transparent hover:border-surface-200 transition-all text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {getInitials(user.first_name, user.last_name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-surface-900 truncate leading-tight">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-[11px] text-surface-500 truncate">
                  {user.email}
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-surface-400 transition-transform shrink-0",
                  profileOpen && "rotate-180"
                )}
              />
            </button>

            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setProfileOpen(false)}
                />
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl border border-surface-200 shadow-xl p-1.5 z-40 animate-scale-in">
                  <div className="px-3 py-2 border-b border-surface-100">
                    <span className="block text-xs font-bold text-surface-900">
                      {user.first_name} {user.last_name}
                    </span>
                    <span className="block text-[11px] text-primary-700 font-semibold">
                      {ROLE_LABELS[primaryRole]}
                    </span>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/portal/profile"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-surface-700 hover:bg-surface-50 rounded-lg transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      <UserCircle className="w-4 h-4 text-surface-400" />
                      My Account &amp; Security
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-surface-700 hover:bg-surface-50 rounded-lg transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Home className="w-4 h-4 text-surface-400" />
                      Public Academy Website
                    </Link>
                  </div>

                  <hr className="my-1 border-surface-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out of Session
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* ─── Main Content Canvas ───────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Modern Elevated Topbar with Breadcrumbs & Fast Search */}
        <header className="h-16 bg-white/95 backdrop-blur-md border-b border-surface-200/90 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 sticky top-0 z-30 shadow-2xs">
          {/* Left: Mobile trigger & Live Breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-surface-100 text-surface-600 border border-surface-200"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Trail (Rule 8: Reduce Short-Term Memory Load) */}
            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs">
              {breadcrumbItems.map((item, idx) => {
                const isLast = idx === breadcrumbItems.length - 1;
                return (
                  <div key={item.url} className="flex items-center gap-1.5">
                    {idx > 0 && <span className="text-surface-300">/</span>}
                    {isLast ? (
                      <span className="font-bold text-surface-900 bg-surface-100/70 px-2.5 py-1 rounded-md">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.url}
                        className="text-surface-500 hover:text-primary-700 transition-colors font-medium"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right: Persona Switcher, Quick Search hint, and Notifications */}
          <div className="flex items-center gap-3">
            {/* Quick Search Trigger (Rule 1 & Rule 7) */}
            <div className="hidden md:flex items-center gap-2 bg-surface-50 border border-surface-200 px-3 py-1.5 rounded-xl text-xs text-surface-500 hover:border-primary-300 transition-colors cursor-pointer">
              <span>Quick Search...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-200 text-[10px] font-mono font-semibold text-surface-600">
                ⌘K
              </kbd>
            </div>

            {/* Persona Switcher in Topbar with High-Contrast Light Variant */}
            <RoleSwitcher currentRole={primaryRole} variant="light" />

            {/* Notification Bell */}
            <Link
              href="/portal/notifications"
              className="relative p-2 rounded-xl hover:bg-surface-100 text-surface-600 border border-surface-200 hover:border-surface-300 transition-colors"
              title="System Bulletins & Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </Link>
          </div>
        </header>

        {/* Page Content Container with Optimal Spacing and Background */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
