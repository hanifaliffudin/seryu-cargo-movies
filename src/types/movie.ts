export interface Movie {
  backdrop_path: string;
  id: number;
  original_title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genres: Genre[];
  runtime: number;
  tagline: string;
}

export interface Genre {
  id: number;
  name: string;
}
