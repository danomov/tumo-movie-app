const formatReleaseDate = (releaseDate: string) => {
  const date = new Date(releaseDate);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatted;
};

export default formatReleaseDate;