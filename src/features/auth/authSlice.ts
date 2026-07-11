import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  photoURL?: string;
  emailVerified?: boolean;
  token?: string;
}

interface AuthState {
  user: User | null;
  isOpen: boolean;
  mode: "login" | "register" | "forgot";
  loading: boolean;
  error: string | null;
}

const stored = localStorage.getItem("auth_user");

const initialState: AuthState = {
  user: stored ? JSON.parse(stored) : null,
  isOpen: false,
  mode: "login",
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openAuth(state, action: PayloadAction<"login" | "register" | "forgot">) {
      state.isOpen = true;
      state.mode = action.payload;
      state.error = null;
    },
    closeAuth(state) {
      state.isOpen = false;
      state.error = null;
    },
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isOpen = false;
      state.loading = false;
      state.error = null;
      localStorage.setItem("auth_user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("auth_user");
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { openAuth, closeAuth, login, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
