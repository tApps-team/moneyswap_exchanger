import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyCity } from "./types";

interface MyCityState {
  activeCity: MyCity | null;
}

const initialState: MyCityState = {
  activeCity: null,
};

export const myCitySlice = createSlice({
  name: "myCity",
  initialState,
  reducers: {
    setMyCity: (state, action: PayloadAction<MyCity | null>) => {
      state.activeCity = action.payload;
    },
  },
});

export default myCitySlice.reducer;
export const { setMyCity } = myCitySlice.actions;
