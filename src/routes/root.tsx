import { Link, Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { useContext, useEffect, useState } from "react";
import ModalLogin from "../components/Auth/ModalLogin";
import {
  fetchDetailAccount,
  fetchFavorites,
  fetchSessionId,
  fetchWatchlist,
} from "../api/tmdb";
import { WatchlistFavoritesDispatchContext } from "../context/LocalStorageContext";
import { Movie } from "../types/movie";

const Root = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accountId, setAccountId] = useState(
    sessionStorage.getItem("account_id")
  );
  const sessionId = sessionStorage.getItem("session_id");
  const dispatch = useContext(WatchlistFavoritesDispatchContext);
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getSessionId = async () => {
    setIsLoading(true);
    try {
      const res = await fetchSessionId();

      if (res.success) {
        getAccountId(res.session_id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountId = async (sessionId: string) => {
    setIsLoading(true);

    try {
      const res = await fetchDetailAccount(sessionId);

      setAccountId(res.id);
      sessionStorage.setItem("account_id", res.id);
      sessionStorage.setItem("session_id", sessionId);

      getWatchlist();
      getFavorites();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();

    navigate("/search?title=" + keyword);
  };

  useEffect(() => {
    if (sessionId) {
      getAccountId(sessionId);
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [sessionId, accountId]);

  return (
    <>
      {/* navbar */}
      <nav className="bg-[#0EA5E9] text-white ">
        <div className="flex justify-between items-center h-20 px-8 md:px-10 lg:px-16">
          <Link
            onClick={() => setOpenMenu(false)}
            className="font-black text-5xl tracking-widest"
            to="/"
          >
            CINEMA
          </Link>
          <Icon
            onClick={() => setOpenMenu(!openMenu)}
            width={24}
            className="cursor-pointer md:hidden"
            icon="material-symbols:menu"
          />
          <div
            className={`max-md:${
              openMenu ? "" : "hidden"
            } flex md:gap-8 items-center max-md:absolute max-md:top-20 max-md:left-0 max-md:bg-[#5eccff] max-md:w-full max-md:flex-col max-md:gap-y-2 z-10 max-md:p-4`}
          >
            <Link onClick={() => setOpenMenu(false)} to={`/favorite`}>
              Favorite
            </Link>
            <Link onClick={() => setOpenMenu(false)} to="/watchlist">
              Watchlist
            </Link>
            <form onSubmit={handleSearch}>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="rounded-md h-8 text-black px-2 "
                type="text"
                placeholder="Search..."
              />
            </form>
            <button
              onClick={() => {
                setOpenMenu(false);
                sessionStorage.removeItem("session_id");
                sessionStorage.removeItem("account_id");
                localStorage.removeItem("favorites");
                localStorage.removeItem("watchlist");
                navigate("/");
                navigate(0);
              }}
              className="h-6"
            >
              <Icon
                className="rotate-180"
                width={24}
                icon="majesticons:logout"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* main */}
      <main>
        <Outlet context={[favorites, watchlist]} />
      </main>

      {!accountId && (
        <ModalLogin isLoading={isLoading} getSessionId={getSessionId} />
      )}
    </>
  );
};

export default Root;
