import { ActiveCity } from "@/entities/location";
import { FC } from "react";
import styles from "./updatedInfo.module.scss";

interface UpdatedInfoProps {
  activeCity: ActiveCity;
}

export const UpdatedInfo: FC<UpdatedInfoProps> = ({ activeCity }) => {
  return (
    <p className={styles.updated}>
      Обновлено {activeCity?.updated.date} в {activeCity?.updated.time}
    </p>
  );
};
