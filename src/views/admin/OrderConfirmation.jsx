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
  RefreshCw
} from 'lucide-react';
import { fetchOrders, updateOrderStatus, deleteOrder, ORDER_STATUS } from '../../apis/Orderapi';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchOrders();
      console.log('Fetched orders:', data); // Debug log
      // Ensure data is an array
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]); // Set empty array on error
      alert('فشل تحميل الطلبات');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = Array.isArray(orders) ? orders.filter(order => {
    const matchesSearch = 
      order.id?.toString().includes(searchTerm) ||
      order.clientFullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientPhone?.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) : [];

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      CONFIRMED: 'bg-blue-100 text-blue-700 border-blue-200',
      SHIPPED: 'bg-purple-100 text-purple-700 border-purple-200',
      DELIVERED: 'bg-green-100 text-green-700 border-green-200',
      CANCELLED: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusText = (status) => {
    const texts = {
      PENDING: 'قيد الانتظار',
      CONFIRMED: 'مؤكد',
      SHIPPED: 'تم الشحن',
      DELIVERED: 'تم التوصيل',
      CANCELLED: 'ملغى'
    };
    return texts[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      PENDING: <Clock className="w-4 h-4" />,
      CONFIRMED: <CheckCircle className="w-4 h-4" />,
      SHIPPED: <Truck className="w-4 h-4" />,
      DELIVERED: <CheckCircle className="w-4 h-4" />,
      CANCELLED: <XCircle className="w-4 h-4" />
    };
    return icons[status] || <Clock className="w-4 h-4" />;
  };

  const calculateOrderTotal = (order) => {
    if (!order.orderItems || order.orderItems.length === 0) return 0;
    return order.orderItems.reduce((total, item) => {
      const price = item.product?.newPrice || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const handleConfirmOrder = async (orderId) => {
    if (!window.confirm('هل أنت متأكد من تأكيد هذا الطلب؟')) return;

    try {
      setUpdating(true);
      const updatedOrder = await updateOrderStatus(orderId, ORDER_STATUS.CONFIRMED);
      
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      
      alert('تم تأكيد الطلب بنجاح');
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('فشل تأكيد الطلب');
    } finally {
      setUpdating(false);
    }
  };

  const handleRejectOrder = async (orderId) => {
    if (!window.confirm('هل أنت متأكد من رفض هذا الطلب؟')) return;

    try {
      setUpdating(true);
      const updatedOrder = await updateOrderStatus(orderId, ORDER_STATUS.CANCELLED);
      
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      
      alert('تم رفض الطلب');
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('فشل رفض الطلب');
    } finally {
      setUpdating(false);
    }
  };

  const handleMarkAsShipped = async (orderId) => {
    try {
      setUpdating(true);
      const updatedOrder = await updateOrderStatus(orderId, ORDER_STATUS.SHIPPED);
      
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      
      alert('تم تحديث حالة الطلب إلى "تم الشحن"');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('فشل تحديث حالة الطلب');
    } finally {
      setUpdating(false);
    }
  };

  const handleMarkAsDelivered = async (orderId) => {
    try {
      setUpdating(true);
      const updatedOrder = await updateOrderStatus(orderId, ORDER_STATUS.DELIVERED);
      
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      
      alert('تم تحديث حالة الطلب إلى "تم التوصيل"');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('فشل تحديث حالة الطلب');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء.')) return;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">إدارة الطلبات</h1>
                <p className="text-gray-600 mt-1">مراجعة وتأكيد طلبات العملاء</p>
              </div>
            </div>

            <button
              onClick={loadOrders}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"
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
                  <option value="SHIPPED">تم الشحن</option>
                  <option value="DELIVERED">تم التوصيل</option>
                  <option value="CANCELLED">ملغى</option>
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600">إجمالي الطلبات</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{orders.length}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-yellow-200 bg-yellow-50">
              <p className="text-sm text-yellow-700">قيد الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {orders.filter(o => o.status === 'PENDING').length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200 bg-blue-50">
              <p className="text-sm text-blue-700">مؤكد</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {orders.filter(o => o.status === 'CONFIRMED').length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200 bg-purple-50">
              <p className="text-sm text-purple-700">تم الشحن</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {orders.filter(o => o.status === 'SHIPPED').length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200 bg-green-50">
              <p className="text-sm text-green-700">تم التوصيل</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {orders.filter(o => o.status === 'DELIVERED').length}
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
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    {/* Order Info */}
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:block w-16 h-16 bg-indigo-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <Package className="w-8 h-8 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">طلب #{order.id}</h3>
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

                    {/* Status Badge */}
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {/* Customer */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-2">العميل</p>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          {order.clientFullName}
                        </p>
                        <p className="text-xs text-gray-600 flex items-center gap-2">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {order.clientPhone}
                        </p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-2">عنوان التوصيل</p>
                      <p className="text-sm font-medium text-gray-800 flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{order.clientAddress}</span>
                      </p>
                    </div>

                    {/* Items Count */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-2">عدد المنتجات</p>
                      <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        {order.orderItems?.length || 0} منتج
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        الكمية الإجمالية: {order.orderItems?.reduce((sum, item) => sum + item.quantity, 0) || 0}
                      </p>
                    </div>

                    {/* Total */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-3 text-white">
                      <p className="text-xs text-indigo-100 mb-2">المجموع</p>
                      <p className="text-2xl font-bold flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        {calculateOrderTotal(order).toFixed(2)} د.م
                      </p>
                    </div>
                  </div>

                  {/* Products Preview */}
                  {order.orderItems && order.orderItems.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">المنتجات ({order.orderItems.length})</p>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {order.orderItems.map((item) => (
                          <div key={item.id} className="flex-shrink-0 flex items-center gap-2 bg-gray-50 rounded-lg p-2 pr-3">
                            {item.product?.image && (
                              <img
                                src={item.product.image}
                                alt={item.product.nom}
                                className="w-12 h-12 object-cover rounded"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/48?text=No+Image';
                                }}
                              />
                            )}
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">{item.product?.nom || 'منتج'}</p>
                              <p className="text-xs text-gray-600">الكمية: {item.quantity}</p>
                            </div>
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
                      عرض التفاصيل
                    </button>

                    {order.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleConfirmOrder(order.id)}
                          disabled={updating}
                          className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition font-medium disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                          تأكيد الطلب
                        </button>
                        <button
                          onClick={() => handleRejectOrder(order.id)}
                          disabled={updating}
                          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" />
                          رفض الطلب
                        </button>
                      </>
                    )}

                    {order.status === 'CONFIRMED' && (
                      <button
                        onClick={() => handleMarkAsShipped(order.id)}
                        disabled={updating}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition font-medium disabled:opacity-50"
                      >
                        <Truck className="w-4 h-4" />
                        تم الشحن
                      </button>
                    )}

                    {order.status === 'SHIPPED' && (
                      <button
                        onClick={() => handleMarkAsDelivered(order.id)}
                        disabled={updating}
                        className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition font-medium disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4" />
                        تم التوصيل
                      </button>
                    )}

                    {(order.status === 'CANCELLED' || order.status === 'DELIVERED') && (
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium mr-auto"
                      >
                        <XCircle className="w-4 h-4" />
                        حذف الطلب
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredOrders.length === 0 && !loading && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">تفاصيل الطلب</h2>
                <p className="text-gray-600">طلب #{selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Order Status */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">حالة الطلب</p>
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">تاريخ الطلب</p>
                    <p className="font-semibold text-gray-800">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  معلومات العميل
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">الاسم الكامل</p>
                    <p className="font-medium text-gray-800">{selectedOrder.clientFullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">رقم الهاتف</p>
                    <p className="font-medium text-gray-800">{selectedOrder.clientPhone}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  عنوان التوصيل
                </h3>
                <p className="text-gray-700">{selectedOrder.clientAddress}</p>
              </div>

              {/* Products */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5 text-indigo-600" />
                  المنتجات ({selectedOrder.orderItems?.length || 0})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.orderItems?.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-white rounded-lg p-3">
                      {item.product?.image && (
                        <img 
                          src={item.product.image} 
                          alt={item.product.nom} 
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64?text=No+Image';
                          }}
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.product?.nom || 'منتج'}</p>
                        <p className="text-sm text-gray-600">الكمية: {item.quantity}</p>
                        <p className="text-sm text-gray-600">السعر: {item.product?.newPrice?.toFixed(2)} د.م</p>
                      </div>
                      <p className="font-bold text-indigo-600">
                        {((item.product?.newPrice || 0) * item.quantity).toFixed(2)} د.م
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xl font-bold">
                    <span>الإجمالي:</span>
                    <span className="text-indigo-600">{calculateOrderTotal(selectedOrder).toFixed(2)} د.م</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl flex flex-wrap gap-3">
              {selectedOrder.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => {
                      handleConfirmOrder(selectedOrder.id);
                      setShowDetailsModal(false);
                    }}
                    disabled={updating}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <CheckCircle className="w-5 h-5" />
                    تأكيد الطلب
                  </button>
                  <button
                    onClick={() => {
                      handleRejectOrder(selectedOrder.id);
                      setShowDetailsModal(false);
                    }}
                    disabled={updating}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <XCircle className="w-5 h-5" />
                    رفض الطلب
                  </button>
                </>
              )}
              {selectedOrder.status === 'CONFIRMED' && (
                <button
                  onClick={() => {
                    handleMarkAsShipped(selectedOrder.id);
                    setShowDetailsModal(false);
                  }}
                  disabled={updating}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Truck className="w-5 h-5" />
                  تحديث إلى "تم الشحن"
                </button>
              )}
              {selectedOrder.status === 'SHIPPED' && (
                <button
                  onClick={() => {
                    handleMarkAsDelivered(selectedOrder.id);
                    setShowDetailsModal(false);
                  }}
                  disabled={updating}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <CheckCircle className="w-5 h-5" />
                  تحديث إلى "تم التوصيل"
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;