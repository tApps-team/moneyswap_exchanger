import { useDeleteTelegramAccountMutation } from "@/entities/user";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger, useToast } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const TelegramDeleteModal = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [deleteTelegramAccount] = useDeleteTelegramAccountMutation();

  const handleDeleteTelegramAccount = () => {
    deleteTelegramAccount().unwrap().then(() => {
      toast({
        title: t("telegram_account.telegram_delete_success_title"),
      });
    }).catch(() => {
        toast({
            title: t("Что-то пошло не так..."),
            variant: "destructive",
          });
    });
  };
  return (
    <AlertDialog>
    <AlertDialogTrigger className="text-base font-semibold text-white underline">
    {t("telegram_account.telegram_delete_title")}
    </AlertDialogTrigger>
    <AlertDialogContent className="rounded-2xl w-[90vw]">
        <p className="font-medium mobile:text-lg text-base text-center">
          {t("telegram_account.telegram_delete_description")}
        </p>
      <AlertDialogFooter className="sm:grid-rows-2 grid-rows-2 sm:grid-cols-1">
          <AlertDialogCancel className="mobile:text-base text-sm bg-[#2d2d2d] border-[#2d2d2d] text-[#fff] w-full" onClick={handleDeleteTelegramAccount}>
            {t("telegram_account.telegram_delete_btn")}
          </AlertDialogCancel>
          <AlertDialogCancel className="mobile:text-base text-sm bg-mainColor border-mainColor text-darkGray w-full">
            {t("telegram_account.telegram_no_delete_btn")}
        </AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  );
};