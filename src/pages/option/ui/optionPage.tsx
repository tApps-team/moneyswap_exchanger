import { Button } from "@/shared/ui";
import { Link } from "react-router-dom";

export const OptionPage = () => {
  return (
    <div className="flex flex-col w-[500px] gap-4">
      <Button asChild>
        <Link to={"/acount-info"}>Информация аккаунта</Link>
      </Button>
      <Button asChild>
        <Link to={"/change-password"}>Пароль</Link>
      </Button>
    </div>
  );
};
