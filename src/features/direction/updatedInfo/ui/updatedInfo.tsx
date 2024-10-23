import { ActiveCity } from "@/entities/location";
import { FC } from "react";
import styles from "./updatedInfo.module.scss";
import { useTranslation } from "react-i18next";

interface UpdatedInfoProps {
  activeCity: ActiveCity;
}

export const UpdatedInfo: FC<UpdatedInfoProps> = ({ activeCity }) => {
  const { t } = useTranslation();
  return (
    <p className={styles.updated}>
      {t("Обновлено")} {activeCity?.updated?.date} {t("в")}{" "}
      {activeCity?.updated?.time}
    </p>
  );
};
