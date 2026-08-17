"use client";

import { useState } from "react";
import ProductImageViewer from "./ProductImageViewer";

export default function VariantViewer({ product }) {
  const [index, setIndex] = useState(0);
  const variant = product.variants[index];

  return (
    <div className="variant-viewer">
      <div className="variant-picker" role="group" aria-label={`${product.name} size`}>
        <span>Size</span>
        {product.variants.map((v, i) => (
          <button
            key={v.label}
            type="button"
            aria-pressed={i === index}
            className={i === index ? "active" : ""}
            onClick={() => setIndex(i)}
          >
            {v.label}
          </button>
        ))}
      </div>
      <ProductImageViewer
        key={variant.image}
        product={{ ...product, size: variant.label, image: variant.image }}
        images={[variant.image]}
      />
    </div>
  );
}
