import { useState, useEffect } from "react";

import sketch1 from "../assets/image0.jpeg";
import sketch2 from "../assets/image1.jpeg";
import sketch3 from "../assets/image2.jpeg";
import sketch4 from "../assets/image3.jpeg";
import sketch5 from "../assets/image4.jpeg";
import sketch6 from "../assets/image5.jpeg";

export default function Sketch() {
  const images = [sketch1, sketch2, sketch3, sketch4, sketch5, sketch6];

  const swipeThreshold = 50; // Minimum swipe distance in pixels
  // swipe controls
  const [activeIndex, setActiveIndex] = useState(null);
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
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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
      <div className="pt-6 px-6 md:px-12 max-w-full">
        <h1 className="text-3xl text-black text-center mb-6">Sketches</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12">
          {images.map((src, i) => (
            <article
              key={i}
              className="w-full rounded-lg overflow-hidden shadow-sm border hover:shadow-lg cursor-pointer bg-white"
              onClick={() => setActiveIndex(i)}
            >
              <img
                src={src}
                alt={`Sketch ${i + 1}`}
                className="w-full h-[28vh] sm:h-[34vh] md:h-[36vh] lg:h-[40vh] object-cover block"
                draggable={false}
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold">Project {i + 1}</h2>
                <p className="text-gray-600 mt-2">
                  Short description of sketch {i + 1}.
                </p>
              </div>
            </article>
          ))}
        </div>
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
