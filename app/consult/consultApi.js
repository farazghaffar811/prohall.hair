export const CONSULT_API_BASE = (
  process.env.NEXT_PUBLIC_PROHALL_CONSULT_API_BASE ||
  "https://prohall.ai/api/public/consult"
).replace(/\/+$/, "");

export const CONSULT_API_KEY =
  process.env.NEXT_PUBLIC_PROHALL_CONSULT_API_KEY || "";

export const CONSULT_STORAGE = {
  token: "prohall_consult_token",
  session: "prohall_session_id",
  messages: "prohall_consult_messages",
  pendingReply: "prohall_consult_pending_reply"
};

export const CONSULT_TOKEN_EVENT = "prohall-consult-token";

export class ConsultApiError extends Error {
  constructor(code, options = {}) {
    super(options.message || code || "request_failed");
    this.name = "ConsultApiError";
    this.code = code || "request_failed";
    this.status = options.status || 0;
    this.retryAfter = options.retryAfter || 0;
    this.details = options.details || null;
    this.signInUrl = options.signInUrl || "";
  }
}

export function isConsultApiConfigured() {
  return Boolean(CONSULT_API_BASE && CONSULT_API_KEY);
}

export function generateConsultSessionId() {
  const randomPart = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID().replace(/-/g, "")
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
  return `session_${randomPart}`.slice(0, 128);
}

export function getOrCreateSessionId() {
  if (typeof window === "undefined") return "";
  const current = window.localStorage.getItem(CONSULT_STORAGE.session);
  if (/^[A-Za-z0-9_-]{8,128}$/.test(current || "")) return current;
  const next = generateConsultSessionId();
  window.localStorage.setItem(CONSULT_STORAGE.session, next);
  return next;
}

export function createNewConsultSession() {
  if (typeof window === "undefined") return "";
  const next = generateConsultSessionId();
  window.localStorage.setItem(CONSULT_STORAGE.session, next);
  window.localStorage.removeItem(CONSULT_STORAGE.messages);
  window.localStorage.removeItem(CONSULT_STORAGE.pendingReply);
  return next;
}

export function normalizeConversation(messages, maximum = 40) {
  const normalized = (Array.isArray(messages) ? messages : [])
    .filter((message) => message && (message.role === "user" || message.role === "assistant"))
    .map((message) => ({
      role: message.role,
      content: String(message.content ?? message.text ?? "").trim().slice(0, 4000)
    }))
    .filter((message) => message.content);

  let limited = normalized.slice(-maximum);
  while (limited.length > 1 && limited[0]?.role === "assistant") {
    limited = limited.slice(1);
  }
  return limited;
}

export function loadStoredConversation() {
  if (typeof window === "undefined") return [];
  try {
    return normalizeConversation(
      JSON.parse(window.localStorage.getItem(CONSULT_STORAGE.messages) || "[]")
    );
  } catch {
    window.localStorage.removeItem(CONSULT_STORAGE.messages);
    return [];
  }
}

export function storeConversation(messages) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    CONSULT_STORAGE.messages,
    JSON.stringify(normalizeConversation(messages))
  );
}

export function parseAssistantReply(rawReply) {
  const raw = String(rawReply || "");
  const optionsMatch = raw.match(/\[\[options:\s*([^\]]+)\]\]/i);
  const options = optionsMatch
    ? optionsMatch[1].split("|").map((option) => option.trim()).filter(Boolean)
    : [];
  const displayText = raw
    .replace(/\[\[[^\]]*\]\]/g, "")
    .replace(/\[\[[^\]]*$/g, "")
    .trim();
  return { displayText, options };
}

export function isSafeProhallSignInUrl(value) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "prohall.ai" &&
      url.pathname.startsWith("/api/public/consult/session/start")
    );
  } catch {
    return false;
  }
}

export function isConsultTokenExpired(token) {
  try {
    const parts = String(token || "").split(".");
    if (parts.length !== 3 || parts[0] !== "v1") return false;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const payload = JSON.parse(window.atob(padded));
    return Boolean(payload.exp && Date.now() / 1000 >= Number(payload.exp));
  } catch {
    return false;
  }
}

export function getStoredConsultToken() {
  if (typeof window === "undefined") return "";
  const token = window.localStorage.getItem(CONSULT_STORAGE.token) || "";
  if (token && isConsultTokenExpired(token)) {
    window.localStorage.removeItem(CONSULT_STORAGE.token);
    return "";
  }
  return token;
}

export function storeConsultToken(token) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(CONSULT_STORAGE.token, token);
  else window.localStorage.removeItem(CONSULT_STORAGE.token);
}

async function readErrorResponse(response) {
  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }
  const retryAfter = Number(response.headers.get("Retry-After") || 0);
  throw new ConsultApiError(data.error || `http_${response.status}`, {
    status: response.status,
    retryAfter: Number.isFinite(retryAfter) ? retryAfter : 0,
    details: data.details,
    signInUrl: data.signInUrl
  });
}

export function createConsultHeaders(token = "") {
  if (!isConsultApiConfigured()) {
    throw new ConsultApiError("client_not_configured");
  }
  const headers = {
    "Content-Type": "application/json",
    "X-Prohall-Api-Key": CONSULT_API_KEY
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function requestConsultJson(path, options = {}) {
  const response = await fetch(`${CONSULT_API_BASE}${path}`, {
    method: options.method || "GET",
    headers: createConsultHeaders(options.token),
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: options.signal
  });
  if (!response.ok) await readErrorResponse(response);
  return response.json();
}

export async function requestConsultStream({ sessionId, messages, locale = "en", token = "", signal }) {
  const response = await fetch(`${CONSULT_API_BASE}/chat/stream`, {
    method: "POST",
    headers: createConsultHeaders(token),
    body: JSON.stringify({
      sessionId,
      messages: normalizeConversation(messages),
      locale: locale === "es" ? "es" : "en"
    }),
    signal
  });
  if (!response.ok) await readErrorResponse(response);
  if (!response.body) {
    throw new ConsultApiError("empty_stream", { status: response.status });
  }
  return response.body;
}

export function getConsultErrorMessage(error) {
  const retryText = error?.retryAfter
    ? ` Please try again in ${error.retryAfter} seconds.`
    : "";
  const messages = {
    client_not_configured: "The consultation service needs its Prohall API key before it can connect.",
    invalid_credentials: "The email or password is incorrect.",
    validation_failed: "Please check the highlighted account details and try again.",
    signin_required: "Sign in or create an account to continue your consultation.",
    invalid_token: "Your consultation session has expired. Please log in again.",
    invalid_api_key: "The consultation service is not configured correctly yet.",
    origin_not_allowed: "This website address has not been approved for the consultation service yet.",
    rate_limited: `Too many requests.${retryText}`,
    api_not_configured: "The consultation service is temporarily unavailable.",
    invalid_body: "The conversation could not be sent. Please start a new consultation and try again.",
    no_user_message: "Please enter a message before sending.",
    internal_error: "The consultant is temporarily unavailable. Please try again shortly.",
    empty_stream: "The consultant returned an empty response. Please try again."
  };
  if (error?.name === "AbortError") return "";
  return messages[error?.code] || "We could not connect to the consultant. Check your connection and try again.";
}
