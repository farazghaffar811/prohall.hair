"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ConsultAuthModal from "./ConsultAuthModal";
import {
  CONSULT_STORAGE,
  CONSULT_TOKEN_EVENT,
  createNewConsultSession,
  getConsultErrorMessage,
  getOrCreateSessionId,
  getStoredConsultToken,
  isConsultApiConfigured,
  isSafeProhallSignInUrl,
  loadStoredConversation,
  normalizeConversation,
  parseAssistantReply,
  requestConsultJson,
  requestConsultStream,
  storeConsultToken,
  storeConversation
} from "./consultApi";

function Icon({ name }) {
  const paths = {
    home: <><path d="M3 11 12 3l9 8" /><path d="M6 10v9h12v-9" /></>,
    products: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    spark: <path d="M12 3c.4 4.3 2.8 6.7 7 7-4.2.3-6.6 2.7-7 7-.4-4.3-2.8-6.7-7-7 4.2-.3 6.6-2.7 7-7Z" />,
    chat: <><path d="M21 12a8 8 0 0 1-11.6 7.2L4 21l1.8-5.4A8 8 0 1 1 21 12Z" /><path d="M8.5 11h7M8.5 14h4" /></>,
    quiz: <><path d="m4 6 1.5 1.5L8 5" /><path d="M11 6h9" /><path d="m4 12 1.5 1.5L8 11" /><path d="M11 12h9" /><path d="m4 18 1.5 1.5L8 17" /><path d="M11 18h9" /></>,
    camera: <><path d="M4 7h3.2L9 4.8h6L16.8 7H20a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13" r="3.5" /></>,
    upload: <><path d="M12 16V5" /><path d="m7.5 9.5 4.5-4.5 4.5 4.5" /><path d="M5 14v5h14v-5" /></>,
    arrow: <><path d="M4 12h15" /><path d="m14 7 5 5-5 5" /></>,
    back: <><path d="M20 12H5" /><path d="m10 7-5 5 5 5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    account: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21c.7-4.2 3.2-6.3 7.5-6.3s6.8 2.1 7.5 6.3" /></>
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const modes = [
  {
    id: "chat",
    icon: "chat",
    title: "Describe it",
    description: "Tell the consultant about your hair in your own words."
  },
  {
    id: "quiz",
    icon: "quiz",
    title: "Quick quiz",
    description: "Build a clear summary before starting your consultation."
  },
  {
    id: "photo",
    icon: "camera",
    title: "Add a photo",
    description: "Use a private local preview to help describe what you see."
  }
];

const starterPrompts = [
  "My hair is color-treated and gets very frizzy.",
  "My ends feel dry and break when I brush.",
  "I use heat often and want to reduce visible damage."
];

const quizQuestions = [
  {
    id: "texture",
    eyebrow: "Your texture",
    question: "How would you describe your natural hair?",
    options: ["Straight or mostly straight", "Wavy", "Curly", "Coily or tightly textured"]
  },
  {
    id: "concern",
    eyebrow: "Your priority",
    question: "What would you most like to improve?",
    options: ["Frizz and excess volume", "Dryness and dullness", "Breakage or visible damage", "Brassiness or uneven tone", "Heat protection and daily care"]
  },
  {
    id: "history",
    eyebrow: "Chemical history",
    question: "Has your hair been chemically treated recently?",
    options: ["No chemical treatments", "Colored or highlighted", "Bleached or lightened", "Relaxed, permed or smoothed"]
  },
  {
    id: "routine",
    eyebrow: "Your routine",
    question: "How much time do you want to spend on hair care?",
    options: ["A few minutes", "One focused weekly routine", "A complete professional service"]
  }
];

function getQuizPrompt(answers) {
  return [
    `My natural hair is ${answers.texture?.toLowerCase() || "not specified"}.`,
    `My main concern is ${answers.concern?.toLowerCase() || "not specified"}.`,
    `My chemical history: ${answers.history?.toLowerCase() || "not specified"}.`,
    `I prefer ${answers.routine?.toLowerCase() || "a manageable routine"}.`,
    "Please assess what may be affecting my hair and help me build a safe care plan."
  ].join(" ");
}

export default function ConsultationClient() {
  const [mode, setMode] = useState("chat");
  const [chatText, setChatText] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [token, setToken] = useState("");
  const [account, setAccount] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [chatError, setChatError] = useState("");
  const [gateUrl, setGateUrl] = useState("");
  const [retryAfter, setRetryAfter] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoName, setPhotoName] = useState("");
  const fileInputRef = useRef(null);
  const feedRef = useRef(null);
  const abortRef = useRef(null);
  const pendingAttemptedRef = useRef(false);
  const configured = isConsultApiConfigured();

  const quizComplete = quizStep >= quizQuestions.length;
  const quizPrompt = useMemo(() => getQuizPrompt(quizAnswers), [quizAnswers]);

  useEffect(() => {
    document.body.classList.add("consultation-active");
    const url = new URL(window.location.href);
    const tokenParam = url.searchParams.get("prohall_consult_token");
    if (tokenParam && /^v1\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(tokenParam)) {
      storeConsultToken(tokenParam);
    }
    const prompt = url.searchParams.get("prompt");
    if (prompt) setChatText(prompt.slice(0, 1000));
    if (tokenParam || prompt || url.searchParams.has("auth")) {
      url.searchParams.delete("prohall_consult_token");
      url.searchParams.delete("prompt");
      url.searchParams.delete("auth");
      window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
    }

    const storedToken = tokenParam || getStoredConsultToken();
    setToken(storedToken);
    setSessionId(getOrCreateSessionId());
    setMessages(loadStoredConversation());
    setHydrated(true);

    const receiveToken = (event) => {
      if (!event.detail?.token) return;
      setToken(event.detail.token);
      setAuthMode(null);
    };
    window.addEventListener(CONSULT_TOKEN_EVENT, receiveToken);
    return () => {
      document.body.classList.remove("consultation-active");
      window.removeEventListener(CONSULT_TOKEN_EVENT, receiveToken);
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!hydrated || isWaiting) return;
    storeConversation(messages);
  }, [hydrated, isWaiting, messages]);

  useEffect(() => {
    if (!photoUrl) return undefined;
    return () => URL.revokeObjectURL(photoUrl);
  }, [photoUrl]);

  useEffect(() => {
    if (!feedRef.current) return;
    feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [messages, chatError, gateUrl]);

  useEffect(() => {
    if (!retryAfter) return undefined;
    const interval = window.setInterval(() => {
      setRetryAfter((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [retryAfter]);

  useEffect(() => {
    if (!hydrated || !token || !configured) return undefined;
    let active = true;
    const controller = new AbortController();

    requestConsultJson("/me", { token, signal: controller.signal })
      .then((data) => {
        if (!active) return;
        setAccount(data);
        const stored = loadStoredConversation();
        if (!stored.length && data.recentConversation?.lastTurns?.length) {
          const recent = normalizeConversation(data.recentConversation.lastTurns);
          setMessages(recent);
          storeConversation(recent);
        }
      })
      .catch((error) => {
        if (!active || error.name === "AbortError") return;
        if (error.code === "invalid_token") {
          storeConsultToken("");
          setToken("");
          setAccount(null);
          setAuthMode("login");
        }
        setChatError(getConsultErrorMessage(error));
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [configured, hydrated, token]);

  const requestAssistant = async (conversation) => {
    if (!configured || isWaiting || !sessionId) {
      if (!configured) setChatError(getConsultErrorMessage({ code: "client_not_configured" }));
      return;
    }

    setIsWaiting(true);
    setChatError("");
    setGateUrl("");
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    let fullReply = "";

    setMessages([...conversation, { role: "assistant", content: "", streaming: true }]);

    try {
      const stream = await requestConsultStream({
        sessionId,
        messages: conversation,
        locale: document.documentElement.lang,
        token,
        signal: controller.signal
      });
      const reader = stream.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullReply += decoder.decode(value, { stream: true });
        setMessages([...conversation, { role: "assistant", content: fullReply, streaming: true }]);
      }
      fullReply += decoder.decode();

      const completed = normalizeConversation([
        ...conversation,
        { role: "assistant", content: fullReply }
      ]);
      setMessages(completed);
      storeConversation(completed);
      window.localStorage.removeItem(CONSULT_STORAGE.pendingReply);
    } catch (error) {
      setMessages(conversation);
      storeConversation(conversation);

      if (error.name === "AbortError") return;
      if (error.retryAfter) setRetryAfter(error.retryAfter);

      if (error.code === "signin_required") {
        window.localStorage.setItem(CONSULT_STORAGE.pendingReply, "true");
        if (isSafeProhallSignInUrl(error.signInUrl)) {
          setGateUrl(error.signInUrl);
          setChatError("Your three complimentary replies are complete. Redirecting you to secure sign-in so this consultation can continue.");
          window.setTimeout(() => window.location.assign(error.signInUrl), 900);
        } else {
          setChatError("Sign-in is required, but the returned sign-in address could not be verified.");
        }
        return;
      }

      if (error.code === "invalid_token") {
        storeConsultToken("");
        setToken("");
        setAccount(null);
        setAuthMode("login");
      }
      setChatError(getConsultErrorMessage(error));
    } finally {
      setIsWaiting(false);
      abortRef.current = null;
    }
  };

  useEffect(() => {
    if (
      !hydrated ||
      !token ||
      isWaiting ||
      pendingAttemptedRef.current ||
      window.localStorage.getItem(CONSULT_STORAGE.pendingReply) !== "true"
    ) return;
    const stored = loadStoredConversation();
    if (stored.at(-1)?.role !== "user") {
      window.localStorage.removeItem(CONSULT_STORAGE.pendingReply);
      return;
    }
    pendingAttemptedRef.current = true;
    requestAssistant(stored);
  }, [hydrated, token, sessionId]);

  const sendMessage = (event, suppliedText = "") => {
    event?.preventDefault?.();
    const nextMessage = (suppliedText || chatText).trim().slice(0, 4000);
    if (!nextMessage || isWaiting || retryAfter) return;
    const conversation = normalizeConversation([
      ...messages.filter((message) => !message.streaming),
      { role: "user", content: nextMessage }
    ]);
    setMessages(conversation);
    storeConversation(conversation);
    setChatText("");
    requestAssistant(conversation);
  };

  const handleAuthenticated = ({ token: nextToken, email }) => {
    storeConsultToken(nextToken);
    setToken(nextToken);
    setAccount((current) => ({ ...(current || {}), email }));
    setAuthMode(null);
    setMode("chat");
    setChatError("");
  };

  const signOut = () => {
    abortRef.current?.abort();
    storeConsultToken("");
    setToken("");
    setAccount(null);
    setMessages([]);
    setChatError("");
    setGateUrl("");
    createNewConsultSession();
    setSessionId(getOrCreateSessionId());
  };

  const startNewConsultation = () => {
    abortRef.current?.abort();
    setSessionId(createNewConsultSession());
    setMessages([]);
    setChatText("");
    setChatError("");
    setGateUrl("");
    setRetryAfter(0);
    setMode("chat");
    setQuizStep(0);
    setQuizAnswers({});
  };

  const restoreRecentConversation = () => {
    const recent = normalizeConversation(account?.recentConversation?.lastTurns || []);
    if (!recent.length) return;
    setMessages(recent);
    storeConversation(recent);
    setMode("chat");
  };

  const selectQuizAnswer = (option) => {
    const question = quizQuestions[quizStep];
    setQuizAnswers((current) => ({ ...current, [question.id]: option }));
    setQuizStep((current) => current + 1);
  };

  const useQuizInChat = () => {
    setChatText(quizPrompt);
    setMode("chat");
  };

  const selectPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(URL.createObjectURL(file));
    setPhotoName(file.name);
  };

  const openGate = () => {
    if (isSafeProhallSignInUrl(gateUrl)) window.location.assign(gateUrl);
  };

  return (
    <div className="consult-shell">
      <aside className="consult-sidebar">
        <a className="logo consult-logo" href="/" aria-label="Prohall Professional home">
          PROHALL <small>PROFESSIONAL</small>
        </a>

        <button className="consult-new" type="button" onClick={startNewConsultation}><span>+</span> New consultation</button>

        <nav aria-label="Consultation navigation">
          <a href="/"><Icon name="home" /> Home</a>
          <a href="/#products"><Icon name="products" /> Product guides</a>
          <span className="active" aria-current="page"><Icon name="spark" /> Consultation</span>
          {account?.recentConversation?.lastTurns?.length > 0 && (
            <button type="button" onClick={restoreRecentConversation}>
              <Icon name="chat" />
              <span>Recent chat <small>{account.recentConversation.messageCount || account.recentConversation.lastTurns.length} messages</small></span>
            </button>
          )}
        </nav>

        {account?.email ? (
          <div className="consult-sidebar-account">
            <span><i /> Signed in</span>
            <strong>{account.email}</strong>
            <small>Your consultation messages are saved.</small>
            <button type="button" onClick={signOut}>Sign out</button>
          </div>
        ) : (
          <div className="consult-sidebar-auth" aria-label="Consultation account">
            <span>Save your consultations</span>
            <div>
              <button className="consult-auth-login" type="button" onClick={() => setAuthMode("login")}>Log in</button>
              <button className="consult-auth-signup" type="button" onClick={() => setAuthMode("signup")}>Sign up</button>
            </div>
          </div>
        )}
      </aside>

      <div className="consult-workspace">
        <header className="consult-header">
          <a className="logo" href="/" aria-label="Prohall Professional home">
            PROHALL <small>PROFESSIONAL</small>
          </a>
          <p>{account?.email ? "Saved hair consultation" : "New hair consultation"}</p>
          <div className="consult-header-actions">
            {!account?.email && <button className="consult-mobile-auth" type="button" onClick={() => setAuthMode("login")}><Icon name="account" /> Log in</button>}
            {account?.email && <button className="consult-mobile-auth" type="button" onClick={signOut}><Icon name="account" /> Sign out</button>}
            <a href="/">Back to website <Icon name="arrow" /></a>
          </div>
        </header>

        <main className="consult-main">
          <div className="consult-intro">
            <p className="consult-pill"><i /> Advice-only hair consultation</p>
            <h1>Let’s get your<br /><em>hair right.</em></h1>
            <p>Describe your hair or use the quick quiz to prepare a clear summary. Your consultant will investigate your routine, chemical history and goals before offering guidance.</p>
          </div>

          <section className="consult-card" aria-label="Consultation options">
            <div className="consult-mode-heading">
              <span>Choose how to start</span>
              <small>{account?.email ? "Signed in · chats saved" : "3 complimentary replies"}</small>
            </div>

            <div className="consult-modes" role="group" aria-label="Consultation mode">
              {modes.map((item) => (
                <button
                  className={mode === item.id ? "active" : ""}
                  type="button"
                  key={item.id}
                  aria-pressed={mode === item.id}
                  onClick={() => setMode(item.id)}
                >
                  <span><Icon name={item.icon} /></span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </button>
              ))}
            </div>

            <div className="consult-experience">
              {mode === "chat" && (
                <div className="consult-chat">
                  <div className="consult-chat-save-state">
                    <span><i className={account?.email ? "saved" : ""} /> {account?.email ? `Saved to ${account.email}` : "Try 3 replies before signing in"}</span>
                    {!account?.email && <button type="button" onClick={() => setAuthMode("signup")}>Save this chat</button>}
                  </div>

                  <div className="consult-chat-feed" ref={feedRef} aria-live="polite" aria-busy={isWaiting}>
                    {messages.length === 0 && !chatError ? (
                      <div className="consult-chat-empty">
                        <div className="consult-orbit"><span><Icon name="spark" /></span></div>
                        <p>Tell us about your hair</p>
                        <span>Share your texture, chemical history, routine and what you would like to change.</span>
                        <div>
                          {starterPrompts.map((prompt) => (
                            <button type="button" key={prompt} onClick={() => setChatText(prompt)}>{prompt}</button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="consult-messages">
                        {messages.map((message, index) => {
                          const parsed = parseAssistantReply(message.content);
                          const isLast = index === messages.length - 1;
                          return (
                            <div className={`consult-message ${message.role} ${message.streaming ? "streaming" : ""}`} key={`${message.role}-${index}`}>
                              {message.role === "assistant" && <span>Prohall consultant</span>}
                              <p>{parsed.displayText || (message.streaming ? "Thinking…" : message.content)}</p>
                              {message.role === "assistant" && isLast && !message.streaming && parsed.options.length > 0 && (
                                <div className="consult-reply-options">
                                  {parsed.options.map((option) => (
                                    <button type="button" key={option} onClick={(event) => sendMessage(event, option)} disabled={isWaiting}>{option}</button>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {chatError && (
                      <div className="consult-chat-alert" role="alert">
                        <span>{chatError}</span>
                        {gateUrl && <button type="button" onClick={openGate}>Continue to secure sign-in <Icon name="arrow" /></button>}
                        {!gateUrl && !configured && <button type="button" onClick={() => setAuthMode("login")}>View account setup</button>}
                      </div>
                    )}
                  </div>

                  <form className="consult-composer" onSubmit={sendMessage}>
                    <textarea
                      rows="1"
                      maxLength="4000"
                      value={chatText}
                      onChange={(event) => setChatText(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          sendMessage(event);
                        }
                      }}
                      placeholder={configured ? "Describe your texture, concerns and hair goals..." : "Consultation connection awaiting API key"}
                      aria-label="Describe your hair"
                      disabled={isWaiting || retryAfter > 0 || !configured}
                    />
                    <button type="button" onClick={() => setMode("photo")} aria-label="Add a photo" disabled={isWaiting}><Icon name="camera" /></button>
                    <button className="send" type="submit" disabled={!chatText.trim() || isWaiting || retryAfter > 0 || !configured} aria-label="Send message"><Icon name="arrow" /></button>
                  </form>
                  {retryAfter > 0 && <div className="consult-rate-limit">Please wait {retryAfter} seconds before sending again.</div>}
                </div>
              )}

              {mode === "quiz" && (
                <div className="consult-quiz">
                  {!quizComplete ? (
                    <>
                      <div className="consult-quiz-progress">
                        <span>Question {quizStep + 1} of {quizQuestions.length}</span>
                        <div><i style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }} /></div>
                      </div>
                      <div className="consult-quiz-question">
                        <p>{quizQuestions[quizStep].eyebrow}</p>
                        <h2>{quizQuestions[quizStep].question}</h2>
                        <div>
                          {quizQuestions[quizStep].options.map((option) => (
                            <button type="button" key={option} onClick={() => selectQuizAnswer(option)}>
                              <span>{option}</span><Icon name="arrow" />
                            </button>
                          ))}
                        </div>
                        {quizStep > 0 && (
                          <button className="consult-quiz-back" type="button" onClick={() => setQuizStep((current) => current - 1)}>
                            <Icon name="back" /> Previous question
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="consult-result">
                      <span className="consult-result-check"><Icon name="check" /></span>
                      <p>Your consultation summary</p>
                      <h2>Ready to discuss</h2>
                      <span>{quizPrompt}</span>
                      <div className="consult-result-facts">
                        <span><small>Texture</small>{quizAnswers.texture}</span>
                        <span><small>Main concern</small>{quizAnswers.concern}</span>
                      </div>
                      <div className="consult-result-actions">
                        <button type="button" onClick={useQuizInChat}>Continue in chat <Icon name="arrow" /></button>
                        <button type="button" onClick={() => { setQuizStep(0); setQuizAnswers({}); }}>Restart quiz</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {mode === "photo" && (
                <div className="consult-photo">
                  <div
                    className={photoUrl ? "consult-photo-drop has-photo" : "consult-photo-drop"}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") fileInputRef.current?.click();
                    }}
                    role="button"
                    tabIndex="0"
                  >
                    {photoUrl ? (
                      <img src={photoUrl} alt="Selected hair consultation preview" />
                    ) : (
                      <>
                        <span><Icon name="upload" /></span>
                        <strong>Add a clear hair photo</strong>
                        <p>Use natural light and show your hair from roots to ends.</p>
                        <small>PNG, JPG or WebP · the preview stays in your browser</small>
                      </>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={selectPhoto} />
                  </div>

                  <div className="consult-photo-copy">
                    <p className="overline">Private local preview</p>
                    <h2>{photoUrl ? "Use the photo to describe what you see." : "A clear view can help you explain your concern."}</h2>
                    <ul>
                      <li><Icon name="check" /> Photograph clean, dry hair in natural light.</li>
                      <li><Icon name="check" /> Avoid filters, extensions and heavy styling products.</li>
                      <li><Icon name="check" /> The current consultant accepts text, so your photo is not uploaded.</li>
                    </ul>
                    {photoUrl && (
                      <div className="consult-photo-ready">
                        <span>{photoName}</span>
                        <button type="button" onClick={() => { URL.revokeObjectURL(photoUrl); setPhotoUrl(""); setPhotoName(""); }}>Choose another</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="consult-disclaimer">
            <span><Icon name="spark" /> Advice-only hair consultation</span>
            <p>Cosmetic guidance only. The consultant does not diagnose medical or scalp conditions and does not provide product recommendations.</p>
          </div>
        </main>
      </div>

      <ConsultAuthModal mode={authMode} onClose={() => setAuthMode(null)} onAuthenticated={handleAuthenticated} />
    </div>
  );
}
