import { useTranslation } from "react-i18next";
import {
  FaInstagram,
  FaTiktok,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

const socialLinks = [
  {
    id: 1,
    name: "Instagram",
    url: "https://www.instagram.com/dolcimondo",
    icon: FaInstagram,
    bg: "bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400",
  },
  {
    id: 2,
    name: "TikTok",
    url: "https://www.tiktok.com/@dolcimondo",
    icon: FaTiktok,
    bg: "bg-black",
  },
  {
    id: 3,
    name: "Facebook",
    url: "https://www.facebook.com/dolcimondo",
    icon: FaFacebookF,
    bg: "bg-blue-600",
  },
  {
    id: 4,
    name: "WhatsApp",
    url: "https://wa.me/966533625678",
    icon: FaWhatsapp,
    bg: "bg-green-500",
  },
];

const Section_1 = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-10 md:py-14 px-4 text-center">
      
      {/* Title */}
      <h2 className="text-lg md:text-xl font-medium text-gray-800 mb-6 md:mb-8">
        {t("contact.title")}
      </h2>

      {/* Icons */}
      <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
        {socialLinks.map((social) => {
          const Icon = social.icon;

          return (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`
                flex items-center justify-center
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                rounded-full text-white
                ${social.bg}
                shadow-md
                transform transition-all duration-300
                hover:scale-110 hover:shadow-lg
              `}
            >
              <Icon className="text-sm sm:text-base md:text-lg" />
            </a>
          );
        })}
      </div>

    </section>
  );
};

export default Section_1;