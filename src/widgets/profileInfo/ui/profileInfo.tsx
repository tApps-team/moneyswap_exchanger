import { useProfileInfoQuery } from "@/entities/user";
import { Button, Skeleton } from "@/shared/ui";
import { Link } from "react-router-dom";

export const ProfileInfo = () => {
  const { data: profileInfo, isLoading: isLoadingProfileInfo } =
    useProfileInfoQuery();
  return (
    <div className="text-white grid grid-row-3 h-screen ">
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
      <div className="grid grid-row-2">
        <div className="text-center">
          <div>Свяжитесь с поддержкой</div>
          <div>для изменений</div>
        </div>
        <Button
          className="row-span-3 rounded-full border border-bg-darkGray h-14 bg-darkGray text-mainColor text-xl"
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
