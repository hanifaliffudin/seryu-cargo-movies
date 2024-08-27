import { useEffect, useState } from "react";
import MovieCard from "../components/Movies/MovieCard";
import { fetchFavorites } from "../api/tmdb";
import { Movie } from "../types/movie";
import SkeletonListMovies from "../components/Movies/SkeletonListMovies";
import { useOutletContext } from "react-router-dom";

const Favorite = () => {
  const [accountId, setAccountId] = useOutletContext();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFavorites = async () => {
    setIsLoading(true);
    try {
      const res = await fetchFavorites(accountId);
      setFavorites(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFavorites();
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
