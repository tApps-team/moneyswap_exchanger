import { useProfileInfoQuery } from "@/entities/user";
import { Button } from "@/shared/ui";
import { Link } from "react-router-dom";

export const ProfileInfo = () => {
  const { data: profileInfo } = useProfileInfoQuery();
  return (
    <div className="text-white flex flex-col gap-4">
      <div>{profileInfo?.title.ru}</div>
      <div>{profileInfo?.partner_link}</div>
      <div className="text-center">
        <div>Свяжитесь с поддержкой</div>
        <div>для изменений</div>
      </div>
      <Button
        className="rounded-full border border-bg-darkGray h-14 bg-darkGray text-mainColor text-xl"
        asChild
      >
        <Link target="_blank" to={"https://www.google.com/"}>
          СВЯЗАТЬСЯ
        </Link>
      </Button>
    </div>
  );
};
