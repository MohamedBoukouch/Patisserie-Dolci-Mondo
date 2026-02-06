import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime, MdCake } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { BsShieldCheck, BsCreditCard } from 'react-icons/bs';
import { AiOutlineGlobal } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white pt-16 pb-10" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 space-x-reverse">
              <MdCake className="text-3xl text-amber-400" />
              <h3 className="text-2xl font-bold font-cairo text-white">دولسيموندو</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light max-w-xs">
              منذ عام 2010، نقدم لكم أرقى الحلويات الشرقية مع لمسة عصرية. نحن ملتزمون بالجودة والتميز في كل تفصيل.
            </p>
            
            {/* Quality Badge */}
            <div className="flex items-center space-x-3 space-x-reverse pt-4">
              <BsShieldCheck className="text-xl text-amber-400" />
              <span className="text-xs text-gray-400 font-light">جودة معتمدة منذ 2010</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold font-cairo text-white mb-8 pb-3 border-b border-gray-700">
              روابط سريعة
            </h4>
            <ul className="space-y-4">
              {[
                { text: 'الرئيسية', href: '/' },
                { text: 'منتجاتنا', href: '/products' },
                { text: 'المناسبات الخاصة', href: '/occasions' },
                { text: 'عن دولسيموندو', href: '/about' },
                { text: 'اتصل بنا', href: '/contact' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-amber-300 text-sm font-light transition-all duration-300 flex items-center group"
                  >
                    <span className="ml-3 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">←</span>
                    <span className="group-hover:pr-1 transition-all duration-300">{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold font-cairo text-white mb-8 pb-3 border-b border-gray-700">
              معلومات الاتصال
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 space-x-reverse">
                <MdLocationOn className="text-xl text-amber-300 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm font-light leading-relaxed">
                  الرياض، المملكة العربية السعودية<br />
                  <span className="text-xs text-gray-500">شارع الملك فهد، الحي الدبلوماسي</span>
                </span>
              </li>
              <li className="flex items-center space-x-4 space-x-reverse">
                <MdPhone className="text-xl text-amber-300 flex-shrink-0" />
                <span className="text-gray-400 text-sm font-light">
                  +966 11 234 5678
                </span>
              </li>
              <li className="flex items-center space-x-4 space-x-reverse">
                <MdEmail className="text-xl text-amber-300 flex-shrink-0" />
                <span className="text-gray-400 text-sm font-light">
                  info@dolcimondo.com
                </span>
              </li>
              <li className="flex items-center space-x-4 space-x-reverse">
                <MdAccessTime className="text-xl text-amber-300 flex-shrink-0" />
                <span className="text-gray-400 text-sm font-light">
                  يومياً: 8 صباحاً - 10 مساءً
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold font-cairo text-white mb-8 pb-3 border-b border-gray-700">
              اشترك في النشرة البريدية
            </h4>
            <p className="text-gray-400 text-sm mb-6 font-light leading-relaxed">
              اشترك للحصول على أحدث العروض، التحديثات الحصرية، ونصائح الحلويات.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse group"
              >
                <span>اشترك الآن</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
            
            {/* Social Media */}
            <div className="mt-10 pt-8 border-t border-gray-700">
              <p className="text-gray-400 text-sm mb-5 font-light">
                تابعنا على:
              </p>
              <div className="flex space-x-4 space-x-reverse">
                {[
                  { icon: <FaWhatsapp />, label: 'واتساب', href: '#', color: 'hover:bg-green-500' },
                  { icon: <FaInstagram />, label: 'إنستغرام', href: '#', color: 'hover:bg-pink-600' },
                  { icon: <FaFacebookF />, label: 'فيسبوك', href: '#', color: 'hover:bg-blue-600' },
                  { icon: <FaTwitter />, label: 'تويتر', href: '#', color: 'hover:bg-blue-400' },
                  { icon: <FaLinkedinIn />, label: 'لينكدإن', href: '#', color: 'hover:bg-blue-700' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white hover:transform hover:scale-110`}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-right mb-6 md:mb-0">
            <p className="text-gray-500 text-xs font-light">
              © 2024 دولسيموندو. جميع الحقوق محفوظة.
            </p>
            <p className="text-gray-600 text-xs mt-1 font-light">
              تصميم وتطوير بخبرة احترافية
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a 
              href="/terms" 
              className="text-gray-400 hover:text-amber-300 text-xs font-light transition-colors duration-300"
            >
              الشروط والأحكام
            </a>
            <a 
              href="/privacy" 
              className="text-gray-400 hover:text-amber-300 text-xs font-light transition-colors duration-300"
            >
              سياسة الخصوصية
            </a>
            <a 
              href="/sitemap" 
              className="text-gray-400 hover:text-amber-300 text-xs font-light transition-colors duration-300"
            >
              خريطة الموقع
            </a>
            <a 
              href="/cookies" 
              className="text-gray-400 hover:text-amber-300 text-xs font-light transition-colors duration-300"
            >
              سياسة الكوكيز
            </a>
          </div>
        </div>

        {/* Payment & Security */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-gray-500 text-xs text-center md:text-right mb-4 font-light">
                طرق الدفع الآمنة:
              </p>
              <div className="flex justify-center md:justify-start space-x-6 space-x-reverse">
                <BsCreditCard className="text-xl text-gray-500 hover:text-amber-300 transition-colors duration-300 cursor-pointer" />
                <AiOutlineGlobal className="text-xl text-gray-500 hover:text-amber-300 transition-colors duration-300 cursor-pointer" />
                <svg className="w-6 h-6 text-gray-500 hover:text-amber-300 transition-colors duration-300 cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <svg className="w-6 h-6 text-gray-500 hover:text-amber-300 transition-colors duration-300 cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                </svg>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end space-x-3 space-x-reverse mb-2">
                <BsShieldCheck className="text-lg text-green-500" />
                <span className="text-xs text-gray-400 font-light">موقع آمن ومحمي</span>
              </div>
              <p className="text-gray-600 text-xs font-light">
                شهادة SSL مشفرة • حماية البيانات
              </p>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-12 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center space-x-2 space-x-reverse text-gray-400 hover:text-amber-300 text-sm font-light transition-colors duration-300 group"
          >
            <span>العودة إلى الأعلى</span>
            <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;