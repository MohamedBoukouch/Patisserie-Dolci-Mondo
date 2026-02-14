import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingCart,
  Tags,
  TrendingUp,
  Users,
  Store,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar, isCollapsed, toggleCollapse }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const closeMenus = () => {
    setOpenMenu(null);
    if (window.innerWidth < 1024) toggleSidebar();
  };

  const menuItems = [
    {
      name: "لوحة التحكم",
      path: "/admin/home",
      icon: Home,
      end: true,
    },
    {
      name: "الطلبات",
      path: "/admin/orders",
      icon: ShoppingCart,
      badge: "3",
    },
    {
      name: "Up Sells",
      path: "/admin/upsells",
      icon: TrendingUp,
    },
    {
      name: "كوبون",
      path: "/admin/coupons",
      icon: Tags,
    },
    {
      name: "العملاء",
      path: "/admin/customers",
      icon: Users,
    },
    {
      name: "متجر",
      path: "/",
      icon: Store,
    },
    {
      name: "إحصائيات",
      path: "/admin/statistics",
      icon: BarChart3,
    },
    {
      name: "تأكيد الطلبيات",
      path: "/admin/order_confirmation",
      icon: FileText,
    },
    {
      name: "حسابات فريق العمل",
      path: "/admin/team",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        dir="rtl"
        className={`
          fixed top-0 right-0 h-screen z-50
          bg-slate-800 text-white
          transition-all duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "w-20" : "w-64"}
          overflow-y-auto
        `}
      >
        {/* HEADER */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-700">
          {!isCollapsed && (
            <h2 className="font-semibold truncate">Nouhailajalloul</h2>
          )}

          <button
            onClick={toggleCollapse}
            className="hidden lg:flex w-8 h-8 items-center justify-center hover:bg-slate-700 rounded-lg"
          >
            {isCollapsed ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* NAV */}
        <nav className="p-3 space-y-1">

          {/* DASHBOARD */}
          <NavLink
            to="/admin"
            end
            onClick={closeMenus}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition
              ${isCollapsed ? "justify-center" : "gap-3"}
              ${isActive ? "bg-slate-700" : "text-slate-300 hover:bg-slate-700/50"}`
            }
          >
            <Home className="w-5 h-5" />
            {!isCollapsed && <span>لوحة التحكم</span>}
          </NavLink>

          {/* ORDERS */}
          <NavLink
            to="/admin/orders"
            onClick={closeMenus}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-lg
              ${isActive ? "bg-slate-700" : "text-slate-300 hover:bg-slate-700/50"}`
            }
          >
            <div className={`flex items-center ${isCollapsed ? "" : "gap-3"}`}>
              <ShoppingCart className="w-5 h-5" />
              {!isCollapsed && <span>الطلبات</span>}
            </div>
            {!isCollapsed && (
              <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">3</span>
            )}
          </NavLink>

          {/* PRODUCTS (WITH SUBMENU) */}
          <div>
            <button
              onClick={() => toggleMenu("products")}
              className={`flex w-full items-center justify-between px-4 py-3 rounded-lg
              ${openMenu === "products"
                ? "bg-slate-700 text-white"
                : "text-slate-300 hover:bg-slate-700/50"}`}
            >
              <div className={`flex items-center ${isCollapsed ? "justify-center w-full" : "gap-3"}`}>
                <Package className="w-5 h-5" />
                {!isCollapsed && <span>المنتجات</span>}
              </div>

              {!isCollapsed && (
                <ChevronLeft
                  className={`w-4 h-4 transition-transform ${
                    openMenu === "products" ? "-rotate-90" : ""
                  }`}
                />
              )}
            </button>

            {/* SUB MENU */}
            {openMenu === "products" && !isCollapsed && (
              <div className="mt-1 mr-6 space-y-1 text-sm bg-gray-900">
                <NavLink
                  to="/admin/products"
                  onClick={closeMenus}
                  className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700"
                >
                  جميع المنتجات
                </NavLink>

                <NavLink
                  to="/admin/products/add"
                  onClick={closeMenus}
                  className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700"
                >
                  منتج جديد
                </NavLink>

                <NavLink
                  to="/admin/products/collections"
                  onClick={closeMenus}
                  className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700"
                >
                  التصنيفات
                </NavLink>

                <NavLink
                  to="/admin/products/reviews"
                  onClick={closeMenus}
                  className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700"
                >
                  المراجعات
                </NavLink>

                <NavLink
                  to="/admin/products/stock"
                  onClick={closeMenus}
                  className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700"
                >
                  المخزون
                </NavLink>
              </div>
            )}
          </div>

          {/* OTHER MENUS */}
          {menuItems.slice(2).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMenus}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition
                  ${isCollapsed ? "justify-center" : "gap-3"}
                  ${isActive ? "bg-slate-700" : "text-slate-300 hover:bg-slate-700/50"}`
                }
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
