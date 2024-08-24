import MovieCard from "../components/Movies/movie-card";

const Watchlist = () => {
  const list = {
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: "/jNjT5y95BToczcxgVPl1NBB7goY.jpg",
        genre_ids: [12, 28, 878],
        id: 11,
        original_language: "en",
        original_title: "Star Wars",
        overview:
          "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
        popularity: 85.346,
        poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
        release_date: "1977-05-25",
        title: "Star Wars",
        video: false,
        vote_average: 8.203,
        vote_count: 20336,
      },
    ],
    total_pages: 1,
    total_results: 1,
  };
  return (
    <div className="px-20 pt-10">
      <h2 className="text-white font-semibold text-5xl mb-4">Your Watchlist</h2>
      <div className="grid grid-cols-6 gap-7">
        {list.results.map((movie: any) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
