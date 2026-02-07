import { useEffect, useState } from "react";
import { slides } from "../models/sliderData";

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  // 🔁 Auto slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [current]);

  if (!Array.isArray(slides) || slides.length === 0) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* IMAGE */}
          {slide.type === "image" && (
            <img
              src={slide.src}
              alt={slide.text}
              className="w-full h-full object-cover"
            />
          )}

          {/* VIDEO */}
          {slide.type === "video" && (
            <video
              src={slide.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          )}

          {/* GIF */}
          {slide.type === "gif" && (
            <img
              src={slide.src}
              alt={slide.text}
              className="w-full h-full object-cover"
            />
          )}

          {/* TEXT OVERLAY - Texte au centre */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">
              <h2 className="text-white font-cairo font-bold 
                             text-2xl sm:text-3xl md:text-5xl mb-4">
                {slide.text}
              </h2>
            </div>
          </div>

          {/* Bouton en bas */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center px-4">
            <button className="px-5 py-2 bg-white text-gray-800 
                               font-medium shadow-lg hover:bg-gray-100 transition
                               transform hover:scale-105">
              اكتشف
            </button>
          </div>
        </div>
      ))}

      {/* LEFT BUTTON */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2
                   bg-black/50 text-white w-10 h-10
                   flex items-center justify-center
                   hover:bg-black/70 transition z-20"
      >
        ❮
      </button> */}

      {/* RIGHT BUTTON */}
      {/* <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2
                   bg-black/50 text-white w-10 h-10
                   flex items-center justify-center
                   hover:bg-black/70 transition z-20"
      >
        ❯
      </button> */}
    </div>
  );
};

export default Slider;