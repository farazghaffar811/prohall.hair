"use client";

import { useState } from "react";

const zoomLevels = [1, 1.35, 1.7, 2];

export default function ProductImageViewer({ product }) {
  const [zoomIndex, setZoomIndex] = useState(0);
  const zoom = zoomLevels[zoomIndex];

  const zoomIn = () => setZoomIndex((current) => Math.min(current + 1, zoomLevels.length - 1));
  const zoomOut = () => setZoomIndex((current) => Math.max(current - 1, 0));
  const toggleZoom = () => setZoomIndex((current) => current === 0 ? 2 : 0);

  return (
    <div className={`manual-hero-product product-viewer tone-${product.tone}`}>
      <div className="product-viewer-top">
        <span>Selected product</span>
        <span>Click image to {zoomIndex === 0 ? "zoom in" : "zoom out"}</span>
      </div>

      <button
        className={zoomIndex > 0 ? "product-zoom-stage zoomed" : "product-zoom-stage"}
        type="button"
        onClick={toggleZoom}
        aria-label={`${zoomIndex === 0 ? "Zoom in on" : "Zoom out from"} ${product.name}`}
        aria-pressed={zoomIndex > 0}
      >
        <img
          src={product.image}
          alt={`${product.name} product packaging`}
          style={{ "--product-zoom": zoom }}
        />
      </button>

      <div className="product-viewer-bottom">
        <div>
          <small>{product.type}</small>
          <strong>{product.name}</strong>
        </div>
        <div className="zoom-controls" aria-label="Product image zoom controls">
          <button type="button" onClick={zoomOut} disabled={zoomIndex === 0} aria-label="Zoom out">−</button>
          <span>{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={zoomIn} disabled={zoomIndex === zoomLevels.length - 1} aria-label="Zoom in">+</button>
        </div>
      </div>
    </div>
  );
}
