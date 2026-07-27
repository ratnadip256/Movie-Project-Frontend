import { createContext, useContext } from "react";

export const TopRatedContext = createContext();

export const TopMovies = () => useContext(TopRatedContext);
