"use client";

import { useEffect, useMemo, useState } from "react";
import { products } from "./productData";

const categories = ["All", "Smoothing", "Repair", "Masks", "Finishing"];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2c.5 5.4 3.2 8.1 8 8-4.8.1-7.5 2.8-8 8-.5-5.2-3.2-7.9-8-8 4.8.1 7.5-2.6 8-8Z" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [faqOpen, setFaqOpen] = useState(0);

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
    <main>
      <div className="topbar">
        <p>Professional Brazilian haircare</p>
        <a href="/consult">Need product help? <span>Start a consultation</span></a>
      </div>

      <header className="site-header">
        <a className="logo" href="#top" aria-label="Prohall Professional home">
          PROHALL <small>PROFESSIONAL</small>
        </a>

        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
          <div className={categoriesOpen ? "nav-categories open" : "nav-categories"}>
            <button
              type="button"
              aria-expanded={categoriesOpen}
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              Product Categories <span>+</span>
            </button>
            <div className="nav-mega">
              <div>
                <span>Hair</span>
                <a href="/products/force-hair" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>Force Hair</a>
                <a href="/products/hair-ampoules-kit" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>Hair Ampoules Kit</a>
              </div>
              <div>
                <span>Prohall</span>
                <a href="/products/select-one" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>Select One 10.1 oz</a>
                <a href="/products/select-one-travel" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>Select One 4.05 oz</a>
              </div>
              <div>
                <span>Masks</span>
                <a href="/products/toning-masks" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>Toning Masks</a>
                <a href="/products/equalize" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>Equalize Mask</a>
              </div>
              <a className="nav-all-products" href="#products" onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}>
                View all products <ArrowIcon />
              </a>
            </div>
          </div>
          <a href="#finder" onClick={() => setMenuOpen(false)}>Find your routine</a>
          <a href="#results" onClick={() => setMenuOpen(false)}>Our science</a>
          <a href="/consult" onClick={() => setMenuOpen(false)}>Consultation</a>
          <a className="mobile-nav-cta" href="#products" onClick={() => setMenuOpen(false)}>Explore products <ArrowIcon /></a>
        </nav>

        <div className="header-actions">
          <a className="header-help" href="/consult">Get support</a>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
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
          <div className="hero-kicker"><SparkIcon /> BRAZILIAN PROFESSIONAL HAIRCARE</div>
          <h1>Professional care.<br /><em>Remarkable hair.</em></h1>
          <p>Targeted formulas for smoother, stronger and more luminous hair—created for professionals, made clear for everyone.</p>
          <div className="hero-actions">
            <a className="button primary" href="#products">Explore products <ArrowIcon /></a>
            <a className="button secondary" href="#finder">Find your routine</a>
          </div>
          <div className="hero-trust">
            <span><b>01</b> Pro performance</span>
            <span><b>02</b> Every texture</span>
            <span><b>03</b> Expert guidance</span>
          </div>
        </div>

        <div className="hero-media">
          <a
            className="hero-image-wrap stylist-panel"
            href="https://www.instagram.com/dily_hair"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Dily professional hairstylist on Instagram"
          >
            <img src="/images/dily-salon-portrait.webp" alt="Dily, Prohall professional hairstylist" />
            <div className="stylist-caption">
              <div>
                <small>MEET YOUR PROHALL EXPERT</small>
                <strong>Dily</strong>
                <span>Professional hairstylist</span>
                <p>Always here to answer your queries at the Prohall help desk.</p>
              </div>
              <span className="stylist-link">Instagram <ArrowIcon /></span>
            </div>
          </a>
          <div className="hero-badge"><strong>20+</strong><span>years of<br />expertise</span></div>
        </div>
      </section>

      <section className="quick-paths" aria-label="Shop by hair goal">
        <a href="#products" onClick={() => setFilter("Smoothing")}><span>01</span><b>Smooth frizz</b><ArrowIcon /></a>
        <a href="#products" onClick={() => setFilter("Repair")}><span>02</span><b>Repair damage</b><ArrowIcon /></a>
        <a href="#products" onClick={() => setFilter("Masks")}><span>03</span><b>Balance color</b><ArrowIcon /></a>
        <a href="#products" onClick={() => setFilter("Finishing")}><span>04</span><b>Protect + finish</b><ArrowIcon /></a>
      </section>

      <section className="catalog section-shell" id="products">
        <div className="section-heading" data-animate>
          <div>
            <p className="overline">THE PROHALL COLLECTION</p>
            <h2>Care for every<br /><em>hair goal.</em></h2>
          </div>
          <p>Explore focused formulas built for real routines. Filter by concern, then open any product for its complete guide.</p>
        </div>

        <div className="catalog-toolbar" data-animate>
          <div className="filters" role="group" aria-label="Filter products">
            {categories.map((category) => (
              <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>
                {category}
              </button>
            ))}
          </div>
          <span>{visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}</span>
        </div>

        <div className="product-grid">
          {visibleProducts.map((product, index) => (
            <article
              className={`product-card product-${product.slug} tone-${product.tone}`}
              key={product.name}
              style={{ "--delay": `${index * 65}ms` }}
            >
              <div className="product-media">
                <div className="product-meta">
                  <span>{product.category}</span>
                  <span>{product.size || product.note}</span>
                </div>
                <a className="product-visual" href={`/products/${product.slug}`} aria-label={`View ${product.name} guide`}>
                  <img src={product.image} alt={product.name} />
                </a>
              </div>
              <div className="product-banner">
                <a className="product-copy" href={`/products/${product.slug}`}>
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
                  <a className="product-guide-link" href={`/products/${product.slug}`}>
                    <span>View product guide</span>
                    <span className="circle-link" aria-hidden="true"><ArrowIcon /></span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="routine section-shell" id="finder">
        <div className="routine-intro" data-animate>
          <p className="overline">START WITH YOUR HAIR</p>
          <h2>Not sure what<br />you need?</h2>
          <p>Choose the statement that sounds most like your hair. We’ll point you toward the right place to begin.</p>
          <a className="text-arrow" href="/consult">Ask a product specialist <ArrowIcon /></a>
        </div>
        <div className="routine-options">
          {[
            ["My hair feels frizzy or difficult to manage", "Select One", "Smoothing"],
            ["My hair feels weak, dry or damaged", "Force Hair + Pro R", "Repair"],
            ["My hair needs shine and everyday protection", "Absolut One + Oil", "Finishing"]
          ].map((item, index) => (
            <a href="#products" key={item[0]} data-animate onClick={() => setFilter(item[2])}>
              <span>0{index + 1}</span>
              <div><h3>{item[0]}</h3><p>Start with {item[1]}</p></div>
              <ArrowIcon />
            </a>
          ))}
        </div>
      </section>

      <section className="results" id="results">
        <div className="results-media" data-animate>
          <img src="/images/results.jpg" alt="Glossy, healthy-looking hair" />
          <span>REAL HAIR · REAL RESULTS</span>
        </div>
        <div className="results-content" data-animate>
          <p className="overline">THE PROHALL DIFFERENCE</p>
          <h2>Results you can<br /><em>see and feel.</em></h2>
          <p>Our formulas work with the hair fiber to improve manageability, softness and shine—not simply coat the surface.</p>
          <div className="benefit-list">
            <div><span>01</span><strong>Targeted repair</strong><p>Focused care for compromised hair fibers.</p></div>
            <div><span>02</span><strong>Texture control</strong><p>Smoother movement without a heavy finish.</p></div>
            <div><span>03</span><strong>Luminous shine</strong><p>A sealed cuticle for a more reflective finish.</p></div>
          </div>
          <a className="button navy" href="#products">Explore treatments <ArrowIcon /></a>
        </div>
      </section>

      <section className="how-it-works section-shell">
        <div className="section-heading compact" data-animate>
          <div><p className="overline">A BETTER ROUTINE</p><h2>Simple steps.<br /><em>Professional care.</em></h2></div>
        </div>
        <div className="steps">
          <div data-animate><span>01</span><h3>Choose your goal</h3><p>Start with smoothing, repair, color balance or protection.</p></div>
          <div data-animate><span>02</span><h3>Follow your guide</h3><p>Use clear product-specific instructions for a confident routine.</p></div>
          <div data-animate><span>03</span><h3>Protect your result</h3><p>Maintain softness and shine with the right finishing care.</p></div>
        </div>
      </section>

      <section className="support" id="support">
        <div data-animate>
          <p className="overline">HUMAN HELP, WHEN YOU NEED IT</p>
          <h2>Questions about<br />your hair?</h2>
        </div>
        <div className="support-copy" data-animate>
          <p>Our product specialists can help you choose a treatment, understand the steps or care for your results.</p>
          <a className="button white" href="/consult">Start a consultation <ArrowIcon /></a>
        </div>
      </section>

      <section className="faq section-shell">
        <div className="faq-title" data-animate>
          <p className="overline">FREQUENTLY ASKED</p>
          <h2>Good to know.</h2>
        </div>
        <div className="faq-list" data-animate>
          {[
            ["Which treatment is right for me?", "Select One is for long-lasting smoothing, Force Hair and Pro R support weak or damaged hair, Equalize restores pH, and the Absolut range provides daily protection and shine."],
            ["Can I use Prohall products at home?", "Many products are suitable for home care. Heat-based smoothing services require close attention to the guide; consult a licensed professional whenever you are unsure."],
            ["How do I make my results last?", "Use sulfate-free aftercare, protect hair from excessive heat and chlorine, and follow the maintenance guidance for your chosen treatment."],
            ["Are the products suitable for every hair type?", "The collection supports a wide range of textures and concerns. Always review the product guide, perform recommended tests and adjust heat to your hair’s condition."]
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
          <p>Professional hair science<br />with Brazilian soul.</p>
          <div className="footer-nav">
            <a href="#products">Products</a>
            <a href="#finder">Find your routine</a>
            <a href="#results">Our science</a>
            <a href="/consult">Consultation</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Prohall Professional</span><span><a href="/privacy">Privacy</a> · Terms</span><span>Made for every texture.</span></div>
      </footer>
    </main>
  );
}
