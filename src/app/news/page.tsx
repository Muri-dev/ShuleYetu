import Link from "next/link";
import { DEMO_ANNOUNCEMENTS } from "@/lib/demo-data";
import {
  GraduationCap,
  Calendar,
  Globe,
  ArrowRight,
  Sparkles,
  Trophy,
  BookOpen,
} from "lucide-react";

export default function NewsPage() {
  const publicNews = [
    {
      title: "Framer Elite Robotics Team Wins Regional STEM Olympiad Gold",
      date: "February 24, 2026",
      category: "Innovation & STEM",
      snippet: "Our Form 3 robotics engineering team engineered an automated solar water purification unit, securing 1st place in the East African High School Innovation Championship.",
    },
    {
      title: "Term 1 Mid-Term Break & Academic Progress Consultation Schedule",
      date: "February 20, 2026",
      category: "Academic Milestones",
      snippet: "Parents and guardians are cordially invited to attend the interactive Academic Progress Conference in the Main Auditorium on Thursday 5th March.",
    },
    {
      title: "New High-Performance Computing Laboratory Commissioned",
      date: "January 15, 2026",
      category: "Campus Infrastructure",
      snippet: "State-of-the-art facility equipped with 45 HP workstations, optical gigabit fiber, and AI development toolchains officially opened by the Board of Trustees.",
    },
    {
      title: "Annual Cambridge & National Examination Distinctions Recognized",
      date: "January 8, 2026",
      category: "Academic Honors",
      snippet: "Framer Elite candidates recorded a 96.4% mean grade transition rate to premier global universities across the UK, North America, and top African faculties.",
    },
  ];

  return (
    <div className="min-h-screen bg-surface-50 text-surface-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-surface-900">
              Framer Elite Academy
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-surface-600">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <Link href="/about" className="hover:text-primary-600">About</Link>
            <Link href="/programs" className="hover:text-primary-600">Programs</Link>
            <Link href="/admissions" className="hover:text-primary-600">Admissions</Link>
            <Link href="/news" className="text-primary-600">News</Link>
            <Link href="/contact" className="hover:text-primary-600">Contact</Link>
          </div>
          <Link href="/login" className="btn-primary btn-sm">
            Portal Access
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary-950 via-primary-900 to-surface-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="badge-primary text-xs uppercase tracking-widest mb-4 inline-block bg-white/10 text-primary-200 border-white/15">
            Campus Chronicles
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            School News, Events &amp; Bulletins
          </h1>
          <p className="text-primary-200 text-base max-w-2xl mx-auto leading-relaxed">
            Stay up to date with recent student achievements, faculty research announcements, and key institutional milestones.
          </p>
        </div>
      </section>

      {/* News Stream */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {publicNews.map((article) => (
          <article
            key={article.title}
            className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-xs hover:border-primary-300 transition-all"
          >
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="badge-primary font-semibold">{article.category}</span>
              <span className="text-surface-400 font-mono">{article.date}</span>
            </div>
            <h2 className="font-display font-bold text-surface-900 text-xl mb-2 hover:text-primary-700 transition-colors">
              {article.title}
            </h2>
            <p className="text-surface-600 text-sm leading-relaxed mb-4">
              {article.snippet}
            </p>
            <div className="flex items-center text-xs font-semibold text-primary-600 hover:text-primary-700">
              Read Full Bulletin &rarr;
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
