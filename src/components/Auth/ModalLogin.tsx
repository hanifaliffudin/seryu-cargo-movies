import { Icon } from "@iconify-icon/react";
import { useEffect } from "react";

const ModalLogin = ({ isLoading, getSessionId }) => {
  useEffect(() => {
    document.body.classList.add("overflow-y-hidden");
  }, []);

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  max-w-xs">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 text-center">
              {isLoading ? (
                <Icon className="animate-spin" icon="tdesign:load" />
              ) : (
                <>
                  <img
                    className="bg-[#05213b] mb-2 w-[164px] aspect-square p-4"
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                    alt=""
                  />
                  <button onClick={() => getSessionId()}>
                    Login with TMDB
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
