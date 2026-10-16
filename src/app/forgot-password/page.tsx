"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setSent(true);
      toast.success("Password reset link sent to your email");
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-success-50 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-surface-900 mb-2">Check Your Email</h1>
          <p className="text-surface-600 mb-8">
            We&apos;ve sent a password reset link to <strong>{email}</strong>. Check your inbox and follow the instructions.
          </p>
          <Link href="/login" className="btn-secondary">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-surface-900">Framer Elite</span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-surface-900 mb-2">Reset your password</h1>
          <p className="text-surface-600">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label htmlFor="reset-email" className="label label-required">Email Address</label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@example.com"
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-primary w-full btn-lg" disabled={loading}>
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
            ) : (
              <>Send Reset Link <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => router.push("/login")} className="text-sm text-primary-600 hover:text-primary-500 font-medium">
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  );
}
