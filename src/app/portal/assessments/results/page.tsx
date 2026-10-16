"use client";

import { useState } from "react";
import Link from "next/link";
import { DEMO_RESULT_SUBMISSIONS } from "@/lib/demo-data";
import { ResultStatus } from "@/lib/types";
import {
  FileText,
  CheckCircle2,
  Clock,
  RotateCcw,
  Globe,
  MessageSquare,
  ArrowLeft,
  X,
  Send,
  AlertCircle,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function ResultsApprovalWorkflowPage() {
  const [submissions, setSubmissions] = useState(DEMO_RESULT_SUBMISSIONS);
  const [activeTab, setActiveTab] = useState<"all" | ResultStatus>("all");
  const [reviewingSubmission, setReviewingSubmission] = useState<(typeof DEMO_RESULT_SUBMISSIONS)[0] | null>(null);
  const [returnComment, setReturnComment] = useState("");
  const [showReturnModal, setShowReturnModal] = useState(false);

  const filteredSubmissions = activeTab === "all"
    ? submissions
    : submissions.filter((s) => s.status === activeTab);

  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "approved" as ResultStatus,
              approved_by: "usr-headteacher",
              approved_at: new Date().toISOString(),
              admin_comments: "Approved by Headteacher after academic audit.",
            }
          : s
      )
    );
    toast.success("Assessment results approved! Ready for publication.");
    setReviewingSubmission(null);
  };

  const handleReturnWithComments = (id: string) => {
    if (!returnComment.trim()) {
      toast.error("Please provide comments explaining the required revisions.");
      return;
    }

    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "returned" as ResultStatus,
              admin_comments: returnComment,
              reviewed_by: "usr-headteacher",
              reviewed_at: new Date().toISOString(),
            }
          : s
      )
    );
    toast.info("Results returned to teacher with revision instructions.");
    setShowReturnModal(false);
    setReviewingSubmission(null);
    setReturnComment("");
  };

  const handlePublish = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "published" as ResultStatus,
              published_by: "usr-schooladmin",
              published_at: new Date().toISOString(),
            }
          : s
      )
    );
    toast.success("Results officially published! Now accessible to parents and students.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/portal/assessments"
              className="text-xs text-surface-500 hover:text-surface-700 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Assessments
            </Link>
            <span className="text-surface-300">&bull;</span>
            <span className="text-xs text-primary-600 font-medium">Results Governance</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Results Approval &amp; Publication Workflow
          </h1>
          <p className="text-surface-500 text-sm">
            Enforce institutional standards with multi-tier approval, comments feedback, and controlled parent publication.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/portal/assessments/reports"
            className="btn-primary text-xs inline-flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            Generate Report Cards
          </Link>
        </div>
      </div>

      {/* Workflow Stage Visualizer */}
      <div className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs">
        <h3 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-4">
          Four-Stage Quality Control Protocol
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-surface-200 bg-surface-50">
            <span className="text-[10px] font-bold text-surface-500 block uppercase">Stage 1</span>
            <h4 className="font-semibold text-surface-900 text-xs mt-0.5">Teacher Marks Draft</h4>
            <p className="text-[11px] text-surface-500 mt-1">Class scores entered &amp; validated</p>
          </div>
          <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/50">
            <span className="text-[10px] font-bold text-amber-600 block uppercase">Stage 2</span>
            <h4 className="font-semibold text-amber-900 text-xs mt-0.5">Under Review</h4>
            <p className="text-[11px] text-amber-700 mt-1">Headteacher &amp; Admin scrutiny</p>
          </div>
          <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/50">
            <span className="text-[10px] font-bold text-blue-600 block uppercase">Stage 3</span>
            <h4 className="font-semibold text-blue-900 text-xs mt-0.5">Officially Approved</h4>
            <p className="text-[11px] text-blue-700 mt-1">Cryptographic/Signature sign-off</p>
          </div>
          <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <span className="text-[10px] font-bold text-emerald-600 block uppercase">Stage 4</span>
            <h4 className="font-semibold text-emerald-900 text-xs mt-0.5">Published to Portal</h4>
            <p className="text-[11px] text-emerald-700 mt-1">Visible to parents &amp; guardians</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-surface-200">
        {[
          { key: "all", label: "All Submissions" },
          { key: "under_review", label: "Pending Review" },
          { key: "approved", label: "Approved (Ready to Publish)" },
          { key: "published", label: "Published" },
          { key: "returned", label: "Returned with Comments" },
          { key: "draft", label: "Drafts" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? "bg-primary-600 text-white shadow-xs"
                : "text-surface-600 hover:bg-surface-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <div className="bg-white border border-surface-200 rounded-2xl p-8 text-center">
            <p className="text-surface-500 text-xs">No result submissions found in this category.</p>
          </div>
        ) : (
          filteredSubmissions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white border border-surface-200 rounded-2xl p-5 shadow-xs hover:border-surface-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-bold text-surface-900 text-sm">{sub.assessment_title}</h3>
                  <span className="text-xs text-surface-400">&bull;</span>
                  <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-md">
                    {sub.class_name}
                  </span>
                  <div>
                    {sub.status === "under_review" && (
                      <span className="badge-warning text-xs">Awaiting Approval</span>
                    )}
                    {sub.status === "approved" && (
                      <span className="badge-info text-xs">Approved</span>
                    )}
                    {sub.status === "published" && (
                      <span className="badge-success text-xs">Published to Parents</span>
                    )}
                    {sub.status === "returned" && (
                      <span className="badge-danger text-xs">Returned for Revisions</span>
                    )}
                    {sub.status === "draft" && (
                      <span className="badge-neutral text-xs">Draft</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-surface-500">
                  <span>Instructor: <strong className="text-surface-700">{sub.teacher_name}</strong></span>
                  <span>Class Average: <strong className="text-surface-700">{sub.class_average} / 50</strong></span>
                  <span>Pass Rate: <strong className="text-emerald-600">{sub.pass_rate}%</strong></span>
                  <span>Version: <strong className="text-surface-700">v{sub.version}</strong></span>
                  <span>Submitted: {new Date(sub.submission_date).toLocaleDateString()}</span>
                </div>

                {sub.admin_comments && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-surface-50 border border-surface-100 flex items-start gap-2 text-xs text-surface-700">
                    <MessageSquare className="w-3.5 h-3.5 text-primary-600 shrink-0 mt-0.5" />
                    <span><strong>Reviewer Feedback:</strong> {sub.admin_comments}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                {sub.status === "under_review" && (
                  <>
                    <button
                      type="button"
                      onClick={() => setReviewingSubmission(sub)}
                      className="btn-secondary text-xs px-3 py-1.5 inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Audit Marks
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(sub.id)}
                      className="btn-primary text-xs px-3 py-1.5 inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 border-emerald-600"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setReviewingSubmission(sub);
                        setShowReturnModal(true);
                      }}
                      className="btn-secondary text-xs px-3 py-1.5 inline-flex items-center gap-1.5 text-rose-600 hover:bg-rose-50"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Return
                    </button>
                  </>
                )}

                {sub.status === "approved" && (
                  <button
                    type="button"
                    onClick={() => handlePublish(sub.id)}
                    className="btn-primary text-xs px-3 py-1.5 inline-flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Publish to Parents
                  </button>
                )}

                {sub.status === "published" && (
                  <Link
                    href="/portal/assessments/reports"
                    className="btn-secondary text-xs px-3 py-1.5 inline-flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    View Report Cards
                  </Link>
                )}

                {sub.status === "draft" && (
                  <Link
                    href="/portal/assessments/marks"
                    className="btn-secondary text-xs px-3 py-1.5 inline-flex items-center gap-1.5"
                  >
                    Continue Editing Marks &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Audit & Review Modal */}
      {reviewingSubmission && !showReturnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-surface-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-surface-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary-600" />
                <h3 className="font-display font-bold text-base text-surface-900">
                  Academic Audit &bull; {reviewingSubmission.assessment_title}
                </h3>
              </div>
              <button
                onClick={() => setReviewingSubmission(null)}
                className="p-1 rounded-lg hover:bg-surface-100 text-surface-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="grid grid-cols-3 gap-3 bg-surface-50 p-3 rounded-2xl border border-surface-100 text-center text-xs">
                <div>
                  <span className="text-surface-500 block">Class Average</span>
                  <span className="font-bold text-surface-900 text-base">{reviewingSubmission.class_average} / 50</span>
                </div>
                <div>
                  <span className="text-surface-500 block">Pass Rate</span>
                  <span className="font-bold text-emerald-600 text-base">{reviewingSubmission.pass_rate}%</span>
                </div>
                <div>
                  <span className="text-surface-500 block">Total Candidates</span>
                  <span className="font-bold text-surface-900 text-base">{reviewingSubmission.total_students}</span>
                </div>
              </div>

              <div className="text-xs text-surface-600 space-y-2">
                <p>
                  <strong>Instructor Verification:</strong> Submitted by {reviewingSubmission.teacher_name} on{" "}
                  {new Date(reviewingSubmission.submission_date).toLocaleString()}.
                </p>
                <p>
                  <strong>Approval Authority:</strong> Headteacher / Academic Dean review validates that assessment scores comply with institutional curve standards before publication to guardians.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-100">
              <button
                type="button"
                onClick={() => setShowReturnModal(true)}
                className="btn-secondary text-xs text-rose-600 hover:bg-rose-50"
              >
                Return with Revision Notes
              </button>
              <button
                type="button"
                onClick={() => handleApprove(reviewingSubmission.id)}
                className="btn-primary text-xs bg-emerald-600 hover:bg-emerald-700 border-emerald-600"
              >
                Sign &amp; Approve Marks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Return with Comments Dialog */}
      {showReturnModal && reviewingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-surface-200">
            <h3 className="font-display font-bold text-base text-surface-900 mb-2">
              Return Marks for Revision
            </h3>
            <p className="text-xs text-surface-500 mb-4">
              Enter mandatory guidance for {reviewingSubmission.teacher_name}. The submission status will revert to &apos;Returned&apos; allowing the teacher to modify scores.
            </p>

            <textarea
              rows={4}
              value={returnComment}
              onChange={(e) => setReturnComment(e.target.value)}
              placeholder="e.g. Please verify practical questions marks for students FE-2024-003 and FE-2024-004..."
              className="w-full p-3 rounded-xl border border-surface-200 text-xs focus:border-primary-500 focus:outline-none mb-4"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowReturnModal(false)}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleReturnWithComments(reviewingSubmission.id)}
                className="btn-primary text-xs bg-rose-600 hover:bg-rose-700 border-rose-600"
              >
                Confirm Return to Teacher
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
