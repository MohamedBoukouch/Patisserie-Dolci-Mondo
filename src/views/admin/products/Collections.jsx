import React, { useState } from 'react'
import { 
  FolderOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Grid3x3,
  List,
  ChevronDown,
  Package,
  X,
  Save,
  Image as ImageIcon
} from 'lucide-react'

const Collections = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCollection, setEditingCollection] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null
  })

  // Exemple de données (à remplacer par ton API)
  const [collections, setCollections] = useState([
    {
      id: 1,
      name: 'الإلكترونيات',
      description: 'جميع المنتجات الإلكترونية والتقنية',
      productsCount: 45,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'الملابس الصيفية',
      description: 'ملابس خفيفة ومريحة للصيف',
      productsCount: 128,
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400',
      createdAt: '2024-02-20'
    },
    {
      id: 3,
      name: 'الإكسسوارات الفاخرة',
      description: 'إكسسوارات عالية الجودة',
      productsCount: 67,
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400',
      createdAt: '2024-03-10'
    },
    {
      id: 4,
      name: 'الأحذية الرياضية',
      description: 'أحذية رياضية لجميع الأنشطة',
      productsCount: 89,
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400',
      createdAt: '2024-03-25'
    },
    {
      id: 5,
      name: 'المنزل والديكور',
      description: 'منتجات لتزيين المنزل',
      productsCount: 34,
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400',
      createdAt: '2024-04-05'
    },
    {
      id: 6,
      name: 'العناية بالبشرة',
      description: 'منتجات العناية والجمال',
      productsCount: 56,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
      createdAt: '2024-04-12'
    }
  ])

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (editingCollection) {
      // تعديل مجموعة موجودة
      setCollections(collections.map(col => 
        col.id === editingCollection.id 
          ? { ...col, ...formData }
          : col
      ))
    } else {
      // إضافة مجموعة جديدة
      const newCollection = {
        id: Date.now(),
        ...formData,
        productsCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setCollections([newCollection, ...collections])
    }
    
    // إعادة تعيين النموذج
    setFormData({ name: '', description: '', image: null })
    setShowAddModal(false)
    setEditingCollection(null)
  }

  const handleEdit = (collection) => {
    setEditingCollection(collection)
    setFormData({
      name: collection.name,
      description: collection.description,
      image: collection.image
    })
    setShowAddModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه المجموعة؟')) {
      setCollections(collections.filter(col => col.id !== id))
    }
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingCollection(null)
    setFormData({ name: '', description: '', image: null })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FolderOpen className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">المجموعات</h1>
                <p className="text-gray-600 mt-1">إدارة مجموعات المنتجات</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center gap-2 shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">إضافة مجموعة</span>
            </button>
          </div>

          {/* Search & View Toggle */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="flex-1 relative w-full">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث عن مجموعة..."
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">إجمالي المجموعات</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{collections.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">إجمالي المنتجات</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">
                {collections.reduce((sum, col) => sum + col.productsCount, 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 col-span-2 md:col-span-1">
              <p className="text-sm text-gray-600">النتائج</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{filteredCollections.length}</p>
            </div>
          </div>
        </div>

        {/* Collections Display */}
        {viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.map((collection) => (
              <div
                key={collection.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 left-4">
                    <h3 className="text-xl font-bold text-white mb-1">{collection.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {collection.description}
                  </p>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm text-gray-600">المنتجات:</span>
                    </div>
                    <span className="text-lg font-bold text-indigo-600">
                      {collection.productsCount}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-medium flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      عرض
                    </button>
                    <button 
                      onClick={() => handleEdit(collection)}
                      className="flex-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      تعديل
                    </button>
                    <button 
                      onClick={() => handleDelete(collection.id)}
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
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">اسم المجموعة</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الوصف</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">عدد المنتجات</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">تاريخ الإنشاء</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCollections.map((collection) => (
                    <tr key={collection.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <img
                          src={collection.image}
                          alt={collection.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">{collection.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 max-w-xs line-clamp-2">
                          {collection.description}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-indigo-600" />
                          <span className="font-semibold text-indigo-600">
                            {collection.productsCount}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{collection.createdAt}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEdit(collection)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(collection.id)}
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
        {filteredCollections.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">لا توجد مجموعات</h3>
            <p className="text-gray-600 mb-6">لم يتم العثور على مجموعات مطابقة للبحث</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              إضافة مجموعة جديدة
            </button>
          </div>
        )}

      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FolderOpen className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingCollection ? 'تعديل المجموعة' : 'إضافة مجموعة جديدة'}
                </h2>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم المجموعة *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="مثال: الإلكترونيات"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوصف
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  placeholder="اكتب وصفاً للمجموعة..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  صورة المجموعة
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition cursor-pointer">
                  <input
                    type="file"
                    id="collectionImage"
                    className="hidden"
                    accept="image/*"
                  />
                  <label htmlFor="collectionImage" className="cursor-pointer">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      اضغط لتحميل الصورة
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG حتى 10 ميجابايت
                    </p>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingCollection ? 'حفظ التعديلات' : 'إضافة المجموعة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Collections