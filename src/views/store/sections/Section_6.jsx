import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";

const Section_6 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState([false, false, false]);
  const [separatorVisible, setSeparatorVisible] = useState(false);
  const sectionRef = useRef(null);
  const { t, i18n } = useTranslation();


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Animations séquentielles
            setTimeout(() => setTitleVisible(true), 200);
            setTimeout(() => setTextVisible(true), 400);
            
            // Animations pour les statistiques
            statsVisible.forEach((_, index) => {
              setTimeout(() => {
                setStatsVisible(prev => {
                  const newArr = [...prev];
                  newArr[index] = true;
                  return newArr;
                });
              }, 600 + (index * 200));
            });
            
            setTimeout(() => setSeparatorVisible(true), 1200);
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
    <div 
      ref={sectionRef}
      className={`w-full py-12 md:py-16 lg:py-24  bg-white transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Titre principal avec animation */}
        <div className={`text-center mb-8 md:mb-12 lg:mb-16 transition-all duration-700 delay-100 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-gray-800 mb-3 md:mb-4">
           DOLCI MONDO
          </h2>
          <div className={`w-20 md:w-24 h-1 bg-gradient-to-l from-amber-400 to-pink-400 mx-auto transition-all duration-1000 delay-300 ${
            titleVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}></div>
        </div>

        {/* Contenu principal */}
        <div className="max-w-3xl lg:max-w-4xl mx-auto">
          {/* Paragraphe principal avec animation */}
          {/* <p className={`text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed text-center mb-8 md:mb-10 lg:mb-12 transition-all duration-700 delay-200 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            منذ عام 2010، يُمثل بيت دولسيموندو التميز في الحلويات الشرقية 
            مع لمسة عصرية. نحن مؤسسة رائدة، نتحدى كل يوم 
            لنوفق بين التقاليد والابتكار بإبداع من خلال مأكولاتنا الشهية.
          </p> */}
          <p className={`text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed text-center mb-8 md:mb-10 lg:mb-12 transition-all duration-700 delay-200 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {t('section6.description').split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>

          {/* Statistiques avec animations individuelles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-10 lg:mb-12">
            {statsVisible.map((isStatVisible, index) => {
              const stats = [
                { number: "+14", label: "section6.stats1" },
                { number: "+50", label: "section6.stats2" },
                { number: "3", label: "section6.stats3" }
              ];
              
              return (
                <div 
                  key={index}
                  className={`text-center transition-all duration-500 ${
                    isStatVisible 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-90 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${600 + (index * 200)}ms` }}
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-600 mb-1 md:mb-2 transform hover:scale-110 transition-transform duration-300">
                    {stats[index].number}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 font-medium">
                    {t(stats[index].label)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Séparateur décoratif avec animation */}
          <div className={`flex justify-center items-center space-x-3 md:space-x-4 space-x-reverse mb-8 md:mb-10 lg:mb-12 transition-all duration-700 delay-1000 ${
            separatorVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className={`w-8 md:w-10 lg:w-12 h-0.5 bg-amber-300 transition-all duration-1000 ${
              separatorVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}></div>
            <div className={`text-amber-500 text-lg md:text-xl transition-all duration-700 delay-1200 ${
              separatorVisible ? 'rotate-180 opacity-100' : 'rotate-0 opacity-0'
            }`}>
              ✦
            </div>
            <div className={`w-8 md:w-10 lg:w-12 h-0.5 bg-amber-300 transition-all duration-1000 ${
              separatorVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section_6;