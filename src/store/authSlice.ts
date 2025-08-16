import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = { email: string } | null;

type AuthState = {
  user: User;
};

const initialState: AuthState = { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string }>) {
      state.user = { email: action.payload.email };
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
