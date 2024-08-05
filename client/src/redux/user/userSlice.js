import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
