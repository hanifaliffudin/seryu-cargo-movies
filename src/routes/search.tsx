import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { fetchSearch } from "../api/tmdb";
import MovieCard from "../components/Movies/MovieCard";
import SkeletonListMovies from "../components/Movies/SkeletonListMovies";

const Search = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("title") || "";
  const [listMovies, setListMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, watchlist, setOpenToast] = useOutletContext();

  const getSearched = async (keyword: string) => {
    setIsLoading(true);
    try {
      const res = await fetchSearch(keyword);
      setListMovies(res);
    } catch (error) {
      setOpenToast({ isOpen: true, message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSearched(keyword);
  }, [keyword]);

  return (
    <div className="md:px-20 px-10 pt-10">
      <h2 className="text-white font-semibold text-5xl mb-4">Search</h2>
      {isLoading ? (
        <SkeletonListMovies style={"grid"} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-7 gap-4 justify-between">
          {listMovies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
