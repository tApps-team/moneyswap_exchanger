import { CustomLoader } from "@/shared/ui";
import { FC } from "react";
import styles from "./editDirection.module.scss";

interface EditDirectionProps {
  editError?: boolean;
  editSuccess: boolean;
  editLoading: boolean;
}

export const EditDirection: FC<EditDirectionProps> = ({
  editError,
  editSuccess,
  editLoading,
}) => {
  return (
    <button
      className={`${styles.submit_btn} ${editError && styles.error} ${
        editSuccess && styles.success
      }`}
    >
      {editLoading ? <CustomLoader /> : "Обновить"}
    </button>
  );
};
