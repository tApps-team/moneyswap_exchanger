import { useEffect, useState } from "react";
import { Link } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui";
import { TelegramLinkBtn } from "./link-btn";
import { setLinkedState } from "@/entities/user";
import { useAppDispatch, useAppSelector } from "@/shared/model";

export const TelegramAccountErrorModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { isUserSeeTelegramErrorModal } = useAppSelector((state) => state.user);
  
  const data = {
    username: "exchange_bot",
    user_id: 1234567890,
    is_current: false,
  };

  useEffect(() => {
    if (!data.is_current && !isUserSeeTelegramErrorModal) {
      setIsOpen(true);
      dispatch(setLinkedState(true));
    }
    console.log("effect")
  }, [data.is_current, isUserSeeTelegramErrorModal, dispatch]);

  const tg_link = "https://t.me/exchange_bot_add";
  const tg_text = "telegram_account.add_btn";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-h-[35vh] w-[90%] rounded-xl bg-darkGray border-none text-white">
        <DialogHeader className="grid grid-flow-row gap-4">
          <DialogTitle className="leading-tight text-center mobile-xs:text-base text-sm text-mainColor">{t("telegram_account.telegram_error_modal_title")}</DialogTitle>
          <DialogDescription className="mobile-xl:text-base text-sm text-center text-white">
            {t("telegram_account.telegram_error_modal_description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <TelegramLinkBtn link={tg_link} text={tg_text} icon={<Link className="size-5" />} />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};