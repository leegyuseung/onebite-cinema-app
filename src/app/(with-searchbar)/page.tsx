import style from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import MovieItemSkeleton from "@/components/skeleton/movie-item-skeleton";
import MovieItemSmallSkeleton from "@/components/skeleton/movie-item-small-skeleton";
import { MovieData } from "@/types/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import { Metadata } from "next";

async function AllMovies() {
  await delay(500);
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
  await delay(1000);
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

// 강제로 다이나믹하게 만들기
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "한입 씨네마",
  description: "한입 씨네마에 등록된 영화를 만나보세요.",
  openGraph: {
    title: "한입 씨네마",
    description: "한입 씨네마에 등록된 영화를 만나보세요.",
    images: ["/thumbnail.png"],
  },
};
export default function Home() {
  return (
    <div className={style.container}>
      <section className={style.recommand_section_container}>
        <h3>지금 가장 추천하는 영화</h3>
        <Suspense fallback={<MovieItemSkeleton />}>
          <RecomMovies />
        </Suspense>
      </section>
      <section className={style.movie_section_container}>
        <h3>등록된 모든 영화</h3>
        <Suspense fallback={<MovieItemSmallSkeleton />}>
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
