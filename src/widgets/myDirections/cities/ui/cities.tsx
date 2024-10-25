import { AddCityButton, CityCarousel } from "@/features/location";
import styles from "./cities.module.scss";
import { FC } from "react";
import { ActiveCity } from "@/entities/location";
import { useTranslation } from "react-i18next";
import { LanguageSwitcherSmall } from "@/features/languageSwitchSmall";

interface CitiesProps {
  cities: ActiveCity[];
  setActive: (city: ActiveCity) => void;
  activeCity: ActiveCity | null;
  directionsLoading: boolean;
  citiesLoading: boolean;
}

export const Cities: FC<CitiesProps> = ({
  cities,
  setActive,
  activeCity,
  directionsLoading,
  citiesLoading,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.cities}>
      <div className="flex items-center justify-between gap-2 mb-[20px]">
        <h2 className={styles.cities__title}>{t("Мои города")}</h2>
        <LanguageSwitcherSmall />
      </div>
      <div className="flex">
        <AddCityButton />
        <div className={styles.carousel}>
          <CityCarousel
            directionsLoading={directionsLoading}
            citiesLoading={citiesLoading}
            cities={cities || []}
            setActive={setActive}
            activeCity={activeCity}
          />
        </div>
      </div>
    </div>
  );
};
