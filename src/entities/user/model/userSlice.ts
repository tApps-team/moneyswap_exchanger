import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Tokens } from "./types";

interface UserState {
  isAuth: boolean;
  isUserSeeTelegramErrorModal: boolean;
}

const initialState: UserState = {
  isAuth: Cookies.get("isAuth") === "true" ? true : false,
  isUserSeeTelegramErrorModal: false,
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
      });
      Cookies.set("refreshToken", action.payload.refresh_token, {
        secure: true,
        httpOnly: false,
        sameSite: "None",
      });
    },
    logout: (state) => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.set("isAuth", "false");
      localStorage.removeItem("persist:root");
      state.isAuth = false;
      state.isUserSeeTelegramErrorModal = false;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setLinkedState: (state, action: PayloadAction<boolean>) => {
      state.isUserSeeTelegramErrorModal = action.payload;
    },
    setTokens: (state, action: PayloadAction<Tokens>) => {
      Cookies.set("accessToken", action.payload.access_token, {
        secure: true,
        httpOnly: false,
        sameSite: "None",
      });
      Cookies.set("refreshToken", action.payload.refresh_token, {
        secure: true,
        httpOnly: false,
        sameSite: "None",
      });
    },
  },
});

export const { login, logout, setAuth, setLinkedState, setTokens } = userSlice.actions;
export default userSlice.reducer;
