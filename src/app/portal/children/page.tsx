import { getCurrentUser } from "@/lib/auth/authorization";
import { DEMO_STUDENTS } from "@/lib/demo-data";
import { ChildrenPortalView } from "@/components/portal/children-portal-view";
import { Sparkles, ShieldCheck } from "lucide-react";

export default async function MyChildrenPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  // The parent (Robert Ochieng) has two linked children: Liam (Form 3) and Maya (Form 1)
  const myChildren = DEMO_STUDENTS.filter(
    (s) => s.guardian_name.toLowerCase().includes("robert") || s.id === "std-001" || s.id === "std-002"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-surface-900">
          My Children &bull; Parent Portal
        </h1>
        <p className="text-surface-500 text-sm mt-0.5">
          View official academic progress reports, daily attendance, class schedules, fee accounts, and pay tuition securely online.
        </p>
      </div>

      {/* Children Overview with Fee Balances & Interactive Payment */}
      <ChildrenPortalView initialChildren={myChildren} />

      {/* Published Results Security Notice */}
      <div className="bg-primary-50/60 border border-primary-200/80 rounded-2xl p-5 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
        <div className="text-xs text-primary-900">
          <h4 className="font-semibold text-sm mb-0.5">Strict Examination Verification &amp; Fee Clearing Policy</h4>
          <p className="leading-relaxed">
            In accordance with Framer Elite academic governance protocols, marks and terminal grade averages are only visible to parents after formal review and digital approval by the Headteacher and School Board of Examiners. Real-time fee payments via M-Pesa or Card are verified instantly and credited to the student ledger.
          </p>
        </div>
      </div>
    </div>
  );
}

