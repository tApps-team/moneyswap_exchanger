import {
  HomeIcon,
  NotificationIcon,
  ProfileIcon,
  StatisticsIcon,
} from "@/shared/assets/icons";
import { paths } from "@/shared/routing";
import { Link, useLocation } from "react-router-dom";

export const PathFooter = () => {
  const { pathname } = useLocation();
  return (
    <div className="w-full bg-none grid grid-cols-4 gap-10 p-4">
      <Link to={paths.profile} className="flex items-center justify-center">
        <ProfileIcon
          fill={
            pathname === paths.profile
              ? "var(--main-color)"
              : "var(--light-grey)"
          }
          width={20}
          height={20}
        />
      </Link>
      <Link to={paths.home} className="flex items-center justify-center">
        <HomeIcon
          width={20}
          height={20}
          fill={
            pathname === paths.home ? "var(--main-color)" : "var(--light-grey)"
          }
        />
      </Link>
      <Link
        to={paths.notifications}
        className="flex items-center justify-center"
      >
        <NotificationIcon
          width={20}
          height={20}
          fill={
            pathname === paths.notifications
              ? "var(--main-color)"
              : "var(--light-grey)"
          }
        />
      </Link>
      <Link to={paths.statistics} className="flex items-center justify-center">
        <StatisticsIcon
          width={20}
          height={20}
          fill={
            pathname === paths.statistics
              ? "var(--main-color)"
              : "var(--light-grey)"
          }
        />
      </Link>
    </div>
  );
};
