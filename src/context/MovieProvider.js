import React from "react";
import { MovieContext } from "./MovieContext";

export const MovieProvider = ({ children }) => {
  return <MovieContext.Provider value={{}}>{children}</MovieContext.Provider>;
};
