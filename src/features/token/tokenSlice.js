import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: "benjamin",
  },
  reducers: {
    save: (state, param) => {
      const { payload } = param;
      state.value = payload;
    },
  },
});

export const { save } = tokenSlice.actions;
export default tokenSlice.reducer;
