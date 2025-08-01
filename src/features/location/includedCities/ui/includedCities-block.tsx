import { FC } from "react";
import { City, IncludedCityCard } from "@/entities/location";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib";
import { ScrollArea } from "@/shared/ui";

interface IncludedCitiesBlockProps {
  cities: City[];
  isActive: boolean;
  onClick: (city: City, isActive: boolean) => void;
}

export const IncludedCitiesBlock: FC<IncludedCitiesBlockProps> = ({ cities, isActive, onClick }) => {
  const { t } = useTranslation();
  const title = isActive ? t("choosen_cities.active_cities") : t("choosen_cities.unactive_cities");
  const emptyText = isActive ? t("choosen_cities.active_cities_empty") : t("choosen_cities.unactive_cities_empty");

  return (
    <div className="grid grid-flow-row gap-4 rounded-[20px] bg-darkGray/20 px-2 py-3 shadow-[1px_2px_8px_1px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out">
      <div className={cn("text-gray-300 text-center text-base font-medium", isActive && "text-mainColor")}>{title}</div>
      <ScrollArea className="transition-all px-2 duration-300 ease-in-out max-h-[400px] ">
        <div className="flex flex-wrap gap-1">
          {cities?.length > 0 ? cities?.map((city) => (
            <IncludedCityCard key={city.id} city={city} isActive={isActive} onClick={onClick} />
          )) : <div className="w-full text-center text-gray-400 text-sm font-medium">{emptyText}</div>}
        </div>
      </ScrollArea>
    </div>
  )
}