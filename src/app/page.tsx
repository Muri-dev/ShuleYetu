import Link from "next/link";
import {
  GraduationCap,
  Users,
  BarChart3,
  Shield,
  BookOpen,
  Calendar,
  ChevronRight,
  Star,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ─── Navigation ──────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-surface-900 tracking-tight">
                  Framer Elite
                </span>
                <span className="hidden sm:block text-[10px] text-surface-500 -mt-1 font-medium uppercase tracking-wider">
                  Academy
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/about" className="text-sm font-medium text-surface-600 hover:text-primary-600 transition-colors">
                About
              </Link>
              <Link href="/programs" className="text-sm font-medium text-surface-600 hover:text-primary-600 transition-colors">
                Programs
              </Link>
              <Link href="/admissions" className="text-sm font-medium text-surface-600 hover:text-primary-600 transition-colors">
                Admissions
              </Link>
              <Link href="/news" className="text-sm font-medium text-surface-600 hover:text-primary-600 transition-colors">
                News
              </Link>
              <Link href="/contact" className="text-sm font-medium text-surface-600 hover:text-primary-600 transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-surface-700 hover:text-primary-600 transition-colors px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="btn-primary btn-sm"
              >
                Portal Access
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary-100/50 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-40 right-0 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-50/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Excellence in Education Since 2010
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-950 tracking-tight mb-6 animate-slide-up">
              Nurturing Future Leaders{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                Through Excellence
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-surface-600 leading-relaxed max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "100ms" }}>
              A premier educational institution committed to holistic development,
              academic excellence, and character building for the leaders of tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Link href="/admissions" className="btn-primary btn-lg w-full sm:w-auto">
                Apply for Admission
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="btn-secondary btn-lg w-full sm:w-auto">
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 animate-fade-in" style={{ animationDelay: "400ms" }}>
              {[
                { value: "1,200+", label: "Students" },
                { value: "85+", label: "Teachers" },
                { value: "98%", label: "Pass Rate" },
                { value: "15+", label: "Years" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-3xl font-bold text-surface-900">{stat.value}</p>
                  <p className="text-sm text-surface-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Section ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Why Choose Framer Elite?
            </h2>
            <p className="text-surface-600 text-lg max-w-2xl mx-auto">
              We combine academic rigor with character development to create
              well-rounded individuals ready for the future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Academic Excellence",
                description:
                  "Comprehensive CBC and 8-4-4 curriculum delivered by qualified educators using modern teaching methodologies.",
                color: "primary",
              },
              {
                icon: Users,
                title: "Holistic Development",
                description:
                  "Beyond academics, we nurture talents through sports, arts, clubs, and leadership programs.",
                color: "accent",
              },
              {
                icon: Shield,
                title: "Safe Environment",
                description:
                  "A secure, inclusive campus with modern facilities designed for optimal learning and growth.",
                color: "success",
              },
              {
                icon: BarChart3,
                title: "Digital Learning",
                description:
                  "State-of-the-art technology integration with our comprehensive school management platform.",
                color: "primary",
              },
              {
                icon: Calendar,
                title: "Co-Curricular Activities",
                description:
                  "A rich calendar of events, competitions, field trips, and community service opportunities.",
                color: "accent",
              },
              {
                icon: Star,
                title: "Proven Results",
                description:
                  "Consistently high performance in national examinations with graduates joining top universities.",
                color: "success",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-surface-100 hover:border-primary-200 transition-all duration-300 hover:shadow-lg"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                    feature.color === "primary"
                      ? "bg-primary-50 text-primary-600"
                      : feature.color === "accent"
                      ? "bg-accent-50 text-accent-600"
                      : "bg-success-50 text-success-600"
                  }`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-surface-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-surface-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Portal CTA Section ──────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full border border-white/20" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full border border-white/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
                Powerful School Management Portal
              </h2>
              <p className="text-primary-200 text-lg mb-8 leading-relaxed">
                Access everything you need — from academic records and results to
                attendance, inventory, and communication — all in one secure platform.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Real-time academic performance tracking",
                  "Secure result approval and publication workflow",
                  "Complete inventory and asset management",
                  "Parent portal with child progress monitoring",
                  "Staff management and communication tools",
                  "Comprehensive reporting and analytics",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-400 shrink-0" />
                    <span className="text-primary-100">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Access Portal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                {/* Mock dashboard preview */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-danger-500" />
                    <div className="w-3 h-3 rounded-full bg-accent-400" />
                    <div className="w-3 h-3 rounded-full bg-success-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-8 bg-white/10 rounded-lg w-3/4" />
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-20 bg-white/10 rounded-lg" />
                      <div className="h-20 bg-white/10 rounded-lg" />
                      <div className="h-20 bg-white/10 rounded-lg" />
                    </div>
                    <div className="h-32 bg-white/10 rounded-lg" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-24 bg-white/10 rounded-lg" />
                      <div className="h-24 bg-white/10 rounded-lg" />
                    </div>
                  </div>
                </div>
                {/* Floating accent elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent-400/20 rounded-xl rotate-12 backdrop-blur-sm border border-accent-400/30" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-400/20 rounded-lg -rotate-6 backdrop-blur-sm border border-primary-400/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────────────── */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              What Parents Say
            </h2>
            <p className="text-surface-600 text-lg">
              Hear from families who are part of the Framer Elite community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Grace Wanjiku",
                role: "Parent",
                text: "The school's digital platform has transformed how I track my children's progress. I can see results, attendance, and communicate with teachers seamlessly.",
              },
              {
                name: "David Ochieng",
                role: "Parent",
                text: "Framer Elite doesn't just educate — they build character. My son has grown both academically and as a leader since joining the school.",
              },
              {
                name: "Amina Hassan",
                role: "Parent",
                text: "The transparent result approval process and regular parent-teacher communication give me confidence that my daughter is getting the best education.",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white p-6 rounded-2xl border border-surface-100 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-surface-600 text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-semibold text-sm">
                      {testimonial.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-surface-900">{testimonial.name}</p>
                    <p className="text-xs text-surface-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact / CTA ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-3xl font-bold text-surface-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-surface-600 mb-8">
                Ready to give your child the best education? Contact us to learn
                more about admissions and our programs.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-surface-900 text-sm">Location</p>
                    <p className="text-surface-600 text-sm">Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-surface-900 text-sm">Phone</p>
                    <p className="text-surface-600 text-sm">+254 700 000 000</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-surface-900 text-sm">Email</p>
                    <p className="text-surface-600 text-sm">info@framerelite.ac.ke</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-50 rounded-2xl p-8">
              <h3 className="font-display text-xl font-semibold text-surface-900 mb-6">
                Send us a Message
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-fname" className="label">First Name</label>
                    <input id="contact-fname" type="text" className="input-field" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="contact-lname" className="label">Last Name</label>
                    <input id="contact-lname" type="text" className="input-field" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="label">Email</label>
                  <input id="contact-email" type="email" className="input-field" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="label">Message</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-surface-950 text-surface-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-lg text-white">
                  Framer Elite
                </span>
              </div>
              <p className="text-sm text-surface-400 leading-relaxed">
                Excellence in education, character in leadership. Building the
                future one student at a time.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {["About Us", "Programs", "Admissions", "News", "Contact"].map((link) => (
                  <li key={link}>
                    <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-surface-400 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Portal</h4>
              <ul className="space-y-2.5">
                {["Staff Login", "Parent Portal", "Student Results", "School Calendar"].map((link) => (
                  <li key={link}>
                    <Link href="/login" className="text-sm text-surface-400 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2.5">
                {["Privacy Policy", "Terms of Service", "Data Protection", "Cookie Policy"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-surface-400 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-surface-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-500">
              © {new Date().getFullYear()} Framer Elite Academy. All rights reserved.
            </p>
            <p className="text-xs text-surface-600">
              Compliant with Kenya Data Protection Act, 2019
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
