"use client";

import { useState } from "react";
import {
  X,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle2,
  Loader2,
  Download,
  Printer,
  ShieldCheck,
  Receipt,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Student } from "@/lib/types";

interface FeePaymentModalProps {
  student: Student & {
    class_name?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess?: (amount: number, transactionId: string) => void;
}

export function FeePaymentModal({
  student,
  isOpen,
  onClose,
  onPaymentSuccess,
}: FeePaymentModalProps) {
  const [method, setMethod] = useState<"mpesa" | "card" | "bank">("mpesa");
  const [amount, setAmount] = useState<number>(student.fee_balance || 30000);
  const [phone, setPhone] = useState("+254 711 000 005");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8910");
  const [cardExpiry, setCardExpiry] = useState("08/28");
  const [cardCvc, setCardCvc] = useState("892");
  const [bankRef, setBankRef] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"form" | "confirming" | "success">("form");
  const [transactionId, setTransactionId] = useState("");

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    setIsProcessing(true);
    setStep("confirming");

    const randomTx =
      method === "mpesa"
        ? `MPESA-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        : method === "card"
        ? `CARD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        : `BANK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    setTransactionId(randomTx);

    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
      toast.success(`Payment of KES ${amount.toLocaleString()} confirmed!`);
      if (onPaymentSuccess) {
        onPaymentSuccess(amount, randomTx);
      }
    }, 2200);
  };

  const handleDownloadReceipt = () => {
    toast.success(`Official Payment Receipt #${transactionId} downloaded!`);
  };

  const resetAndClose = () => {
    setStep("form");
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-surface-200 shadow-2xl overflow-hidden my-8">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-primary-900 to-surface-900 text-white p-6 relative">
          <button
            onClick={resetAndClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Instant Bursary Gateway
            </span>
            <span className="text-xs text-primary-200/80">Encrypted 256-bit SSL</span>
          </div>

          <h2 className="text-xl font-display font-bold">
            Tuition &amp; Fee Settlement
          </h2>
          <p className="text-xs text-primary-200 mt-1">
            Settling account for <strong className="text-white">{student.first_name} {student.last_name}</strong> ({student.admission_number}) &bull; {student.class_name}
          </p>
        </div>

        {/* Modal Content */}
        {step === "form" && (
          <form onSubmit={handlePay} className="p-6 space-y-5">
            {/* Balance Overview Card */}
            <div className="bg-surface-50 border border-surface-200 rounded-2xl p-4 flex items-center justify-between text-xs">
              <div>
                <span className="text-surface-500 block text-[11px]">Outstanding Term Balance</span>
                <span className="text-xl font-bold text-surface-900 block mt-0.5">
                  KES {(student.fee_balance || 0).toLocaleString()}
                </span>
                <span className="text-[10px] text-surface-400">
                  Total Term 1 Tuition: KES {(student.term_tuition || 75000).toLocaleString()}
                </span>
              </div>

              <div className="text-right">
                <span className="text-surface-500 block text-[11px]">Already Paid</span>
                <span className="text-sm font-semibold text-emerald-600 block">
                  KES {(student.amount_paid || 0).toLocaleString()}
                </span>
                <span className="badge-primary text-[10px] mt-1 inline-block">Term 1 (2026/2027)</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-surface-700 mb-2">
                Select Secure Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => setMethod("mpesa")}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    method === "mpesa"
                      ? "border-emerald-600 bg-emerald-50/50 text-emerald-950 ring-2 ring-emerald-500/20 font-bold"
                      : "border-surface-200 hover:border-surface-300 text-surface-600"
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                  <span>M-Pesa Express</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("card")}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    method === "card"
                      ? "border-primary-600 bg-primary-50/50 text-primary-950 ring-2 ring-primary-500/20 font-bold"
                      : "border-surface-200 hover:border-surface-300 text-surface-600"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-primary-600" />
                  <span>Card (Visa/MC)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("bank")}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    method === "bank"
                      ? "border-blue-600 bg-blue-50/50 text-blue-950 ring-2 ring-blue-500/20 font-bold"
                      : "border-surface-200 hover:border-surface-300 text-surface-600"
                  }`}
                >
                  <Building className="w-5 h-5 text-blue-600" />
                  <span>Bank / Pesalink</span>
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-surface-700">
                  Amount to Pay (KES)
                </label>
                <button
                  type="button"
                  onClick={() => setAmount(student.fee_balance || 30000)}
                  className="text-[11px] font-semibold text-primary-600 hover:underline"
                >
                  Pay Full Balance (KES {(student.fee_balance || 30000).toLocaleString()})
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400 font-semibold text-xs">
                  KES
                </span>
                <input
                  type="number"
                  min="500"
                  required
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="input-field pl-14 text-sm font-bold text-surface-900 py-2.5"
                />
              </div>
            </div>

            {/* Method Specific Fields */}
            {method === "mpesa" && (
              <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 text-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-100/80">
                  <span className="text-emerald-900 font-medium">School Paybill Number</span>
                  <span className="font-mono font-bold text-emerald-800 text-sm">892100</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-emerald-100/80">
                  <span className="text-emerald-900 font-medium">Account Reference</span>
                  <span className="font-mono font-bold text-emerald-800">{student.admission_number}</span>
                </div>
                <div>
                  <label className="label text-emerald-900 text-xs font-medium">
                    Safaricom M-Pesa Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 7XX XXX XXX"
                    className="input-field text-xs py-2 font-mono bg-white border-emerald-200"
                  />
                  <p className="text-[10px] text-emerald-700 mt-1">
                    An STK prompt will be sent immediately to this phone to enter your M-Pesa PIN.
                  </p>
                </div>
              </div>
            )}

            {method === "card" && (
              <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 text-xs space-y-3">
                <div>
                  <label className="label text-surface-700 text-xs font-medium">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="input-field text-xs py-2 font-mono bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label text-surface-700 text-xs font-medium">Expiry</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="input-field text-xs py-2 font-mono bg-white"
                    />
                  </div>
                  <div>
                    <label className="label text-surface-700 text-xs font-medium">CVC / CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="input-field text-xs py-2 font-mono bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {method === "bank" && (
              <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-surface-600">Bank Name</span>
                  <span className="font-semibold text-surface-900">Standard Chartered Bank</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600">Account Name</span>
                  <span className="font-semibold text-surface-900">Framer Elite Academy Ltd</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600">Account Number</span>
                  <span className="font-mono font-bold text-surface-900">0108092837400</span>
                </div>
                <div>
                  <label className="label text-surface-700 text-xs font-medium mt-2">
                    Bank Slip / Pesalink Reference Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SCB-FT-98402"
                    value={bankRef}
                    onChange={(e) => setBankRef(e.target.value)}
                    className="input-field text-xs py-2 font-mono bg-white"
                  />
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-primary text-xs py-3 justify-center text-sm font-semibold shadow-md bg-emerald-600 hover:bg-emerald-700 border-emerald-600"
              >
                {method === "mpesa" ? (
                  <>
                    <Smartphone className="w-4 h-4 mr-2" />
                    Send M-Pesa STK Push Prompt (KES {amount.toLocaleString()})
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Authorize Payment (KES {amount.toLocaleString()})
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Processing / STK Push Simulation Step */}
        {step === "confirming" && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center animate-pulse">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>

            <div>
              <h3 className="font-display font-bold text-lg text-surface-900">
                {method === "mpesa" ? "STK Push Sent to Phone" : "Securing Transaction"}
              </h3>
              <p className="text-xs text-surface-500 max-w-sm mx-auto mt-1 leading-relaxed">
                {method === "mpesa"
                  ? `Please check phone ${phone} and enter your 4-digit M-Pesa PIN to complete payment of KES ${amount.toLocaleString()}.`
                  : `Connecting to interbank settlement network for KES ${amount.toLocaleString()}...`}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 text-xs text-surface-600 font-mono max-w-xs mx-auto">
              <div>Ref: {student.admission_number}</div>
              <div>Account: {student.first_name} {student.last_name}</div>
              <div className="text-emerald-700 font-bold mt-1">Status: Waiting for PIN confirmation...</div>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === "success" && (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="badge-success text-xs mb-1 inline-block">Payment Reconciled</span>
              <h3 className="font-display font-bold text-xl text-surface-900">
                Tuition Payment Successful!
              </h3>
              <p className="text-xs text-surface-500 mt-1">
                Your payment has been credited to <strong className="text-surface-800">{student.first_name} {student.last_name}&apos;s</strong> terminal fee ledger.
              </p>
            </div>

            {/* Official Digital Receipt Summary */}
            <div className="bg-surface-50 border border-surface-200 rounded-2xl p-4 text-xs space-y-2 text-left font-mono">
              <div className="flex justify-between border-b border-surface-200 pb-1.5">
                <span className="text-surface-500 font-sans">Official Receipt No:</span>
                <span className="font-bold text-surface-900">{transactionId}</span>
              </div>
              <div className="flex justify-between border-b border-surface-200 pb-1.5">
                <span className="text-surface-500 font-sans">Student Name:</span>
                <span className="text-surface-900 font-sans font-medium">{student.first_name} {student.last_name}</span>
              </div>
              <div className="flex justify-between border-b border-surface-200 pb-1.5">
                <span className="text-surface-500 font-sans">Admission No:</span>
                <span className="text-surface-900">{student.admission_number}</span>
              </div>
              <div className="flex justify-between border-b border-surface-200 pb-1.5">
                <span className="text-surface-500 font-sans">Amount Credited:</span>
                <span className="font-bold text-emerald-700 font-sans text-sm">KES {amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-surface-500 font-sans">Timestamp:</span>
                <span className="text-surface-600">{new Date().toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="btn-secondary text-xs flex-1 justify-center py-2.5 inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF Receipt
              </button>
              <button
                type="button"
                onClick={resetAndClose}
                className="btn-primary text-xs flex-1 justify-center py-2.5 bg-emerald-600 hover:bg-emerald-700 border-emerald-600"
              >
                Done &bull; Return to Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
