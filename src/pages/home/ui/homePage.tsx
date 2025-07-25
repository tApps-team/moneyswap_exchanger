import { MyDirections } from "@/widgets/myDirections";
import styles from "./homePage.module.scss";
import { TelegramAccountErrorModal } from "@/features/telegram-account";

export const HomePage = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <MyDirections />
      <TelegramAccountErrorModal />
    </div>
  );
};
