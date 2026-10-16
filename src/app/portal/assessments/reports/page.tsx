"use client";

import { useState } from "react";
import Link from "next/link";
import { DEMO_STUDENTS, DEMO_SCHOOL, DEMO_TERMS } from "@/lib/demo-data";
import {
  Printer,
  Download,
  GraduationCap,
  ArrowLeft,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  Search,
} from "lucide-react";

interface SubjectScore {
  name: string;
  code: string;
  catScore: number;
  midtermScore: number;
  endtermScore: number;
  totalScore: number;
  grade: string;
  rank: string;
  teacher: string;
  remarks: string;
}

const sampleSubjects: SubjectScore[] = [
  { name: "Pure Mathematics", code: "MAT101", catScore: 28, midtermScore: 46, endtermScore: 92, totalScore: 91, grade: "A", rank: "2nd", teacher: "Ms. Sarah Jenkins", remarks: "Mastery in advanced calculus & vectors" },
  { name: "Physics & Mechanics", code: "PHY101", catScore: 26, midtermScore: 43, endtermScore: 88, totalScore: 87, grade: "A", rank: "3rd", teacher: "Ms. Sarah Jenkins", remarks: "Superb lab experimentation and theory" },
  { name: "Chemistry & Lab Science", code: "CHE101", catScore: 25, midtermScore: 41, endtermScore: 84, totalScore: 84, grade: "A-", rank: "5th", teacher: "Dr. Joseph Ndwiga", remarks: "Great analytical and quantitative skill" },
  { name: "English & Literature", code: "ENG101", catScore: 24, midtermScore: 40, endtermScore: 82, totalScore: 82, grade: "A-", rank: "4th", teacher: "Mr. Patrick Oloo", remarks: "Eloquence in critical essay analysis" },
  { name: "Biological Sciences", code: "BIO101", catScore: 27, midtermScore: 45, endtermScore: 89, totalScore: 89, grade: "A", rank: "2nd", teacher: "Mrs. Lucy Wangari", remarks: "Outstanding physiological diagrams" },
  { name: "Computer Science & AI", code: "CSC101", catScore: 30, midtermScore: 50, endtermScore: 98, totalScore: 97, grade: "A+", rank: "1st", teacher: "Ms. Brenda Chebet", remarks: "Distinction in Python & data algorithms" },
];

export default function ReportCardsPage() {
  const [selectedStudentId, setSelectedStudentId] = useState(DEMO_STUDENTS[0].id);
  const student = DEMO_STUDENTS.find((s) => s.id === selectedStudentId) || DEMO_STUDENTS[0];
  const currentTerm = DEMO_TERMS[0];

  const aggregateScore = (
    sampleSubjects.reduce((acc, s) => acc + s.totalScore, 0) / sampleSubjects.length
  ).toFixed(1);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Screen Controls (Hidden during print) */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/portal/assessments"
              className="text-xs text-surface-500 hover:text-surface-700 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Assessments
            </Link>
            <span className="text-surface-300">&bull;</span>
            <span className="text-xs text-primary-600 font-medium">Official Transcripts</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Student Academic Report Card
          </h1>
          <p className="text-surface-500 text-sm">
            Generate and print verified academic reports with GPA distribution, teacher commentary, and official stamp.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Student Selector */}
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="input-field text-xs py-2 w-56"
          >
            {DEMO_STUDENTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.first_name} {s.last_name} ({s.admission_number})
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handlePrint}
            className="btn-primary text-xs inline-flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Print / Export PDF
          </button>
        </div>
      </div>

      {/* Official Printable Report Card Document Sheet */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-10 shadow-md max-w-4xl mx-auto print:border-none print:shadow-none print:p-0 print:max-w-none text-surface-900">
        {/* Document Header */}
        <div className="text-center pb-6 border-b-2 border-primary-900/20 relative">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary-900 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-display font-black text-2xl tracking-tight text-primary-950 uppercase">
                {DEMO_SCHOOL.name}
              </h2>
              <p className="text-xs text-primary-800 font-medium tracking-widest uppercase">
                {DEMO_SCHOOL.motto}
              </p>
            </div>
          </div>
          <p className="text-xs text-surface-500">
            {DEMO_SCHOOL.address} &bull; Tel: {DEMO_SCHOOL.phone} &bull; Email: {DEMO_SCHOOL.email}
          </p>
          <div className="inline-block mt-3 px-4 py-1 rounded-full bg-primary-100 text-primary-900 text-xs font-bold uppercase tracking-wider">
            Official Term Academic Progress Report &bull; {currentTerm.name}
          </div>
        </div>

        {/* Student Particulars Matrix */}
        <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-surface-50 border border-surface-200 text-xs">
          <div>
            <span className="text-surface-500 block text-[11px]">Student Full Name</span>
            <strong className="text-surface-900 text-sm">
              {student.first_name} {student.middle_name} {student.last_name}
            </strong>
          </div>
          <div>
            <span className="text-surface-500 block text-[11px]">Admission Number</span>
            <strong className="text-surface-900 font-mono text-sm">{student.admission_number}</strong>
          </div>
          <div>
            <span className="text-surface-500 block text-[11px]">Grade &amp; Stream</span>
            <strong className="text-surface-900 text-sm">{student.class_name} ({student.stream_name})</strong>
          </div>
          <div>
            <span className="text-surface-500 block text-[11px]">Attendance Record</span>
            <strong className="text-emerald-700 text-sm">98.4% (61 of 62 Days)</strong>
          </div>
        </div>

        {/* Subject Scores Table */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-surface-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-primary-950 text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Subject</th>
                <th className="py-2.5 px-2 font-semibold text-center">CAT (20%)</th>
                <th className="py-2.5 px-2 font-semibold text-center">Mid (30%)</th>
                <th className="py-2.5 px-2 font-semibold text-center">End (50%)</th>
                <th className="py-2.5 px-2 font-semibold text-center">Total</th>
                <th className="py-2.5 px-2 font-semibold text-center">Grade</th>
                <th className="py-2.5 px-2 font-semibold text-center">Rank</th>
                <th className="py-2.5 px-3 font-semibold">Remarks &amp; Faculty Signature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 text-xs">
              {sampleSubjects.map((sub, idx) => (
                <tr key={sub.code} className={idx % 2 === 0 ? "bg-white" : "bg-surface-50/50"}>
                  <td className="py-2.5 px-3 font-semibold text-surface-900">
                    {sub.name}
                    <span className="block text-[10px] text-surface-400 font-mono">{sub.code}</span>
                  </td>
                  <td className="py-2.5 px-2 text-center text-surface-600">{sub.catScore}</td>
                  <td className="py-2.5 px-2 text-center text-surface-600">{sub.midtermScore}</td>
                  <td className="py-2.5 px-2 text-center text-surface-600">{sub.endtermScore}</td>
                  <td className="py-2.5 px-2 text-center font-bold text-surface-900">{sub.totalScore}%</td>
                  <td className="py-2.5 px-2 text-center font-bold text-primary-700">{sub.grade}</td>
                  <td className="py-2.5 px-2 text-center text-surface-500 font-medium">{sub.rank}</td>
                  <td className="py-2.5 px-3 text-surface-600">
                    <span>{sub.remarks}</span>
                    <span className="block text-[10px] text-surface-400 italic">By {sub.teacher}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Academic Aggregate & Standing Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-primary-50 border border-primary-200 text-center">
            <span className="text-[11px] font-semibold text-primary-700 uppercase tracking-wider block">
              Term Overall Average
            </span>
            <p className="font-display text-3xl font-black text-primary-950 mt-1">
              {aggregateScore}%
            </p>
            <span className="text-xs text-primary-700 font-medium">Grade: Plain A (Excellent)</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 text-center">
            <span className="text-[11px] font-semibold text-surface-500 uppercase tracking-wider block">
              Stream Position
            </span>
            <p className="font-display text-3xl font-black text-surface-900 mt-1">
              3<sup className="text-sm">rd</sup>
            </p>
            <span className="text-xs text-surface-500">Out of 30 Enrolled Candidates</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 text-center">
            <span className="text-[11px] font-semibold text-surface-500 uppercase tracking-wider block">
              Discipline &amp; Conduct
            </span>
            <p className="font-display text-2xl font-bold text-emerald-700 mt-2">
              Exemplary
            </p>
            <span className="text-xs text-surface-500">House Captain / Science Club Leader</span>
          </div>
        </div>

        {/* Teacher & Headteacher Formal Endorsements */}
        <div className="space-y-4 pt-4 border-t border-surface-200 text-xs">
          <div className="p-3.5 rounded-xl bg-surface-50 border border-surface-100">
            <strong className="text-surface-900 block mb-1">Class Teacher&apos;s Remarks:</strong>
            <p className="text-surface-700 italic">
              &ldquo;Liam continues to exhibit exceptional academic discipline and peer leadership. His passion in Computer Science and Pure Mathematics sets a benchmark for the entire stream. Commended!&rdquo;
            </p>
            <div className="flex justify-between items-center mt-2 text-[11px] text-surface-500">
              <span>Teacher: <strong>Ms. Sarah Jenkins</strong></span>
              <span>Date: <strong>28th February 2026</strong></span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-50 border border-surface-100">
            <strong className="text-surface-900 block mb-1">Headteacher&apos;s Endorsement &amp; Official Seal:</strong>
            <p className="text-surface-700 italic">
              &ldquo;An outstanding terminal performance. Promoted to Senior Candidate Honours list. Keep striving for greater heights in the upcoming Michaelmas term.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 pt-2 border-t border-surface-200 text-[11px] text-surface-600 gap-2">
              <span>Headteacher: <strong>Mr. David Kamau, M.Ed</strong></span>
              <span className="font-mono text-primary-700 font-semibold">[OFFICIAL ACADEMY SEAL VERIFIED]</span>
              <span>Reopening Date: <strong>4th May 2026</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
