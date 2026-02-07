import React from 'react';
import { Mail, Phone, MapPin, Instagram, MessageCircle, Music, Facebook } from 'lucide-react';

const Contact = () => {
  // Contact data (Arabic)
  const contactInfo = {
    title: 'تواصل معنا',
    mainTitle: 'شركة المكونات المخملية',
    subtitle: 'للحلويات والشوكولاتة - متخصصة في توفير أرقى المكونات الفاخرة',
    phone: '+966533622117',
    email: 'info@dolcimondo.com',
    address: 'شارع الخبازين 123، مدينة الحلويات، المملكة العربية السعودية 12345',
    hours1: 'السبت - الأربعاء: 7:00 ص - 7:00 م',
    hours2: 'الخميس - الجمعة: 8:00 ص - 6:00 م',
    social: [
      { name: 'واتس آب', icon: MessageCircle, url: 'https://wa.me/966533622117', handle: '+966533622117' },
      { name: 'إنستغرام', icon: Instagram, url: 'https://instagram.com', handle: '@dolcimondo' },
      { name: 'تيك توك', icon: Music, url: 'https://tiktok.com', handle: '@dolcimondo' },
      { name: 'فيسبوك', icon: Facebook, url: 'https://facebook.com', handle: 'Dolci Mondo' }
    ],
    mapLink: 'https://maps.app.goo.gl/2u1XMs6fzCn8XSic9'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      
      {/* Header */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-white text-center">
        <p className="text-amber-600 text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
          {contactInfo.title}
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-4 sm:mb-6 font-light">
          {contactInfo.mainTitle}
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-gray-500 font-light max-w-2xl mx-auto">
          {contactInfo.subtitle}
        </p>
      </section>

      {/* Contact Info */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">

          {/* Left: Details */}
          <div className="space-y-8 sm:space-y-10">
            <div>
              <h2 className="text-lg sm:text-xl text-gray-800 mb-6 sm:mb-8 font-light">اتصل بنا</h2>
              
              {/* Phone */}
              <div className="flex items-start gap-3 sm:gap-4">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mt-1" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 font-light">الهاتف</p>
                  <a href={`tel:${contactInfo.phone}`} className="text-sm sm:text-base text-gray-700 hover:text-amber-600 font-light transition">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 sm:gap-4">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mt-1" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 font-light">البريد الإلكتروني</p>
                  <a href={`mailto:${contactInfo.email}`} className="text-sm sm:text-base text-gray-700 hover:text-amber-600 font-light break-all transition">
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <h2 className="text-lg sm:text-xl text-gray-800 mb-6 sm:mb-8 font-light">ساعات العمل</h2>
                <p className="text-sm sm:text-base text-gray-600 font-light">{contactInfo.hours1}</p>
                <p className="text-sm sm:text-base text-gray-600 font-light">{contactInfo.hours2}</p>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <a href={contactInfo.mapLink} target="_blank" rel="noopener noreferrer">
              <iframe
                title="Dolci Mondo Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.968022212886!2d-9.598088684487722!3d30.427755481812507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda70f8e9f3b27cf%3A0x2a1b1cbe1d2e1a2c!2sAgadir%2C%20Morocco!5e0!3m2!1sen!2sma!4v1600000000000!5m2!1sen!2sma"
                width="100%"
                height="100%"
                className="h-64 sm:h-80 lg:h-96 w-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </a>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-800 mb-8 font-light">وسائل التواصل الاجتماعي</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {contactInfo.social.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-gray-200 rounded-lg p-6 sm:p-8 hover:border-amber-600 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="mb-4 sm:mb-5 p-3 sm:p-4 rounded-full bg-gray-50 group-hover:bg-amber-50 transition-colors">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <h3 className="text-base sm:text-lg text-gray-800 mb-2 sm:mb-3 font-light group-hover:text-amber-600 transition-colors">
                    {social.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-light">{social.handle}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-12 sm:h-16 bg-white" />
    </div>
  );
};

export default Contact;
