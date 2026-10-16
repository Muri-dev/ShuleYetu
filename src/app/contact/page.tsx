"use client";

import { useState } from "react";
import Link from "next/link";
import { DEMO_SCHOOL } from "@/lib/demo-data";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [msg, setMsg] = useState({ name: "", email: "", subject: "", body: "" });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message received! Our administrative secretariat will reply shortly.");
    setMsg({ name: "", email: "", subject: "", body: "" });
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
            <Link href="/admissions" className="hover:text-primary-600">Admissions</Link>
            <Link href="/news" className="hover:text-primary-600">News</Link>
            <Link href="/contact" className="text-primary-600">Contact</Link>
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
            Get in Touch
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Connect with Our Campus Secretariat
          </h1>
          <p className="text-primary-200 text-base max-w-2xl mx-auto leading-relaxed">
            Have questions regarding admissions, curriculum, institutional partnerships, or student records? We are here to assist.
          </p>
        </div>
      </section>

      {/* Details & Form */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="font-display font-bold text-xl text-surface-900">
                Campus Location &amp; Hours
              </h2>

              <div className="space-y-4 text-xs text-surface-600">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-surface-900 text-sm mb-0.5">Main Campus</strong>
                    <span>{DEMO_SCHOOL.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-surface-900 text-sm mb-0.5">Telephone</strong>
                    <span className="font-mono">{DEMO_SCHOOL.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-surface-900 text-sm mb-0.5">Direct Inquiry Email</strong>
                    <span className="font-mono">{DEMO_SCHOOL.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-surface-900 text-sm mb-0.5">Office Hours</strong>
                    <span>Monday &ndash; Friday: 08:00 AM &ndash; 05:00 PM</span>
                    <span className="block text-surface-400">Saturday: 09:00 AM &ndash; 01:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-display font-bold text-xl text-surface-900 mb-1">
              Send an Official Inquiry
            </h3>
            <p className="text-xs text-surface-500 mb-6">
              Messages are routed directly to the appropriate school administrator.
            </p>

            <form onSubmit={handleSend} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label label-required">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grace Wambui"
                    value={msg.name}
                    onChange={(e) => setMsg({ ...msg, name: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label label-required">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="grace@example.com"
                    value={msg.email}
                    onChange={(e) => setMsg({ ...msg, email: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="label label-required">Subject Inquiry</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Form 1 Mid-Term Admission Inquiry"
                  value={msg.subject}
                  onChange={(e) => setMsg({ ...msg, subject: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label label-required">Message Particulars</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Please state your inquiry with any relevant student details..."
                  value={msg.body}
                  onChange={(e) => setMsg({ ...msg, body: e.target.value })}
                  className="input-field"
                />
              </div>

              <button type="submit" className="btn-primary w-full btn-lg justify-center">
                <Send className="w-4 h-4 mr-1.5" />
                Dispatch Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
