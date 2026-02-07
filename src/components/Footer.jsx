import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime, MdCake } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { BsShieldCheck } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white pt-16 pb-10" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start space-x-3 space-x-reverse">
              {/* <MdCake className="text-3xl text-amber-400" /> */}
              <h3 className="text-2xl font-bold font-cairo text-amber-400 ">DOLCI MONDO</h3>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed font-light mx-auto md:mx-0 max-w-xs">
              منذ عام 2010، نقدم لكم أرقى الحلويات الشرقية مع لمسة عصرية. نحن ملتزمون بالجودة والتميز في كل تفصيل.
            </p>

            <div className="flex items-center justify-center md:justify-start space-x-3 space-x-reverse pt-4">
              <BsShieldCheck className="text-xl text-amber-400" />
              <span className="text-xs text-gray-400 font-light">
                جودة معتمدة منذ 2010
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold font-cairo mb-8 pb-3 border-b border-gray-700">
              روابط سريعة
            </h4>
            <ul className="space-y-4">
              {[
                { text: 'الرئيسية', href: '/' },
                { text: 'منتجاتنا', href: '/products' },
                { text: 'المناسبات الخاصة', href: '/occasions' },
                { text: 'عن دولسيموندو', href: '/about' },
                { text: 'اتصل بنا', href: '/contact' },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center justify-center md:justify-start text-gray-400 hover:text-amber-300 text-sm font-light transition-all duration-300 group"
                  >
                    <span className="ml-3 opacity-0 group-hover:opacity-100 transition-all">←</span>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold font-cairo mb-8 pb-3 border-b border-gray-700">
              معلومات الاتصال
            </h4>
            <ul className="space-y-6">
              <li className="flex items-center justify-center md:justify-start space-x-4 space-x-reverse">
                <MdLocationOn className="text-xl text-amber-300" />
                <span className="text-gray-400 text-sm font-light">
                  الرياض، المملكة العربية السعودية
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-4 space-x-reverse">
                <MdPhone className="text-xl text-amber-300" />
                <span className="text-gray-400 text-sm font-light">
                  +966 11 234 5678
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-4 space-x-reverse">
                <MdEmail className="text-xl text-amber-300" />
                <span className="text-gray-400 text-sm font-light">
                  contact@dolci-mondo.com
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-4 space-x-reverse">
                <MdAccessTime className="text-xl text-amber-300" />
                <span className="text-gray-400 text-sm font-light">
                  يومياً: 8 صباحاً - 10 مساءً
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold font-cairo mb-8 pb-3 border-b border-gray-700">
              اشترك في النشرة البريدية
            </h4>

            <p className="text-gray-400 text-sm mb-6 font-light">
              اشترك للحصول على أحدث العروض والتحديثات.
            </p>

            <form className="space-y-4">
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 py-3 rounded-lg text-sm font-medium transition"
              >
                اشترك الآن
              </button>
            </form>

            {/* Social */}
            <div className="mt-10 pt-8 border-t border-gray-700">
              <p className="text-gray-400 text-sm mb-5 font-light">
                تابعنا على:
              </p>

              <div className="flex gap-4 justify-center md:justify-start">
                {[
                  { icon: <FaWhatsapp />, color: 'hover:bg-green-500' },
                  { icon: <FaInstagram />, color: 'hover:bg-pink-600' },
                  { icon: <FaFacebookF />, color: 'hover:bg-blue-600' },
                  { icon: <FaTiktok />, color: 'hover:bg-black' },
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`w-10 h-10 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center transition-all duration-300 ${item.color} hover:text-white hover:scale-110`}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 my-8"></div>

        <div className="text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-gray-400 hover:text-amber-300 text-sm font-light transition"
          >
            العودة إلى الأعلى ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
