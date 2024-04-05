import { AddCityButton, CityCarousel } from "@/features/location";
import styles from "./cities.module.scss";
import { MyCity } from "@/entities/myCity";
import { FC } from "react";

interface CitiesProps {
  cities: MyCity[];
}

export const Cities: FC<CitiesProps> = ({ cities }) => {
  return (
    <div>
      <div className="mb-5 text-2xl">Мои города</div>
      <div className="flex gap-3">
        <AddCityButton />
        <div className={styles.cities}>
          <CityCarousel cities={cities} />
        </div>
      </div>
    </div>
  );
};
