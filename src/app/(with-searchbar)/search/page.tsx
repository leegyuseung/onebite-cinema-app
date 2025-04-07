import Image from "next/image";
import Link from "next/link";
import { MovieData } from "@/types/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { next: { revalidate: 60 * 30 } }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const searchMovies: MovieData[] = await response.json();

  return (
    <div>
      {searchMovies.map((movie) => (
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
