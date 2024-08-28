import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/Movies/MovieCard";
import { fetchWatchlist } from "../api/tmdb";
import { Movie } from "../types/movie";
import SkeletonListMovies from "../components/Movies/SkeletonListMovies";
import { WatchlistFavoritesDispatchContext } from "../context/LocalStorageContext";

const Watchlist = () => {
  const accountId = sessionStorage.getItem("account_id");
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useContext(WatchlistFavoritesDispatchContext);

  const getWatchlist = async () => {
    setIsLoading(true);
    try {
      const res = await fetchWatchlist(accountId);

      setWatchlist(res);

      dispatch({
        type: "INIT_WATCHLIST",
        payload: res.map((movie: Movie) => movie.id),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWatchlist();
  }, []);

  return (
    <div className="md:px-20 px-10 pt-10">
      <h2 className="text-white font-semibold text-5xl mb-4">Your Watchlist</h2>
      {isLoading ? (
        <SkeletonListMovies style={"grid"} />
      ) : (
        <>
          {watchlist.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-7 gap-4 justify-between">
              {watchlist.map((movie: Movie) => (
                <MovieCard
                  key={movie.id}
                  hideFavoriteIcon={true}
                  movie={movie}
                />
              ))}
            </div>
          ) : (
            <div className="text-white">
              You haven't added any movies to your watchlist.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Watchlist;
