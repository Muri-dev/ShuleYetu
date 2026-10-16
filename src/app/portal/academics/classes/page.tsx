import { DEMO_CLASSES, DEMO_STREAMS } from "@/lib/demo-data";
import Link from "next/link";
import {
  School,
  ArrowLeft,
  Plus,
  Users,
  Layers,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function ClassesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/portal/academics"
              className="text-xs text-surface-500 hover:text-surface-700 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Academics
            </Link>
            <span className="text-surface-300">&bull;</span>
            <span className="text-xs text-primary-600 font-medium">Class Infrastructure</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Classes, Streams &amp; Capacity
          </h1>
          <p className="text-surface-500 text-sm">
            Institutional hierarchy from Grade 9 (Form 1) through Senior Candidate Stage (Form 4).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn-primary text-xs inline-flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            Add New Stream
          </button>
        </div>
      </div>

      {/* Classes List */}
      <div className="space-y-6">
        {DEMO_CLASSES.map((cls) => {
          const streams = DEMO_STREAMS.filter((s) => s.class_id === cls.id);

          return (
            <div
              key={cls.id}
              className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                    F{cls.level - 8}
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-surface-900 text-base">
                      {cls.name}
                    </h2>
                    <p className="text-xs text-surface-500">{cls.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="badge-primary">Level {cls.level}</span>
                  <span className="text-surface-500">
                    <strong>{streams.length}</strong> Configured Streams
                  </span>
                </div>
              </div>

              {/* Streams Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                {streams.map((stream) => (
                  <div
                    key={stream.id}
                    className="p-4 rounded-2xl border border-surface-200/80 bg-surface-50/50 hover:bg-white hover:border-primary-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-semibold text-surface-900 text-xs">{stream.name}</h4>
                        <span className="badge-neutral text-[10px]">Max {stream.capacity}</span>
                      </div>
                      <p className="text-[11px] text-surface-500">
                        Class Teacher: <strong className="text-surface-700">Ms. Sarah Jenkins</strong>
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-surface-100 flex items-center justify-between text-[11px] text-primary-600 font-medium">
                      <Link href="/portal/students" className="hover:underline">
                        View Enrolled Students &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
