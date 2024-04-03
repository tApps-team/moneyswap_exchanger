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
    <div className="w-full bg-gray-500 grid grid-cols-4 gap-10 p-4">
      <Link
        to={paths.profile}
        className="flex items-center justify-center text-white"
      >
        <ProfileIcon
          fill={pathname === paths.profile ? "#fff" : "#b3b3b3"}
          width={30}
          height={30}
        />
      </Link>
      <Link
        to={paths.home}
        className="flex items-center justify-center text-white"
      >
        <HomeIcon
          width={40}
          height={40}
          fill={pathname === paths.home ? "#fff" : "#b3b3b3"}
        />
      </Link>
      <Link
        to={paths.notifications}
        className="flex items-center justify-center text-white"
      >
        <NotificationIcon
          width={35}
          height={35}
          fill={pathname === paths.notifications ? "#fff" : "#b3b3b3"}
        />
      </Link>
      <Link
        to={paths.statistics}
        className="flex items-center justify-center text-white"
      >
        <StatisticsIcon
          width={30}
          height={30}
          fill={pathname === paths.statistics ? "#fff" : "#b3b3b3"}
        />
      </Link>
    </div>
  );
};
