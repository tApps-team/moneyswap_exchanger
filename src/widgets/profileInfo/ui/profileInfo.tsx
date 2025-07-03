import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { TelegramAccount } from "@/features/telegram-account";
import { useProfileInfoQuery } from "@/entities/user";
import { Lang } from "@/shared/config";
import { support } from "@/shared/routing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  Skeleton,
} from "@/shared/ui";

export const ProfileInfo = () => {
  const { i18n, t } = useTranslation();
  const { data: profileInfo, isLoading: isLoadingProfileInfo } =
    useProfileInfoQuery();
  const title =
    i18n.language === Lang.ru ? profileInfo?.title?.ru : profileInfo?.title?.en;
  return (
    <div className="text-white grid grid-flow-row content-between gap-10 min-h-[60vh]">
      {isLoadingProfileInfo ? (
        <div>
          <Skeleton className="w-full h-12 sm:h-16 rounded-xl" />
        </div>
      ) : (
        <div>
          <div className="truncate text-lg sm:text-xl uppercase">{title}</div>
          <Link
            className="text-xs sm:text-sm font-light underline"
            to={profileInfo?.partner_link || ""}
            target="_blank"
          >
            {profileInfo?.partner_link}
          </Link>
        </div>
      )}
      <div>
        <TelegramAccount />
      </div>
      <div className="grid grid-flow-row gap-6 items-end h-fit">
        <div className="text-center">
          <p>{t("Свяжитесь с поддержкой")}</p>
          <p>{t("для изменений")}</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger className="h-[70px] rounded-[50px] border-2 border-lightGray text-lg sm:text-xl border-bg-darkGray  bg-darkGray text-white uppercase">
            {t("Связаться")}
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-2xl w-[90vw]">
            <div className="relative">
              <AlertDialogCancel className="absolute -right-4 -top-3 p-0 border-0 h-[10px] hover:bg-red flex items-start justify-start">
                <X width={20} height={20} stroke="#2d2d2d" />
              </AlertDialogCancel>
              <p className="font-semibold uppercase text-md text-center">
                {t("Служба поддержки")}
              </p>
            </div>
            <AlertDialogFooter className="sm:grid-rows-2 grid-rows-2 sm:grid-cols-1">
              <Link to={support.support} target="_blank">
                <AlertDialogAction className="w-full">
                  Support
                </AlertDialogAction>
              </Link>
              <Link to={support.admin} target="_blank">
                <AlertDialogAction className="bg-[#2d2d2d] border-[#2d2d2d] text-[#fff] w-full">
                  Admin
                </AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
