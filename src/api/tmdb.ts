const TMDB_BASE_URL = "https://api.themoviedb.org";
const API_READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN;

const fetchFromTMDB = async (endpoint: string, options = {}) => {
  const url = `${TMDB_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${response.status} ${errorData.status_message}`);
  }

  return response.json();
};

export const fetchSessionId = async () => {
  try {
    const data = await fetchFromTMDB(
      "/3/authentication/session/convert/4?access_token=" +
        API_READ_ACCESS_TOKEN,
      {
        method: "POST",
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching session id:", error);
    throw error;
  }
};

export const fetchDetailAccount = async (sessionId: string) => {
  try {
    const data = await fetchFromTMDB("/3/account?session_id=" + sessionId);
    return data;
  } catch (error) {
    console.error("Error fetching detail account:", error);
    throw error;
  }
};

export const fetchNowPlaying = async () => {
  try {
    const data = await fetchFromTMDB("/3/movie/now_playing");
    return data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

export const fetchTopRated = async () => {
  try {
    const data = await fetchFromTMDB("/3/movie/top_rated");
    return data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};

export const fetchMovieDetail = async (movieId: string) => {
  try {
    const data = await fetchFromTMDB(`/3/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching detail for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchRecommendations = async (movieId: string) => {
  try {
    const data = await fetchFromTMDB(`/3/movie/${movieId}/recommendations`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching recommendatios:`, error);
    throw error;
  }
};

export const fetchFavorites = async (accountId: string) => {
  try {
    const data = await fetchFromTMDB(`/3/account/${accountId}/favorite/movies`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching favorites:`, error);
    throw error;
  }
};

export const fetchWatchlist = async (accountId: string) => {
  try {
    const data = await fetchFromTMDB(
      `/3/account/${accountId}/watchlist/movies`
    );
    return data.results;
  } catch (error) {
    console.error(`Error fetching watchlist:`, error);
    throw error;
  }
};

export const fetchSearch = async (keyword: string) => {
  try {
    const data = await fetchFromTMDB(`/3/search/movie?query=${keyword}`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching search:`, error);
    throw error;
  }
};

export const updateWatchlist = async (accountId: string, body: any) => {
  try {
    const res = await fetchFromTMDB(`/3/account/${accountId}/watchlist`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return res;
  } catch (error) {
    console.error(`Error add to watchlist:`, error);
    throw error;
  }
};

export const updateFavorites = async (accountId: string, body: any) => {
  try {
    const res = await fetchFromTMDB(`/3/account/${accountId}/favorite`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return res;
  } catch (error) {
    console.error(`Error add to watchlist:`, error);
    throw error;
  }
};
