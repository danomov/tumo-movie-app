import { Card, CardContent } from "@/components/ui/card.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import type { IMovieCast } from "@/types.ts";

interface IMovieCastProps {
  cast: IMovieCast[],
}

function MovieCast({ cast }: IMovieCastProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cast.map((actor, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-4">
              <Avatar className="w-20 h-20 mx-auto mb-3">
                <AvatarImage
                  loading="lazy"
                  alt={actor.name}
                  className="object-cover"
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                />
                <AvatarFallback>
                  {actor.name}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-sm mb-1">{actor.name}</h3>
              <p className="text-xs text-muted-foreground">{actor.character}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default MovieCast;