import { paths } from "@/shared/routing";
import { Link } from "react-router-dom";
import { FC } from "react";
import styles from "./myCityCard.module.scss";
import { SettingsIcon } from "@/shared/assets/icons";
import { ActiveCity } from "../model/types";
import { useTranslation } from "react-i18next";
import { Lang } from "@/shared/config";

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
  const { i18n } = useTranslation();
  const cityName = i18n.language === Lang.ru ? city?.name.ru : city?.name.en;
  return (
    <div
      className={`${styles.card} ${activeCity && styles.card_active}`}
      onClick={onClick}
    >
      <div className={styles.icon}>
        <img src={city?.country_flag} alt={`Иконка ${city?.name}`} />
      </div>
      <p className={styles.name}>{cityName}</p>
      <Link
        to={paths.locationEdit}
        className={styles.settings_btn}
        onClick={onClick}
      >
        <SettingsIcon fill={"#F6FF5F"} />
      </Link>
    </div>
  );
};
