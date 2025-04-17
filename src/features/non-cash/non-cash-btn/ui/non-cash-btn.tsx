import { NotepadText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/utils"
import { AddNonCashDirection } from "../components";

interface NonCashBtnProps {
  isActive?: boolean
  setNonCash: () => void;
}

export const NonCashBtn = ({ isActive, setNonCash }: NonCashBtnProps) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-flow-row w-full mt-8">
      <p className="mobile-xs:text-lg text-base font-medium text-mainColor uppercase mb-5">
        {t("Безналичные направления")}
      </p>
      <div className="grid grid-cols-[auto,1fr] justify-stretch w-full justify-items-stretch gap-2">
        <AddNonCashDirection />
      <div onClick={setNonCash} className={cn(
          "px-2 h-[70px] flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold rounded-full text-black uppercase hover:scale-[1.005] hover:shadow-[0_8px_15px_1px_rgba(0,0,0,0.25)] transition-all duration-300",
          isActive ? "bg-mainColor" : "bg-lightGray border-2 border-lightGray"
        )}>
        <NotepadText className="stroke-[1.5px] size-6" />
      <p 
        className="text-sm font-semibold"
      >
        {t("Безналичные")}
      </p>
      </div>
      </div>
    </div>
  );
};
