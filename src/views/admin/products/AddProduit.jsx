import React, { useState } from 'react'
import { 
  Package, 
  DollarSign, 
  Image as ImageIcon, 
  Tag, 
  Box, 
  BarChart3, 
  Eye, 
  Save,
  Link as LinkIcon,
  FileText,
  Folder,
  Settings
} from 'lucide-react'

const AddProduit = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    costPrice: '',
    sku: '',
    barcode: '',
    stock: '',
    category: '',
    tags: '',
    images: []
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Product data:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">إضافة منتج جديد</h1>
          </div>
          <p className="text-gray-600 mr-11">أنشئ منتجًا جديدًا لمتجرك</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">المعلومات الأساسية</h2>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم المنتج *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="مثال: سماعات لاسلكية فاخرة"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوصف
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition"
                    placeholder="اكتب وصفاً تفصيلياً للمنتج..."
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-800">التسعير</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    السعر *
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">د.م</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    سعر المقارنة
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">د.م</span>
                    <input
                      type="number"
                      name="comparePrice"
                      value={formData.comparePrice}
                      onChange={handleChange}
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    سعر التكلفة
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">د.م</span>
                    <input
                      type="number"
                      name="costPrice"
                      value={formData.costPrice}
                      onChange={handleChange}
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-6">
                <Box className="w-5 h-5 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-800">المخزون</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رمز SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="PROD-001"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="123456789"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الكمية المتوفرة *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Product Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-800">حالة المنتج</h2>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <span className="text-sm text-gray-700">نشط</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">مميز</span>
                </label>
              </div>
            </div>

            {/* Product Image */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-800">الصور</h2>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition cursor-pointer">
                <input
                  type="file"
                  id="imageUpload"
                  multiple
                  className="hidden"
                  accept="image/*"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    اضغط لتحميل الصور
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG حتى 10 ميجابايت
                  </p>
                </label>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <Folder className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">التصنيف</h2>
              </div>
              
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">اختر التصنيف</option>
                <option value="electronics">الإلكترونيات</option>
                <option value="clothing">الملابس</option>
                <option value="accessories">الإكسسوارات</option>
                <option value="home">المنزل والحديقة</option>
                <option value="sports">الرياضة</option>
              </select>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-pink-600" />
                <h2 className="text-lg font-semibold text-gray-800">الوسوم</h2>
              </div>
              
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="لاسلكي، فاخر، جديد"
              />
              <p className="text-xs text-gray-500 mt-2">افصل الوسوم بفواصل</p>
            </div>

          </div>
        </form>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end sticky bottom-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-lg">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            معاينة
          </button>
          
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2 shadow-md"
          >
            <Save className="w-5 h-5" />
            حفظ المنتج
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddProduit