import { notFound } from "next/navigation";
import { getProduct, getStepImage, products } from "../../productData";
import ProductImageViewer from "../../components/ProductImageViewer";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} Usage Manual | Prohall Professional`,
    description: `Step-by-step usage instructions for ${product.name}.`
  };
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function ProductManualPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  return (
    <main className="manual-page">
      <header className="manual-header">
        <a className="logo" href="/" aria-label="Prohall Professional home">
          PROHALL <small>PROFESSIONAL</small>
        </a>
        <a className="manual-back" href="/#products">← All products</a>
      </header>

      <section className="manual-hero">
        <div className="manual-hero-copy">
          <p className="overline">{product.category} · Product manual</p>
          <div className="manual-title-lockup">
            <h1>{product.name}</h1>
          </div>
          <p>{product.description}</p>
          <div className="manual-facts">
            <span><small>Format</small>{product.size || product.note}</span>
            <span><small>Routine time</small>{product.duration}</span>
            <span><small>Steps</small>{product.steps.length} guided steps</span>
          </div>
          <a className="button primary" href="#manual-steps">Start the manual <ArrowIcon /></a>
        </div>
        <ProductImageViewer product={product} images={[product.image]} />
      </section>

      <section className="manual-prep">
        <div>
          <p className="overline">Before you begin</p>
          <h2>Prepare your setup.</h2>
        </div>
        <div className="tool-list">
          {product.tools.map((tool, index) => (
            <span key={tool}><b>{String(index + 1).padStart(2, "0")}</b>{tool}</span>
          ))}
        </div>
      </section>

      <section className="manual-tutorial">
        <div className="manual-tutorial-copy">
          <p className="overline">Watch first</p>
          <h2>See the routine<br />before you begin.</h2>
          <p>Play the complete product tutorial, then follow the illustrated steps directly below at your own pace.</p>
        </div>
        <div className="manual-tutorial-player">
          {product.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${product.youtubeId}?rel=0`}
              title={`${product.name} usage video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="manual-video-pending">
              <span>Video coming soon</span>
              <p>Follow the complete illustrated manual below while we prepare this product’s official tutorial.</p>
            </div>
          )}
        </div>
      </section>

      <section className="manual-steps" id="manual-steps">
        <div className="manual-steps-heading">
          <p className="overline">Step-by-step</p>
          <h2>Use it with<br /><em>confidence.</em></h2>
          <p>Work through each step in order. Keep the product label nearby and follow any instructions printed on your specific packaging.</p>
        </div>
        <div className="step-manual-list">
          {product.steps.map(([title, instruction], index) => (
            <article className="manual-step" key={title}>
              <div className={`manual-step-visual tone-${product.tone}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <img src={getStepImage(product, index)} alt={`${product.name}: ${title}`} loading="lazy" />
              </div>
              <div className="manual-step-copy">
                <span>Step {String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{instruction}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="manual-caution">
        <span>Important</span>
        <div>
          <h2>Use with care.</h2>
          <p>{product.caution}</p>
        </div>
      </aside>

      <section className="manual-finish">
        <div>
          <p className="overline">You’re all set</p>
          <h2>Ready for your<br />Prohall routine?</h2>
        </div>
        <div className="manual-finish-actions">
          {product.amazonUrl && (
            <a className="button primary" href={product.amazonUrl} target="_blank" rel="noreferrer">Buy on Amazon <ArrowIcon /></a>
          )}
          <a className="button secondary" href="/#products">Explore more products</a>
        </div>
      </section>

      <footer className="manual-footer">
        <a className="logo" href="/">PROHALL <small>PROFESSIONAL</small></a>
        <p>Professional care. Remarkable hair.</p>
      </footer>
    </main>
  );
}
