import React, { useState, useEffect } from 'react'; 
import { products } from '../models/products';

const categories = ['الكل', 'ماكارون', 'شوكولاتة', 'هدايا', 'جديد', 'الأكثر مبيعاً', 'الأعلى تقييماً'];

const AllProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(products.map(() => false));
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      const timers = products.map((_, index) =>
        setTimeout(() => {
          setItemsVisible(prev => {
            const newArr = [...prev];
            newArr[index] = true;
            return newArr;
          });
        }, 50 * index)
      );
      return () => timers.forEach(t => clearTimeout(t));
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Filter products based on category
  useEffect(() => {
    if (activeCategory === 'الكل') {
      setFilteredProducts(products);
    } else {
      // Assuming products have a category property
      const filtered = products.filter(product => 
        product.category && product.category.includes(activeCategory)
      );
      setFilteredProducts(filtered);
      
      // Reset visibility animation for filtered products
      const newVisibility = filtered.map(() => false);
      setItemsVisible(newVisibility);
      
      // Re-animate filtered products
      const timers = filtered.map((_, index) =>
        setTimeout(() => {
          setItemsVisible(prev => {
            const newArr = [...prev];
            newArr[index] = true;
            return newArr;
          });
        }, 50 * index)
      );
      
      return () => timers.forEach(t => clearTimeout(t));
    }
  }, [activeCategory]);

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-6 bg-white">
      {/* العنوان */}
      <div className={`text-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="text-amber-600 text-xs md:text-sm tracking-widest uppercase mb-2 font-light">
          جميع المنتجات
        </p>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-800">
          اكتشف جميع إبداعاتنا
        </h1>
      </div>

      {/* Barre d'outils de filtres */}
      <div className={`flex justify-center mb-8 md:mb-12 transition-all duration-700 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-light rounded-full transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* شبكة المنتجات */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {filteredProducts.map((prod, index) => (
          <div
            key={prod.id}
            className={`bg-white overflow-hidden group relative transition-all duration-500 ${itemsVisible[index] ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'}`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {/* صورة المنتج */}
            <div className="relative w-full overflow-hidden bg-white">
              <img
                src={prod.img || prod.image}
                alt={prod.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* WhatsApp Contact Container - hidden on mobile */}
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
              <h3 className="text-sm md:text-base font-light text-gray-700 mb-1 line-clamp-1">
                {prod.name}
              </h3>
              <p className="text-xs md:text-sm text-amber-600 font-medium">{prod.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;