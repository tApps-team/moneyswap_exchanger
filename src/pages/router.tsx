import { RootLayout } from "@/app/layouts/RootLayout";
import { paths } from "@/shared/routing";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { DirectionSettingsPage } from "./directionSettings";
import { HomePage } from "./home";
import { LocationSettingsPage } from "./locationSettings";
import { LoginPage } from "./login";
import { NotFoundPage } from "./notFound";
import { NotificationsPage } from "./notifications";
import { ProfilePage } from "./profile";
import { ProfileInfoPage } from "./profileInfo";
import { ProfilePasswordPage } from "./profilePassword";
import { StatisticsPage } from "./statistics";
import { ProfileSettingsPage } from "./profileSettings";

export const router = createBrowserRouter([
  {
    path: paths.home,
    element: <RootLayout />,
    children: [
      {
        path: paths.home,
        element: <ProtectedRoutes />,
        children: [
          {
            path: paths.home,
            element: <HomePage />,
          },
          {
            path: paths.locationSettings,
            element: <LocationSettingsPage />,
          },
          {
            path: paths.directionSettings,
            element: <DirectionSettingsPage />,
          },
          {
            path: paths.notifications,
            element: <NotificationsPage />,
          },
          {
            path: paths.profile,
            element: <ProfilePage />,
          },
          {
            path: `${paths.profile}${paths.profileSettings}`,
            element: <ProfileSettingsPage />,
          },
          {
            path: `${paths.profile}${paths.profileSettings}${paths.profileInfo}`,
            element: <ProfileInfoPage />,
          },
          {
            path: `${paths.profile}${paths.profileSettings}${paths.profilePassword}`,
            element: <ProfilePasswordPage />,
          },
          {
            path: paths.statistics,
            element: <StatisticsPage />,
          },
          {
            path: paths.notFound,
            element: <NotFoundPage />,
          },
        ],
      },
      {
        path: paths.login,
        element: <LoginPage />,
      },
    ],
  },
]);
