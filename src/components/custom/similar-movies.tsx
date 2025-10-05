import { Link } from "react-router";
import type { IMovie } from "@/types.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import constructMoviePath from "@/utils/construct-movie-path.tsx";

function SimilarMovies({ similar }: { similar: IMovie[] }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {similar.slice(0, 6).map((similarMovie: IMovie) => (
          <Link key={similarMovie.id} to={constructMoviePath(similarMovie.id)}>
            <Card className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg p-0 h-full">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4]">
                  <img
                    loading="lazy"
                    alt={similarMovie.title}
                    className="object-cover rounded-lg"
                    src={`https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`}
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-2">{similarMovie.title}</h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SimilarMovies;