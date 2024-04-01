import { createBrowserRouter } from "react-router-dom";
import { paths } from "@/shared/routing";
import ProtectedRoutes from "./ProtectedRoutes";
import { RootLayout } from "./layouts/RootLayout";
import { LoginPage } from "./login";
import { DirectionSettingsPage } from "./directionSettings";
import { HomePage } from "./home";
import { LocationSettingsPage } from "./locationSettings";
import { NotificationsPage } from "./notifications";
import { ProfilePage } from "./profile";
import { ProfileSettingsPage } from "./profileSettings";
import { ProfileInfoPage } from "./profileInfo";
import { ProfilePasswordPage } from "./profilePassword";
import { StatisticsPage } from "./statistics";
import { NotFoundPage } from "./notFound";

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
