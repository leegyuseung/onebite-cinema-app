import { MovieData, ReviewData } from "@/types/types";
import { notFound } from "next/navigation";
import style from "./page.module.css";
import Image from "next/image";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import { Metadata } from "next";

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`
  );

  const movieData: MovieData[] = await response.json();

  const id = movieData.map((movie) => ({ id: movie.id.toString() }));
  return id;
}

async function MovieDetail({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`,
    { cache: "force-cache" }
  );

  if (response.status === 404) {
    notFound();
  }

  const movie: MovieData = await response.json();
  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl})` }}
      >
        <Image src={posterImgUrl} alt={title} width={245} height={350} />
      </div>
      <div className={style.title_cover}>{title}</div>
      <div className={style.first_cover}>
        <div className={style.company_cover}>{company}</div>
        <div className={style.date_cover}>{`(${releaseDate})`}</div>
      </div>
      <div className={style.second_cover}>
        <div>{genres.map((genres) => `${genres} `)}</div>
        <div>{`/ ${runtime}분`}</div>
      </div>
      <div className={style.third_cover}>
        <div className={style.subtitle_cover}>{subTitle}</div>
        <div className={style.description_cover}>{description}</div>
      </div>
    </section>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`,
    {
      next: { tags: [`review-${movieId}`] },
    }
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const movie: MovieData = await response.json();
  const { title, description, posterImgUrl } = movie;

  return {
    title: `${title} - 한입 씨네마`,
    description: `${description}`,
    openGraph: {
      title: `${title} - 한입 씨네마`,
      description: `${description}`,
      images: [posterImgUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <MovieDetail id={id} />
      <ReviewEditor movieId={id} />
      <ReviewList movieId={id} />
    </div>
  );
}
