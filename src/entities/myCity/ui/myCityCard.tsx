import { paths } from "@/shared/routing";
import { Card, CardContent } from "@/shared/ui";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { MyCity } from "../model/types";
import { FC } from "react";
import styles from "./myCityCard.module.scss";
import { SettingsIcon } from "@/shared/assets/icons";

export type MyCityCardProps = {
  city: MyCity;
  onClick?: () => void;
};

export const MyCityCard: FC<MyCityCardProps> = ({ city, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
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
