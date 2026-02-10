// src/pages/admin/Orders.jsx
import { useState } from 'react';
import { Search, Printer, Edit, ChevronDown, Plus, RefreshCw } from 'lucide-react';

const Orders = () => {
  const [selectedFilter, setSelectedFilter] = useState('الكل');
  const [searchOrders, setSearchOrders] = useState('');
  const [searchProducts, setSearchProducts] = useState('');

  // Sample orders data
  const orders = [
    {
      id: '#003',
      reference: 'المرجع',
      date: '2025-12-06 17:06:11',
      creationDate: 'تاريخ الإنشاء',
      customer: 'Nouhaila Jalloul',
      status: 'مفتوحة',
      paymentStatus: 'غير مدفوع',
      shippingStatus: 'غير مكتمل',
      total: '1',
      actions: true
    },
    {
      id: '#002',
      reference: 'المرجع',
      date: '2025-12-04 11:19:41',
      creationDate: 'تاريخ الإنشاء',
      customer: 'Mohamed test',
      status: 'مفتوحة',
      paymentStatus: 'غير مدفوع',
      shippingStatus: 'غير مكتمل',
      total: '1200',
      actions: true
    },
    {
      id: '#001',
      reference: 'المرجع',
      date: '2025-12-04 11:14:58',
      creationDate: 'تاريخ الإنشاء',
      customer: 'Mohamed test',
      status: 'مفتوحة',
      paymentStatus: 'غير مدفوع',
      shippingStatus: 'غير مكتمل',
      total: '1200',
      actions: true
    }
  ];

  const filters = ['الكل', 'مفتوحة', 'مكتملة', 'ملغية'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen" dir="rtl">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">الطلبات</h1>
        
        {/* Toggle - النسخة الجديدة */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <span className="text-gray-700 font-medium">النسخة الجديدة</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
          </label>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Filters and Search Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            
            {/* Left Side - Filter Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Filter Dropdown Button */}
              <button className="flex items-center gap-2 px-4 py-2.5 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                <span>فلتر</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* الكل Button */}
              <button className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                الكل
              </button>
            </div>

            {/* Right Side - Search Boxes */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search Products */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="البحث عن المنتجات"
                  value={searchProducts}
                  onChange={(e) => setSearchProducts(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Search Orders */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="البحث عن الطلبيات"
                  value={searchOrders}
                  onChange={(e) => setSearchOrders(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">المرجع</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">تاريخ الإنشاء</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">العميل</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">تأكيد الحالة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">حالة الدفع</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">حالة الشحن</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">المجموع</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {/* Reference */}
                  <td className="px-6 py-4">
                    <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                      {order.id}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.date}
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {order.customer}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      {order.status}
                    </span>
                  </td>

                  {/* Payment Status */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded-full">
                      {order.paymentStatus}
                    </span>
                  </td>

                  {/* Shipping Status */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded-full">
                      {order.shippingStatus}
                    </span>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {order.total}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* Print Button */}
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="طباعة">
                        <Printer className="w-5 h-5 text-gray-600" />
                      </button>

                      {/* Edit Button */}
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="تعديل">
                        <Edit className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-6">
        {/* أضف طلبية */}
        <button className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors shadow-lg">
          <Plus className="w-5 h-5" />
          <span>أضف طلبية</span>
        </button>

        {/* تصدير */}
        <button className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors shadow-lg">
          <RefreshCw className="w-5 h-5" />
          <span>تصدير</span>
        </button>

        {/* العمليات الجماعية */}
        <button className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors shadow-lg">
          <span>العمليات الجماعية</span>
        </button>
      </div>
    </div>
  );
};

export default Orders;