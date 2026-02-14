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
  CreditCard,
  Calendar,
  ChevronDown,
  Mail,
  DollarSign,
  AlertCircle,
  MoreVertical
} from 'lucide-react';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Example orders data (replace with your API)
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      // Simulate API call
      const mockOrders = [
        {
          id: 1,
          orderNumber: 'ORD-2024-001',
          customer: {
            name: 'محمد أحمد',
            email: 'mohamed@example.com',
            phone: '+212 6 12 34 56 78'
          },
          items: [
            {
              id: 1,
              name: 'كعكة الشوكولاتة',
              image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
              quantity: 2,
              price: 150.00
            },
            {
              id: 2,
              name: 'كوكيز الفانيليا',
              image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
              quantity: 1,
              price: 80.00
            }
          ],
          shippingAddress: {
            street: 'شارع الحسن الثاني، رقم 123',
            city: 'الدار البيضاء',
            zipCode: '20000',
            country: 'المغرب'
          },
          payment: {
            method: 'بطاقة ائتمان',
            status: 'مدفوع'
          },
          total: 380.00,
          status: 'pending',
          orderDate: '2024-02-14 10:30',
          estimatedDelivery: '2024-02-20'
        },
        {
          id: 2,
          orderNumber: 'ORD-2024-002',
          customer: {
            name: 'فاطمة الزهراء',
            email: 'fatima@example.com',
            phone: '+212 6 98 76 54 32'
          },
          items: [
            {
              id: 3,
              name: 'تارت الفواكه',
              image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400',
              quantity: 1,
              price: 120.00
            }
          ],
          shippingAddress: {
            street: 'شارع محمد الخامس، رقم 456',
            city: 'الرباط',
            zipCode: '10000',
            country: 'المغرب'
          },
          payment: {
            method: 'الدفع عند الاستلام',
            status: 'قيد الانتظار'
          },
          total: 150.00,
          status: 'confirmed',
          orderDate: '2024-02-14 11:15',
          estimatedDelivery: '2024-02-21'
        },
        {
          id: 3,
          orderNumber: 'ORD-2024-003',
          customer: {
            name: 'عمر حسن',
            email: 'omar@example.com',
            phone: '+212 6 55 44 33 22'
          },
          items: [
            {
              id: 4,
              name: 'ماكارون ملون',
              image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400',
              quantity: 3,
              price: 200.00
            }
          ],
          shippingAddress: {
            street: 'شارع الأطلس، رقم 789',
            city: 'مراكش',
            zipCode: '40000',
            country: 'المغرب'
          },
          payment: {
            method: 'بطاقة ائتمان',
            status: 'مدفوع'
          },
          total: 630.00,
          status: 'shipped',
          orderDate: '2024-02-13 14:20',
          estimatedDelivery: '2024-02-19'
        }
      ];
      
      setOrders(mockOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      alert('فشل تحميل الطلبات');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
      shipped: 'bg-purple-100 text-purple-700 border-purple-200',
      delivered: 'bg-green-100 text-green-700 border-green-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'قيد الانتظار',
      confirmed: 'مؤكد',
      shipped: 'تم الشحن',
      delivered: 'تم التوصيل',
      cancelled: 'ملغى'
    };
    return texts[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      confirmed: <CheckCircle className="w-4 h-4" />,
      shipped: <Truck className="w-4 h-4" />,
      delivered: <CheckCircle className="w-4 h-4" />,
      cancelled: <XCircle className="w-4 h-4" />
    };
    return icons[status] || <AlertCircle className="w-4 h-4" />;
  };

  const handleConfirmOrder = async (orderId) => {
    if (!window.confirm('هل أنت متأكد من تأكيد هذا الطلب؟')) return;

    try {
      // API call to confirm order
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'confirmed' }
          : order
      ));
      alert('تم تأكيد الطلب بنجاح');
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('فشل تأكيد الطلب');
    }
  };

  const handleRejectOrder = async (orderId) => {
    if (!window.confirm('هل أنت متأكد من رفض هذا الطلب؟')) return;

    try {
      // API call to cancel order
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled' }
          : order
      ));
      alert('تم رفض الطلب');
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('فشل رفض الطلب');
    }
  };

  const handleMarkAsShipped = async (orderId) => {
    try {
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'shipped' }
          : order
      ));
      alert('تم تحديث حالة الطلب إلى "تم الشحن"');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('فشل تحديث حالة الطلب');
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">إدارة الطلبات</h1>
              <p className="text-gray-600 mt-1">مراجعة وتأكيد طلبات العملاء</p>
            </div>
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
                  placeholder="ابحث عن طلب برقم الطلب أو اسم العميل..."
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
                  <option value="pending">قيد الانتظار</option>
                  <option value="confirmed">مؤكد</option>
                  <option value="shipped">تم الشحن</option>
                  <option value="delivered">تم التوصيل</option>
                  <option value="cancelled">ملغى</option>
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
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200 bg-blue-50">
              <p className="text-sm text-blue-700">مؤكد</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {orders.filter(o => o.status === 'confirmed').length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200 bg-purple-50">
              <p className="text-sm text-purple-700">تم الشحن</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {orders.filter(o => o.status === 'shipped').length}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200 bg-green-50">
              <p className="text-sm text-green-700">تم التوصيل</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {orders.filter(o => o.status === 'delivered').length}
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
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{order.orderNumber}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {order.orderDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {order.customer.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {/* Customer */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-2">العميل</p>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          {order.customer.name}
                        </p>
                        <p className="text-xs text-gray-600 flex items-center gap-2">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {order.customer.phone}
                        </p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-2">عنوان التوصيل</p>
                      <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {order.shippingAddress.city}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {order.shippingAddress.street}
                      </p>
                    </div>

                    {/* Payment */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-2">الدفع</p>
                      <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        {order.payment.method}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{order.payment.status}</p>
                    </div>

                    {/* Total */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-3 text-white">
                      <p className="text-xs text-indigo-100 mb-2">المجموع</p>
                      <p className="text-2xl font-bold flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        {order.total.toFixed(2)} د.م
                      </p>
                    </div>
                  </div>

                  {/* Products Preview */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">المنتجات ({order.items.length})</p>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex-shrink-0 flex items-center gap-2 bg-gray-50 rounded-lg p-2 pr-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                            <p className="text-xs text-gray-600">الكمية: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => viewOrderDetails(order)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      عرض التفاصيل
                    </button>

                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleConfirmOrder(order.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition font-medium"
                        >
                          <CheckCircle className="w-4 h-4" />
                          تأكيد الطلب
                        </button>
                        <button
                          onClick={() => handleRejectOrder(order.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
                        >
                          <XCircle className="w-4 h-4" />
                          رفض الطلب
                        </button>
                      </>
                    )}

                    {order.status === 'confirmed' && (
                      <button
                        onClick={() => handleMarkAsShipped(order.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition font-medium"
                      >
                        <Truck className="w-4 h-4" />
                        تم الشحن
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
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">تفاصيل الطلب</h2>
                <p className="text-gray-600">{selectedOrder.orderNumber}</p>
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
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  معلومات العميل
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">الاسم</p>
                    <p className="font-medium text-gray-800">{selectedOrder.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">البريد الإلكتروني</p>
                    <p className="font-medium text-gray-800">{selectedOrder.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">رقم الهاتف</p>
                    <p className="font-medium text-gray-800">{selectedOrder.customer.phone}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  عنوان التوصيل
                </h3>
                <p className="text-gray-700">{selectedOrder.shippingAddress.street}</p>
                <p className="text-gray-700">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.zipCode}</p>
                <p className="text-gray-700 font-semibold">{selectedOrder.shippingAddress.country}</p>
              </div>

              {/* Products */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5 text-indigo-600" />
                  المنتجات
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-white rounded-lg p-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">الكمية: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-indigo-600">{(item.price * item.quantity).toFixed(2)} د.م</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xl font-bold">
                    <span>الإجمالي:</span>
                    <span className="text-indigo-600">{selectedOrder.total.toFixed(2)} د.م</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl flex gap-3">
              {selectedOrder.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleConfirmOrder(selectedOrder.id);
                      setShowDetailsModal(false);
                    }}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    تأكيد الطلب
                  </button>
                  <button
                    onClick={() => {
                      handleRejectOrder(selectedOrder.id);
                      setShowDetailsModal(false);
                    }}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    رفض الطلب
                  </button>
                </>
              )}
              {selectedOrder.status === 'confirmed' && (
                <button
                  onClick={() => {
                    handleMarkAsShipped(selectedOrder.id);
                    setShowDetailsModal(false);
                  }}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center justify-center gap-2"
                >
                  <Truck className="w-5 h-5" />
                  تحديث إلى "تم الشحن"
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