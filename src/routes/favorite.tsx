import MovieCard from "../components/Movies/movie-card";

const Favorite = () => {
  const list = {
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
        genre_ids: [18],
        id: 550,
        original_language: "en",
        original_title: "Fight Club",
        overview:
          'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
        popularity: 69.499,
        poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        release_date: "1999-10-15",
        title: "Fight Club",
        video: false,
        vote_average: 8.439,
        vote_count: 28977,
      },
    ],
    total_pages: 1,
    total_results: 1,
  };
  return (
    <div className="px-20 pt-10">
      <h2 className="text-white font-semibold text-5xl mb-4">
        Your Favorite Movies
      </h2>
      <div className="grid grid-cols-6 gap-7">
        {list.results.map((movie: any) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
