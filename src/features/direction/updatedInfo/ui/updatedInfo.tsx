import { ActiveCity } from "@/entities/location";
import { FC } from "react";
import styles from "./updatedInfo.module.scss";

interface UpdatedInfoProps {
  activeCity: ActiveCity;
  editSuccess: boolean;
}

export const UpdatedInfo: FC<UpdatedInfoProps> = ({
  activeCity,
  editSuccess,
}) => {
  return (
    <p className={`${styles.updated} ${editSuccess && styles.success}`}>
      Updated {activeCity?.updated.date} at {activeCity?.updated.time} from
      xe.com
    </p>
  );
};
