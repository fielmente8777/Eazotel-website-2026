"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { hydrateAuth, readStoredToken } from "./slices/authSlice";
import {
  hydrateProgress,
  readSavedProgress,
  saveProgress,
} from "./slices/onboardingSlice";
import { makeStore } from "./store";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store] = useState(makeStore);

  // Pick up a session and any unfinished signup left by a previous visit
  // (client only). Progress first: hydrateAuth releases the wizard.
  useEffect(() => {
    store.dispatch(hydrateProgress(readSavedProgress()));
    store.dispatch(hydrateAuth(readStoredToken()));

    let last = store.getState().onboarding;
    return store.subscribe(() => {
      const current = store.getState().onboarding;
      if (current !== last) {
        last = current;
        saveProgress(current);
      }
    });
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
