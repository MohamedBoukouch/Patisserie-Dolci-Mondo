import React, { useState } from 'react';
import { X, Save, FolderOpen, Image as ImageIcon } from 'lucide-react';
import { createCollection, updateCollection } from '../../apis/Collectionapi';

const AddCollectionModal = ({ 
  showModal, 
  setShowModal, 
  editingCollection,
  setEditingCollection,
  onCollectionAdded 
}) => {
  const [formData, setFormData] = useState({
    name: editingCollection?.name || '',
    description: editingCollection?.description || '',
    imageUrl: editingCollection?.imageUrl || ''
  });

  const [loading, setLoading] = useState(false);

  // Update form when editing collection changes
  React.useEffect(() => {
    if (editingCollection) {
      setFormData({
        name: editingCollection.name,
        description: editingCollection.description,
        imageUrl: editingCollection.imageUrl || ''
      });
    }
  }, [editingCollection]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const collectionData = {
        name: formData.name,
        description: formData.description,
        imageUrl: formData.imageUrl || `https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400`
      };

      let savedCollection;

      if (editingCollection) {
        // Update existing collection
        savedCollection = await updateCollection(editingCollection.id, collectionData);
        alert('تم تحديث المجموعة بنجاح');
      } else {
        // Create new collection
        savedCollection = await createCollection(collectionData);
        alert('تمت إضافة المجموعة بنجاح');
      }

      // Callback to parent component
      if (onCollectionAdded) {
        onCollectionAdded(savedCollection);
      }

      // Reset and close
      closeModal();
    } catch (error) {
      console.error('Error saving collection:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data || 
                          'فشل في حفظ المجموعة';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setFormData({ name: '', description: '', imageUrl: '' });
    setEditingCollection(null);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <FolderOpen className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              {editingCollection ? 'تعديل المجموعة' : 'إضافة مجموعة جديدة'}
            </h2>
          </div>
          <button 
            onClick={closeModal}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="مثال: الشوكولاتة"
              required
              disabled={loading}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none transition-all"
              placeholder="اكتب وصفاً للمجموعة..."
              disabled={loading}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رابط الصورة
            </label>
            <div className="space-y-3">
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="http://localhost:8080/images/collection.jpg"
                disabled={loading}
              />
              
              {/* Image Preview */}
              {formData.imageUrl && (
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-2">معاينة الصورة:</p>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                    }}
                  />
                </div>
              )}
              
              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <ImageIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-800">
                    <p className="font-medium mb-1">ملاحظة:</p>
                    <p>يجب أن يكون رابط الصورة صالحاً ويشير إلى صورة على الخادم</p>
                    <p className="mt-1">مثال: http://localhost:8080/images/chocolates.jpg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{editingCollection ? 'حفظ التعديلات' : 'إضافة المجموعة'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCollectionModal;