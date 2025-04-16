import Image from "next/image";
import Link from "next/link";
import MovieItemSkeleton from "@/components/skeleton/movie-item-skeleton";
import { MovieData } from "@/types/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import { Metadata } from "next";

async function SearchResult({ q }: { q: string }) {
  await delay(1000);
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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `한입 씨네마 : ${q} 검색`,
    description: `${q}의 검색 결과입니다.`,
    openGraph: {
      title: `한입 씨네마 : ${q} 검색`,
      description: `${q}의 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense key={q || ""} fallback={<MovieItemSkeleton />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
