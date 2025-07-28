import { FC } from "react";
import { useTranslation } from "react-i18next";
import { TelegramAccount } from "@/features/telegram-account";
import { useProfileInfoQuery } from "@/entities/user";
import styles from "./notificationsPage.module.scss";

export const NotificationsPage: FC = () => {
  const { t } = useTranslation();
  const { data: profileInfo, isLoading: isLoadingProfileInfo } =
    useProfileInfoQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  
  return (
    <div>
      <div className={styles.container}></div>
      <div className="grid grid-flow-row gap-10 mt-10 text-white">
        <h1 className="text-center text-mainColor text-xl font-medium uppercase">
          {t("notifications.page_title")}
        </h1>
        <div>
          <TelegramAccount 
            telegram_account={profileInfo?.telegram || null} 
            isLoading={isLoadingProfileInfo} 
            has_exchange_admin_order={profileInfo?.has_exchange_admin_order || false}
          />
        </div>
      </div>
    </div>
  );
};
