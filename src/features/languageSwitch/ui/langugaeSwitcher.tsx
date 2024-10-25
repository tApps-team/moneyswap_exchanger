import { Lang } from "@/shared/config";
import { Label, Switch } from "@/shared/ui";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggle = useCallback(async () => {
    i18n.changeLanguage(i18n.language === Lang.ru ? Lang.en : Lang.ru);
  }, [i18n]);
  return (
    <div className="absolute left-0 bottom-10 mb-4 w-full max-w-[500px] px-[10%]">
      <div className="flex items-center bg-lightGray p-4 justify-between rounded-full h-[50px] shadow-[0px_2px_10px_2px_rgba(0,0,0,0.4)]">
        <Label htmlFor="switch-language" className="uppercase text-xs">
          {t("Переключить язык")}
        </Label>
        <Switch onCheckedChange={toggle} id="switch-language" className="" />
      </div>
    </div>
  );
};
