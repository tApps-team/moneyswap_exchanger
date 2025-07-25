import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TelegramAccountType, useSwitchNotificationActivityMutation } from "@/entities/user";
import { Skeleton, Switch } from "@/shared/ui";
import { TelegramAddModal } from "./telegram-add-modal";
import { TelegramDeleteModal } from "./telegram-delete-modal";

interface TelegramAccountProps {
  telegram_account: TelegramAccountType | null;
  isLoading: boolean;
  has_exchange_admin_order: boolean;
}

export const TelegramAccount:FC<TelegramAccountProps> = ({telegram_account, isLoading, has_exchange_admin_order}) => {
  const { t } = useTranslation();
  const [switchNotificationActivity] = useSwitchNotificationActivityMutation();
  
  return (
    <>
    {isLoading ? <Skeleton className="w-full h-[150px] rounded-xl bg-lightGray" /> :     <div className="grid grid-flow-row gap-6">
      {telegram_account ? (
        <div className="grid grid-flow-row gap-4">
          <p className="text-center mobile:text-lg text-base uppercase font-medium">{t("telegram_account.telegram_account_info")}:</p>
          <div className="grid grid-flow-row gap-2 mobile:text-base text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Telegram ID:</span>
              <span className="font-semibold text-mainColor">{telegram_account.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Username:</span>
              <span className="font-semibold text-mainColor">{telegram_account.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{t("telegram_account.telegram_account_link")}:</span>
              <Link to={telegram_account.link} target="_blank" className="font-semibold text-mainColor underline">{telegram_account.link}</Link>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">{t("telegram_account.telegram_account_notification")}:</span>
              <Switch
                  checked={telegram_account.notification}
                  onCheckedChange={() => switchNotificationActivity()}
                />
            </div>
          </div>
          {telegram_account && <TelegramDeleteModal />}
        </div>
      ) : (
        <div className="grid grid-flow-row gap-4 mobile:text-lg text-base font-medium"><p className="text-center uppercase">{t("telegram_account.telegram_error")}</p><p className="mx-auto w-[90%] text-center font-semibold text-mainColor text-sm">{t("telegram_account.telegram_error_description")}</p></div>
      )}
      <TelegramAddModal is_add={telegram_account ? false : true} has_exchange_admin_order={has_exchange_admin_order} />
    </div>}
    </>
  );
};
