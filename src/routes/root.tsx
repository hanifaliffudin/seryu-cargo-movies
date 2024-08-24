// import ModalLogin from "../components/Auth/modal-login";
import { Link, Outlet } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

const Root = () => {
  return (
    <>
      <nav className="bg-[#0EA5E9] text-white ">
        <div className="flex justify-between items-center h-20 px-16">
          <Link to="/">CINEMA</Link>
          <div className="flex gap-8 items-center">
            <Link to={`/favorite`}>Favorite</Link>
            <Link to="/watchlist">Watchlist</Link>
            <button className="h-6">
              <Icon
                className="rotate-180"
                width={24}
                icon="majesticons:logout"
              />
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      {/* <ModalLogin /> */}
    </>
  );
};

export default Root;
