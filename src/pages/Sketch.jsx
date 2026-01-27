import { useState, useEffect } from "react";

import sketch1 from "../assets/image0.jpeg";
import sketch2 from "../assets/image1.jpeg";
import sketch3 from "../assets/image2.jpeg";
import sketch4 from "../assets/image3.jpeg";
import sketch5 from "../assets/image4.jpeg";
import sketch6 from "../assets/image5.jpeg";

export default function Sketch() {
  const sketches = [
    sketch1,
    sketch2,
    sketch3,
    sketch4,
    sketch5,
    sketch6,
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  // Keyboard controls
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }

      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % sketches.length);
      }

      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === 0 ? sketches.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, sketches.length]);

  return (
    <section className="w-full bg-white relative">
      <div className="pt-6 px-6 md:px-12 max-w-full">
        <h1 className="text-3xl text-black text-center mb-6">
          Sketches
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12">
          {sketches.map((src, i) => (
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
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setActiveIndex(null)}
        >
          <img
            src={sketches[activeIndex]}
            alt="Fullscreen sketch"
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

          {/* Navigation hints (optional UI) */}
          <div className="absolute bottom-6 text-gray-300 text-sm">
            ← / → navigate · ESC close
          </div>
        </div>
      )}
    </section>
  );
}
