import { Link, Outlet, useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";
import ModalLogin from "../components/Auth/ModalLogin";
import { fetchDetailAccount, fetchSessionId } from "../api/tmdb";

const Root = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      sessionStorage.setItem("session_id", sessionId);
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
    const sessionId = sessionStorage.getItem("session_id");
    if (sessionId) {
      getAccountId(sessionId);
      document.body.classList.remove("overflow-y-hidden");
    }
  }, []);

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
        <Outlet context={[accountId, setAccountId]} />
      </main>

      {!accountId && (
        <ModalLogin isLoading={isLoading} getSessionId={getSessionId} />
      )}
    </>
  );
};

export default Root;
