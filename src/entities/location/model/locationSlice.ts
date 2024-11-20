import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActiveLocation } from "./types";

interface locationState {
  activeLocation: ActiveLocation | null;
}

const initialState: locationState = {
  activeLocation: null,
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
  },
});

export default locationSlice.reducer;
export const { setActiveLocation } = locationSlice.actions;
