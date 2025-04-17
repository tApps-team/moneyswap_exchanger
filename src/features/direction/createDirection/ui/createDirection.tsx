import { paths } from "@/shared/routing";
import { Link } from "react-router-dom";
import styles from "./createDirection.module.scss";
import { PlusIcon } from "@/shared/assets/icons";

interface CreateDirectionProps {
  disabled?: boolean;
}

export const CreateDirection: React.FC<CreateDirectionProps> = ({ disabled }) => {
  return disabled ? (
    <div className={styles.create_btn}>
      <PlusIcon fill="#fff" />
    </div>
  ) : (
    <Link to={paths.directionAdd} className={styles.create_btn}>
      <PlusIcon fill="#fff" />
    </Link>
  );
};
