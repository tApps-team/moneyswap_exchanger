import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui";
import { useAppDispatch } from "@/shared/model";
import { userSlice } from "@/entities/user";
import { LogoButtonIcon } from "@/shared/assets";
import { useTranslation } from "react-i18next";
import { authApi, baseApi } from "@/shared/api";
import { setActiveLocation } from "@/entities/location";

export const Logout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(userSlice.actions.logout());
    dispatch(baseApi.util.resetApiState());
    dispatch(authApi.util.resetApiState());
    dispatch(setActiveLocation(null));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="grid justify-start">
        <div className="grid grid-cols-[auto,1fr] gap-4 items-center bg-transparent border-none mt-[15vh] text-start text-whiteColor">
          <LogoButtonIcon width={26} height={26} className="rotate-90" />
          <p className="text-sm sm:text-base start uppercase">{t("Выйти")}</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Выйти из аккаунта?")}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("Назад")}</AlertDialogCancel>
          <AlertDialogAction onClick={logout}>{t("Выйти")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
