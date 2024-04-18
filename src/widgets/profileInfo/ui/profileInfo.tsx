import { useProfileInfoQuery } from "@/entities/user";
import { Button, Skeleton } from "@/shared/ui";
import { Link } from "react-router-dom";

export const ProfileInfo = () => {
  const { data: profileInfo, isLoading: isLoadingProfileInfo } =
    useProfileInfoQuery();
  return (
    <div className="text-white grid grid-rows-2 grid-cols-1 h-[60vh] ">
      {isLoadingProfileInfo ? (
        <div>
          <Skeleton className="w-full h-16 rounded-xl" />
        </div>
      ) : (
        <div>
          <div>{profileInfo?.title.ru.toUpperCase()}</div>
          <div>{profileInfo?.partner_link}</div>
        </div>
      )}
      <div className="grid grid-rows-2">
        <div className="text-center">
          <div>Свяжитесь с поддержкой</div>
          <div>для изменений</div>
        </div>
        <Button
          className="rounded-full  border-bg-darkGray  bg-darkGray text-mainColor text-xl"
          asChild
        >
          <Link target="_blank" to={"https://www.google.com/"}>
            СВЯЗАТЬСЯ
          </Link>
        </Button>
      </div>
    </div>
  );
};
