import React, { useState, useEffect } from 'react';
import { 
  Package, 
  DollarSign, 
  Image as ImageIcon, 
  Box, 
  Eye, 
  Save,
  FileText,
  Folder,
  X
} from 'lucide-react';
import { createProduct } from '../../../apis/Productapi';
import { fetchCollections } from '../../../apis/Collectionapi';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    oldPrice: '',
    newPrice: '',
    stock: '',
    collectionId: '',
    image: '',
    status: true
  });

  // Fetch collections on mount
  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      const data = await fetchCollections();
      setCollections(data);
    } catch (error) {
      console.error('Error loading collections:', error);
      alert('فشل تحميل المجموعات');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Set image filename in form data
      setFormData(prev => ({
        ...prev,
        image: file.name
      }));
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
    // Reset file input
    document.getElementById('imageUpload').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare product data according to backend format
      const productData = {
        nom: formData.nom,
        collection: { id: parseInt(formData.collectionId) },
        description: formData.description,
        oldPrice: parseFloat(formData.oldPrice),
        newPrice: parseFloat(formData.newPrice),
        stock: parseInt(formData.stock),
        image: formData.image,
        status: formData.status
      };

      console.log('Sending product data:', productData);

      const createdProduct = await createProduct(productData);
      
      console.log('Product created successfully:', createdProduct);
      
      alert('تمت إضافة المنتج بنجاح');
      
      // Navigate to products list
      navigate('/admin/products');
      
    } catch (error) {
      console.error('Error creating product:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data || 
                          'فشل في إضافة المنتج';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="مثال: كعكة الشوكولاتة"
                    required
                    disabled={loading}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none transition"
                    placeholder="اكتب وصفاً تفصيلياً للمنتج..."
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-800">التسعير</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    السعر القديم
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">د.م</span>
                    <input
                      type="number"
                      name="oldPrice"
                      value={formData.oldPrice}
                      onChange={handleChange}
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="0.00"
                      step="0.01"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    السعر الجديد *
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">د.م</span>
                    <input
                      type="number"
                      name="newPrice"
                      value={formData.newPrice}
                      onChange={handleChange}
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="0.00"
                      step="0.01"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Box className="w-5 h-5 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-800">المخزون</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الكمية المتوفرة *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="0"
                  required
                  disabled={loading}
                />
              </div>
            </div>

          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Product Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-800">حالة المنتج</h2>
              </div>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                  disabled={loading}
                />
                <span className="text-sm text-gray-700">نشط</span>
              </label>
            </div>

            {/* Product Image */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-800">صورة المنتج</h2>
              </div>
              
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 left-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    disabled={loading}
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="mt-2 text-xs text-gray-500 break-all">
                    {selectedImage?.name}
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition cursor-pointer">
                  <input
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading}
                  />
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      اضغط لتحميل الصورة
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG حتى 10 ميجابايت
                    </p>
                  </label>
                </div>
              )}
            </div>

            {/* Collection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Folder className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">المجموعة *</h2>
              </div>
              
              <select
                name="collectionId"
                value={formData.collectionId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                required
                disabled={loading}
              >
                <option value="">اختر المجموعة</option>
                {collections.map(collection => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </form>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end sticky bottom-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-lg">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2"
            disabled={loading}
          >
            إلغاء
          </button>
          
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>جاري الحفظ...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>حفظ المنتج</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;