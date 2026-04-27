"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";
import API_URL from "@/lib/api";

export default function VerifyEmailClient() {
  const [status, setStatus] = useState("loading"); // loading | success | error | no-token
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("no-token");
      setMessage("No verification token found. Please check the link in your email.");
      return;
    }

    fetch(`${API_URL}/api/auth/verify-email?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          setMessage(data.msg || "Email verified successfully! You can now login.");
        } else {
          setStatus("error");
          setMessage(data.msg || "Verification failed. The link may have expired.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#0EB4A6]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0EB4A6]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="bg-[#121214] border border-white/5 rounded-3xl p-10 w-full max-w-md relative z-10 shadow-2xl text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0EB4A6] tracking-tight">Guidevera</h1>
          <p className="text-white/30 text-xs mt-1">Your True Guide for Career Clarity</p>
        </div>

        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          {status === "loading" && (
            <div className="w-20 h-20 rounded-full bg-[#0EB4A6]/10 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-[#0EB4A6] animate-spin" />
            </div>
          )}
          {status === "success" && (
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center animate-[scale-in_0.4s_ease]">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
          )}
          {(status === "error" || status === "no-token") && (
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
          )}
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-white mb-3">
          {status === "loading" && "Verifying your email…"}
          {status === "success" && "Email Verified! 🎉"}
          {status === "error" && "Verification Failed"}
          {status === "no-token" && "Invalid Link"}
        </h2>

        {/* Message */}
        <p className="text-white/50 text-sm leading-relaxed mb-8">{message}</p>

        {/* Actions */}
        {status === "success" && (
          <Link
            href="/login"
            className="inline-block w-full py-3.5 bg-gradient-to-r from-[#0EB4A6] to-[#0fdad3] text-black font-bold text-[15px] rounded-xl transition-all hover:opacity-90 active:scale-95"
          >
            Go to Login →
          </Link>
        )}

        {status === "error" && (
          <div className="flex flex-col gap-3">
            <ResendVerificationButton />
            <Link
              href="/signup"
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Register a new account
            </Link>
          </div>
        )}

        {status === "no-token" && (
          <Link
            href="/signup"
            className="inline-block w-full py-3.5 bg-white/5 border border-white/10 text-white font-semibold text-[15px] rounded-xl transition-all hover:bg-white/10"
          >
            Back to Sign Up
          </Link>
        )}
      </div>

      <p className="text-white/20 text-[10px] mt-6">© 2026 Guidevera. All rights reserved.</p>
    </div>
  );
}

// Inline resend component
function ResendVerificationButton() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleResend = async () => {
    if (!email) return;
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setSent(true);
      setResendMsg(data.msg || "Verification email sent!");
    } catch {
      setResendMsg("Failed to resend. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="flex items-center gap-2 justify-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl py-3 px-4">
        <Mail className="w-4 h-4 text-emerald-400" />
        <span className="text-emerald-400 text-sm">{resendMsg}</span>
      </div>
    );
  }

  if (!showInput) {
    return (
      <button
        onClick={() => setShowInput(true)}
        className="w-full py-3.5 bg-gradient-to-r from-[#0EB4A6] to-[#0fdad3] text-black font-bold text-[15px] rounded-xl transition-all hover:opacity-90 active:scale-95"
      >
        Resend Verification Email
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="w-full bg-[#1A1A1D] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#0EB4A6]/50 focus:ring-1 focus:ring-[#0EB4A6]/50 transition-all"
      />
      <button
        onClick={handleResend}
        disabled={sending || !email}
        className="w-full py-3 bg-gradient-to-r from-[#0EB4A6] to-[#0fdad3] text-black font-bold text-sm rounded-xl transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {sending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send Verification Email"
        )}
      </button>
      {resendMsg && <p className="text-red-400 text-xs text-center">{resendMsg}</p>}
    </div>
  );
}
