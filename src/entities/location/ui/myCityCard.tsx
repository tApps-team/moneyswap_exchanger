import { paths } from "@/shared/routing";
import { Link } from "react-router-dom";
import { FC } from "react";
import styles from "./myCityCard.module.scss";
import { SettingsIcon } from "@/shared/assets/icons";
import { ActiveCity } from "../model/types";

export type MyCityCardProps = {
  city: ActiveCity;
  onClick?: () => void;
  activeCity: boolean;
};

export const MyCityCard: FC<MyCityCardProps> = ({
  city,
  onClick,
  activeCity,
}) => {
  return (
    <div
      className={`${styles.card} ${activeCity && styles.card_active}`}
      onClick={onClick}
    >
      <div className={styles.icon}>
        <img src={city.country_flag} alt={`Иконка ${city.name}`} />
      </div>
      <p className={styles.name}>{city.name}</p>
      <Link to={paths.locationEdit} className={styles.settings_btn}>
        <SettingsIcon fill={"#F6FF5F"} />
      </Link>
    </div>
  );
};
