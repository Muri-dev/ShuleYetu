"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  ArrowLeft,
  GraduationCap,
  HeartPulse,
  Users,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function StudentAdmissionPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    admissionNumber: "FE-2026-018",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "2011-04-15",
    gender: "male",
    nationality: "Kenyan",
    religion: "Christian",
    className: "cls-f1",
    streamName: "str-f1-east",
    previousSchool: "",
    medicalInfo: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    relationship: "Parent",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      toast.success(`Student ${form.firstName} ${form.lastName} admitted successfully!`);
      router.push("/portal/students");
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          href="/portal/students"
          className="text-xs text-surface-500 hover:text-surface-700 inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Student Registry
        </Link>
      </div>

      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 pb-6 border-b border-surface-100 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-surface-900">
              New Student Admission Onboarding
            </h1>
            <p className="text-xs text-surface-500">
              Register a new student, assign class stream, and record legal guardian emergency particulars.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Academic & Demographic Identifiers */}
          <div>
            <h2 className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-primary-600" />
              1. Student Identity &amp; Placement
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="label label-required text-xs">Admission Number</label>
                <input
                  type="text"
                  required
                  value={form.admissionNumber}
                  onChange={(e) => setForm({ ...form, admissionNumber: e.target.value })}
                  className="input-field text-xs font-mono"
                />
              </div>

              <div>
                <label className="label label-required text-xs">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brian"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="label text-xs">Middle Name</label>
                <input
                  type="text"
                  placeholder="e.g. Kipchoge"
                  value={form.middleName}
                  onChange={(e) => setForm({ ...form, middleName: e.target.value })}
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="label label-required text-xs">Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Langat"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="label label-required text-xs">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="label label-required text-xs">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="input-field text-xs py-2"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="label label-required text-xs">Class Level</label>
                <select
                  value={form.className}
                  onChange={(e) => setForm({ ...form, className: e.target.value })}
                  className="input-field text-xs py-2"
                >
                  <option value="cls-f1">Form 1 (Grade 9)</option>
                  <option value="cls-f2">Form 2 (Grade 10)</option>
                  <option value="cls-f3">Form 3 (Grade 11)</option>
                  <option value="cls-f4">Form 4 (Grade 12)</option>
                </select>
              </div>

              <div>
                <label className="label label-required text-xs">Allocated Stream</label>
                <select
                  value={form.streamName}
                  onChange={(e) => setForm({ ...form, streamName: e.target.value })}
                  className="input-field text-xs py-2"
                >
                  <option value="str-f1-east">East Stream (Capacity 35)</option>
                  <option value="str-f1-west">West Stream (Capacity 35)</option>
                </select>
              </div>

              <div>
                <label className="label text-xs">Previous School</label>
                <input
                  type="text"
                  placeholder="e.g. Hillcrest Preparatory"
                  value={form.previousSchool}
                  onChange={(e) => setForm({ ...form, previousSchool: e.target.value })}
                  className="input-field text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Health & Special Needs */}
          <div className="pt-4 border-t border-surface-100">
            <h2 className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-600" />
              2. Medical Notes &amp; Special Considerations
            </h2>
            <div>
              <label className="label text-xs">Allergies, Chronic Conditions, or Dietary Alerts</label>
              <textarea
                rows={2}
                placeholder="e.g. Asthmatic (inhaler kept with school nurse), severe peanut allergy..."
                value={form.medicalInfo}
                onChange={(e) => setForm({ ...form, medicalInfo: e.target.value })}
                className="input-field text-xs"
              />
            </div>
          </div>

          {/* Section 3: Guardian Details */}
          <div className="pt-4 border-t border-surface-100">
            <h2 className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" />
              3. Parent / Legal Guardian Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label label-required text-xs">Guardian Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Langat"
                  value={form.guardianName}
                  onChange={(e) => setForm({ ...form, guardianName: e.target.value })}
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="label label-required text-xs">Emergency Contact Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="+254 700 000 000"
                  value={form.guardianPhone}
                  onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })}
                  className="input-field text-xs font-mono"
                />
              </div>

              <div>
                <label className="label text-xs">Email Address</label>
                <input
                  type="email"
                  placeholder="guardian@example.com"
                  value={form.guardianEmail}
                  onChange={(e) => setForm({ ...form, guardianEmail: e.target.value })}
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="label label-required text-xs">Relationship</label>
                <select
                  value={form.relationship}
                  onChange={(e) => setForm({ ...form, relationship: e.target.value })}
                  className="input-field text-xs py-2"
                >
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Legal Guardian">Legal Guardian</option>
                  <option value="Sponsor">Sponsor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-surface-100 flex items-center justify-end gap-3">
            <Link href="/portal/students" className="btn-secondary text-xs">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary text-xs inline-flex items-center gap-1.5 px-6"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Registering Student...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Complete Admission
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
