import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  Grid3x3,
  List,
  ChevronDown,
  MoreVertical
} from 'lucide-react'

const AllProducts = () => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Exemple de données de produits (à remplacer par ton fetch API)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'سماعات لاسلكية فاخرة',
      category: 'الإلكترونيات',
      price: 299.99,
      stock: 45,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      status: 'نشط'
    },
    {
      id: 2,
      name: 'قميص قطني أزرق',
      category: 'الملابس',
      price: 49.99,
      stock: 120,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
      status: 'نشط'
    },
    {
      id: 3,
      name: 'حقيبة جلدية',
      category: 'الإكسسوارات',
      price: 159.99,
      stock: 8,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
      status: 'نشط'
    },
    {
      id: 4,
      name: 'ساعة ذكية',
      category: 'الإلكترونيات',
      price: 399.99,
      stock: 0,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      status: 'غير متوفر'
    },
    {
      id: 5,
      name: 'حذاء رياضي',
      category: 'الرياضة',
      price: 89.99,
      stock: 65,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      status: 'نشط'
    },
    {
      id: 6,
      name: 'نظارة شمسية',
      category: 'الإكسسوارات',
      price: 79.99,
      stock: 32,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      status: 'نشط'
    }
  ])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">جميع المنتجات</h1>
                <p className="text-gray-600 mt-1">إدارة منتجات المتجر</p>
              </div>
            </div>
            
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center gap-2 shadow-md">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">إضافة منتج</span>
            </button>
          </div>

          {/* Filters & Search Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث عن منتج..."
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-48 pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
                >
                  <option value="all">جميع التصنيفات</option>
                  <option value="الإلكترونيات">الإلكترونيات</option>
                  <option value="الملابس">الملابس</option>
                  <option value="الإكسسوارات">الإكسسوارات</option>
                  <option value="الرياضة">الرياضة</option>
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                >
                  <Grid3x3 className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                >
                  <List className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">إجمالي المنتجات</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{products.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">المنتجات النشطة</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {products.filter(p => p.status === 'نشط').length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">غير متوفر</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {products.filter(p => p.stock === 0).length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">النتائج</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">{filteredProducts.length}</p>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'نشط' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-indigo-600">{product.price} د.م</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-600">المخزون</p>
                      <p className={`text-lg font-semibold ${
                        product.stock === 0 ? 'text-red-600' : 
                        product.stock < 20 ? 'text-orange-600' : 
                        'text-green-600'
                      }`}>
                        {product.stock}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-medium flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      عرض
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium flex items-center justify-center gap-2">
                      <Edit className="w-4 h-4" />
                      تعديل
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الصورة</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">اسم المنتج</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">التصنيف</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">السعر</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">المخزون</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الحالة</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">{product.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{product.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-indigo-600">{product.price} د.م</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-medium ${
                          product.stock === 0 ? 'text-red-600' : 
                          product.stock < 20 ? 'text-orange-600' : 
                          'text-green-600'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.status === 'نشط' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">لا توجد منتجات</h3>
            <p className="text-gray-600 mb-6">لم يتم العثور على منتجات مطابقة للبحث</p>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              إضافة منتج جديد
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default AllProducts