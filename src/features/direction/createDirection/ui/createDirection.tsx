import { paths } from "@/shared/routing";
import { Link } from "react-router-dom";
import styles from "./createDirection.module.scss";
import { PlusIcon } from "@/shared/assets/icons";

export const CreateDirection = () => {
  return (
    <Link to={paths.directionAdd} className={styles.create_btn}>
      <PlusIcon fill="#fff" />
    </Link>
  );
};
