import { ReviewData } from "@/types/types";
import style from "./review-item.module.css";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId,
}: ReviewData) {
  const date = new Date(createdAt);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = weekdays[date.getDay()];

  const newDate = `${year}. ${month}. ${day}. ${dayOfWeek} 작성됨`;

  return (
    <div className={style.container}>
      <div className={style.title_container}>
        <div className={style.author}>{author}</div>
        <div className={style.date}>{newDate}</div>
      </div>
      <div className={style.content}>{content}</div>
      <div className={style.delete_btn}>🗑️ 리뷰 삭제하기</div>
    </div>
  );
}
