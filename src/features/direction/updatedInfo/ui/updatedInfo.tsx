import { ActiveLocation } from "@/entities/location";
import { FC } from "react";
import styles from "./updatedInfo.module.scss";
import { useTranslation } from "react-i18next";

interface UpdatedInfoProps {
  activeLocation: ActiveLocation;
}

export const UpdatedInfo: FC<UpdatedInfoProps> = ({ activeLocation }) => {
  const { t } = useTranslation();
  return (
    <p className={styles.updated}>
      {t("Обновлено")} {activeLocation?.updated?.date} {t("в")}{" "}
      {activeLocation?.updated?.time}
    </p>
  );
};
