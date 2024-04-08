import { createBrowserRouter } from "react-router-dom";
import { paths } from "@/shared/routing";
import ProtectedRoutes from "./ProtectedRoutes";
import { LoginPage } from "./login";
import { HomePage } from "./home";
import { NotificationsPage } from "./notifications";
import { ProfilePage } from "./profile";
import { ProfileSettingsPage } from "./profileSettings";
import { ProfileInfoPage } from "./profileInfo";
import { ProfilePasswordPage } from "./profilePassword";
import { StatisticsPage } from "./statistics";
import { NotFoundPage } from "./notFound";
import { MainLayout, RootLayout } from "./layouts";
import { LocationAddPage } from "./locationAdd";
import { LocationEditPage } from "./locationEdit";
import { DirectionAddPage } from "./directionAdd";
import { DirectionEditPage } from "./directionEdit";

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
            element: (
              <MainLayout>
                <HomePage />
              </MainLayout>
            ),
          },
          {
            path: paths.profile,
            element: (
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            ),
          },
          {
            path: paths.notifications,
            element: (
              <MainLayout>
                <NotificationsPage />
              </MainLayout>
            ),
          },
          {
            path: paths.statistics,
            element: (
              <MainLayout>
                <StatisticsPage />
              </MainLayout>
            ),
          },
          {
            path: paths.locationAdd,
            element: <LocationAddPage />,
          },
          {
            path: paths.locationEdit,
            element: <LocationEditPage />,
          },
          {
            path: paths.directionAdd,
            element: <DirectionAddPage />,
          },
          {
            path: paths.directionEdit,
            element: <DirectionEditPage />,
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
