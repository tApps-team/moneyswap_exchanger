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

export const Logout = () => {
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(userSlice.actions.logout());
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="grid justify-start">
        <div className="grid grid-cols-[auto,1fr] gap-4 items-center bg-transparent border-none mt-[15vh] text-start text-whiteColor">
          <LogoButtonIcon width={26} height={26} className="rotate-90" />
          <p className="text-sm sm:text-base start">ВЫЙТИ</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm sm:text-base">
            Выйти из аккаунта?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-sm sm:text-base rounded-3xl sm:rounded-full">
            Назад
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={logout}
            className="text-sm sm:text-base rounded-3xl  sm:rounded-full"
          >
            Выйти
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
