import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();

  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const language = i18n.language;

  const languages = [
    { code: "ar", name: "AR", fullName: "العربية" },
    { code: "en", name: "EN", fullName: "English" },
    { code: "fr", name: "FR", fullName: "Français" }
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    document.documentElement.dir = langCode === "ar" ? "rtl" : "ltr";
    setShowLanguageMenu(false);
    setMobileMenuOpen(false);
  };

  // Scroll detection
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
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Contact - Desktop */}
            <div className="hidden md:flex flex-1">
              <a
                href="/contact"
                className={`font-medium transition ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {t("header.contact")}
              </a>
            </div>

            {/* Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <img
                src="/images/logo.png"
                alt="Logo"
                className={`h-14 transition ${
                  isScrolled ? "" : "brightness-0 invert"
                }`}
              />
            </div>

            {/* Language - Desktop */}
            <div className="hidden md:flex flex-1 justify-end relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className={`px-3 py-2 border rounded text-sm font-semibold ${
                  isScrolled
                    ? "text-gray-700 border-gray-300"
                    : "text-white border-white/50"
                }`}
              >
                {language.toUpperCase()}
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 ${
                        language === lang.code && "font-bold"
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
              className={`md:hidden ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              ☰
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t py-4">
              <a
                href="/contact"
                className="block px-4 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("header.contact")}
              </a>

              <div className="px-4 mt-4">
                <p className="text-xs text-gray-500 mb-2">
                  {t("header.language")}
                </p>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      language === lang.code
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {lang.fullName}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

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
