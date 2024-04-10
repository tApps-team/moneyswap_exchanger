import { paths } from "@/shared/routing";
import { Link } from "react-router-dom";
import styles from "./addCityButton.module.scss";
import { PlusIcon } from "@/shared/assets/icons";

export const AddCityButton = () => {
  return (
    <Link to={paths.locationAdd} className={styles.add_city_btn}>
      <PlusIcon fill="#F6FF5F" />
    </Link>
  );
};
