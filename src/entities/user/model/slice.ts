import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Tokens } from "./types";
import { paths } from "@/shared/routing";

interface UserState {
  isAuth: boolean;
}

const initialState: UserState = {
  isAuth: Cookies.get("isAuth") === "true" ? true : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Tokens>) => {
      Cookies.set("isAuth", "true");
      state.isAuth = true;
      Cookies.set("accessToken", action.payload.access_token, {
        secure: true,
        httpOnly: false,
        sameSite: "None",
        // expires: 7,
      });
      Cookies.set("refreshToken", action.payload.refresh_token, {
        secure: true,
        httpOnly: false,
        sameSite: "None",
        // expires: 7,
      });
    },
    logout: (state) => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.set("isAuth", "false");
      state.isAuth = false;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export default userSlice.reducer;
