import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Same storage key the Eazotel dashboard and the old onboarding app use.
export const TOKEN_STORAGE_KEY = "Token";

export interface AuthState {
  token: string | null;
  hydrated: boolean;
}

const initialState: AuthState = {
  token: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.hydrated = true;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
    },
  },
});

export const { hydrateAuth, setToken, logout } = authSlice.actions;
export default authSlice.reducer;

export const readStoredToken = (): string | null => {
  try {
    return (
      localStorage.getItem(TOKEN_STORAGE_KEY) ??
      sessionStorage.getItem(TOKEN_STORAGE_KEY)
    );
  } catch {
    return null;
  }
};

export const persistToken = (token: string | null) => {
  try {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // storage unavailable (private mode) — token stays in memory only
  }
};
