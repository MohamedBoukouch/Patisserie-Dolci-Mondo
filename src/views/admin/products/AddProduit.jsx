import React, { useState } from 'react'

const AddProduit = () => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    sku: '',
    barcode: '',
    weight: '',
    stock: '',
    category: '',
    price: '',
    comparePrice: '',
    costPrice: '',
    image: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Ajoute ta logique de soumission ici
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">إضافة منتج</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section principale - 2/3 de la largeur sur desktop */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carte: Informations générales */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                {/* Nom du produit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم (مثال: قميص صيفي أزرق)
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                    placeholder="اسم المنتج"
                  />
                </div>

                {/* URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الرابط
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <span className="px-4 py-2 bg-gray-50 text-gray-500 text-sm border-l border-gray-300">
                      /https://nouhallolicloud.com/products
                    </span>
                    <input
                      type="text"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                {/* Éditeur de texte */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اكتر التفة
                  </label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    {/* Barre d'outils */}
                    <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-50 border-b border-gray-300">
                      <button type="button" className="p-2 hover:bg-gray-200 rounded">📷</button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded">🖼️</button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded">↩️</button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded">↪️</button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded">&lt;/&gt;</button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded">—</button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded">Ω</button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded">☺</button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded">⊞</button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded">🔗</button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded"><b>B</b></button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded"><i>I</i></button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded"><u>U</u></button>
                    </div>
                    <textarea
                      rows="8"
                      className="w-full p-4 outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                      placeholder="الكتل وصفا للمنتج"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte: Prix */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">التسعير</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    السعر
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مقارنة السعر
                  </label>
                  <input
                    type="number"
                    name="comparePrice"
                    value={formData.comparePrice}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    سعر التكلفة
                  </label>
                  <input
                    type="number"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Carte: Stock */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">المخزون</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الباركود
                  </label>
                  <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوزن
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الكمية
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar droite - 1/3 de la largeur sur desktop */}
          <div className="lg:col-span-1 space-y-6">
            {/* Carte: Apparence du produit */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">ظهور المنتج</h2>
              <div className="space-y-4">
                <button 
                  type="button"
                  className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-medium"
                >
                  إظهار المنتج
                </button>
                <button 
                  type="button"
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2"
                >
                  <span>رفع الصور</span>
                  <span>📁</span>
                </button>
              </div>
            </div>

            {/* Carte: Détails de stockage */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">تفاصيل التخزين</h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="البحث عن التصنيفات"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
                <button 
                  type="button"
                  className="text-pink-600 hover:text-pink-700 text-sm font-medium"
                >
                  + أضف تصنيفا جديدا
                </button>
              </div>
            </div>

            {/* Carte: Catégories */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">الفئات</h2>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="اكتب (فئم باعتماد الفواصل)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            {/* Carte: Image */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">الصور</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pink-500 transition cursor-pointer">
                <input
                  type="file"
                  id="imageUpload"
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <div className="text-blue-500 mb-2">📎</div>
                  <p className="text-sm text-gray-600">
                    ملاحظة: الحصول على أفضل نتائج استخدم صور المنتج بحجم 800 × 800
                  </p>
                  <div className="mt-4 flex gap-2 justify-center flex-wrap">
                    <button type="button" className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm hover:bg-pink-700">
                      أضف رابط الفيديو
                    </button>
                    <button type="button" className="px-4 py-2 border border-pink-600 text-pink-600 rounded-lg text-sm hover:bg-pink-50">
                      رفع الصور
                    </button>
                    <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                      إلغاء
                    </button>
                  </div>
                </label>
              </div>
            </div>

            {/* Sections supplémentaires */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <details className="border-b border-gray-200 pb-4">
                <summary className="cursor-pointer font-medium text-gray-700 flex items-center justify-between">
                  <span>المتغيرات</span>
                  <span className="text-gray-400">›</span>
                </summary>
              </details>
              
              <details className="border-b border-gray-200 pb-4">
                <summary className="cursor-pointer font-medium text-gray-700 flex items-center justify-between">
                  <span>المنتجات ذات الصلة</span>
                  <span className="text-gray-400">›</span>
                </summary>
              </details>
              
              <details className="border-b border-gray-200 pb-4">
                <summary className="cursor-pointer font-medium text-gray-700 flex items-center justify-between">
                  <span>إخفاء</span>
                  <span className="text-gray-400">›</span>
                </summary>
              </details>
              
              <details>
                <summary className="cursor-pointer font-medium text-gray-700 flex items-center justify-between">
                  <span>خيارات متقدمة</span>
                  <span className="text-gray-400">›</span>
                </summary>
              </details>
            </div>
          </div>
        </form>

        {/* Bouton de sauvegarde fixe en bas sur mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden shadow-lg">
          <button 
            type="submit"
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-medium flex items-center justify-center gap-2"
          >
            <span>💾</span>
            <span>حفظ</span>
          </button>
        </div>

        {/* Bouton de sauvegarde normal sur desktop */}
        <div className="hidden lg:block mt-6">
          <button 
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-medium flex items-center gap-2"
          >
            <span>💾</span>
            <span>حفظ</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddProduit