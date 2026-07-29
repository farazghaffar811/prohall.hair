"use client";

import { useEffect } from "react";
import {
  CONSULT_STORAGE,
  CONSULT_TOKEN_EVENT,
  storeConsultToken
} from "../consult/consultApi";

export default function ConsultTokenCapture() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("prohall_consult_token");
    if (!token) return;

    url.searchParams.delete("prohall_consult_token");
    window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);

    if (!/^v1\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token)) {
      window.localStorage.removeItem(CONSULT_STORAGE.token);
      return;
    }

    storeConsultToken(token);
    window.dispatchEvent(new CustomEvent(CONSULT_TOKEN_EVENT, { detail: { token } }));

    if (window.location.pathname !== "/consult") {
      window.location.replace("/consult?auth=returned");
    }
  }, []);

  return null;
}
