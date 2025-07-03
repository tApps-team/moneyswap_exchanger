import { Link, Unlink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TelegramLinkBtn } from "./link-btn";

export const TelegramAccount = () => {
  const { t } = useTranslation();
  const data = {
    username: "exchange_bot",
    user_id: 1234567890,
    is_current: true,
  };

  const tg_link = data.is_current ? "https://t.me/exchange_bot_edit" : "https://t.me/exchange_bot_add";
  const tg_text = data.is_current ? "telegram_account.edit_btn" : "telegram_account.add_btn";
  
  return (
    <div className="grid grid-flow-row gap-8">
      {data.is_current ? (
        <div className="grid grid-flow-row gap-1 text-center text-base font-normal"><p>{t("telegram_account.telegram_success")}</p><p className="font-semibold text-mainColor underline">{data.user_id} | {data.username}</p></div>
      ) : (
        <div className="grid grid-flow-row gap-1 text-center text-base font-normal"><p>{t("telegram_account.telegram_error")}</p><p className="mx-auto w-[90%] font-semibold text-mainColor text-sm">{t("telegram_account.telegram_error_description")}</p></div>
      )}
      {data.is_current ? (
        <TelegramLinkBtn link={tg_link} text={tg_text} icon={<Unlink className="size-5" />} />
      ) : (
        <TelegramLinkBtn link={tg_link} text={tg_text} icon={<Link className="size-5" />} />
      )}
    </div>
  );
};
