function constructPosterPath(path?: string) {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : "/poster-placeholder.jpg";
}

export default constructPosterPath;