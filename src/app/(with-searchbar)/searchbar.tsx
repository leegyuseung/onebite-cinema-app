"use client";

import style from "./searchbar.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const q = params.get("q");
    setSearch(q || "");
  }, [params]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickSearch = () => {
    router.push(`http://localhost:3000/search?q=${search}`);
  };

  const onKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`http://localhost:3000/search?q=${search}`);
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDownSearch}
          placeholder="검색어를 입력하세요."
        />
        <button onClick={onClickSearch}>검색</button>
      </div>
    </div>
  );
}
