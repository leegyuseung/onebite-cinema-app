"use client";

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
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDownSearch}
      />
      <button onClick={onClickSearch}>검색</button>
    </div>
  );
}
