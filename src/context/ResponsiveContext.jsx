import React, { createContext, useContext } from "react";
import { useMediaQuery } from "@mui/material";

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
  const isMobile = useMediaQuery("(max-width: 1224px)");

  return (
    <ResponsiveContext.Provider value={{ isMobile }}>
      {children}
    </ResponsiveContext.Provider>
  );
};
export const useResponsive = () => useContext(ResponsiveContext);
