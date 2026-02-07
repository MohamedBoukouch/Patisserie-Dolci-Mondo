import React, { useState, useEffect, useRef } from 'react';

const Section_8 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [itemsVisible, setItemsVisible] = useState([false, false, false, false]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Animation séquentielle pour chaque avantage
            const timers = [];
            itemsVisible.forEach((_, index) => {
              timers.push(setTimeout(() => {
                setItemsVisible(prev => {
                  const newArr = [...prev];
                  newArr[index] = true;
                  return newArr;
                });
              }, 200 * (index + 1)));
            });
            
            return () => timers.forEach(t => clearTimeout(t));
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

  const services = [
    {
      id: 1,
      title: "التوصيل إلى المنزل",
      description: "في فرنسا وأوروبا. مجاني ابتداءً من 75 يورو في فرنسا (انظر الشروط).",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "سلسلة التبريد",
      description: "شحن الطلبات بدرجة حرارة مُتحكم بها عشية يوم التوصيل.",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      id: 3,
      title: "منتجات محمية",
      description: "تغليف من مواد قابلة لإعادة التدوير لحماية مثالية للمنتجات.",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "خدمة العملاء",
      description: "من الاثنين إلى الجمعة، من 9 صباحًا حتى 5 مساءً عبر النموذج على موقعنا الإلكتروني.",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`w-full py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      dir="rtl"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Titre principal */}
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-3 md:mb-4">
            خدماتنا وضماناتنا
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-amber-400 to-pink-400 mx-auto"></div>
          <p className="text-gray-600 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            نضمن لكم تجربة تسوق مريحة وآمنة مع DOLCI MONDO
          </p>
        </div>

        {/* Grille des avantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`bg-white rounded-xl transition-all duration-500 p-6 md:p-8 border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-2 ${
                itemsVisible[index] 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 translate-y-6'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              {/* Icône avec fond décoratif */}
              <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-amber-50 to-pink-50 text-amber-600">
                {service.icon}
              </div>

              {/* Titre du service */}
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 font-cairo">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 flex-grow font-light">
                {service.description}
              </p>

              {/* Ligne décorative */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-amber-300 to-pink-300 mt-2"></div>

              {/* Badge supplémentaire pour certains services */}
              {/* {service.id === 1 && (
                <span className="mt-4 inline-block px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full font-medium">
                  مجاني من 75 يورو
                </span>
              )} */}
              
              {/* {service.id === 2 && (
                <span className="mt-4 inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">
                  درجة حرارة مُتحكم بها
                </span>
              )} */}
              
              {/* {service.id === 3 && (
                <span className="mt-4 inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full font-medium">
                  مواد قابلة لإعادة التدوير
                </span>
              )} */}
              
              {/* {service.id === 4 && (
                <span className="mt-4 inline-block px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded-full font-medium">
                  متاح 5 أيام في الأسبوع
                </span>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section_8;