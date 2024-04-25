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
          <Skeleton className="w-full h-12 sm:h-16 rounded-xl" />
        </div>
      ) : (
        <div>
          <div className="text-lg sm:text-xl uppercase">
            {profileInfo?.title?.ru}
          </div>
          <div className="text-xs sm:text-sm font-light">
            {profileInfo?.partner_link}
          </div>
        </div>
      )}
      <div className="grid grid-rows-2">
        <div className="text-center">
          <p>Свяжитесь с поддержкой</p>
          <p>для изменений</p>
        </div>
        <Button
          className="rounded-[35px] text-lg sm:text-xl border-bg-darkGray  bg-darkGray text-mainColor "
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
