import { notFound } from "next/navigation";
import { getProduct, getStepImage, products } from "../../../productData.es";
import ProductImageViewer from "../../../components/ProductImageViewer";
import VariantViewer from "../../../components/VariantViewer";
import VideoCarousel from "../../../components/VideoCarousel";

const categoryLabels = {
  Smoothing: "Alisado",
  Repair: "Reparación",
  Masks: "Mascarillas",
  Finishing: "Acabado"
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `Manual de uso de ${product.name} | Prohall Professional`,
    description: `Instrucciones de uso paso a paso de ${product.name}.`,
    alternates: {
      languages: {
        en: `/products/${slug}`,
        es: `/es/products/${slug}`
      }
    }
  };
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function ProductManualPageEs({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  return (
    <main className="manual-page">
      <header className="manual-header">
        <a className="logo" href="/es" aria-label="Inicio de Prohall Professional">
          PROHALL <small>PROFESSIONAL</small>
        </a>
        <div className="manual-header-links">
          <a className="manual-back" href="/es#manuals">← Todos los manuales</a>
          <a className="manual-consult-link" href={`/es/consult?prompt=${encodeURIComponent(`Estoy usando ${product.name} (${product.type}). Tengo una pregunta sobre cómo aplicarlo.`)}`}>
            Pregunta sobre este producto <ArrowIcon />
          </a>
        </div>
      </header>

      <section className="manual-hero">
        <div className="manual-hero-copy">
          <p className="overline">{categoryLabels[product.category] || product.category} · Manual del producto</p>
          <div className="manual-title-lockup">
            <h1>{product.name}</h1>
          </div>
          <p>{product.description}</p>
          <div className="manual-facts">
            <span><small>Formato</small>{product.size || product.note}</span>
            <span><small>Tiempo de rutina</small>{product.duration}</span>
            <span><small>Pasos</small>{product.steps.length} pasos guiados</span>
          </div>
          <a className="button primary" href="#manual-steps">Comenzar el manual <ArrowIcon /></a>
        </div>
        {product.variants ? (
          <VariantViewer product={product} sizeLabel="Tamaño" />
        ) : (
          <ProductImageViewer product={product} images={[product.image]} />
        )}
      </section>

      <section className="manual-prep">
        <div>
          <p className="overline">Antes de empezar</p>
          <h2>Prepara tu espacio.</h2>
        </div>
        <div className="manual-prep-details">
          {product.preparationNote && (
            <p className="manual-prep-note"><strong>Guía de cabello y calor</strong>{product.preparationNote}</p>
          )}
          <div className="tool-list">
            {product.tools.map((tool, index) => (
              <span key={tool}><b>{String(index + 1).padStart(2, "0")}</b>{tool}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="manual-tutorial">
        <div className="manual-tutorial-copy">
          <p className="overline">Míralo primero</p>
          <h2>Mira la rutina<br />antes de empezar.</h2>
          <p>Reproduce el tutorial completo del producto y luego sigue los pasos ilustrados a tu ritmo.</p>
        </div>
        <div className="manual-tutorial-player">
          {product.videos ? (
            <VideoCarousel videos={product.videos} productName={product.name} />
          ) : product.videoUrl ? (
            <video
              src={product.videoUrl}
              controls
              playsInline
              preload="metadata"
              aria-label={`Vídeo de uso de ${product.name}`}
            />
          ) : (
            <div className="manual-video-pending">
              <span>Vídeo próximamente</span>
              <p>Sigue el manual ilustrado completo mientras preparamos el tutorial oficial de este producto.</p>
            </div>
          )}
        </div>
      </section>

      <section className="manual-steps" id="manual-steps">
        <div className="manual-steps-heading">
          <p className="overline">Paso a paso</p>
          <h2>Úsalo con<br /><em>confianza.</em></h2>
          <p>Sigue cada paso en orden. Ten la etiqueta del producto a mano y respeta cualquier indicación impresa en tu envase.</p>
        </div>
        <div className="step-manual-list">
          {(product.stepGroups
            ? product.stepGroups.reduce((groups, group) => {
                const start = groups.reduce((sum, g) => sum + g.steps.length, 0);
                groups.push({ heading: group.heading, start, steps: product.steps.slice(start, start + group.size) });
                return groups;
              }, [])
            : [{ heading: null, start: 0, steps: product.steps }]
          ).map((group) => (
            <div className="step-group" key={group.heading || "steps"}>
              {group.heading && <h3 className="step-group-heading">{group.heading}</h3>}
              {group.steps.map(([title, instruction], index) => (
                <article className="manual-step" key={`${group.heading || "steps"}-${index}`}>
                  <div className={`manual-step-visual tone-${product.tone}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <img
                      src={getStepImage(product, group.start + index)}
                      className={getStepImage(product, group.start + index) === product.image ? "step-image-fallback" : undefined}
                      alt={`${product.name}: ${title}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="manual-step-copy">
                    <span>Paso {String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{instruction}</p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>

      <aside className="manual-caution">
        <span>Importante</span>
        <div>
          <h2>Úsalo con cuidado.</h2>
          <p>{product.caution}</p>
        </div>
      </aside>

      <section className="manual-finish">
        <div>
          <p className="overline">Todo listo</p>
          <h2>¿Lista para tu<br />rutina Prohall?</h2>
        </div>
        <div className="manual-finish-actions">
          <a className="button navy" href={`/es/consult?prompt=${encodeURIComponent(`Estoy usando ${product.name} (${product.type}). Tengo una pregunta sobre cómo aplicarlo.`)}`}>
            Pregunta al consultor <ArrowIcon />
          </a>
          {product.amazonUrl && (
            <a className="button primary" href={product.amazonUrl} target="_blank" rel="noreferrer">Comprar en Amazon <ArrowIcon /></a>
          )}
          <a className="button secondary" href="/es#manuals">Todos los manuales</a>
        </div>
      </section>

      <footer className="manual-footer">
        <a className="logo" href="/es">PROHALL <small>PROFESSIONAL</small></a>
        <p>Cuidado profesional. Cabello extraordinario.</p>
      </footer>
    </main>
  );
}
