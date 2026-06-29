"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Card, Button } from "@heroui/react";
import { postSuccessfulPayment } from "@/lib/actions/payment";

export default function PaymentSuccessPage({ searchParams }) {
  const unwrappedParams = use(searchParams);
  const sessionId = unwrappedParams.session_id;

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [txDetails, setTxDetails] = useState(null);
  const [error, setError] = useState(null);

useEffect(() => {
  if (!sessionId) {
    setError("No transaction metadata session token provided.");
    setLoading(false);
    return;
  }

  // const verifyTransaction = async () => {
  //   try {
  //     // 🚀 CHANGED: Using your standard server mutation wrapper directly
  //     const result = await postSuccessfulPayment({ session_id: sessionId });

  //     // your server handler automatically parses and checks status codes via handleStatusCode
  //     setTxDetails(result.data);
  //   } catch (err) {
  //     setError(err.message || "Failed verifying transaction configuration.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const verifyTransaction = async () => {
    try {
      // Call your standard server mutation wrapper
      const result = await postSuccessfulPayment({ session_id: sessionId });

      // 🚀 FIX: If the backend sent an error payload or missing success flag, throw it!
      if (!result || !result.success) {
        throw new Error(
          result?.error ||
            "Transaction confirmation rejected by database layers."
        );
      }

      // If successful, populate view details safely
      setTxDetails(result.data);
    } catch (err) {
      // This will now catch the backend error and display it cleanly on screen
      setError(err.message || "Failed verifying transaction configuration.");
    } finally {
      setLoading(false);
    }
  };

  verifyTransaction();
}, [sessionId]);

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800">
      <Card className="w-full max-w-lg bg-white border border-slate-200 p-8 rounded-2xl shadow-sm text-center">
        {loading ? (
          <div className="py-10 space-y-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-slate-500 font-medium">
              Securing payment credentials and updating project matrices...
            </p>
          </div>
        ) : error ? (
          <div className="py-6">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 border border-rose-200 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-4">
              Transaction Synchronization Issue
            </h3>
            <p className="text-xs text-slate-500 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-left">
              {error}
            </p>
            <Button
              onClick={() => router.push("/dashboard/client/manageProposals")}
              className="mt-6 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl"
            >
              Return to Proposals
            </Button>
          </div>
        ) : (
          <div className="w-full">
            {/* Visual Success Confirmation Badge Indicator Header */}
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-2xl font-bold mb-4">
              ✓
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Payment Escrow Funded Successfully!
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Your allocation contract parameters are updated and live.
            </p>

            {/* Paid Task Title | Worker Name | Price Size Receipt block */}
            <div className="my-8 bg-slate-50 rounded-2xl border border-slate-100 p-6 text-left space-y-4 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Funded Project Position
                </span>
                <span className="text-slate-800 font-semibold text-base">
                  {txDetails?.taskTitle}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200/60">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Appointed Contractor
                  </span>
                  <span className="text-slate-700 font-medium font-mono text-xs truncate">
                    {txDetails?.freelancerEmail}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 items-end">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Amount Disbursed
                  </span>
                  <span className="text-slate-900 font-black text-base">
                    ${Number(txDetails?.amount).toLocaleString()} USD
                  </span>
                </div>
              </div>
            </div>

            {/* Custom Label Route Button Controller */}
            <Button
              onClick={() => router.push("/dashboard/client/manageProposals")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-sm text-sm transition-colors"
            >
              Go to Dashboard
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
