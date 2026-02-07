import { useState, useEffect } from 'react';

const Header = () => {
  const [language, setLanguage] = useState('ar');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const translations = {
    ar: {
      contact: 'اتصل بنا'
    },
    en: {
      contact: 'Contact'
    },
    fr: {
      contact: 'Contact'
    }
  };

  const languages = [
    { code: 'ar', name: 'AR', fullName: 'العربية' },
    { code: 'en', name: 'EN', fullName: 'English' },
    { code: 'fr', name: 'FR', fullName: 'Français' }
  ];

  const t = translations[language];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setShowLanguageMenu(false);
  };

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full border-b z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white border-gray-200 shadow-sm' 
            : 'bg-transparent border-transparent'
        }`}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Contact Link - Left (Hidden on mobile) */}
            <div className="hidden md:flex flex-1">
              <a 
                href="/contact" 
                className={`text-sm lg:text-base transition-colors font-medium ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-gray-900' 
                    : 'text-white hover:text-gray-200'
                }`}
              >
                {t.contact}
              </a>
            </div>

            {/* Logo - Center */}
            <div className="flex-shrink-0 absolute left-1/2 transform -translate-x-1/2">
              <a href="/" className="flex items-center">
                <img 
                  src="/images/logo.png" 
                  alt="Logo" 
                  className={`h-12 sm:h-14 lg:h-16 w-auto object-contain transition-all duration-300 ${
                    isScrolled ? '' : 'brightness-0 invert'
                  }`}
                />
              </a>
            </div>

            {/* Language Selector - Right */}
            <div className="hidden md:flex flex-1 justify-end">
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className={`flex items-center gap-1.5 text-xs lg:text-sm font-semibold transition-all px-2.5 lg:px-3 py-1.5 lg:py-2 rounded border ${
                    isScrolled
                      ? 'text-gray-700 hover:text-gray-900 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      : 'text-white border-white/50 hover:bg-white/10'
                  }`}
                >
                  <span>{language.toUpperCase()}</span>
                  <svg 
                    className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Language Dropdown Menu - Desktop */}
                {showLanguageMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                          language === lang.code ? 'bg-gray-50 font-semibold text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        <span className="font-medium">{lang.name}</span>
                        {language === lang.code && (
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 ml-auto transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-gray-900' 
                  : 'text-white hover:text-gray-200'
              }`}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 bg-white">
              {/* Contact Link - Mobile */}
              <a 
                href="/contact" 
                className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.contact}
              </a>

              {/* Language Selector - Mobile */}
              <div className="px-4 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2 font-medium">
                  {language === 'ar' ? 'اللغة' : language === 'fr' ? 'Langue' : 'Language'}
                </p>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        language === lang.code 
                          ? 'bg-gray-900 text-white font-semibold' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>{lang.fullName}</span>
                      <span className="text-xs font-bold">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Overlay to close menus */}
      {(showLanguageMenu || mobileMenuOpen) && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-20 md:bg-transparent"
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