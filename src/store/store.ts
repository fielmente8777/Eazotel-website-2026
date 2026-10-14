import { configureStore } from "@reduxjs/toolkit";
import { eazotelApi } from "./api/eazotelApi";
import authReducer from "./slices/authSlice";
import onboardingReducer from "./slices/onboardingSlice";

// A new store per request/mount, as recommended for the Next.js App Router.
export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      onboarding: onboardingReducer,
      [eazotelApi.reducerPath]: eazotelApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(eazotelApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
