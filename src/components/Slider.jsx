import { useState } from "react";
import { slides } from "../models/sliderData";

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${
            index === current ? "block" : "hidden"
          } w-full h-screen relative`}
        >
          {/* Slide Content */}
          {slide.type === "image" && (
            <img
              src={slide.src}
              alt={slide.text}
              className="w-full h-full object-cover"
            />
          )}
          {slide.type === "video" && (
            <video
              src={slide.src}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          )}
          {slide.type === "gif" && (
            <img
              src={slide.src}
              alt={slide.text}
              className="w-full h-full object-cover"
            />
          )}

          {/* Overlay for text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
            <div className=" p-8  text-center max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white font-cairo">{slide.text}</h2>
              <button className="font- mt-4 px-6 py-3 bg-amber-50 text-black font-semibold rounded-lg shadow-lg hover:bg-gray-300 transition">
                اكتشف
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full shadow-lg hover:bg-black/70 transition"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full shadow-lg hover:bg-black/70 transition"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Slider;
