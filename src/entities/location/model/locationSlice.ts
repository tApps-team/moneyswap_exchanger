import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActiveCity } from "./types";

interface locationState {
  activeCity: ActiveCity | null;
}

const initialState: locationState = {
  activeCity: null,
};

export const locationSlice = createSlice({
  name: "activeCity",
  initialState,
  reducers: {
    setActiveCity: (state, action: PayloadAction<ActiveCity | null>) => {
      state.activeCity = action.payload;
    },
  },
});

export default locationSlice.reducer;
export const { setActiveCity } = locationSlice.actions;
