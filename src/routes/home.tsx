import { useEffect, useState } from "react";
import MovieCard from "../components/Movies/MovieCard";
import { fetchNowPlaying, fetchTopRated } from "../api/tmdb";
import { Movie } from "../types/movie";
import SkeletonListMovies from "../components/Movies/SkeletonListMovies";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isLoadingNowPlaying, setIsLoadingNowPlaying] = useState(false);
  const [isLoadingTopRated, setIsLoadingTopRated] = useState(false);

  const getNowPlaying = async () => {
    setIsLoadingNowPlaying(true);
    try {
      const res = await fetchNowPlaying();
      setNowPlaying(res);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoadingNowPlaying(false);
    }
  };

  const getTopRated = async () => {
    setIsLoadingTopRated(true);
    try {
      const res = await fetchTopRated();
      setTopRated(res);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoadingTopRated(false);
    }
  };

  useEffect(() => {
    getNowPlaying();
    getTopRated();
  }, []);

  return (
    <div className="md:px-20 px-10 pt-10">
      <h2 className="text-white font-semibold text-5xl mb-4">Now Playing</h2>
      {isLoadingNowPlaying ? (
        <SkeletonListMovies style={"flex"} />
      ) : (
        <div className="flex overflow-x-scroll gap-7 scrollbar mb-12">
          {nowPlaying.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <h2 className="text-white font-semibold text-5xl mb-4">Top Rated</h2>
      {isLoadingTopRated ? (
        <SkeletonListMovies style={"grid"} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-7 gap-4 justify-between">
          {topRated.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
