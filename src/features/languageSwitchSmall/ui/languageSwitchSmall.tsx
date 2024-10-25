import { Lang } from "@/shared/config";
import { Label, Switch } from "@/shared/ui";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcherSmall = () => {
  const { i18n, t } = useTranslation();

  const toggle = useCallback(async () => {
    i18n.changeLanguage(i18n.language === Lang.ru ? Lang.en : Lang.ru);
  }, [i18n]);
  return (
    <div className="">
      <div className="flex items-center justify-center gap-2">
        <Label
          htmlFor="switch-language"
          className="uppercase text-[8px] font-semibold text-white"
        >
          {t("Переключить язык")}
        </Label>
        <Switch onCheckedChange={toggle} id="switch-language" className="" />
      </div>
    </div>
  );
};
