import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const LanguageDetector = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    const currentLang = i18n.languages[0];
    i18n.changeLanguage(currentLang);
  }, []);
  return <></>;
};
