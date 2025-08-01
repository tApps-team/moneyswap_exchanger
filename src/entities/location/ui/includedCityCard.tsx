import { FC } from "react";
import { useTranslation } from "react-i18next";
import { City } from "../model/types";
import { Lang } from "@/shared/config";
import { CheckCircle, XCircle } from "lucide-react";

interface IncludedCityCardProps {
  city: City;
  isActive: boolean;
  onClick?: (city: City, isActive: boolean) => void;
}

export const IncludedCityCard: FC<IncludedCityCardProps> = ({ city, isActive, onClick }) => {
  const { i18n } = useTranslation();

  return (
    <div
      className={`cursor-pointer flex items-center gap-2 text-sm w-fit px-3 py-2 rounded-full text-darkGray font-medium transition-all duration-200 ease-in-out transform active:scale-95 ${isActive ? "bg-mainColor text-darkGray" : "bg-gray-400"}`}
      key={city.id}
      onClick={() => onClick?.(city, isActive)}
      style={{
        animation: 'fadeInScale 0.3s ease-out'
      }}
    >
      {isActive ? <CheckCircle className="text-darkGray size-4" /> : <XCircle className="text-darkGray size-4" />}
      {city.name[i18n.language === Lang.ru ? Lang.ru : Lang.en]}
    </div>
  );
};