import { AddCityButton, CityCarousel } from "@/features/location";
import styles from "./myCities.module.scss";

export const MyCities = () => {
  return (
    <div>
      <div>Мои города</div>
      <div className="flex gap-3">
        <AddCityButton />
        <div className={styles.cities}>
          <CityCarousel />
        </div>
      </div>
    </div>
  );
};
