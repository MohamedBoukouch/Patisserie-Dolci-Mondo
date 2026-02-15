import React, { useState, useEffect } from 'react';
import {
  Package,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  User,
  Phone,
  MapPin,
  Calendar,
  ChevronDown,
  DollarSign,
  RefreshCw,
  AlertCircle,
  ShoppingBag,
  Tag,
  Layers
} from 'lucide-react';
import { fetchOrders, updateOrderStatus, deleteOrder, ORDER_STATUS } from '../../apis/orderApi';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchOrders();
      console.log('Fetched orders:', data);
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
      alert('فشل تحميل الطلبات');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = Array.isArray(orders) ? orders.filter(order => {
    const matchesSearch = 
      order.id?.toString().includes(searchTerm) ||
      order.reference?.includes(searchTerm) ||
      order.clientFullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientPhone?.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) : [];

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      CONFIRMED: 'bg-blue-100 text-blue-700 border-blue-200',
      OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-700 border-purple-200',
      DELIVERED: 'bg-green-100 text-green-700 border-green-200',
      CANCELLED: 'bg-red-100 text-red-700 border-red-200',
      NO_RESPONSE: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusText = (status) => {
    const texts = {
      PENDING: 'قيد الانتظار',
      CONFIRMED: 'مؤكد',
      OUT_FOR_DELIVERY: 'قيد التوصيل',
      DELIVERED: 'تم التوصيل',
      CANCELLED: 'ملغى',
      NO_RESPONSE: 'لا يوجد رد'
    };
    return texts[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      PENDING: <Clock className="w-4 h-4" />,
      CONFIRMED: <CheckCircle className="w-4 h-4" />,
      OUT_FOR_DELIVERY: <Truck className="w-4 h-4" />,
      DELIVERED: <CheckCircle className="w-4 h-4" />,
      CANCELLED: <XCircle className="w-4 h-4" />,
      NO_RESPONSE: <AlertCircle className="w-4 h-4" />
    };
    return icons[status] || <Clock className="w-4 h-4" />;
  };

  const calculateOrderTotal = (order) => {
    if (order.totalPrice) {
      return order.totalPrice;
    }
    
    if (!order.orderItems || order.orderItems.length === 0) return 0;
    return order.orderItems.reduce((total, item) => {
      const price = item.product?.newPrice || item.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setOpenDropdown(null);
    
    try {
      setUpdating(true);
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      
      alert(`تم تحديث حالة الطلب إلى "${getStatusText(newStatus)}"`);
    } catch (error) {
      console.error('Error updating order:', error);
      alert('فشل تحديث حالة الطلب');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء.')) return;

    setOpenDropdown(null);
    try {
      await deleteOrder(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
      alert('تم حذف الطلب بنجاح');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('فشل حذف الطلب');
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ar-MA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'غير محدد';
    }
  };

  const getAvailableStatusChanges = (currentStatus) => {
    const allStatuses = [
      { status: ORDER_STATUS.PENDING, label: 'قيد الانتظار', icon: <Clock className="w-4 h-4" />, color: 'text-yellow-600 hover:bg-yellow-50' },
      { status: ORDER_STATUS.CONFIRMED, label: 'مؤكد', icon: <CheckCircle className="w-4 h-4" />, color: 'text-blue-600 hover:bg-blue-50' },
      { status: ORDER_STATUS.OUT_FOR_DELIVERY, label: 'قيد التوصيل', icon: <Truck className="w-4 h-4" />, color: 'text-purple-600 hover:bg-purple-50' },
      { status: ORDER_STATUS.DELIVERED, label: 'تم التوصيل', icon: <CheckCircle className="w-4 h-4" />, color: 'text-green-600 hover:bg-green-50' },
      { status: ORDER_STATUS.NO_RESPONSE, label: 'لا يوجد رد', icon: <AlertCircle className="w-4 h-4" />, color: 'text-gray-600 hover:bg-gray-50' },
      { status: ORDER_STATUS.CANCELLED, label: 'ملغى', icon: <XCircle className="w-4 h-4" />, color: 'text-red-600 hover:bg-red-50' }
    ];

    // Return all statuses except the current one
    return allStatuses.filter(s => s.status !== currentStatus);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  إدارة الطلبات
                </h1>
                <p className="text-gray-600 mt-1">مراجعة وتأكيد طلبات العملاء</p>
              </div>
            </div>

            <button
              onClick={loadOrders}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-medium disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">تحديث</span>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث برقم الطلب، اسم العميل أو رقم الهاتف..."
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full md:w-48 pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="PENDING">قيد الانتظار</option>
                  <option value="CONFIRMED">مؤكد</option>
                  <option value="OUT_FOR_DELIVERY">قيد التوصيل</option>
                  <option value="DELIVERED">تم التوصيل</option>
                  <option value="NO_RESPONSE">لا يوجد رد</option>
                  <option value="CANCELLED">ملغى</option>
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Layers className="w-4 h-4" />
                إجمالي الطلبات
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{orders.length}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-yellow-700 font-medium">قيد الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {orders.filter(o => o.status === 'PENDING').length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-blue-700 font-medium">مؤكد</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {orders.filter(o => o.status === 'CONFIRMED').length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-purple-700 font-medium">قيد التوصيل</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {orders.filter(o => o.status === 'OUT_FOR_DELIVERY').length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-green-700 font-medium">تم التوصيل</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {orders.filter(o => o.status === 'DELIVERED').length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-gray-700 font-medium">لا يوجد رد</p>
              <p className="text-2xl font-bold text-gray-600 mt-1">
                {orders.filter(o => o.status === 'NO_RESPONSE').length}
              </p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">جاري تحميل الطلبات...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex-shrink-0 items-center justify-center shadow-lg">
                        <Package className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {order.reference || `طلب #${order.id}`}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(order.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {order.clientFullName}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status with Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </span>
                      
                      {/* Dropdown Menu */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(openDropdown === order.id ? null : order.id);
                          }}
                          disabled={updating}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition disabled:opacity-50 flex items-center gap-1"
                          title="تغيير الحالة"
                        >
                          <span className="text-sm font-medium text-gray-700">تغيير</span>
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>

                        {openDropdown === order.id && (
                          <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200">
                              اختر الحالة الجديدة
                            </div>
                            {getAvailableStatusChanges(order.status).map((statusOption) => (
                              <button
                                key={statusOption.status}
                                onClick={() => handleStatusChange(order.id, statusOption.status)}
                                className={`w-full px-4 py-2.5 text-right flex items-center gap-2 transition ${statusOption.color}`}
                              >
                                {statusOption.icon}
                                <span className="text-sm font-medium">{statusOption.label}</span>
                              </button>
                            ))}
                            
                            {/* Delete option */}
                            {(order.status === 'DELIVERED' || order.status === 'CANCELLED' || order.status === 'NO_RESPONSE') && (
                              <>
                                <div className="border-t border-gray-200 my-1"></div>
                                <button
                                  onClick={() => handleDeleteOrder(order.id)}
                                  className="w-full px-4 py-2.5 text-right flex items-center gap-2 hover:bg-red-50 transition text-red-600"
                                >
                                  <XCircle className="w-4 h-4" />
                                  <span className="text-sm font-medium">حذف الطلب</span>
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Customer & Address Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                      <p className="text-xs text-blue-600 font-semibold mb-2 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        معلومات العميل
                      </p>
                      <p className="text-sm font-bold text-gray-800 mb-1">{order.clientFullName}</p>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {order.clientPhone}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                      <p className="text-xs text-purple-600 font-semibold mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        عنوان التوصيل
                      </p>
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">{order.clientAddress}</p>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white shadow-lg">
                      <p className="text-xs text-indigo-100 font-semibold mb-2 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        المجموع الكلي
                      </p>
                      <p className="text-2xl font-bold">{calculateOrderTotal(order).toFixed(2)} د.م</p>
                    </div>
                  </div>

                  {/* Products Section - Creative Cards */}
                  {order.orderItems && order.orderItems.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4 text-indigo-600" />
                          المنتجات ({order.orderItems.length})
                        </p>
                        <p className="text-xs text-gray-500">
                          الكمية الإجمالية: {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {order.orderItems.map((item) => (
                          <div 
                            key={item.id} 
                            className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex gap-3">
                              {/* Product Image */}
                              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                {item.product?.image ? (
                                  <img
                                    src={item.product.image}
                                    alt={item.product.nom}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    onError={(e) => {
                                      e.target.src = 'https://via.placeholder.com/80?text=No+Image';
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package className="w-8 h-8 text-gray-300" />
                                  </div>
                                )}
                                {/* Quantity Badge */}
                                <div className="absolute top-1 right-1 bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
                                  {item.quantity}×
                                </div>
                              </div>

                              {/* Product Info */}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-gray-800 mb-1 truncate">
                                  {item.product?.nom || 'منتج'}
                                </h4>
                                
                                {/* Collection Badge */}
                                {item.product?.collection && (
                                  <div className="flex items-center gap-1 mb-1">
                                    <Tag className="w-3 h-3 text-indigo-500" />
                                    <span className="text-xs text-indigo-600 font-medium">
                                      {item.product.collection.name}
                                    </span>
                                  </div>
                                )}

                                {/* Price Info */}
                                <div className="flex items-center gap-2 mb-1">
                                  {item.product?.oldPrice && item.product.oldPrice > item.product.newPrice && (
                                    <span className="text-xs text-gray-400 line-through">
                                      {item.product.oldPrice.toFixed(2)} د.م
                                    </span>
                                  )}
                                  <span className="text-sm font-bold text-indigo-600">
                                    {(item.product?.newPrice || item.price).toFixed(2)} د.م
                                  </span>
                                </div>

                                {/* Item Total */}
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">المجموع:</span>
                                  <span className="text-sm font-bold text-gray-800">
                                    {((item.product?.newPrice || item.price) * item.quantity).toFixed(2)} د.م
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Product Description Tooltip on Hover */}
                            {item.product?.description && (
                              <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                                {item.product.description}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => viewOrderDetails(order)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      عرض التفاصيل الكاملة
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredOrders.length === 0 && !loading && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">لا توجد طلبات</h3>
                <p className="text-gray-600">لم يتم العثور على طلبات مطابقة للبحث</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h2 className="text-2xl font-bold">تفاصيل الطلب الكاملة</h2>
                <p className="text-indigo-100 mt-1">{selectedOrder.reference || `طلب #${selectedOrder.id}`}</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Status & Date */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">حالة الطلب</p>
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-2">تاريخ الطلب</p>
                    <p className="font-bold text-gray-800 text-lg">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Customer & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    معلومات العميل
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">الاسم الكامل</p>
                      <p className="font-bold text-gray-800">{selectedOrder.clientFullName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">رقم الهاتف</p>
                      <p className="font-medium text-gray-800 flex items-center gap-1">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {selectedOrder.clientPhone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    عنوان التوصيل
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{selectedOrder.clientAddress}</p>
                </div>
              </div>

              {/* Products */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-indigo-600" />
                  المنتجات ({selectedOrder.orderItems?.length || 0})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.orderItems?.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:border-indigo-300 transition">
                      {item.product?.image ? (
                        <img 
                          src={item.product.image} 
                          alt={item.product.nom} 
                          className="w-24 h-24 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/96?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-lg">{item.product?.nom || 'منتج'}</p>
                        {item.product?.collection && (
                          <p className="text-sm text-indigo-600 flex items-center gap-1 mt-1">
                            <Tag className="w-3 h-3" />
                            {item.product.collection.name}
                          </p>
                        )}
                        {item.product?.description && (
                          <p className="text-sm text-gray-600 mt-1">{item.product.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-600">الكمية: <span className="font-bold text-gray-800">{item.quantity}</span></span>
                          <span className="text-sm text-gray-600">السعر: <span className="font-bold text-indigo-600">{(item.product?.newPrice || 0).toFixed(2)} د.م</span></span>
                        </div>
                      </div>
                      <p className="font-bold text-indigo-600 text-xl">
                        {((item.product?.newPrice || 0) * item.quantity).toFixed(2)} د.م
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t-2 border-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">الإجمالي الكلي:</span>
                    <span className="text-3xl font-bold text-indigo-600">{calculateOrderTotal(selectedOrder).toFixed(2)} د.م</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;