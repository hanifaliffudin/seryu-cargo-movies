export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
export const IMAGE_SIZE_SMALL = "w200";
export const IMAGE_SIZE_MEDIUM = "w500";
export const IMAGE_SIZE_LARGE = "w780";
export const IMAGE_SIZE_ORIGINAL = "original";

export const getImageUrl = (path: string, size = IMAGE_SIZE_MEDIUM) =>
  `${TMDB_IMAGE_BASE_URL}${size}${path}`;
