"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
    check: <path d="m5 12 4 4L19 6" />
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
    description: "Tell us in your own words—just like messaging your stylist."
  },
  {
    id: "quiz",
    icon: "quiz",
    title: "Quick quiz",
    description: "A guided, 60-second path when you are not sure where to begin."
  },
  {
    id: "photo",
    icon: "camera",
    title: "Add a photo",
    description: "Preview a future visual consultation with a clear hair photo."
  }
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
    options: ["Frizz and excess volume", "Dryness and dullness", "Breakage or visible damage", "Brassiness or uneven tone", "Heat protection and daily finish"]
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
    question: "How much time do you want to spend on treatment?",
    options: ["A few minutes", "One focused weekly ritual", "A complete professional service"]
  }
];

const recommendations = {
  "Frizz and excess volume": {
    name: "Select One",
    slug: "select-one",
    detail: "A professional smoothing ritual for more aligned, manageable hair."
  },
  "Dryness and dullness": {
    name: "Equalize Mask",
    slug: "equalize",
    detail: "A conditioning mask designed to rebalance and restore softness."
  },
  "Breakage or visible damage": {
    name: "Force Hair",
    slug: "force-hair",
    detail: "A coordinated strengthening system for weak or damaged hair."
  },
  "Brassiness or uneven tone": {
    name: "Toning Masks",
    slug: "toning-masks",
    detail: "Targeted color care to refresh tone while conditioning the hair."
  },
  "Heat protection and daily finish": {
    name: "Absolut One",
    slug: "absolut-one",
    detail: "A lightweight finishing step for heat protection, softness and shine."
  }
};

export default function ConsultationClient() {
  const [mode, setMode] = useState("chat");
  const [chatText, setChatText] = useState("");
  const [messages, setMessages] = useState([]);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoName, setPhotoName] = useState("");
  const fileInputRef = useRef(null);

  const quizComplete = quizStep >= quizQuestions.length;
  const recommendation = useMemo(
    () => recommendations[quizAnswers.concern] || recommendations["Dryness and dullness"],
    [quizAnswers]
  );

  useEffect(() => () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
  }, [photoUrl]);

  const changeMode = (nextMode) => {
    setMode(nextMode);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const nextMessage = chatText.trim();
    if (!nextMessage) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: nextMessage },
      {
        role: "assistant",
        text: "Thanks—that gives us a helpful starting point. The consultation engine will be connected in the next phase. For now, the guided quiz can preview how your Prohall routine will be matched."
      }
    ]);
    setChatText("");
  };

  const selectQuizAnswer = (option) => {
    const question = quizQuestions[quizStep];
    setQuizAnswers((current) => ({ ...current, [question.id]: option }));
    setQuizStep((current) => current + 1);
  };

  const selectPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(URL.createObjectURL(file));
    setPhotoName(file.name);
  };

  return (
    <div className="consult-shell">
      <aside className="consult-sidebar">
        <a className="logo consult-logo" href="/" aria-label="Prohall Professional home">
          PROHALL <small>PROFESSIONAL</small>
        </a>

        <a className="consult-new" href="/consult"><span>+</span> New consultation</a>

        <nav aria-label="Consultation navigation">
          <a href="/"><Icon name="home" /> Home</a>
          <a href="/#products"><Icon name="products" /> Product guides</a>
          <span className="active" aria-current="page"><Icon name="spark" /> Consultation</span>
        </nav>

        <div className="consult-sidebar-auth" aria-label="Consultation account">
          <span>Save your consultations</span>
          <div>
            <button className="consult-auth-login" type="button" data-auth-mode="login">Log in</button>
            <button className="consult-auth-signup" type="button" data-auth-mode="signup">Sign up</button>
          </div>
        </div>
      </aside>

      <div className="consult-workspace">
        <header className="consult-header">
          <a className="logo" href="/" aria-label="Prohall Professional home">
            PROHALL <small>PROFESSIONAL</small>
          </a>
          <p>New hair consultation</p>
          <a href="/">Back to website <Icon name="arrow" /></a>
        </header>

        <main className="consult-main">
          <div className="consult-intro">
            <p className="consult-pill"><i /> Hair consultation</p>
            <h1>Let’s get your<br /><em>hair right.</em></h1>
            <p>Describe your hair, take the quick quiz, or add a photo. We’ll turn your goals into a clear Prohall routine.</p>
          </div>

          <section className="consult-card" aria-label="Consultation options">
            <div className="consult-mode-heading">
              <span>Choose how to start</span>
              <small>Frontend experience</small>
            </div>

            <div className="consult-modes" role="group" aria-label="Consultation mode">
              {modes.map((item) => (
                <button
                  className={mode === item.id ? "active" : ""}
                  type="button"
                  key={item.id}
                  aria-pressed={mode === item.id}
                  onClick={() => changeMode(item.id)}
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
                  <div className="consult-chat-feed" aria-live="polite">
                    {messages.length === 0 ? (
                      <div className="consult-chat-empty">
                        <div className="consult-orbit"><span><Icon name="spark" /></span></div>
                        <p>Tell us about your hair</p>
                        <span>Share your texture, chemical history and what you would like to change.</span>
                        <div>
                          {[
                            "My hair is color-treated and gets very frizzy.",
                            "My ends feel dry and break when I brush.",
                            "I want more shine without weighing my curls down."
                          ].map((prompt) => (
                            <button type="button" key={prompt} onClick={() => setChatText(prompt)}>{prompt}</button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="consult-messages">
                        <div className="consult-message assistant">
                          <span>Prohall consultant</span>
                          <p>Tell me about your hair and the result you want to achieve.</p>
                        </div>
                        {messages.map((message, index) => (
                          <div className={`consult-message ${message.role}`} key={`${message.role}-${index}`}>
                            {message.role === "assistant" && <span>Prohall consultant</span>}
                            <p>{message.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <form className="consult-composer" onSubmit={sendMessage}>
                    <textarea
                      rows="1"
                      maxLength="1000"
                      value={chatText}
                      onChange={(event) => setChatText(event.target.value)}
                      placeholder="Describe your texture, concerns and hair goals..."
                      aria-label="Describe your hair"
                    />
                    <button type="button" onClick={() => changeMode("photo")} aria-label="Add a photo"><Icon name="camera" /></button>
                    <button className="send" type="submit" disabled={!chatText.trim()} aria-label="Send message"><Icon name="arrow" /></button>
                  </form>
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
                      <p>Your preview match</p>
                      <h2>{recommendation.name}</h2>
                      <span>{recommendation.detail}</span>
                      <div className="consult-result-facts">
                        <span><small>Texture</small>{quizAnswers.texture}</span>
                        <span><small>Main goal</small>{quizAnswers.concern}</span>
                      </div>
                      <div className="consult-result-actions">
                        <a href={`/products/${recommendation.slug}`}>View product manual <Icon name="arrow" /></a>
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
                        <small>PNG, JPG or WebP · preview stays in your browser</small>
                      </>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={selectPhoto} />
                  </div>

                  <div className="consult-photo-copy">
                    <p className="overline">Before future analysis</p>
                    <h2>{photoUrl ? "Photo ready for the next phase." : "A better photo creates better guidance."}</h2>
                    <ul>
                      <li><Icon name="check" /> Photograph clean, dry hair in natural light.</li>
                      <li><Icon name="check" /> Avoid filters, extensions and heavy styling products.</li>
                      <li><Icon name="check" /> Chemical history will always be confirmed first.</li>
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
            <span><Icon name="spark" /> Designed for product guidance</span>
            <p>Cosmetic guidance only. This frontend preview does not diagnose medical or scalp conditions.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
