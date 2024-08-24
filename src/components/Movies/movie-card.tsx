import { useNavigate } from "react-router-dom";
import { getImageUrl, IMAGE_SIZE_SMALL } from "../../config/constant";
import { Icon } from "@iconify-icon/react";

type MovieProps = {
  movie: any;
};

const MovieCard = ({ movie }: MovieProps) => {
  const navigate = useNavigate();
  console.log(movie);
  return (
    <div className="">
      <div className="relative text-white w-[193px]">
        <img
          onClick={() => navigate("/movie/" + movie.id)}
          className="object-cover rounded-t-lg cursor-pointer"
          src={getImageUrl(movie.poster_path, IMAGE_SIZE_SMALL)}
          alt=""
        />
        <div
          className="flex absolute bottom-2.5 gap-2.5 right-2.5"
          onClick={() => console.log("book")}
        >
          {/* <Icon width={24} icon="mdi:bookmark" /> */}
          <Icon width={24} icon="mdi:bookmark-outline" />
          {/* <Icon width={24} icon="mdi:heart" /> */}
          <Icon width={24} icon="mdi:heart-outline" />
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
