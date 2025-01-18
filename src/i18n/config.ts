import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const supportedLangs = {
  en: "English",
  ja: "日本語",
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    returnEmptyString: false,
    supportedLngs: Object.keys(supportedLangs),
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;