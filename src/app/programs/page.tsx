import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Atom,
  Binary,
  Globe2,
  Palette,
  Trophy,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function ProgramsPage() {
  const programs = [
    {
      title: "Pure & Applied STEM Track",
      icon: Atom,
      badge: "Science & Engineering",
      desc: "Rigorous coursework in Pure Mathematics, Physics, Chemistry, and Biology accompanied by hands-on university-grade laboratory practica.",
      features: ["Advanced Robotics & AI Club", "Double-blind Experimental Labs", "Regional Olympiad Preparation"],
    },
    {
      title: "Computer Science & Robotics",
      icon: Binary,
      badge: "Technology & Software",
      desc: "Instruction in Python, Web Systems, Algorithm Design, Cybersecurity fundamentals, and automated robotics prototyping.",
      features: ["Full Laptop Workstations", "Software Development Hackathons", "Cloud Computing Labs"],
    },
    {
      title: "Humanities & Global Governance",
      icon: Globe2,
      badge: "Social Sciences",
      desc: "Comprehensive inquiry into World History, Economics, Literature, and Geopolitics cultivating eloquent communication and persuasive writing.",
      features: ["Model United Nations (MUN)", "Debate & Mock Trial Society", "Economic Research Papers"],
    },
    {
      title: "Visual Arts & Conservatory Music",
      icon: Palette,
      badge: "Creative Arts",
      desc: "Orchestral composition, digital media production, fine arts painting, and theatrical productions in our dedicated performing arts wing.",
      features: ["Conservatory Piano Studio", "Annual Fine Arts Exhibition", "Chamber Orchestra"],
    },
    {
      title: "Championship Varsity Athletics",
      icon: Trophy,
      badge: "Sports & Fitness",
      desc: "Premier sports programs including competitive football, rugby, basketball, swimming, and track-and-field coached by accredited athletic trainers.",
      features: ["Olympic-size Swimming Facility", "FIFA Quality Pro Football Pitch", "Strength & Conditioning Pavilion"],
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
            <Link href="/programs" className="text-primary-600">Programs</Link>
            <Link href="/admissions" className="hover:text-primary-600">Admissions</Link>
            <Link href="/news" className="hover:text-primary-600">News</Link>
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
            Curriculum Pathways
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            World-Class Academic &amp; Co-Curricular Programs
          </h1>
          <p className="text-primary-200 text-base max-w-2xl mx-auto leading-relaxed">
            Tailored learning pathways that empower students to discover their passions, hone critical analytical faculties, and prepare for top universities worldwide.
          </p>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.title}
                className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs hover:border-primary-400 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="badge-primary text-[11px]">{prog.badge}</span>
                  </div>

                  <h3 className="font-display font-bold text-surface-900 text-lg mb-2">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-surface-600 leading-relaxed mb-4">
                    {prog.desc}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-surface-100">
                    {prog.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-surface-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-100">
                  <Link
                    href="/admissions"
                    className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                  >
                    Enroll in Pathway &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
