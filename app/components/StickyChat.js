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
  const [sentMessage, setSentMessage] = useState("");
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

  const sendPreviewMessage = (event) => {
    event.preventDefault();
    const nextMessage = message.trim();
    if (!nextMessage) return;
    setSentMessage(nextMessage);
    setMessage("");
  };

  return (
    <div className={open ? "sticky-chat is-open" : "sticky-chat"}>
      {open && (
        <section className="sticky-chat-panel" aria-label="Prohall support chat preview">
          <div className="sticky-chat-head">
            <div className="sticky-chat-avatar"><span>PH</span></div>
            <div>
              <strong>Prohall support</strong>
              <span><i /> Consultation preview</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close support chat">×</button>
          </div>

          <div className="sticky-chat-body" aria-live="polite">
            <div className="sticky-chat-message assistant">
              <span>Prohall</span>
              <p>Hi! Tell us what your hair needs and we’ll help you find the right place to start.</p>
            </div>
            {sentMessage && (
              <>
                <div className="sticky-chat-message user"><p>{sentMessage}</p></div>
                <div className="sticky-chat-message assistant">
                  <span>Prohall</span>
                  <p>Thank you. Personalized replies will be connected in the next phase. You can continue through our consultation experience now.</p>
                </div>
              </>
            )}
            <div className="sticky-chat-suggestions">
              {["Frizz and smoothing", "Dry or damaged hair", "Product help"].map((suggestion) => (
                <button type="button" key={suggestion} onClick={() => setMessage(suggestion)}>{suggestion}</button>
              ))}
            </div>
          </div>

          <form className="sticky-chat-form" onSubmit={sendPreviewMessage}>
            <input
              ref={inputRef}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Describe your hair concern..."
              aria-label="Describe your hair concern"
            />
            <button type="submit" aria-label="Send preview message"><ArrowIcon /></button>
          </form>

          <a className="sticky-chat-consult" href="/consult">
            Open full consultation <ArrowIcon />
          </a>
        </section>
      )}

      <button
        className="sticky-chat-launcher"
        type="button"
        aria-label={open ? "Close Prohall support chat" : "Open Prohall support chat"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <span aria-hidden="true">×</span> : <ChatIcon />}
        {!open && <b>Chat with us</b>}
      </button>
    </div>
  );
}
