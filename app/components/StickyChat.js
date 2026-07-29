"use client";

import { useEffect, useRef, useState } from "react";

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.6a8 8 0 1 1 15-3.9Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.2 10.2h7.6M8.2 13.5h4.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StickyChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  const openConsultation = (event) => {
    event.preventDefault();
    const nextMessage = message.trim();
    if (!nextMessage) return;
    window.location.assign(`/consult?prompt=${encodeURIComponent(nextMessage)}`);
  };

  return (
    <div className={open ? "sticky-chat is-open" : "sticky-chat"}>
      {open && (
        <section className="sticky-chat-panel" aria-label="Start a Prohall hair consultation">
          <div className="sticky-chat-head">
            <div className="sticky-chat-avatar"><span>PH</span></div>
            <div>
              <strong>Prohall consultant</strong>
              <span><i /> Advice-only hair guidance</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close hair consultation">×</button>
          </div>

          <div className="sticky-chat-body">
            <div className="sticky-chat-message assistant">
              <span>Prohall</span>
              <p>Tell us what is happening with your hair. Your message will open in the full consultation.</p>
            </div>
            <div className="sticky-chat-suggestions">
              {["Frizz and texture", "Dry or damaged hair", "Chemical compatibility"].map((suggestion) => (
                <button type="button" key={suggestion} onClick={() => setMessage(suggestion)}>{suggestion}</button>
              ))}
            </div>
          </div>

          <form className="sticky-chat-form" onSubmit={openConsultation}>
            <input
              ref={inputRef}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Describe your hair concern..."
              aria-label="Describe your hair concern"
            />
            <button type="submit" aria-label="Open consultation with this message"><ArrowIcon /></button>
          </form>

          <a className="sticky-chat-consult" href="/consult">
            Open full consultation <ArrowIcon />
          </a>
        </section>
      )}

      <button
        className="sticky-chat-launcher"
        type="button"
        aria-label={open ? "Close Prohall hair consultation" : "Open Prohall hair consultation"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <span aria-hidden="true">×</span> : <ChatIcon />}
        {!open && <b>Chat with us</b>}
      </button>
    </div>
  );
}
