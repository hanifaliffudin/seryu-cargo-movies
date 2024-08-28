import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/Movies/MovieCard";
import { fetchFavorites } from "../api/tmdb";
import { Movie } from "../types/movie";
import SkeletonListMovies from "../components/Movies/SkeletonListMovies";
import { WatchlistFavoritesDispatchContext } from "../context/LocalStorageContext";
import { useOutletContext } from "react-router-dom";

const Favorite = () => {
  const accountId = sessionStorage.getItem("account_id");
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useContext(WatchlistFavoritesDispatchContext);
  const [_, watchlist, setOpenToast] = useOutletContext();

  const getFavorites = async () => {
    setIsLoading(true);
    try {
      const res = await fetchFavorites(accountId);

      setFavorites(res);

      dispatch({
        type: "INIT_FAVORITES",
        payload: res.map((movie: Movie) => movie.id),
      });
    } catch (error) {
      setOpenToast({ isOpen: true, message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFavorites();

    const interval = setInterval(getFavorites, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:px-20 px-10 pt-10">
      <h2 className="text-white font-semibold text-5xl mb-4">
        Your Favorite Movies
      </h2>
      {isLoading ? (
        <SkeletonListMovies style={"grid"} />
      ) : (
        <>
          {favorites.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-7 gap-4 justify-between">
              {favorites.map((movie: Movie) => (
                <MovieCard
                  key={movie.id}
                  hideBookmarkIcon={true}
                  movie={movie}
                />
              ))}
            </div>
          ) : (
            <div className="text-white">
              You haven't added any movies to your favorites.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorite;
