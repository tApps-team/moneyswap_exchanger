import { AddCityButton, CityCarousel } from "@/features/location";
import styles from "./cities.module.scss";
import { FC } from "react";
import { ActiveCity } from "@/entities/location";
import { Skeleton } from "@/shared/ui";
import { CityCarouselSkeleton } from "@/features/location/cityCarousel";

interface CitiesProps {
  cities: ActiveCity[];
  setActive: (city: ActiveCity) => void;
  activeCity: ActiveCity | null;
  isLoading: boolean;
}

export const Cities: FC<CitiesProps> = ({
  cities,
  setActive,
  activeCity,
  isLoading,
}) => {
  return (
    <div className={styles.cities}>
      <h2 className={styles.cities__title}>Мои города</h2>
      <div className="flex gap-3">
        <AddCityButton />
        <div className={styles.carousel}>
          {isLoading ? (
            <CityCarouselSkeleton />
          ) : (
            <CityCarousel
              cities={cities || []}
              setActive={setActive}
              activeCity={activeCity}
            />
          )}
        </div>
      </div>
    </div>
  );
};
