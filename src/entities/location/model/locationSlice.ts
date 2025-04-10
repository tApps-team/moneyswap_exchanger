import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActiveLocation } from "./types";

interface locationState {
  activeLocation: ActiveLocation | null;
  nonCash: boolean;
}

const initialState: locationState = {
  activeLocation: null,
  nonCash: false,
};

export const locationSlice = createSlice({
  name: "activeLocation",
  initialState,
  reducers: {
    setActiveLocation: (
      state,
      action: PayloadAction<ActiveLocation | null>
    ) => {
      state.activeLocation = action.payload;
    },
    setNonCash: (state, action: PayloadAction<boolean>) => {
      state.nonCash = action.payload;
    },
  },
});

export default locationSlice.reducer;
export const { setActiveLocation, setNonCash } = locationSlice.actions;
