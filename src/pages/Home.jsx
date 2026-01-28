import { useState, useEffect } from "react";

import img1 from "../assets/IMG_0051.JPG";
import img2 from "../assets/IMG_0054.JPG";
import img3 from "../assets/tgtbtu.png";
import img4 from "../assets/Untitled_Artwork.png";
import img5 from "../assets/boat.png";

export default function Home() {
  const images = [img1, img2, img3, img4, img5];
  const [activeIndex, setActiveIndex] = useState(null);
    const swipeThreshold = 50; // Minimum swipe distance in pixels
  // swipe controls
  const [touchStartX, setTouchStartX] = useState(null);

  const close = () => setActiveIndex(null);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);

  const onTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchStartX - touchEndX;

    if (delta > SWIPE_THRESHOLD) next();
    if (delta < -SWIPE_THRESHOLD) prev();

    setTouchStartX(null);
  };
  // Keyboard controls
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }

      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }

      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images.length]);

    // Preload all images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // Preload neighbors
  useEffect(() => {
    if (activeIndex === null) return;

    const preload = (i) => {
      const img = new Image();
      img.src = images[i];
    };

    preload((activeIndex + 1) % images.length);
    preload((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images]);

  return (
    <section className="w-full bg-white relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 w-full max-w-full">
        {images.map((src, i) => (
          <div
            key={i}
            className="w-full h-[50vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] bg-center bg-cover cursor-pointer"
            style={{
              backgroundImage: `url(${src})`,
              backgroundAttachment:
                typeof window !== "undefined" && window.innerWidth > 768
                  ? "fixed"
                  : "scroll",
              backgroundPosition: "center",
            }}
            onClick={() => setActiveIndex(i)}
          >
            {/* overlay text */}
            <div className="w-full h-full bg-black/25 flex items-end">
              <div className="p-6 text-white">
                <h2 className="text-xl font-semibold">
                  Artwork {i + 1}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN MODAL */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <img
            src={images[activeIndex]}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />

          {/* Optional arrows (desktop hint) */}
          <button
            className="absolute left-4 text-white text-4xl hidden md:block"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            ‹
          </button>
          <button
            className="absolute right-4 text-white text-4xl hidden md:block"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
