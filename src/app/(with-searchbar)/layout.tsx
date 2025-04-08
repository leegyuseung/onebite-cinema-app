import { Suspense } from "react";
import Searchbar from "./searchbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>Loading ...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
