import { paths } from "@/shared/routing";
import { Link } from "react-router-dom";
import { FC } from "react";
import { SettingsIcon } from "@/shared/assets/icons";
import { ActiveLocation } from "../model/types";
import { useTranslation } from "react-i18next";
import { Lang } from "@/shared/config";
import styles from "./myLocationCard.module.scss";

export type MyLocationCardProps = {
  location: ActiveLocation;
  onClick?: () => void;
  activeLocation: boolean;
};

export const MyLocationCard: FC<MyLocationCardProps> = ({
  location,
  onClick,
  activeLocation,
}) => {
  const { i18n } = useTranslation();
  const cityName =
    i18n.language === Lang.ru ? location?.name.ru : location?.name.en;
  return (
    <div
      className={`${styles.card} ${activeLocation ? styles.card_active : ""}`}
      onClick={onClick}
    >
      <div className={styles.icon}>
        <img src={location?.country_flag} alt={`Иконка ${location?.name}`} />
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
