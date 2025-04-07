import { MovieData } from "@/types/types";
import style from "./page.module.css";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${id}`,
    { cache: "force-cache" }
  );
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
    <div className={style.container}>
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
    </div>
  );
}
