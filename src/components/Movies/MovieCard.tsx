import { useNavigate, useOutletContext } from "react-router-dom";
import { getImageUrl, IMAGE_SIZE_SMALL } from "../../config/constant";
import { Icon } from "@iconify-icon/react";
import { updateFavorites, updateWatchlist } from "../../api/tmdb";
import { Movie } from "../../types/movie";
import { useContext, useEffect, useState } from "react";
import { WatchlistFavoritesDispatchContext } from "../../context/LocalStorageContext";

type MovieProps = {
  movie: Movie;
  hideBookmarkIcon?: boolean;
  hideFavoriteIcon?: boolean;
};

const MovieCard = ({
  movie,
  hideBookmarkIcon,
  hideFavoriteIcon,
}: MovieProps) => {
  const navigate = useNavigate();
  const [accountId, setAccountId] = useOutletContext();
  const [isBookmark, setIsBookmark] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useContext(WatchlistFavoritesDispatchContext);

  // call dispatch to update watchlist/favorites in local storage
  const addToWatchlistLocalStorage = () => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movie.id });
  };

  const removeFromWatchlistLocalStorage = () => {
    dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: movie.id });
  };

  const addToFavoritesLocalStorage = () => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: movie.id });
  };

  const removeFromFavoritesLocalStorage = () => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: movie.id });
  };

  // add/remove watchlist
  const addToOrRemoveFromWatchlist = async () => {
    try {
      const res = await updateWatchlist(accountId, {
        media_type: "movie",
        media_id: movie.id,
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
        media_id: movie.id,
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
    // check if exist in local storage
    let watchlistFromLocalStorage = localStorage.getItem("watchlist");
    let favoritesFromLocalStorage = localStorage.getItem("favorites");

    if (watchlistFromLocalStorage) {
      watchlistFromLocalStorage = JSON.parse(watchlistFromLocalStorage);
      if (watchlistFromLocalStorage?.includes(movie.id)) setIsBookmark(true);
    }

    if (favoritesFromLocalStorage) {
      favoritesFromLocalStorage = JSON.parse(favoritesFromLocalStorage);
      if (favoritesFromLocalStorage?.includes(movie.id)) setIsFavorite(true);
    }
  }, [movie.id]);

  return (
    <div className="group min-w-[150px] md:min-h-[355px] md:min-w-[193px]">
      <div className="relative text-white w-full">
        <img
          className={`rounded-t-lg cursor-pointer max-md:min-w-[150px] w-full h-[290px] group-hover:opacity-75 ${
            movie.poster_path ? "object-cover" : "bg-gray-200 p-10"
          }`}
          onClick={() => navigate("/movie/" + movie.id)}
          src={
            movie.poster_path
              ? getImageUrl(movie.poster_path, IMAGE_SIZE_SMALL)
              : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
          }
          alt=""
        />
        <div className="hidden absolute bottom-2.5 gap-2.5 right-2.5 group-hover:flex ">
          <Icon
            className="cursor-pointer"
            hidden={hideBookmarkIcon}
            onClick={() => addToOrRemoveFromWatchlist()}
            width={24}
            icon={isBookmark ? "mdi:bookmark" : "mdi:bookmark-outline"}
          />
          <Icon
            className="cursor-pointer"
            hidden={hideFavoriteIcon}
            onClick={() => addToOrRemoveFromFavorites()}
            width={24}
            icon={isFavorite ? "mdi:heart" : "mdi:heart-outline"}
          />
        </div>
      </div>
      <div
        className="px-4 py-3 cursor-pointer"
        onClick={() => navigate("/movie/" + movie.id)}
      >
        <h2 className="line-clamp-1 font-bold text-lg text-[#B6B6B6]">
          {movie.original_title}
        </h2>
        <p className="text-[#828282] text-xs">
          {movie.release_date.slice(0, 4)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
