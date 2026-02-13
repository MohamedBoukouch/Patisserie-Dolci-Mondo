import React, { useState, useEffect } from 'react';
import { 
  FolderOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Grid3x3,
  List,
  Package
} from 'lucide-react';
import AddCollectionModal from '../../../components/admin/Addcollectionmodal';
import { fetchCollections, deleteCollection } from '../../../apis/Collectionapi';

const Collections = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch collections on mount
  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      setLoading(true);
      const data = await fetchCollections();
      setCollections(data);
    } catch (error) {
      console.error('Error loading collections:', error);
      alert('فشل تحميل المجموعات');
    } finally {
      setLoading(false);
    }
  };

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (collection) => {
    setEditingCollection(collection);
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه المجموعة؟')) {
      return;
    }

    try {
      await deleteCollection(id);
      setCollections(collections.filter(col => col.id !== id));
      alert('تم حذف المجموعة بنجاح');
    } catch (error) {
      console.error('Error deleting collection:', error);
      alert('فشل حذف المجموعة');
    }
  };

  const handleCollectionAdded = (collection) => {
    if (editingCollection) {
      // Update existing collection in list
      setCollections(collections.map(col => 
        col.id === collection.id ? collection : col
      ));
    } else {
      // Add new collection to list
      setCollections([collection, ...collections]);
    }
  };

  const openAddModal = () => {
    setEditingCollection(null);
    setShowAddModal(true);
  };

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
              onClick={openAddModal}
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
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">إجمالي المجموعات</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{collections.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">النتائج</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{filteredCollections.length}</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">جاري تحميل المجموعات...</p>
            </div>
          </div>
        ) : (
          <>
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
                        src={collection.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=Error+Loading+Image';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 right-4 left-4">
                        <h3 className="text-xl font-bold text-white mb-1">{collection.name}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                        {collection.description || 'لا يوجد وصف'}
                      </p>

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
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredCollections.map((collection) => (
                        <tr key={collection.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            <img
                              src={collection.imageUrl || 'https://via.placeholder.com/80'}
                              alt={collection.name}
                              className="w-16 h-16 rounded-lg object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/80?text=Error';
                              }}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-800">{collection.name}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-600 max-w-xs line-clamp-2">
                              {collection.description || 'لا يوجد وصف'}
                            </p>
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
            {filteredCollections.length === 0 && !loading && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">لا توجد مجموعات</h3>
                <p className="text-gray-600 mb-6">لم يتم العثور على مجموعات مطابقة للبحث</p>
                <button 
                  onClick={openAddModal}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  إضافة مجموعة جديدة
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add/Edit Modal Component */}
      <AddCollectionModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        editingCollection={editingCollection}
        setEditingCollection={setEditingCollection}
        onCollectionAdded={handleCollectionAdded}
      />
    </div>
  );
};

export default Collections;