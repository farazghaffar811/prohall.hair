"use client";

import { useEffect } from "react";

export default function SetSpanishLang() {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = "es";
    return () => {
      document.documentElement.lang = previous || "en";
    };
  }, []);
  return null;
}
