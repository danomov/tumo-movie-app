export interface IMovie {
  id: number;
  title: string;
  vote_count: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export enum ETheme {
  Dark = "dark",
  Light = "light",
  System = "system",
}

export interface ITrailers {
  id: number;
  key: string;
}

export type ISimilarMovie = IMovie;

export interface IMovieDetails extends IMovie {
  spoken_languages: {
    english_name: string;
  }[];
  genres: IGenre[];
  production_companies: {
    id: number;
    name: string;
  }[];
  budget: number;
  revenue: number;
}

export interface IMovieCast {
  profile_path: string;
  name: string;
  character: string;
}