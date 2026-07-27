"use client";

import { useState } from "react";

const products = [
  {
    name: "Select One",
    type: "Smoothing treatment",
    note: "Formaldehyde-free",
    image: "/images/select-one.jpg",
    className: "peach"
  },
  {
    name: "Force Hair",
    type: "Strengthening system",
    note: "3-step ritual",
    image: "/images/force-hair.png",
    className: "sage"
  },
  {
    name: "Equalize",
    type: "pH balancing mask",
    note: "Repair + shine",
    image: "/images/equalize.webp",
    className: "lilac"
  }
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);

  return (
    <main>
      <div className="announcement">
        <span>Brazilian hair science. Professional results.</span>
        <a href="#support">Product support <Arrow /></a>
      </div>

      <nav className="nav">
        <a className="wordmark" href="#">PROHALL<span>PROFESSIONAL</span></a>
        <div className={`navlinks ${menuOpen ? "open" : ""}`}>
          <a href="#products" onClick={() => setMenuOpen(false)}>Treatments</a>
          <a href="#ritual" onClick={() => setMenuOpen(false)}>Our approach</a>
          <a href="#results" onClick={() => setMenuOpen(false)}>Results</a>
          <a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a>
        </div>
        <div className="nav-actions">
          <button className="lang">EN⌄</button>
          <a className="pill dark" href="#support">Get support <Arrow /></a>
          <button className="menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><i /> PROFESSIONAL HAIRCARE, MADE IN BRAZIL</p>
          <h1>Hair that feels<br />like <em>you</em> again.</h1>
          <p className="intro">High-performance treatments that transform texture, restore strength and reveal extraordinary shine—without compromise.</p>
          <div className="hero-cta">
            <a className="pill coral" href="#products">Explore treatments <Arrow /></a>
            <a className="text-link" href="#ritual">Find your ritual <span>→</span></a>
          </div>
          <div className="proof">
            <strong>FORMALDEHYDE-FREE</strong>
            <strong>CRUELTY-FREE</strong>
            <strong>PRO-APPROVED</strong>
          </div>
        </div>
        <div className="hero-visual">
          <div className="halo" />
          <img src="/images/hero.jpg" alt="Model with glossy, healthy curls" />
          <div className="hero-card">
            <small>THE ICON</small>
            <b>Select One</b>
            <span>Smoother hair. Up to 6 months.</span>
          </div>
          <div className="scroll">SCROLL TO DISCOVER <span>↓</span></div>
        </div>
      </section>

      <section className="statement" id="ritual">
        <p className="eyebrow center"><i /> THE PROHALL DIFFERENCE</p>
        <h2>We don’t tame hair.<br />We <em>understand</em> it.</h2>
        <p>Born in Brazil and trusted by professionals, our formulas pair advanced hair science with restorative ingredients—so every texture can look and feel its strongest.</p>
        <div className="stats">
          <div><b>20+</b><span>YEARS OF EXPERTISE</span></div>
          <div><b>40+</b><span>COUNTRIES WORLDWIDE</span></div>
          <div><b>6 mo</b><span>LONG-LASTING RESULTS</span></div>
        </div>
      </section>

      <section className="products" id="products">
        <div className="section-head">
          <div><p className="eyebrow"><i /> YOUR HAIR, YOUR RITUAL</p><h2>Meet the essentials.</h2></div>
          <a className="text-link" href="#support">View all products <span>→</span></a>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <article className={`product-card ${product.className}`} key={product.name}>
              <div className="card-top"><span>0{index + 1}</span><span>{product.note}</span></div>
              <div className="product-image"><img src={product.image} alt={`${product.name} product`} /></div>
              <div className="product-info">
                <div><p>{product.type}</p><h3>{product.name}</h3></div>
                <button aria-label={`Explore ${product.name}`}>↗</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="results" id="results">
        <div className="result-image">
          <img src="/images/results.jpg" alt="Woman with healthy, sleek hair" />
          <span>REAL HAIR · REAL RESULTS</span>
        </div>
        <div className="result-copy">
          <p className="eyebrow"><i /> TRANSFORMATION, NOT A QUICK FIX</p>
          <h2>Less frizz.<br />More <em>freedom.</em></h2>
          <p>Our professional-grade treatments work within the hair fiber—not just on the surface—to improve manageability, softness and shine that lasts.</p>
          <ul>
            <li><span>01</span><b>Deep repair</b><p>Replenishes compromised hair fibers</p></li>
            <li><span>02</span><b>Texture control</b><p>Smooths frizz while honoring movement</p></li>
            <li><span>03</span><b>Luminous finish</b><p>Seals the cuticle for reflective shine</p></li>
          </ul>
          <a className="pill dark" href="#support">Find your treatment <Arrow /></a>
        </div>
      </section>

      <section className="support" id="support">
        <div>
          <p className="eyebrow light"><i /> HERE WHEN YOU NEED US</p>
          <h2>Better hair starts<br />with better guidance.</h2>
        </div>
        <div className="support-right">
          <p>From choosing the right treatment to mastering every step, our product specialists are ready to help.</p>
          <a className="pill cream" href="mailto:support@prohall.hair">Talk to a specialist <Arrow /></a>
        </div>
      </section>

      <section className="faq" id="journal">
        <div><p className="eyebrow"><i /> GOOD TO KNOW</p><h2>Your questions,<br /><em>answered.</em></h2></div>
        <div className="accordions">
          {[
            ["Which treatment is right for me?", "Select One is best for long-lasting smoothing, Force Hair supports weak or damaged hair, and Equalize restores pH and softness after chemical services."],
            ["Are Prohall treatments formaldehyde-free?", "Select One is presented as a formaldehyde-free smoothing treatment. Always review the product label and perform a strand and patch test before use."],
            ["Can I use the products at home?", "Many products support at-home use, but heat-based chemical services require careful instructions. When in doubt, consult a licensed professional."],
            ["How do I make my results last?", "Use sulfate-free aftercare, minimize chlorine exposure, protect hair from high heat and follow the maintenance schedule for your chosen treatment."]
          ].map((item, index) => (
            <button className={`faq-row ${faqOpen === index ? "active" : ""}`} key={item[0]} onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}>
              <span><b>0{index + 1}</b>{item[0]}</span><i>{faqOpen === index ? "−" : "+"}</i>
              <p>{item[1]}</p>
            </button>
          ))}
        </div>
      </section>

      <footer>
        <a className="wordmark footer-logo" href="#">PROHALL<span>PROFESSIONAL</span></a>
        <p>Professional hair science,<br />made with Brazilian soul.</p>
        <div className="footer-links"><a href="#products">Treatments</a><a href="#ritual">About</a><a href="#support">Support</a><a href="https://www.instagram.com/" target="_blank">Instagram ↗</a></div>
        <div className="legal">© 2026 Prohall Professional <span>Privacy · Terms</span><span>Made for every texture.</span></div>
      </footer>
    </main>
  );
}
