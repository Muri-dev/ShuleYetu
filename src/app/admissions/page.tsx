"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  CheckCircle2,
  Calendar,
  FileText,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Send,
} from "lucide-react";
import { toast } from "sonner";

export default function AdmissionsPage() {
  const [inquiry, setInquiry] = useState({
    parentName: "",
    phone: "",
    email: "",
    studentName: "",
    gradeLevel: "Form 1 (Grade 9)",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Our Admissions Office will contact you within 24 business hours.");
    setInquiry({ parentName: "", phone: "", email: "", studentName: "", gradeLevel: "Form 1 (Grade 9)", notes: "" });
  };

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
            <Link href="/admissions" className="text-primary-600">Admissions</Link>
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
            Join Our Community
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Admissions for Academic Session 2026/2027
          </h1>
          <p className="text-primary-200 text-base max-w-2xl mx-auto leading-relaxed">
            We welcome motivated students of high character and academic ambition. Discover our transparent admission stages and criteria.
          </p>
        </div>
      </section>

      {/* Admissions Steps & Inquiry Form */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Steps */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display font-bold text-2xl text-surface-900 mb-6">
              Application &amp; Enrollment Journey
            </h2>

            {[
              {
                step: "01",
                title: "Online Inquiry & Application",
                desc: "Complete the preliminary enrollment inquiry form or submit student past academic transcripts.",
              },
              {
                step: "02",
                title: "Academic Aptitude Assessment",
                desc: "Prospective learners participate in a standard mathematical and language evaluation.",
              },
              {
                step: "03",
                title: "Family Consultative Interview",
                desc: "Meeting with the Headteacher and Department Heads to discuss educational aspirations.",
              },
              {
                step: "04",
                title: "Formal Offer & Stream Induction",
                desc: "Official letter of admission issued alongside parent portal credentials and orientation package.",
              },
            ].map((s) => (
              <div key={s.step} className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-800 font-display font-bold text-lg flex items-center justify-center shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-bold text-surface-900 text-base">{s.title}</h3>
                  <p className="text-xs text-surface-500 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-5 bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-display font-bold text-lg text-surface-900 mb-1">
              Admissions Inquiry Form
            </h3>
            <p className="text-xs text-surface-500 mb-6">
              Submit your inquiry to schedule a campus tour or reserve an examination slot.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="label label-required">Parent / Guardian Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Catherine Mutua"
                  value={inquiry.parentName}
                  onChange={(e) => setInquiry({ ...inquiry, parentName: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label label-required">Contact Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+254 700 000 000"
                  value={inquiry.phone}
                  onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                  className="input-field font-mono"
                />
              </div>

              <div>
                <label className="label label-required">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="parent@example.com"
                  value={inquiry.email}
                  onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label label-required">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Mutua"
                  value={inquiry.studentName}
                  onChange={(e) => setInquiry({ ...inquiry, studentName: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label label-required">Prospective Grade / Class</label>
                <select
                  value={inquiry.gradeLevel}
                  onChange={(e) => setInquiry({ ...inquiry, gradeLevel: e.target.value })}
                  className="input-field py-2"
                >
                  <option value="Form 1 (Grade 9)">Form 1 (Grade 9) &bull; Freshmen</option>
                  <option value="Form 2 (Grade 10)">Form 2 (Grade 10) &bull; Transfer</option>
                  <option value="Form 3 (Grade 11)">Form 3 (Grade 11) &bull; Senior High</option>
                </select>
              </div>

              <div>
                <label className="label">Special Interests or Questions</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your student's co-curricular interests or medical considerations..."
                  value={inquiry.notes}
                  onChange={(e) => setInquiry({ ...inquiry, notes: e.target.value })}
                  className="input-field"
                />
              </div>

              <button type="submit" className="btn-primary w-full btn-lg justify-center mt-2">
                <Send className="w-4 h-4 mr-1.5" />
                Submit Admissions Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
