"use client";

import { useEffect, useRef, useState } from "react";

const zoomLevels = [1, 1.5, 2, 2.5];

export default function ProductImageViewer({ product, images }) {
  const gallery = [...new Set(images?.length ? images : [product.image])];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragStart = useRef(null);
  const zoom = zoomLevels[zoomIndex];
  const selectedImage = gallery[selectedIndex];

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setLightboxOpen(false);
    };
    document.body.classList.add("menu-lock");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-lock");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [lightboxOpen]);

  const openLightbox = () => {
    setZoomIndex(1);
    setPan({ x: 0, y: 0 });
    setLightboxOpen(true);
  };

  const changeZoom = (direction) => {
    setZoomIndex((current) => Math.max(0, Math.min(zoomLevels.length - 1, current + direction)));
    setPan({ x: 0, y: 0 });
  };

  const moveMagnifier = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  const beginDrag = (event) => {
    if (zoom === 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { pointerX: event.clientX, pointerY: event.clientY, panX: pan.x, panY: pan.y };
  };

  const dragImage = (event) => {
    if (!dragStart.current) return;
    setPan({
      x: dragStart.current.panX + event.clientX - dragStart.current.pointerX,
      y: dragStart.current.panY + event.clientY - dragStart.current.pointerY
    });
  };

  const endDrag = () => {
    dragStart.current = null;
  };

  return (
    <>
      <div className={`manual-hero-product product-viewer tone-${product.tone}`}>
        <div className="product-viewer-top">
          <span>Selected product</span>
          <span>Hover to zoom · Click to expand</span>
        </div>

        <div className="product-gallery">
          <div className="product-thumbnails" aria-label={`${product.name} image gallery`}>
            {gallery.map((image, index) => (
              <button
                className={selectedIndex === index ? "active" : ""}
                type="button"
                key={image}
                onClick={() => {
                  setSelectedIndex(index);
                  setHovering(false);
                }}
                aria-label={`View ${product.name} image ${index + 1}`}
                aria-pressed={selectedIndex === index}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>

          <button
            className={hovering ? "product-zoom-stage hovering" : "product-zoom-stage"}
            type="button"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onMouseMove={moveMagnifier}
            onClick={openLightbox}
            aria-label={`Open expanded view of ${product.name}`}
          >
            <img
              src={selectedImage}
              alt={`${product.name} product packaging`}
              style={{ "--hover-origin": origin }}
            />
            <span className="expand-hint">Click to expand</span>
          </button>
        </div>

        <div className="product-viewer-bottom">
          <div>
            <small>{product.type}</small>
            <strong>{product.name}</strong>
          </div>
          <button className="open-zoom-button" type="button" onClick={openLightbox}>
            Zoom image <span>↗</span>
          </button>
        </div>
      </div>

      {lightboxOpen && (
        <div className="product-lightbox" role="dialog" aria-modal="true" aria-label={`${product.name} expanded product image`}>
          <button className="lightbox-backdrop" type="button" onClick={() => setLightboxOpen(false)} aria-label="Close image viewer" />
          <div className="lightbox-panel">
            <div className="lightbox-header">
              <div><small>Product image</small><strong>{product.name}</strong></div>
              <button type="button" onClick={() => setLightboxOpen(false)} aria-label="Close image viewer">×</button>
            </div>
            <div
              className={zoom > 1 ? "lightbox-image is-zoomed" : "lightbox-image"}
              onPointerDown={beginDrag}
              onPointerMove={dragImage}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <img
                src={selectedImage}
                alt={`${product.name} enlarged product packaging`}
                draggable="false"
                style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
                onDoubleClick={() => {
                  setZoomIndex((current) => current === 0 ? 2 : 0);
                  setPan({ x: 0, y: 0 });
                }}
              />
            </div>
            <div className="lightbox-footer">
              <span>{zoom > 1 ? "Drag to inspect · Double-click to reset" : "Double-click to zoom"}</span>
              <div className="zoom-controls">
                <button type="button" onClick={() => changeZoom(-1)} disabled={zoomIndex === 0} aria-label="Zoom out">−</button>
                <span>{Math.round(zoom * 100)}%</span>
                <button type="button" onClick={() => changeZoom(1)} disabled={zoomIndex === zoomLevels.length - 1} aria-label="Zoom in">+</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
