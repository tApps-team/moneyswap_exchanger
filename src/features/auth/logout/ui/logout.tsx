import { Button } from "@/shared/ui";
import { useAppDispatch } from "@/shared/model";
import { userSlice } from "@/entities/user";
import { LogoButtonIcon } from "@/shared/assets";

export const Logout = () => {
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(userSlice.actions.logout());
  };

  return (
    <Button
      className="items-center justify-start bg-transparent border-none mt-[15vh]"
      onClick={logout}
    >
      <div className="grid grid-cols-[auto,1fr,auto] gap-4 justify-between items-center">
        <LogoButtonIcon width={26} height={26} className="rotate-90" />
        <p className="text-xl">ВЫЙТИ</p>
      </div>
    </Button>
  );
};
