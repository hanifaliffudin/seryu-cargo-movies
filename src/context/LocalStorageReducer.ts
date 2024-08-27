export const initialWatchlistFavorites = {
  watchlist: localStorage.getItem("watchlist") || [],
  favorites: localStorage.getItem("favorites") || [],
};

export const LIST_ACTIONS = {
  ADD_TO_WATCHLIST: "ADD_TO_WATCHLIST",
  REMOVE_FROM_WATCHLIST: "REMOVE_FROM_WATCHLIST",
  ADD_TO_FAVORITES: "ADD_TO_FAVORITES",
  REMOVE_FROM_FAVORITES: "REMOVE_FROM_FAVORITES",
  INIT_WATCHLIST: "INIT_WATCHLIST",
  INIT_FAVORITES: "INIT_FAVORITES",
};

export const listReducer = (state, action) => {
  switch (action.type) {
    case LIST_ACTIONS.ADD_TO_WATCHLIST: {
      let existingWatchlist = state.watchlist;

      existingWatchlist = Array.isArray(existingWatchlist)
        ? existingWatchlist
        : JSON.parse(existingWatchlist);

      const newWatchlist = [...existingWatchlist, action.payload];

      localStorage.setItem("watchlist", JSON.stringify(newWatchlist));

      return { ...state, watchlist: newWatchlist };
    }

    case LIST_ACTIONS.REMOVE_FROM_WATCHLIST: {
      let existingWatchlist = state.watchlist;

      existingWatchlist = Array.isArray(existingWatchlist)
        ? existingWatchlist
        : JSON.parse(existingWatchlist);

      const newWatchlist = existingWatchlist.filter(
        (id: number) => id !== action.payload
      );

      localStorage.setItem("watchlist", JSON.stringify(newWatchlist));

      return { ...state, watchlist: newWatchlist };
    }

    case LIST_ACTIONS.ADD_TO_FAVORITES: {
      let existingFavorites = state.favorites;

      existingFavorites = Array.isArray(existingFavorites)
        ? existingFavorites
        : JSON.parse(existingFavorites);

      const newFavorites = [...existingFavorites, action.payload];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      return { ...state, favorites: newFavorites };
    }

    case LIST_ACTIONS.REMOVE_FROM_FAVORITES: {
      let existingFavorites = state.favorites;

      existingFavorites = Array.isArray(existingFavorites)
        ? existingFavorites
        : JSON.parse(existingFavorites);

      const newFavorites = existingFavorites.filter(
        (id: number) => id !== action.payload
      );

      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      return { ...state, favorites: newFavorites };
    }

    default:
      return state;
  }
};
