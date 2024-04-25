import { ActiveCity } from "@/entities/location";
import { FC } from "react";
import styles from "./updatedInfo.module.scss";

interface UpdatedInfoProps {
  activeCity: ActiveCity;
}

export const UpdatedInfo: FC<UpdatedInfoProps> = ({ activeCity }) => {
  return (
    <p className={styles.updated}>
      Updated {activeCity?.updated.date} at {activeCity?.updated.time} from
      xe.com
    </p>
  );
};
