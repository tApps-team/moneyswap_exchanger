import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
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
        <Button className="bg-transparent border-none mt-[15vh] text-start">
          <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
            <LogoButtonIcon width={26} height={26} className="rotate-90" />
            <p className="text-xl start">ВЫЙТИ</p>
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Выйти из аккаунта?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Назад</AlertDialogCancel>
          <AlertDialogAction onClick={logout}>Выйти</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
