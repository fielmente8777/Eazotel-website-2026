"use client";

import { createContext, useContext, useState } from "react";

export const AppContext = createContext<{
  isOpenPopupForm: boolean;
  setIsOpenPopupForm: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isOpenPopupForm: false,
  setIsOpenPopupForm: () => {},
  isMobileNavOpen: false,
  setIsMobileNavOpen: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  const [isOpenPopupForm, setIsOpenPopupForm] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <AppContext.Provider
      value={{
        isOpenPopupForm,
        setIsOpenPopupForm,
        isMobileNavOpen,
        setIsMobileNavOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  if (!AppContext) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return useContext(AppContext);
};
