import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header = () => {
  const { t, i18n } = useTranslation();

  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const language = i18n.language;

  const languages = [
    { code: "ar", name: "AR", fullName: "العربية" },
    { code: "en", name: "EN", fullName: "English" },
    { code: "fr", name: "FR", fullName: "Français" },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    document.documentElement.dir = langCode === "ar" ? "rtl" : "ltr";
    setShowLanguageMenu(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        dir={language === "ar" ? "rtl" : "ltr"}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg border-b border-gray-100"
            : "bg-gradient-to-b from-black/30 via-black/20 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20 lg:h-24">

            {/* Contact - Desktop */}
            <div className="hidden md:flex flex-1">
              <Link
                to="/contact"
                className={`font-medium transition text-sm ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {t("header.contact")}
              </Link>
            </div>

            {/* Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link to="/">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain transition-all duration-300"
                />
              </Link>
            </div>

            {/* Language - Desktop */}
            <div className="hidden md:flex flex-1 justify-end relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className={`px-3 py-2 border rounded text-sm font-semibold transition ${
                  isScrolled
                    ? "text-gray-700 border-gray-300 hover:border-gray-500"
                    : "text-white border-white/50 hover:border-white"
                }`}
              >
                {language.toUpperCase()}
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded shadow-lg z-50 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition ${
                        language === lang.code
                          ? "font-bold text-gray-900 bg-gray-50"
                          : "text-gray-600"
                      }`}
                    >
                      {lang.fullName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden text-xl transition ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 shadow-lg">
            <Link
              to="/contact"
              className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("header.contact")}
            </Link>

            <div className="px-6 mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                {t("header.language")}
              </p>

              <div className="flex flex-col gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-4 py-2.5 rounded text-sm transition ${
                      language === lang.code
                        ? "bg-gray-900 text-white font-semibold"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {lang.fullName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Overlay */}
      {(showLanguageMenu || mobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowLanguageMenu(false);
            setMobileMenuOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Header;