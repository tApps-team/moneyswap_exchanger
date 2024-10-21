import { Logout } from "@/features/auth";
import { paths, support } from "@/shared/routing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  Button,
} from "@/shared/ui";
import { Link } from "react-router-dom";
import styles from "./profilePage.module.scss";
import { LogoButtonIcon, QuestionIcon, SettingsIcon } from "@/shared/assets";
import { X } from "lucide-react";

export const ProfilePage = () => {
  return (
    <div>
      <div className={styles.container}></div>
      <div className="grid justify-between">
        <div className="grid grid-row-2 gap-0">
          <Button
            className="items-center justify-start border-none px-0"
            asChild
          >
            <Link
              className="flex gap-3 sm:gap-4 bg-transparent"
              to={`${paths.profile}${paths.profileSettings}`}
            >
              <SettingsIcon color="#F6FF5F" />
              <p className="sm:text-base text-sm font-normal">ПАРАМЕТРЫ</p>
              <LogoButtonIcon className="-rotate-90 w-[22px] h-[22px] sm:h-[26px] sm:w-[26px]" />
            </Link>
          </Button>
          <Button
            className="items-center justify-start border-none px-0"
            asChild
          >
            <div className="flex gap-3 sm:gap-4 bg-transparent">
              <div className="w-[25px] h-[25px]">
                <QuestionIcon fill="#F6FF5F" />
              </div>
              <AlertDialog>
                <AlertDialogTrigger className="grid justify-start">
                  <p className="sm:text-base text-sm font-normal text-mainColor">
                    СЛУЖБА ПОДДЕРЖКИ
                  </p>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl w-[90vw]">
                  <div className="relative">
                    <AlertDialogCancel className="absolute -right-4 -top-3 p-0 border-0 h-[10px] hover:bg-red flex items-start justify-start">
                      <X width={20} height={20} stroke="#2d2d2d" />
                    </AlertDialogCancel>
                    <p className="font-semibold uppercase text-md text-center">
                      Служба поддержки
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
              <div className="w-[26px] h-[26px]">
                <LogoButtonIcon className="-rotate-90 w-[22px] h-[22px] sm:h-[26px] sm:w-[26px]" />
              </div>
            </div>
          </Button>
        </div>
        <Logout />
      </div>
    </div>
  );
};
