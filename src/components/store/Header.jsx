// src/components/Header.jsx
import { 
  User, 
  ShoppingCart,
  Wallet,
  Settings
} from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 h-16" dir="rtl">
      <div className="h-full flex items-center justify-between px-4 md:px-6 gap-4">
        
        {/* LEFT SIDE - Stats */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* رصيد الذكاء الاصطناعي */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-yellow-600 font-bold text-sm">0 ⚡</span>
            <span className="text-gray-600 text-xs">رصيد الذكاء الاصطناعي</span>
          </div>

          {/* الرصيد */}
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold text-sm">1.00 $</span>
            <span className="text-gray-600 text-xs">الرصيد</span>
          </div>

          {/* مستحق الدفع */}
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold text-sm">0.03 $</span>
            <span className="text-gray-600 text-xs">مستحق الدفع</span>
          </div>
        </div>

        {/* RIGHT SIDE - Icons and Store Info */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Store Info */}
          <div className="hidden lg:flex items-center gap-2 text-sm">
            <span className="text-gray-500">🏪 بالتك:</span>
            <span className="font-semibold text-gray-800">Default</span>
            <span className="text-gray-600">ترقية</span>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2">
            {/* Settings Icon */}
            <button className="w-9 h-9 bg-purple-200 rounded-full flex items-center justify-center hover:bg-purple-300 transition-colors">
              <Settings className="w-5 h-5 text-purple-600" />
            </button>

            {/* Wallet Icon */}
            <button className="w-9 h-9 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
              <Wallet className="w-5 h-5 text-white" />
            </button>

            {/* Cart Icon with Badge */}
            <button className="relative w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                0
              </span>
            </button>

            {/* Profile Icon */}
            <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;