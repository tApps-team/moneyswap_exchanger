import { FC } from "react";
import styles from "./editDirection.module.scss";
import { Loader } from "lucide-react";

interface EditDirectionProps {
  editLoading: boolean;
}

export const EditDirection: FC<EditDirectionProps> = ({ editLoading }) => {
  return (
    <button type="submit" className={styles.submit_btn}>
      {editLoading ? <Loader className="animate-spin" /> : "Обновить"}
    </button>
  );
};
