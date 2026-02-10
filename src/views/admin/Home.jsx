// src/pages/Dashboard.jsx
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Clock
} from "lucide-react";

const AdminHome = () => {
  const stats = [
    {
      title: "إجمالي المبيعات",
      value: "45,231 درهم",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "الطلبات",
      value: "324",
      change: "+8.2%",
      isPositive: true,
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      title: "العملاء",
      value: "1,842",
      change: "+23.1%",
      isPositive: true,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "المنتجات",
      value: "156",
      change: "-2.4%",
      isPositive: false,
      icon: Package,
      color: "bg-orange-500",
    },
  ];

  const recentOrders = [
    { id: "#1234", customer: "أحمد محمد", amount: "350 درهم", status: "قيد التنفيذ", time: "منذ 5 دقائق" },
    { id: "#1233", customer: "فاطمة علي", amount: "520 درهم", status: "مكتمل", time: "منذ 15 دقيقة" },
    { id: "#1232", customer: "خالد حسن", amount: "280 درهم", status: "قيد المراجعة", time: "منذ 30 دقيقة" },
    { id: "#1231", customer: "مريم سعيد", amount: "670 درهم", status: "مكتمل", time: "منذ ساعة" },
    { id: "#1230", customer: "عمر يوسف", amount: "190 درهم", status: "ملغي", time: "منذ ساعتين" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "مكتمل":
        return "bg-green-100 text-green-700";
      case "قيد التنفيذ":
        return "bg-blue-100 text-blue-700";
      case "قيد المراجعة":
        return "bg-yellow-100 text-yellow-700";
      case "ملغي":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">لوحة التحكم</h1>
          <p className="text-gray-600 mt-1">نظرة عامة على أداء المتجر</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg flex items-center gap-2 w-fit">
          <TrendingUp className="w-5 h-5" />
          تقرير مفصل
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {stat.value}
                  </h3>
                  <div className="flex items-center gap-1">
                    {stat.isPositive ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-semibold ${
                        stat.isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-xs">هذا الشهر</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">الطلبات الأخيرة</h2>
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
            عرض الكل ←
          </button>
        </div>
        
        {/* Mobile View */}
        <div className="md:hidden divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">{order.id}</span>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">{order.customer}</div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800">{order.amount}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {order.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                  رقم الطلب
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                  العميل
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                  المبلغ
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                  الوقت
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-800">{order.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-gray-800">{order.amount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;