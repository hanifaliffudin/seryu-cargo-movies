import { useParams } from "react-router-dom";
import MovieCard from "../components/Movies/MovieCard";
import {
  getImageUrl,
  IMAGE_SIZE_ORIGINAL,
  IMAGE_SIZE_SMALL,
} from "../config/constant";
import { Icon } from "@iconify-icon/react";
import { useContext, useEffect, useState } from "react";
import {
  fetchMovieDetail,
  fetchRecommendations,
  updateFavorites,
  updateWatchlist,
} from "../api/tmdb";
import { Genre, Movie } from "../types/movie";
import { WatchlistFavoritesDispatchContext } from "../context/LocalStorageContext";
import SkeletonListMovies from "../components/Movies/SkeletonListMovies";

const Detail = () => {
  const { id } = useParams();
  const accountId = sessionStorage.getItem("account_id");
  const [detail, setDetail] = useState<Movie>();
  const [recommendations, setRecommendations] = useState([]);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const dispatch = useContext(WatchlistFavoritesDispatchContext);

  // call dispatch to update watchlist/favorites in local storage
  const addToWatchlistLocalStorage = () => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: Number(id) });
  };

  const removeFromWatchlistLocalStorage = () => {
    dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: Number(id) });
  };

  const addToFavoritesLocalStorage = () => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: Number(id) });
  };

  const removeFromFavoritesLocalStorage = () => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: Number(id) });
  };

  // const [rating, setRating] = useState(0);

  // const handleStarClick = (value: number) => {
  //   setRating(value * 2); // Multiply by 2 to map 1-5 to 0-10
  // };

  // get detail movie
  const getDetail = async (id: string) => {
    setDetail(undefined);
    setIsLoadingDetail(true);
    try {
      const res = await fetchMovieDetail(id);
      setDetail(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // get recommendations movie
  const getRecommendations = async (id: string) => {
    setIsLoadingRecommendations(true);
    try {
      const res = await fetchRecommendations(id);
      setRecommendations(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  // add/remove watchlist
  const addToOrRemoveFromWatchlist = async () => {
    try {
      const res = await updateWatchlist(accountId, {
        media_type: "movie",
        media_id: Number(id),
        watchlist: !isBookmark,
      });

      if (res.success) {
        setIsBookmark(!isBookmark);
        if (isBookmark) {
          removeFromWatchlistLocalStorage();
        } else {
          addToWatchlistLocalStorage();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // add/remove favorites
  const addToOrRemoveFromFavorites = async () => {
    try {
      const res = await updateFavorites(accountId, {
        media_type: "movie",
        media_id: Number(id),
        favorite: !isFavorite,
      });

      if (res.success) {
        setIsFavorite(!isFavorite);
        if (isFavorite) {
          removeFromFavoritesLocalStorage();
        } else {
          addToFavoritesLocalStorage();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getDetail(id);
      getRecommendations(id);

      // check if exist in local storage
      let watchlistFromLocalStorage = localStorage.getItem("watchlist");
      let favoritesFromLocalStorage = localStorage.getItem("favorites");

      if (watchlistFromLocalStorage) {
        watchlistFromLocalStorage = JSON.parse(watchlistFromLocalStorage);
        if (watchlistFromLocalStorage?.includes(Number(id)))
          setIsBookmark(true);
      }

      if (favoritesFromLocalStorage) {
        favoritesFromLocalStorage = JSON.parse(favoritesFromLocalStorage);
        if (favoritesFromLocalStorage?.includes(Number(id)))
          setIsFavorite(true);
      }
    }
  }, [id]);

  return (
    <div>
      <div
        className={`${
          isLoadingDetail ? "bg-slate-700 animate-pulse" : ""
        } relative md:h-[400px]`}
      >
        {detail && (
          <>
            <img
              className="w-full max-h-[400px] object-cover brightness-50 max-md:hidden"
              src={
                detail.backdrop_path
                  ? getImageUrl(detail.backdrop_path, IMAGE_SIZE_ORIGINAL)
                  : ""
              }
              alt=""
            />
            <div className="flex max-md:mt-4 gap-5 items-center md:absolute md:top-1/2 md:transform md:-translate-y-1/2 md:left-20 md:right-20 text-white max-md:flex-col">
              <img
                className="md:w-[200px] w-40 md:h-[300px] object-cover rounded-md max-md:border"
                src={getImageUrl(detail.poster_path, IMAGE_SIZE_SMALL)}
                alt="Poster"
              />
              <div className="flex flex-col max-md:px-10">
                {/* title and year */}
                <div className="flex text-3xl gap-2 mb-2">
                  <h1 className="font-bold ">{detail.original_title}</h1>
                  <span className="font-normal">
                    ({detail.release_date.slice(0, 4)})
                  </span>
                </div>

                {/* date, genres, runtime */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {new Date(detail.release_date).toLocaleDateString("en-GB")}
                  <span>•</span>
                  <div className="flex gap-1">
                    {detail.genres.map((genre: Genre, i: number) => (
                      <div key={i}>{`${genre.name}${
                        i === detail.genres.length - 1 ? "" : ","
                      }`}</div>
                    ))}
                  </div>
                  <span>•</span>
                  <div>
                    {Math.floor(detail.runtime / 60)}h {detail.runtime % 60}m
                  </div>
                </div>

                {/* score and action */}
                <div className="flex items-center mb-2.5 gap-2.5">
                  <div className="relative size-10 bg-white rounded-full">
                    <svg
                      className="size-full -rotate-90"
                      viewBox="0 0 40 40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        className="stroke-current text-[#EDEDED]"
                        strokeWidth="2"
                      ></circle>
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        className="stroke-current text-[#0EA5E9]"
                        strokeWidth="2"
                        strokeDasharray="100"
                        strokeDashoffset={
                          100 - Math.round(detail.vote_average * 10)
                        }
                        strokeLinecap="round"
                      ></circle>
                    </svg>

                    <div className="absolute top-[45%] start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                      <span className="text-center text-xs font-bold text-[#0EA5E9]">
                        {Math.round(detail.vote_average * 10)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col text-[0.5rem]">
                    <span>User</span>
                    <span>Score</span>
                  </div>

                  <Icon
                    className="cursor-pointer"
                    onClick={() => addToOrRemoveFromWatchlist()}
                    width={24}
                    icon={isBookmark ? "mdi:bookmark" : "mdi:bookmark-outline"}
                  />
                  <Icon
                    className="cursor-pointer"
                    onClick={() => addToOrRemoveFromFavorites()}
                    width={24}
                    icon={isFavorite ? "mdi:heart" : "mdi:heart-outline"}
                  />

                  {/* <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <Icon
                    width={24}
                    className={
                      rating >= (index + 1) * 2 ? "text-yellow-500" : ""
                    }
                    onClick={() => handleStarClick(index + 1)}
                    icon="material-symbols:star"
                  />
                ))}
              </div> */}
                </div>

                {/* tagline */}
                <i className="mb-2.5">{detail.tagline}</i>

                {/* overview */}
                <div className="font-bold mb-1.5">Overview</div>
                <div>{detail.overview}</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* recommendations */}
      <div className="md:px-20 px-10 pt-10">
        <h2 className="text-white font-semibold text-xl mb-5">
          Recommendations
        </h2>
        {isLoadingRecommendations ? (
          <SkeletonListMovies style={"flex"} />
        ) : (
          <>
            <div className="flex overflow-x-scroll gap-7 scrollbar mb-12">
              {recommendations.length > 0 &&
                recommendations.map((movie: Movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Detail;
