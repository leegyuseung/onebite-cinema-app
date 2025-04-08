import style from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { MovieData } from "@/types/types";

async function AllMovies() {
  const moviesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    {
      next: { revalidate: 60 * 30 },
    }
  );
  if (!moviesResponse.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const movies: MovieData[] = await moviesResponse.json();

  return (
    <div>
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <Image
            src={movie.posterImgUrl}
            alt={movie.title}
            width={150}
            height={215}
          />
        </Link>
      ))}
    </div>
  );
}

async function RecomMovies() {
  const recommandMoviesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 1 } }
  );
  if (!recommandMoviesResponse.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const recommandMovies: MovieData[] = await recommandMoviesResponse.json();

  return (
    <div>
      {recommandMovies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <Image
            src={movie.posterImgUrl}
            alt={movie.title}
            width={260}
            height={370}
          />
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section className={style.recommand_section_container}>
        <h3>지금 가장 추천하는 영화</h3>
        <RecomMovies />
      </section>
      <section className={style.movie_section_container}>
        <h3>등록된 모든 영화</h3>
        <AllMovies />
      </section>
    </div>
  );
}
