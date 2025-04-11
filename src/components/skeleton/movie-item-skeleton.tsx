import style from "./movie-item-skeleton.module.css";

export default function MovieItemSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.img}></div>
      <div className={style.img}></div>
      <div className={style.img}></div>
    </div>
  );
}
