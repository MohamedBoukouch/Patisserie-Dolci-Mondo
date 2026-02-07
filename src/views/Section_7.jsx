import React, { useState, useEffect, useRef } from 'react';

const Section_7 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setTitleVisible(true), 300);
            setTimeout(() => setTextVisible(true), 600);
            setTimeout(() => setButtonVisible(true), 900);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Animation de défilement parallaxe
    const handleScroll = () => {
      if (sectionRef.current) {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calcul du progrès du défilement dans la section (0 à 1)
        const progress = 1 - Math.max(0, Math.min(1, rect.top / viewportHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Image de fond avec effet parallaxe */}
      <div 
        className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${scrollProgress * -50}px) scale(${1 + scrollProgress * 0.1})`,
        }}
      >
        <img
          src="../../public/images/shoop.jpg"
          alt="Dolcimondo Pâtisserie"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"
          style={{ opacity: 0.5 + scrollProgress * 0.5 }}
        ></div>
      </div>

      {/* Contenu texte */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8 lg:px-12 text-center text-white">
        {/* Titre principal avec animation */}
        <div className={`max-w-4xl mx-auto mb-6 md:mb-8 transition-all duration-1000 ${
          titleVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold font-cairo mb-4 md:mb-6 leading-tight">
            <span className="block">ما هو دولسيموندو؟</span>
            <span className="block text-amber-300 mt-2">What's Dolcimondo?</span>
          </h1>
        </div>

        {/* Description avec animation */}
        <div className={`max-w-2xl mx-auto mb-8 md:mb-12 transition-all duration-1000 delay-300 ${
          textVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-base md:text-lg lg:text-xl font-light font-cairo leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-2xl">
            دولسيموندو هو عالم من الحلويات الشرقية الراقية، حيث نجمع بين تقاليد الحلويات العربية الأصيلة 
            وتقنيات الباتيسري الفرنسية الحديثة. كل قطعة تحمل قصة من الإبداع والجودة، 
            مصنوعة بأيدٍ خبيرة وقلوبٍ تحب صناعة السعادة.
          </p>
        </div>

        {/* Bouton avec animation */}
        <div className={`transition-all duration-1000 delay-600 ${
          buttonVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-95'
        }`}>
          <button
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
            className="group relative px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold font-cairo rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 text-sm md:text-base lg:text-lg">
               DOLCI MONDO أكتشف 
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icône flèche */}
            <svg 
              className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        

        {/* Barre de progression du défilement */}
        {/* <div className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="flex flex-col items-center">
            <div className="h-40 w-1 bg-gray-800/30 rounded-full overflow-hidden">
              <div 
                className="w-full bg-gradient-to-b from-amber-400 to-amber-600 rounded-full transition-all duration-300"
                style={{ height: `${scrollProgress * 100}%` }}
              ></div>
            </div>
            <span className="text-white/70 text-xs mt-2 font-light">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div> */}
      </div>

      {/* Animation CSS pour le bouton */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Section_7;