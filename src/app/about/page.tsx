import Link from "next/link";
import {
  GraduationCap,
  Shield,
  Award,
  Users,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Heart,
  Target,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
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
            <Link href="/about" className="text-primary-600">About</Link>
            <Link href="/programs" className="hover:text-primary-600">Programs</Link>
            <Link href="/admissions" className="hover:text-primary-600">Admissions</Link>
            <Link href="/news" className="hover:text-primary-600">News</Link>
            <Link href="/contact" className="hover:text-primary-600">Contact</Link>
          </div>
          <Link href="/login" className="btn-primary btn-sm">
            Portal Access
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary-950 via-primary-900 to-surface-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="badge-primary text-xs uppercase tracking-widest mb-4 inline-block bg-white/10 text-primary-200 border-white/15">
            Our Heritage &amp; Mission
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Shaping Visionaries, Innovators &amp; Global Citizens
          </h1>
          <p className="text-primary-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Founded with an unwavering commitment to holistic academic excellence, character development, and technological empowerment.
          </p>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-surface-200 rounded-3xl p-8 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-surface-900 text-xl mb-3">
              Our Vision
            </h3>
            <p className="text-surface-600 text-sm leading-relaxed">
              To be the premier benchmark international institution in East Africa, cultivating ethical problem-solvers equipped to excel in world-class universities and global innovation hubs.
            </p>
          </div>

          <div className="bg-white border border-surface-200 rounded-3xl p-8 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-surface-900 text-xl mb-3">
              Core Values
            </h3>
            <p className="text-surface-600 text-sm leading-relaxed">
              Integrity, intellectual curiosity, resilience, empathetic leadership, and collaborative excellence guide every student and faculty member across our campus.
            </p>
          </div>

          <div className="bg-white border border-surface-200 rounded-3xl p-8 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-surface-900 text-xl mb-3">
              Accreditation
            </h3>
            <p className="text-surface-600 text-sm leading-relaxed">
              Accredited by the Ministry of Education and international testing boards (Cambridge Assessment International Education &amp; National Secondary Curriculum Examination Councils).
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-bold text-surface-900">
              Executive School Leadership
            </h2>
            <p className="text-surface-500 text-sm mt-2">
              Distinguished academic leaders and educational administrators dedicated to institutional governance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Arthur Pendelton",
                role: "Board Chairperson & Chancellor",
                bio: "PhD in Educational Governance from Cambridge. Over 28 years driving pedagogical excellence across Commonwealth secondary institutions.",
              },
              {
                name: "Mr. David Kamau, M.Ed",
                role: "Headteacher & Academic Dean",
                bio: "Master of Education in Curriculum Development. Spearheads the dual-track national curriculum and Cambridge science laboratory expansions.",
              },
              {
                name: "Mrs. Beatrice Vance",
                role: "Operations & School Administrator",
                bio: "Certified Educational Administrator overseeing campus logistics, student safety protocols, and parent community engagements.",
              },
            ].map((lead) => (
              <div key={lead.name} className="bg-white border border-surface-200 rounded-3xl p-6 text-center shadow-xs">
                <div className="w-20 h-20 rounded-full bg-primary-100 text-primary-800 font-display font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  {lead.name.split(" ")[1]?.[0] || lead.name[0]}
                </div>
                <h3 className="font-bold text-surface-900 text-base">{lead.name}</h3>
                <span className="text-xs text-primary-600 font-semibold block mt-0.5 mb-3">{lead.role}</span>
                <p className="text-xs text-surface-500 leading-relaxed">{lead.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
