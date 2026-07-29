"use client";

import { useEffect, useState } from "react";
import {
  getConsultErrorMessage,
  isConsultApiConfigured,
  requestConsultJson
} from "./consultApi";

export default function ConsultAuthModal({ mode, onClose, onAuthenticated }) {
  const [activeMode, setActiveMode] = useState(mode || "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const configured = isConsultApiConfigured();

  useEffect(() => {
    if (!mode) return;
    setActiveMode(mode);
    setStatus(null);
    setPassword("");
  }, [mode]);

  useEffect(() => {
    if (!mode) return undefined;
    const handleEscape = (event) => {
      if (event.key === "Escape" && !submitting) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mode, onClose, submitting]);

  if (!mode) return null;

  const title = activeMode === "signup"
    ? "Create your consultation account"
    : activeMode === "reset"
      ? "Reset your password"
      : "Welcome back";

  const submit = async (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus({ type: "error", text: "Enter a valid email address." });
      return;
    }
    if (activeMode !== "reset" && !password) {
      setStatus({ type: "error", text: "Enter your password." });
      return;
    }
    if (activeMode === "signup" && password.length < 8) {
      setStatus({ type: "error", text: "Your password must contain at least 8 characters." });
      return;
    }

    setSubmitting(true);
    setStatus({
      type: "info",
      text: activeMode === "signup"
        ? "Creating your account..."
        : activeMode === "reset"
          ? "Sending reset instructions..."
          : "Signing you in..."
    });

    try {
      if (activeMode === "reset") {
        await requestConsultJson("/auth/password-reset", {
          method: "POST",
          body: { email: normalizedEmail }
        });
        setStatus({
          type: "success",
          text: "If an account exists for this email, password reset instructions are on the way."
        });
        return;
      }

      const data = await requestConsultJson(
        activeMode === "signup" ? "/auth/signup" : "/auth/signin",
        {
          method: "POST",
          body: { email: normalizedEmail, password }
        }
      );

      if (data.status === "confirm_email") {
        setStatus({
          type: "info",
          text: `Check ${data.email || normalizedEmail} to confirm your account, then log in.`
        });
        setActiveMode("login");
        setPassword("");
        return;
      }

      if (data.status === "signed_in" && data.token) {
        setStatus({ type: "success", text: "You are signed in. Your consultation can now be saved." });
        onAuthenticated({ token: data.token, email: data.email || normalizedEmail });
        return;
      }

      setStatus({ type: "error", text: "The account request could not be completed." });
    } catch (error) {
      setStatus({ type: "error", text: getConsultErrorMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="consult-auth-modal" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !submitting) onClose();
    }}>
      <section role="dialog" aria-modal="true" aria-labelledby="consult-auth-title">
        <button className="consult-auth-close" type="button" onClick={onClose} disabled={submitting} aria-label="Close account window">×</button>
        <p className="overline">Consultation account</p>
        <h2 id="consult-auth-title">{title}</h2>
        <p className="consult-auth-lead">
          {activeMode === "reset"
            ? "Enter your email and we will send secure reset instructions."
            : "Your account is used only for consultation access, saved chats and your hair profile."}
        </p>

        {!configured && (
          <div className="consult-auth-status error" role="status">
            The account service is ready in the interface but still needs the issued Prohall API key.
          </div>
        )}

        <form onSubmit={submit}>
          <label>
            <span>Email address</span>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          {activeMode !== "reset" && (
            <label>
              <span>Password</span>
              <input
                type="password"
                autoComplete={activeMode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={activeMode === "signup" ? "At least 8 characters" : "Your password"}
                minLength={activeMode === "signup" ? 8 : 1}
                required
              />
            </label>
          )}

          {status && (
            <div className={`consult-auth-status ${status.type}`} role="status" aria-live="polite">
              {status.text}
            </div>
          )}

          <button className="consult-auth-submit" type="submit" disabled={submitting || !configured}>
            {submitting
              ? "Please wait..."
              : activeMode === "signup"
                ? "Create account"
                : activeMode === "reset"
                  ? "Send reset email"
                  : "Log in"}
          </button>
        </form>

        <div className="consult-auth-switch">
          {activeMode === "login" && (
            <>
              <button type="button" onClick={() => { setActiveMode("reset"); setStatus(null); }}>Forgot password?</button>
              <span>New here? <button type="button" onClick={() => { setActiveMode("signup"); setStatus(null); }}>Create account</button></span>
            </>
          )}
          {activeMode === "signup" && (
            <span>Already have an account? <button type="button" onClick={() => { setActiveMode("login"); setStatus(null); }}>Log in</button></span>
          )}
          {activeMode === "reset" && (
            <button type="button" onClick={() => { setActiveMode("login"); setStatus(null); }}>Back to login</button>
          )}
        </div>

        <p className="consult-auth-privacy">
          Prohall stores consultation transcripts and hair-profile information and shares them with prohall.ai for cross-site account access. <a href="/privacy">Privacy details</a>
        </p>
      </section>
    </div>
  );
}
