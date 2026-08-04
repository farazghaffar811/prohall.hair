"use client";

import { useState } from "react";

export default function VideoCarousel({ videos, productName }) {
  const [index, setIndex] = useState(0);
  const current = videos[index];

  return (
    <div className="video-carousel">
      <div className="video-carousel-tabs" role="tablist" aria-label={`${productName} tutorial videos`}>
        {videos.map((video, i) => (
          <button
            key={video.label}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? "active" : ""}
            onClick={() => setIndex(i)}
          >
            {video.label}
          </button>
        ))}
      </div>
      <video
        key={current.url}
        src={current.url}
        controls
        playsInline
        preload="metadata"
        aria-label={`${productName} ${current.label} tutorial video`}
      />
      <div className="video-carousel-nav">
        <button
          type="button"
          onClick={() => setIndex((index - 1 + videos.length) % videos.length)}
          aria-label="Previous video"
        >
          ←
        </button>
        <span>{current.label} · {index + 1} / {videos.length}</span>
        <button
          type="button"
          onClick={() => setIndex((index + 1) % videos.length)}
          aria-label="Next video"
        >
          →
        </button>
      </div>
    </div>
  );
}
