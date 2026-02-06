import React, { useState, useEffect, useRef } from 'react';

const Section_3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setContentVisible(true), 300);
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
      className="relative w-full h-[60vh] md:h-screen overflow-hidden"
    >
      {/* الصورة الكاملة avec animation de zoom */}
      <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-90'
      }`}>
        <img
          src="/images/section_3.webp"
          alt="Collection"
          className="w-full h-full object-cover"
        />
      </div>

      {/* صندوق المحتوى avec animation et responsive */}
      <div className={`absolute md:top-1/2 top-1/2 md:right-20 right-4 left-4 md:left-auto transform -translate-y-1/2 bg-white/95 backdrop-blur-sm p-6 md:p-12 max-w-full md:max-w-md transition-all duration-700 delay-300 ${
        contentVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-10'
      }`}>
        {/* العنوان */}
        <h2 className="text-2xl md:text-4xl font-light text-gray-800 mb-6 md:mb-8 text-center font-cairo leading-relaxed">
          مجموعة المشروبات الساخنة
        </h2>

        {/* النقاط الزخرفية */}
        <div className="flex justify-center gap-1 mb-6 md:mb-8">
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        </div>

        {/* الوصف */}
        <p className="text-center text-gray-600 font-light leading-relaxed mb-8 md:mb-10 font-cairo text-sm md:text-base">
          ماكارون وأوجيني: اكتشف عطورنا الجديدة والحصرية، المستوحاة من روح مشروباتنا الساخنة المميزة.
        </p>

        {/* زر الاكتشاف */}
        <div className="flex justify-center">
          <button
            onClick={() => window.location.href = '/collection'}
            className="px-6 md:px-10 py-2 md:py-3 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 font-light text-xs md:text-sm font-cairo"
          >
            اكتشف المزيد
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section_3;