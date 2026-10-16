import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center bg-white border border-surface-200 rounded-3xl p-8 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-6 text-amber-600">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="font-display text-2xl font-bold text-surface-900 mb-2">
          Access Restricted
        </h1>
        <p className="text-surface-600 text-sm mb-6 leading-relaxed">
          You do not have the required permissions or role level to view this module. If you believe this is in error, contact your institution administrator.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/portal"
            className="btn-primary inline-flex items-center justify-center text-sm"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <Link
            href="/login"
            className="btn-secondary inline-flex items-center justify-center text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Switch Account
          </Link>
        </div>
      </div>
    </div>
  );
}
