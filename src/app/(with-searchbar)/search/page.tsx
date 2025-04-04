import Image from "next/image";
import Link from "next/link";
import dummy from "../../../mock/dummy.json";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const movies = dummy.filter((movie) => movie.title.includes(q));

  return (
    <div>
      {movies.map((movie) => (
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
