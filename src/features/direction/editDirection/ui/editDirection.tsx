import { FC } from "react";
import styles from "./editDirection.module.scss";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EditDirectionProps {
  editLoading: boolean;
}

export const EditDirection: FC<EditDirectionProps> = ({ editLoading }) => {
  const { t } = useTranslation();
  return (
    <button type="submit" className={styles.submit_btn}>
      {editLoading ? <Loader className="animate-spin" /> : t("Обновить")}
    </button>
  );
};
