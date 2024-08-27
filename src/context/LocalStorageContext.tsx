import { createContext, useReducer } from "react";
import { initialWatchlistFavorites, listReducer } from "./LocalStorageReducer";

export const WatchlistFavoritesContext = createContext(
  initialWatchlistFavorites
);

export const WatchlistFavoritesDispatchContext = createContext(null);

export const WatchlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listReducer, initialWatchlistFavorites);

  return (
    <WatchlistFavoritesContext.Provider value={state}>
      <WatchlistFavoritesDispatchContext.Provider value={dispatch}>
        {children}
      </WatchlistFavoritesDispatchContext.Provider>
    </WatchlistFavoritesContext.Provider>
  );
};
