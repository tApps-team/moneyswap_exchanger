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
import { SecondLayout } from "./layouts/secondPagesLayout";

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
            path: paths.notFound,
            element: (
              <MainLayout>
                <NotFoundPage />
              </MainLayout>
            ),
          },
          {
            path: paths.locationAdd,
            element: (
              <SecondLayout>
                <LocationAddPage />
              </SecondLayout>
            ),
          },
          {
            path: paths.locationEdit,
            element: (
              <SecondLayout>
                <LocationEditPage />
              </SecondLayout>
            ),
          },
          {
            path: paths.directionAdd,
            element: (
              <SecondLayout>
                <DirectionAddPage />
              </SecondLayout>
            ),
          },
          {
            path: paths.directionEdit,
            element: (
              <SecondLayout>
                <DirectionEditPage />
              </SecondLayout>
            ),
          },
          {
            path: `${paths.profile}${paths.profileSettings}`,
            element: (
              <SecondLayout>
                <ProfileSettingsPage />
              </SecondLayout>
            ),
          },
          {
            path: `${paths.profile}${paths.profileSettings}${paths.profileInfo}`,
            element: (
              <SecondLayout>
                <ProfileInfoPage />
              </SecondLayout>
            ),
          },
          {
            path: `${paths.profile}${paths.profileSettings}${paths.profilePassword}`,
            element: (
              <SecondLayout>
                <ProfilePasswordPage />
              </SecondLayout>
            ),
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
