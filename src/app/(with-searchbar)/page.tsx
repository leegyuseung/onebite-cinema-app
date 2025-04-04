import style from "./page.module.css";
import movies from "../../mock/dummy.json";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className={style.container}>
      <section className={style.recommand_section_container}>
        <h3>지금 가장 추천하는 영화</h3>
        <div>
          {movies.slice(0, 3).map((movie) => (
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
      </section>
      <section className={style.movie_section_container}>
        <h3>등록된 모든 영화</h3>
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
      </section>
    </div>
  );
}
