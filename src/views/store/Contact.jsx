import React from "react";
import { Mail, Phone, MapPin, Instagram, MessageCircle, Music, Facebook } from "lucide-react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { key: "whatsapp", icon: MessageCircle, url: "https://wa.me/966533622117" },
    { key: "instagram", icon: Instagram, url: "https://instagram.com" },
    { key: "tiktok", icon: Music, url: "https://tiktok.com" },
    { key: "facebook", icon: Facebook, url: "https://facebook.com" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir={t("direction") || "rtl"}>
      
      {/* Header */}
      <section className="pt-30 pb-12 px-4 sm:px-6 lg:px-8 bg-white text-center">
        <p className="text-amber-600 text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
          {t("contact.title")}
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-4 sm:mb-6 font-light">
          {t("contact.mainTitle")}
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-gray-500 font-light max-w-2xl mx-auto">
          {t("contact.subtitle")}
        </p>
      </section>

      {/* Contact Info */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">

          {/* Left: Details */}
          <div className="space-y-8 sm:space-y-10">
            <div>
              <h2 className="text-lg sm:text-xl text-gray-800 mb-6 sm:mb-8 font-light">{t("contact.title")}</h2>
              
              {/* Phone */}
              <div className="flex items-start gap-3 sm:gap-4">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mt-1" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 font-light">{t("contact.phone")}</p>
                  <a href={`tel:+966533622117`} className="text-sm sm:text-base text-gray-700 hover:text-amber-600 font-light transition">
                    {t("footer.contactInfo.phone")}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 sm:gap-4">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mt-1" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 font-light">{t("contact.email")}</p>
                  <a href={`mailto:contact@dolci-mondo.com`} className="text-sm sm:text-base text-gray-700 hover:text-amber-600 font-light break-all transition">
                  {t("footer.contactInfo.email")}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <h2 className="text-lg sm:text-xl text-gray-800 mb-6 sm:mb-8 font-light">{t("contact.hours")}</h2>
                <p className="text-sm sm:text-base text-gray-600 font-light">{t("contact.hours1")}</p>
                <p className="text-sm sm:text-base text-gray-600 font-light">{t("contact.hours2")}</p>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          {/* Right: Map */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <a href="https://maps.app.goo.gl/CX58G7WfJkP5Z2uH9" target="_blank" rel="noopener noreferrer">
              <iframe
                title={t("contact.mainTitle")}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.123456789012!2d45.960000!3d28.433000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e33f123456789ab%3A0xabcdef1234567890!2sCX58%2BG7W%2C%20King%20Abdullah%20Rd%2C%20Al%20Khalidiyah%2C%20Hafar%20Al%20Batin%2039953%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sar!4v1600000000000!5m2!1sen!2sar"
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
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-800 mb-8 font-light">{t("contact.socialMedia")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-gray-200 rounded-lg p-6 sm:p-8 hover:border-amber-600 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="mb-4 sm:mb-5 p-3 sm:p-4 rounded-full bg-gray-50 group-hover:bg-amber-50 transition-colors">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <h3 className="text-base sm:text-lg text-gray-800 mb-2 sm:mb-3 font-light group-hover:text-amber-600 transition-colors">
                    {t(`contact.social.${social.key}.name`)}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-light">
                    {t(`contact.social.${social.key}.handle`)}
                  </p>
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
