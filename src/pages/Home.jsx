import { useState, useEffect } from "react";

import img1 from "../assets/IMG_0051.JPG";
import img2 from "../assets/IMG_0054.JPG";
import img3 from "../assets/tgtbtu.png";
import img4 from "../assets/Untitled_Artwork.png";
import img5 from "../assets/boat.png";

export default function Home() {
  const images = [img1, img2, img3, img4, img5];
  const [activeIndex, setActiveIndex] = useState(null);

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
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setActiveIndex(null)}
        >
          <img
            src={images[activeIndex]}
            alt={`Artwork ${activeIndex + 1}`}
            className="max-w-[95vw] max-h-[95vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setActiveIndex(null)}
          >
            ×
          </button>

          {/* Navigation hint */}
          <div className="absolute bottom-6 text-gray-300 text-sm">
            ← / → navigate · ESC close
          </div>
        </div>
      )}
    </section>
  );
}
