import { AddCityButton, CityCarousel } from "@/features/location";
import styles from "./cities.module.scss";
import { FC } from "react";
import { ActiveCity } from "@/entities/location";

interface CitiesProps {
  cities: ActiveCity[];
  setActive: (city: ActiveCity) => void;
  activeCity: ActiveCity | null;
}

export const Cities: FC<CitiesProps> = ({ cities, setActive, activeCity }) => {
  return (
    <div className={styles.cities}>
      <h2 className={styles.cities__title}>Мои города</h2>
      <div className="flex gap-3">
        <AddCityButton />
        <div className={styles.carousel}>
          <CityCarousel
            cities={cities || []}
            setActive={setActive}
            activeCity={activeCity}
          />
        </div>
      </div>
    </div>
  );
};
