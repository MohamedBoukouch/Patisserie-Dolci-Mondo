import React, { useState, useEffect } from 'react';
import { products } from '../models/products';
import { specialProducts } from '../models/specialProducts';

const categories = ['ماكارون', 'شوكولاتة', 'هدايا', 'جديد', 'عرض الكل'];

const Section_1 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(Array(7).fill(false));

  useEffect(() => {
    // Animation pour la section entière
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Animation séquentielle pour chaque produit
      const timers = [];
      itemsVisible.forEach((_, index) => {
        timers.push(setTimeout(() => {
          setItemsVisible(prev => {
            const newArr = [...prev];
            newArr[index] = true;
            return newArr;
          });
        }, 100 * (index + 1)));
      });
      
      return () => timers.forEach(t => clearTimeout(t));
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      className={`w-full py-8 md:py-16 bg-gradient-to-b from-rose-50/30 to-white px-4 md:px-[10px] transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* العنوان مع animation */}
      <div className={`text-center mb-4 md:mb-3 transition-all duration-700 delay-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-1 md:mb-2 font-light">
          Saint-Valentin
        </p>
        <h1 className="text-xl md:text-2xl lg:text-5xl font-light text-gray-800 font-cairo">
          مجموعة "سحر الرياض"
        </h1>
      </div>

      {/* تصنيفات avec animation */}
      <div className={`flex justify-center flex-wrap gap-2 md:gap-3 mb-8 md:mb-12 text-xs md:text-sm text-gray-500 font-cairo font-light transition-all duration-700 delay-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {categories.map((cat, index) => (
          <React.Fragment key={index}>
            <span className="cursor-pointer hover:text-rose-400 transition-colors duration-200 px-1">
              {cat}
            </span>
            {index !== categories.length - 1 && (
              <span className="text-gray-300 hidden md:inline">·</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* شبكة المنتجات - 4 منتجات في الأعلى */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-[10px] mb-3 md:mb-[10px]">
        {products.slice(0, 4).map((prod, index) => (
          <div
            key={prod.id}
            className={`bg-white overflow-hidden group relative rounded-lg md:rounded-none transition-all duration-500 ${
              itemsVisible[index] 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-6'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* صورة المنتج */}
            <div className="relative bg-gradient-to-br from-rose-50 to-pink-50/50 p-4 md:p-6">
              <img
                src={prod.img}
                alt={prod.name}
                className="w-full h-auto object-contain group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* WhatsApp Contact Container */}
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                <div className="w-full bg-gray-200 hover:bg-green-300 transition-colors duration-300 py-2 px-4 cursor-pointer group/whatsapp flex items-center justify-between rounded-lg">
                  <p className="text-xs text-gray-600 group-hover/whatsapp:text-white font-light">
                    تواصل عبر واتساب
                  </p>
                  <svg className="w-5 h-5 fill-current text-green-500 group-hover/whatsapp:text-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* تفاصيل المنتج */}
            <div className="p-3 md:p-4 text-center">
              <h3 className="text-xs md:text-sm font-light text-gray-700 font-cairo mb-1 line-clamp-1">
                {prod.name}
              </h3>
              <p className="text-xs text-gray-400 font-light">{prod.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* الصف السفلي - منتجين على اليسار ومنتج خاص على اليمين */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-[10px]">
        {/* منتجين عاديين على اليسار */}
        {products.slice(4, 6).map((prod, index) => (
          <div
            key={prod.id}
            className={`bg-white overflow-hidden group relative flex flex-col rounded-lg md:rounded-none transition-all duration-500 ${
              itemsVisible[index + 4] 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-6'
            }`}
            style={{ transitionDelay: `${(index + 4) * 100}ms` }}
          >
            {/* صورة المنتج */}
            <div className="relative bg-gradient-to-br from-rose-50 to-pink-50/50 p-4 md:p-6 flex-1 flex items-center justify-center">
              <img
                src={prod.img}
                alt={prod.name}
                className="w-full h-auto object-contain group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* WhatsApp Contact Container */}
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                <div className="w-full bg-gray-200 hover:bg-green-300 transition-colors duration-300 py-2 px-4 cursor-pointer group/whatsapp flex items-center justify-between rounded-lg">
                  <p className="text-xs text-gray-600 group-hover/whatsapp:text-white font-light">
                    تواصل عبر واتساب
                  </p>
                  <svg className="w-5 h-5 fill-current text-green-500 group-hover/whatsapp:text-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* تفاصيل المنتج */}
            <div className="p-3 md:p-4 text-center">
              <h3 className="text-xs md:text-sm font-light text-gray-700 font-cairo mb-1 line-clamp-1">
                {prod.name}
              </h3>
              <p className="text-xs text-gray-400 font-light">{prod.price}</p>
            </div>
          </div>
        ))}

        {/* المنتج الخاص على اليمين - يأخذ مساحة منتجين */}
        <div 
          className={`col-span-2 md:col-span-2 relative mt-3 md:mt-0 rounded-lg md:rounded-none overflow-hidden transition-all duration-700 ${
            itemsVisible[6] 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-6'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {/* صورة المنتج الخاص */}
          <div className="relative h-full w-full">
            <img
              src={specialProducts[0]?.img}
              alt={specialProducts[0]?.name}
              className="w-full h-full object-cover min-h-[200px] md:min-h-[300px]"
            />
            {/* Overlay text for mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4 md:hidden">
              <h3 className="text-white text-lg font-bold font-cairo mb-1">
                {specialProducts[0]?.name}
              </h3>
              <p className="text-white/90 text-sm">{specialProducts[0]?.price}</p>
            </div>
            
            {/* Desktop overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent hidden md:flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold font-cairo mb-2">
                {specialProducts[0]?.name}
              </h3>
              <p className="text-white/90 text-lg">{specialProducts[0]?.price}</p>
              <button className="mt-4 bg-white text-gray-800 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300 w-fit">
                اطلب الآن
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* زر عرض المزيد avec animation */}
      <div 
        className={`flex justify-center mt-8 md:mt-12 transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <button
          onClick={() => window.location.href = '/products'}
          className="px-8 md:px-12 py-3 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300 font-light text-sm font-cairo rounded-full md:rounded-none"
        >
          عرض المزيد
        </button>
      </div>
    </section>
  );
};

export default Section_1;