import { AddLocationButton, LocationCarousel } from "@/features/location";
import { FC } from "react";
import { ActiveLocation } from "@/entities/location";
import { useTranslation } from "react-i18next";
import { LanguageSwitcherSmall } from "@/features/languageSwitchSmall";
import styles from "./locations.module.scss";

interface LocationsProps {
  locations: ActiveLocation[];
  setActive: (location: ActiveLocation) => void;
  activeLocation: ActiveLocation | null;
  directionsLoading: boolean;
  locationsLoading: boolean;
  isCountry?: boolean;
}

export const Locations: FC<LocationsProps> = ({
  locations,
  setActive,
  activeLocation,
  directionsLoading,
  locationsLoading,
  isCountry,
}) => {
  const { t } = useTranslation();
  return (
    <div className={`${styles.cities} ${!isCountry && "mb-8"}`}>
      <div className="flex items-center justify-between gap-2 mb-[20px]">
        <h2 className={styles.cities__title}>
          {isCountry ? t("Мои страны") : t("Мои города")}
        </h2>
        {!isCountry && <LanguageSwitcherSmall />}
      </div>
      <div className="flex">
        <AddLocationButton />
        <div className={styles.carousel}>
          <LocationCarousel
            directionsLoading={directionsLoading}
            locationsLoading={locationsLoading}
            locations={locations || []}
            setActive={setActive}
            activeLocation={activeLocation}
            isCountry={isCountry}
          />
        </div>
      </div>
    </div>
  );
};
