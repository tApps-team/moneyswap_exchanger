import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./app";
import "@/shared/styles/global.scss";
import { AuthByUserNameForm } from "./features/auth";
import { ChangePasswordForm } from "./features/auth/changePassword";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <>
      <App />
      {/* <AuthByUserNameForm /> */}
      <ChangePasswordForm />
    </>
  </React.StrictMode>
);
