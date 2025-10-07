function constructAvatarPath(path?: string) {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : "/avatar-placeholder.webp";
}

export default constructAvatarPath;