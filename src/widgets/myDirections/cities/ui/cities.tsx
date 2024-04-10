import { AddCityButton, CityCarousel } from "@/features/location";
import styles from "./cities.module.scss";
import { MyCity } from "@/entities/myCity";
import { FC } from "react";

interface CitiesProps {
  cities: MyCity[];
  setActiveCity: (city: MyCity) => void;
}

export const Cities: FC<CitiesProps> = ({ cities, setActiveCity }) => {
  return (
    <div className={styles.cities}>
      <h2 className={styles.cities__title}>Мои города</h2>
      <div className="flex gap-3">
        <AddCityButton />
        <div>
          <CityCarousel cities={cities || []} setActiveCity={setActiveCity} />
        </div>
      </div>
    </div>
  );
};
