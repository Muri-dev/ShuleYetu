import Link from "next/link";
import {
  BookOpen,
  School,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function AcademicsOverviewPage() {
  const cards = [
    {
      title: "Classes & Streams",
      desc: "Manage grade levels (Form 1 to 4), student capacities, and assigned class tutors.",
      href: "/portal/academics/classes",
      icon: School,
      count: "4 Grades • 8 Streams",
    },
    {
      title: "Subject Catalog",
      desc: "Curriculum specifications, elective tracks, course codes, and departmental distribution.",
      href: "/portal/academics/subjects",
      icon: BookOpen,
      count: "8 Core & Elective Disciplines",
    },
    {
      title: "Weekly Timetables",
      desc: "Interactive schedule grid, room assignments, and teacher lecture periods.",
      href: "/portal/academics/timetable",
      icon: Calendar,
      count: "40 Weekly Lecture Slots",
    },
    {
      title: "Academic Years & Terms",
      desc: "Configure term dates (Advent, Trinity, Michaelmas), holidays, and current active term.",
      href: "/portal/academics/years",
      icon: Clock,
      count: "Session 2026/2027 Active",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900">
          Academics &amp; Curriculum Governance
        </h1>
        <p className="text-surface-500 text-sm mt-0.5">
          Configure class structures, syllabus offerings, timetable scheduling, and academic sessions.
        </p>
      </div>

      {/* Grid of Academic Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs hover:border-primary-400 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="badge-neutral text-[11px] font-medium">{card.count}</span>
                </div>
                <h2 className="font-display font-bold text-surface-900 text-base mb-1.5 group-hover:text-primary-700 transition-colors">
                  {card.title}
                </h2>
                <p className="text-xs text-surface-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-100 flex items-center justify-between text-xs font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Manage Component</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
