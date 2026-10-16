"use client";

import { useState } from "react";
import Link from "next/link";
import { DEMO_TIMETABLE } from "@/lib/demo-data";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Filter,
  Plus,
  BookOpen,
  MapPin,
  User,
} from "lucide-react";

const daysOfWeek = [
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
];

export default function TimetablePage() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedClass, setSelectedClass] = useState("cls-f3");

  const daySlots = DEMO_TIMETABLE.filter((s) => s.day_of_week === selectedDay);

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
            <span className="text-xs text-primary-600 font-medium">Class Scheduling</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Interactive Weekly Timetable
          </h1>
          <p className="text-surface-500 text-sm">
            Master instructional schedules, laboratory period allocations, and assigned classrooms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="input-field text-xs py-2 w-48"
          >
            <option value="cls-f3">Form 3 West (Grade 11)</option>
            <option value="cls-f2">Form 2 East (Grade 10)</option>
            <option value="cls-f1">Form 1 East (Grade 9)</option>
            <option value="cls-f4">Form 4 East (Grade 12)</option>
          </select>
        </div>
      </div>

      {/* Days Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-surface-200">
        {daysOfWeek.map((day) => (
          <button
            key={day.id}
            onClick={() => setSelectedDay(day.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedDay === day.id
                ? "bg-primary-600 text-white shadow-xs"
                : "text-surface-600 hover:bg-surface-100"
            }`}
          >
            {day.name}
          </button>
        ))}
      </div>

      {/* Slots List */}
      <div className="space-y-3">
        {daySlots.length === 0 ? (
          <div className="bg-white border border-surface-200 rounded-2xl p-8 text-center text-xs text-surface-500">
            No scheduled lecture periods configured for this day. Self-directed study or co-curricular sports period.
          </div>
        ) : (
          daySlots.map((slot) => (
            <div
              key={slot.id}
              className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-primary-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-14 rounded-2xl bg-primary-50 text-primary-700 flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0">
                  <span>{slot.start_time}</span>
                  <span className="text-[10px] text-primary-400 font-normal">to {slot.end_time}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 text-sm">{slot.subject_name}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-surface-500 mt-1">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-primary-600" />
                      {slot.teacher_name}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-surface-400" />
                      {slot.room}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/portal/attendance"
                  className="btn-secondary text-xs px-3 py-1.5"
                >
                  Roll Call
                </Link>
                <Link
                  href="/portal/assessments/marks"
                  className="btn-primary text-xs px-3 py-1.5"
                >
                  Marks Entry
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
