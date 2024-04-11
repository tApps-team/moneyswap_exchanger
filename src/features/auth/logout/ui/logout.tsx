import { Button } from "@/shared/ui";
import { LogOut } from "lucide-react";
import { useAppDispatch } from "@/shared/model";
import { userSlice } from "@/entities/user";

export const Logout = () => {
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(userSlice.actions.logout());
  };

  return (
    <Button className="items-center justify-start" onClick={logout}>
      <div className="grid grid-cols-[auto,1fr,auto] gap-6 justify-between items-center">
        <LogOut />
        <div>Выйти</div>
      </div>
    </Button>
  );
};
