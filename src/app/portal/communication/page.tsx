"use client";

import { useState } from "react";
import { DEMO_ANNOUNCEMENTS } from "@/lib/demo-data";
import {
  Bell,
  MessageSquare,
  Plus,
  Send,
  Calendar,
  Globe,
  Users,
  CheckCircle2,
  X,
} from "lucide-react";
import { toast } from "sonner";

export default function CommunicationPage() {
  const [announcements, setAnnouncements] = useState(DEMO_ANNOUNCEMENTS);
  const [showModal, setShowModal] = useState(false);
  const [newAnn, setNewAnn] = useState({
    title: "",
    content: "",
    target: "all",
    isPublic: true,
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: `ann-${Date.now()}`,
      school_id: "sch-001",
      title: newAnn.title,
      content: newAnn.content,
      target: newAnn.target as (typeof DEMO_ANNOUNCEMENTS)[0]["target"],
      is_public: newAnn.isPublic,
      published_by: "usr-schooladmin",
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    setAnnouncements([created, ...announcements]);
    setShowModal(false);
    toast.success("Broadcast announcement published to school community!");
    setNewAnn({ title: "", content: "", target: "all", isPublic: true });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Institutional Communications &amp; Broadcasts
          </h1>
          <p className="text-surface-500 text-sm mt-0.5">
            Deliver urgent notices, parent circulars, term date updates, and faculty briefings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Create Broadcast
          </button>
        </div>
      </div>

      {/* Announcements Stream */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs hover:border-surface-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="badge-primary text-xs uppercase font-semibold">
                  Audience: {ann.target}
                </span>
                {ann.is_public && (
                  <span className="badge-success text-xs inline-flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Public Website Mirror
                  </span>
                )}
              </div>
              <span className="text-xs text-surface-400">
                Published {new Date(ann.created_at).toLocaleDateString()}
              </span>
            </div>

            <h2 className="font-display font-bold text-surface-900 text-base mb-2">
              {ann.title}
            </h2>
            <p className="text-xs text-surface-600 leading-relaxed">
              {ann.content}
            </p>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-surface-200">
            <div className="flex items-center justify-between pb-3 border-b border-surface-100 mb-4">
              <h3 className="font-display font-bold text-base text-surface-900">
                Publish School Circular / Notice
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg hover:bg-surface-100 text-surface-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-4 text-xs">
              <div>
                <label className="label label-required">Notice Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Term 1 Sports Day & Inter-House Athletics Schedule"
                  value={newAnn.title}
                  onChange={(e) => setNewAnn({ ...newAnn, title: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label label-required">Target Audience</label>
                <select
                  value={newAnn.target}
                  onChange={(e) => setNewAnn({ ...newAnn, target: e.target.value })}
                  className="input-field py-2"
                >
                  <option value="all">Entire School Community (All Roles)</option>
                  <option value="parents">Parents &amp; Guardians</option>
                  <option value="teachers">Teaching Faculty</option>
                  <option value="students">Enrolled Students</option>
                  <option value="staff">Non-Teaching Staff</option>
                </select>
              </div>

              <div>
                <label className="label label-required">Detailed Content</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide full particulars, dates, venues, or instructions..."
                  value={newAnn.content}
                  onChange={(e) => setNewAnn({ ...newAnn, content: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={newAnn.isPublic}
                  onChange={(e) => setNewAnn({ ...newAnn, isPublic: e.target.checked })}
                  className="rounded text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isPublic" className="text-surface-700 font-medium">
                  Also display on the public Framer Elite website homepage
                </label>
              </div>

              <div className="pt-4 border-t border-surface-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
