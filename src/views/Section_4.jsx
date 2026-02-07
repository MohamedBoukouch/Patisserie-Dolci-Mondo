import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";

const Section_4 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const sectionRef = useRef(null);
  const { t, i18n } = useTranslation();


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setTitleVisible(true), 300);
            setTimeout(() => setButtonVisible(true), 600);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="font-cairo w-full min-h-[60vh] md:min-h-screen bg-gradient-to-b from-amber-50/30 to-white flex items-center justify-center py-12 md:py-20"
    >
      <div className={`text-center max-w-2xl px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* العنوان الصغير */}
        <p className="text-xs tracking-widest text-gray-500 uppercase mb-6 md:mb-8 font-light">
        {t("section4.subtitle")}
        </p>

        {/* العنوان الرئيسي avec animation séparée pour chaque ligne */}
        <div className="">
          <h2 className={`text-4xl md:text-6xl lg:text-7xl font-light text-gray-800 mb-8 md:mb-12 font-cairo italic leading-tight transition-all duration-700 delay-200 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {t("section4.titleLine1")} 
            <br />
            {t("section4.titleLine2")}
          </h2>
        </div>

        {/* زر الاكتشاف avec animation */}
        <div className={`flex justify-center transition-all duration-700 delay-400 ${
          buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={() => window.location.href = '/allproducts'}
            className="px-8 md:px-12 py-3 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 font-light text-sm font-cairo transform hover:scale-105"
          >
             {t("section4.button")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section_4;