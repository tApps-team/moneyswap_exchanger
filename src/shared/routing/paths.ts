export enum paths {
  home = "/",
  login = "/login",
  profile = "/profile",
  statistics = "/statistics",
  notifications = "/notifications",
  notFound = "*",
  profileSettings = "/settings",
  profilePassword = "/password",
  profileInfo = "/info",
  locationAdd = "/add_location",
  directionAdd = "/add_direction",
  locationEdit = "/edit_location",
}

export const Pathnames = [
  {
    path: paths.login,
    title: "Авторизация",
  },
  {
    path: paths.profile,
    title: null,
  },
  {
    path: `${paths.profile}${paths.profileSettings}`,
    title: "Параметры",
  },
  {
    path: `${paths.profile}${paths.profileSettings}${paths.profilePassword}`,
    title: "Пароль",
  },
  {
    path: `${paths.profile}${paths.profileSettings}${paths.profileInfo}`,
    title: "Информация аккаунта",
  },
  {
    path: paths.directionAdd,
    title: null,
  },
  {
    path: paths.locationAdd,
    title: null,
  },
  {
    path: paths.locationEdit,
    title: null,
  },
];

export enum support {
  support = "https://t.me/MoneySwap_support",
  admin = "https://t.me/moneyswap_admin",
}
