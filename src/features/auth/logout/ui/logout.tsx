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
      className="items-center justify-start bg-transparent"
      onClick={logout}
    >
      <div className="grid grid-cols-[auto,1fr,auto] gap-4 justify-between items-center">
        <LogoButtonIcon width={20} height={20} className="rotate-90" />
        <div>ВЫЙТИ</div>
      </div>
    </Button>
  );
};
