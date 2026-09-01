"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "../productData.es";

const categories = ["All", "Smoothing", "Repair", "Masks", "Finishing"];
const categoryLabels = {
  All: "Todos",
  Smoothing: "Alisado",
  Repair: "Reparación",
  Masks: "Mascarillas",
  Finishing: "Acabado"
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function StylistPanel() {
  return (
    <>
      <a
        className="hero-image-wrap stylist-panel"
        href="https://www.instagram.com/dily_hair"
        target="_blank"
        rel="noreferrer"
        aria-label="Visita a Dily, estilista profesional, en Instagram"
      >
        <img src="/images/dily-salon-portrait.webp" alt="Dily, estilista profesional de Prohall" />
        <div className="stylist-caption">
          <div>
            <small>CONOCE A TU EXPERTA PROHALL</small>
            <strong>Dily</strong>
            <span>Estilista profesional</span>
            <p>Siempre disponible para responder tus dudas en el mostrador de ayuda de Prohall.</p>
          </div>
          <span className="stylist-link">Instagram <ArrowIcon /></span>
        </div>
      </a>
      <div className="hero-badge"><strong>20+</strong><span>años de<br />experiencia</span></div>
    </>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2c.5 5.4 3.2 8.1 8 8-4.8.1-7.5 2.8-8 8-.5-5.2-3.2-7.9-8-8 4.8.1 7.5-2.6 8-8Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function HomeEs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [faqOpen, setFaqOpen] = useState(0);
  const [consultQuery, setConsultQuery] = useState("");
  const [isDictating, setIsDictating] = useState(false);
  const [dictationSupported, setDictationSupported] = useState(false);
  const recognitionRef = useRef(null);
  const dictationBaseRef = useRef("");

  useEffect(() => {
    setDictationSupported(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition));
    return () => recognitionRef.current?.stop();
  }, []);

  const toggleDictation = () => {
    if (isDictating) {
      recognitionRef.current?.stop();
      return;
    }
    const SpeechRecognitionImpl = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionImpl) return;
    const recognition = new SpeechRecognitionImpl();
    recognition.lang = "es-ES";
    recognition.interimResults = true;
    recognition.continuous = true;
    dictationBaseRef.current = consultQuery.trim();
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      const combined = [dictationBaseRef.current, transcript.trim()].filter(Boolean).join(" ");
      setConsultQuery(combined.slice(0, 500));
    };
    recognition.onerror = () => setIsDictating(false);
    recognition.onend = () => setIsDictating(false);
    recognitionRef.current = recognition;
    setIsDictating(true);
    recognition.start();
  };

  const startConsultation = (prompt) => {
    recognitionRef.current?.stop();
    const text = (prompt || "").trim();
    window.location.href = text
      ? `/es/consult?prompt=${encodeURIComponent(text.slice(0, 500))}`
      : "/es/consult";
  };

  const visibleProducts = useMemo(
    () => products.filter((product) => filter === "All" || product.category === filter),
    [filter]
  );

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -60px" }
    );
    document.querySelectorAll("[data-animate]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-lock", menuOpen);
    return () => document.body.classList.remove("menu-lock");
  }, [menuOpen]);

  return (
    <main className="home-page">
      <div className="topbar">
        <p>Cuidado capilar profesional brasileño</p>
        <a href="/es/consult">¿Necesitas ayuda con un producto? <span>Inicia una consulta</span></a>
      </div>

      <header className="site-header">
        <a className="logo" href="#top" aria-label="Inicio de Prohall Professional">
          PROHALL <small>PROFESSIONAL</small>
        </a>

        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Navegación principal">
          <div className={categoriesOpen ? "nav-categories open" : "nav-categories"}>
            <button
              type="button"
              aria-expanded={categoriesOpen}
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              Categorías de productos <span>+</span>
            </button>
            <div className="nav-mega">
              <div>
                <span>Cabello</span>
                <a href="/es/products/force-hair" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>Force Hair</a>
                <a href="/es/products/hair-ampoules-kit" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>Hair Ampoules Kit</a>
              </div>
              <div>
                <span>Prohall</span>
                <a href="/es/products/select-one" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>Select One</a>
                <a href="/es/products/burix-one" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>Burix One</a>
              </div>
              <div>
                <span>Mascarillas</span>
                <a href="/es/products/toning-masks" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>Toning Masks</a>
                <a href="/es/products/equalize" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>Equalize Mask</a>
              </div>
              <a className="nav-all-products" href="#products" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>
                Ver todos los productos <ArrowIcon />
              </a>
            </div>
          </div>
          <a href="#manuals" onClick={() => setMenuOpen(false)}>Manuales de producto</a>
          <a href="#finder" onClick={() => setMenuOpen(false)}>Encuentra tu rutina</a>
          <a href="/es/consult" onClick={() => setMenuOpen(false)}>Consulta</a>
          <a className="mobile-nav-cta" href="#products" onClick={() => setMenuOpen(false)}>Explorar productos <ArrowIcon /></a>
        </nav>

        <div className="header-actions">
          <a className="header-help lang-switch" href="/" aria-label="Switch to English">EN</a>
          <a className="header-help" href="/es/consult">Obtener ayuda</a>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen(!menuOpen);
              if (menuOpen) setCategoriesOpen(false);
            }}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <div className="hero-kicker"><SparkIcon /> CUIDADO CAPILAR PROFESIONAL BRASILEÑO</div>
          <h1 className="visually-hidden">Prohall Professional — consulta capilar y manuales de producto</h1>
          <p>Pregunta lo que quieras a nuestro consultor — o abre el manual paso a paso de tu producto.</p>
          <form
            className="hero-consult"
            onSubmit={(event) => {
              event.preventDefault();
              startConsultation(consultQuery);
            }}
          >
            <div className="hero-consult-head">
              <span><i /> Consulta capilar gratuita</span>
              <small>Respuestas en segundos</small>
            </div>
            <div className="chat-composer">
              <input
                type="text"
                value={consultQuery}
                maxLength={500}
                placeholder="Pregunta aquí…"
                aria-label="Describe tu preocupación capilar"
                onChange={(event) => setConsultQuery(event.target.value)}
              />
              <div className="chat-composer-bar">
                {dictationSupported && (
                  <button
                    type="button"
                    className={`chat-composer-mic ${isDictating ? "listening" : ""}`}
                    onClick={toggleDictation}
                    aria-label={isDictating ? "Detener dictado" : "Dicta tu preocupación capilar"}
                    aria-pressed={isDictating}
                    title={isDictating ? "Detener dictado" : "Dictar"}
                  >
                    {isDictating ? <StopIcon /> : <MicIcon />}
                  </button>
                )}
                <button type="submit" className="chat-composer-send">Obtener respuesta <ArrowIcon /></button>
              </div>
            </div>
            <div className="hero-consult-topics" aria-label="Preocupaciones capilares comunes">
              {["Frizz y volumen", "Cabello teñido", "Daño por calor", "Seco y quebradizo"].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => startConsultation(`Mi principal preocupación es ${topic.toLowerCase()}. ¿Qué rutina Prohall me recomiendas?`)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </form>
          <div className="hero-actions">
            <a className="button secondary" href="#manuals">Manuales de producto <ArrowIcon /></a>
            <a className="button secondary" href="#products">Explorar productos</a>
          </div>
        </div>

        <div className="hero-media">
          <StylistPanel />
        </div>
      </section>

      <section className="quick-paths" aria-label="Compra por objetivo capilar">
        <a href="#products" onClick={() => setFilter("Smoothing")}><span>01</span><b>Alisar el frizz</b><ArrowIcon /></a>
        <a href="#products" onClick={() => setFilter("Repair")}><span>02</span><b>Reparar el daño</b><ArrowIcon /></a>
        <a href="#products" onClick={() => setFilter("Masks")}><span>03</span><b>Equilibrar el color</b><ArrowIcon /></a>
        <a href="#products" onClick={() => setFilter("Finishing")}><span>04</span><b>Proteger + acabado</b><ArrowIcon /></a>
      </section>

      <section className="catalog section-shell" id="products">
        <div className="section-heading" data-animate>
          <div>
            <p className="overline">LA COLECCIÓN PROHALL</p>
            <h2>Cuidado para cada<br /><em>objetivo capilar.</em></h2>
          </div>
          <p>Explora fórmulas específicas creadas para rutinas reales. Filtra por preocupación y abre cualquier producto para ver su guía completa.</p>
        </div>

        <div className="catalog-toolbar" data-animate>
          <div className="filters" role="group" aria-label="Filtrar productos">
            {categories.map((category) => (
              <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>
                {categoryLabels[category]}
              </button>
            ))}
          </div>
          <span>{visibleProducts.length} {visibleProducts.length === 1 ? "producto" : "productos"}</span>
        </div>

        <div className="product-grid">
          {visibleProducts.map((product, index) => (
            <article
              className={`product-card product-${product.slug} tone-${product.tone}`}
              key={product.slug}
              style={{ "--delay": `${index * 65}ms` }}
            >
              <div className="product-media">
                <div className="product-meta">
                  <span>{categoryLabels[product.category] || product.category}</span>
                  <span>{product.size || product.note}</span>
                </div>
                <a className="product-visual" href={`/es/products/${product.slug}`} aria-label={`Ver la guía de ${product.name}`}>
                  <img src={product.cardImage || product.image} alt={product.name} />
                </a>
              </div>
              <div className="product-banner">
                <a className="product-copy" href={`/es/products/${product.slug}`}>
                  <p>{product.type}</p>
                  <h3>{product.name}</h3>
                  <span className="product-claim">{product.note}</span>
                </a>
                <div className="product-actions">
                  {product.amazonUrl && (
                    <a className="amazon-link" href={product.amazonUrl} target="_blank" rel="noreferrer">
                      Amazon <ArrowIcon />
                    </a>
                  )}
                  <a className="product-guide-link" href={`/es/products/${product.slug}`}>
                    <span>Ver guía del producto</span>
                    <span className="circle-link" aria-hidden="true"><ArrowIcon /></span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="hero-media stylist-mobile" aria-label="Conoce a tu experta Prohall">
        <StylistPanel />
      </section>

      <section className="manuals section-shell" id="manuals">
        <div className="section-heading" data-animate>
          <div>
            <p className="overline">GUÍA PASO A PASO</p>
            <h2>Manuales de<br /><em>producto.</em></h2>
          </div>
          <p>Cada producto Prohall incluye un manual de aplicación claro — con herramientas, tiempos, vídeo tutorial y notas de seguridad. Elige tu producto para ver exactamente cómo usarlo.</p>
        </div>
        <div className="manual-directory" data-animate>
          {products.map((product) => (
            <a className="manual-link-card" href={`/es/products/${product.slug}`} key={product.slug}>
              <span className="manual-link-thumb"><img src={product.cardImage || product.image} alt={product.name} /></span>
              <span className="manual-link-copy">
                <b>{product.name}{product.size ? ` · ${product.size}` : ""}</b>
                <small>{product.type}</small>
                <span>{product.steps ? `${product.steps.length} pasos` : "Guía completa"}{product.duration ? ` · ${product.duration}` : ""}</span>
              </span>
              <span className="circle-link" aria-hidden="true"><ArrowIcon /></span>
            </a>
          ))}
        </div>
        <div className="manual-directory-help" data-animate>
          <p>¿No sabes qué producto o paso corresponde a tu cabello?</p>
          <a className="button navy" href="/es/consult">Pregunta al consultor <ArrowIcon /></a>
        </div>
      </section>

      <section className="routine section-shell" id="finder">
        <div className="routine-intro" data-animate>
          <p className="overline">EMPIEZA POR TU CABELLO</p>
          <h2>¿No sabes qué<br />necesitas?</h2>
          <p>Elige la frase que mejor describa tu cabello. Te indicaremos el mejor punto de partida.</p>
          <a className="text-arrow" href="/es/consult">Pregunta a un especialista <ArrowIcon /></a>
        </div>
        <div className="routine-options">
          {[
            ["Mi cabello tiene frizz o es difícil de manejar", "Select One", "Smoothing"],
            ["Mi cabello se siente débil, seco o dañado", "Force Hair + Pro R", "Repair"],
            ["Mi cabello necesita brillo y protección diaria", "Absolut One + Oil", "Finishing"]
          ].map((item, index) => (
            <a href="#products" key={item[0]} data-animate onClick={() => setFilter(item[2])}>
              <span>0{index + 1}</span>
              <div><h3>{item[0]}</h3><p>Empieza con {item[1]}</p></div>
              <ArrowIcon />
            </a>
          ))}
        </div>
      </section>

      <section className="results" id="results">
        <div className="results-media" data-animate>
          <img src="/images/results.jpg" alt="Cabello brillante y de aspecto saludable" />
          <span>CABELLO REAL · RESULTADOS REALES</span>
        </div>
        <div className="results-content" data-animate>
          <p className="overline">LA DIFERENCIA PROHALL</p>
          <h2>Resultados que puedes<br /><em>ver y sentir.</em></h2>
          <p>Nuestras fórmulas trabajan con la fibra capilar para mejorar la manejabilidad, la suavidad y el brillo—no solo recubren la superficie.</p>
          <div className="benefit-list">
            <div><span>01</span><strong>Reparación específica</strong><p>Cuidado concentrado para fibras capilares comprometidas.</p></div>
            <div><span>02</span><strong>Control de textura</strong><p>Movimiento más suave sin un acabado pesado.</p></div>
            <div><span>03</span><strong>Brillo luminoso</strong><p>Una cutícula sellada para un acabado más reflectante.</p></div>
          </div>
          <a className="button navy" href="#products">Explorar tratamientos <ArrowIcon /></a>
        </div>
      </section>

      <section className="how-it-works section-shell" id="how">
        <div className="section-heading compact" data-animate>
          <div><p className="overline">UNA RUTINA MEJOR</p><h2>Pasos simples.<br /><em>Cuidado profesional.</em></h2></div>
        </div>
        <div className="steps">
          <div data-animate><span>01</span><h3>Elige tu objetivo</h3><p>Empieza por alisado, reparación, equilibrio de color o protección.</p></div>
          <div data-animate><span>02</span><h3>Sigue tu guía</h3><p>Usa instrucciones claras y específicas de cada producto para una rutina segura.</p></div>
          <div data-animate><span>03</span><h3>Protege tu resultado</h3><p>Mantén la suavidad y el brillo con el acabado adecuado.</p></div>
        </div>
      </section>

      <section className="support" id="support">
        <div data-animate>
          <p className="overline">AYUDA HUMANA, CUANDO LA NECESITES</p>
          <h2>¿Preguntas sobre<br />tu cabello?</h2>
        </div>
        <div className="support-copy" data-animate>
          <p>Nuestros especialistas pueden ayudarte a elegir un tratamiento, entender los pasos o cuidar tus resultados.</p>
          <a className="button white" href="/es/consult">Inicia una consulta <ArrowIcon /></a>
        </div>
      </section>

      <section className="faq section-shell">
        <div className="faq-title" data-animate>
          <p className="overline">PREGUNTAS FRECUENTES</p>
          <h2>Bueno saberlo.</h2>
        </div>
        <div className="faq-list" data-animate>
          {[
            ["¿Qué tratamiento es el adecuado para mí?", "Select One es para un alisado de larga duración, Force Hair y Pro R refuerzan el cabello débil o dañado, Equalize restaura el pH y la gama Absolut aporta protección y brillo diarios."],
            ["¿Puedo usar los productos Prohall en casa?", "Muchos productos son aptos para el cuidado en casa. Los servicios de alisado con calor requieren seguir la guía con atención; consulta a un profesional certificado siempre que tengas dudas."],
            ["¿Cómo hago que mis resultados duren?", "Usa productos de mantenimiento sin sulfatos, protege el cabello del calor excesivo y del cloro, y sigue las indicaciones de mantenimiento de tu tratamiento."],
            ["¿Los productos sirven para todo tipo de cabello?", "La colección cubre una amplia variedad de texturas y necesidades. Revisa siempre la guía del producto, realiza las pruebas recomendadas y ajusta el calor al estado de tu cabello."]
          ].map((item, index) => (
            <button className={faqOpen === index ? "faq-item active" : "faq-item"} key={item[0]} onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}>
              <span><b>0{index + 1}</b>{item[0]}</span>
              <i>{faqOpen === index ? "−" : "+"}</i>
              <p>{item[1]}</p>
            </button>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <a className="logo footer-logo" href="#top">PROHALL <small>PROFESSIONAL</small></a>
          <p>Ciencia capilar profesional<br />con alma brasileña.</p>
          <div className="footer-nav">
            <a href="#products">Productos</a>
            <a href="#finder">Encuentra tu rutina</a>
            <a href="#results">Nuestra ciencia</a>
            <a href="/es/consult">Consulta</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Prohall Professional</span><span><a href="/es/privacy">Privacidad</a> · Términos</span><span>Hecho para cada textura.</span></div>
      </footer>
    </main>
  );
}
