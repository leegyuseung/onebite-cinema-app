import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["search.pstatic.net"], // 허용할 이미지 호스트 추가
  },
};

export default nextConfig;
