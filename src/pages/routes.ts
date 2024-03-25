import * as React from "react";
import { NotFoundPage } from "./notFound";
import { HomePage } from "./home";
import { LoginPage } from "./login";
import { NotificationsPage } from "./notifications";
import { StatisticsPage } from "./statistics";
import { paths } from "@shared/routing";

export interface Route {
  path: string;
  component: React.ComponentType;
}

export const privateRoutes: Route[] = [
  { path: paths.home, component: HomePage },
  { path: paths.notifications, component: NotificationsPage },
  { path: paths.statistics, component: StatisticsPage },
  { path: paths.notFound, component: NotFoundPage },
];

export const publicRoutes: Route[] = [
  { path: paths.login, component: LoginPage },
  { path: paths.notFound, component: NotFoundPage },
];
