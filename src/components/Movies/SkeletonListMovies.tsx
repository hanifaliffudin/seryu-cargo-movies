import SkeletonMovieCard from "./SkeletonMovieCard";

interface SLMProps {
  style: string;
}

const SkeletonListMovies = ({ style }: SLMProps) => {
  return (
    <div
      className={`animate-pulse ${
        style === "flex"
          ? "flex overflow-x-auto gap-7 "
          : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-7 gap-4 justify-between"
      }
      `}
    >
      <SkeletonMovieCard />
      <SkeletonMovieCard />
      <SkeletonMovieCard />
      <SkeletonMovieCard />
      <SkeletonMovieCard />
      <SkeletonMovieCard />
    </div>
  );
};

export default SkeletonListMovies;
