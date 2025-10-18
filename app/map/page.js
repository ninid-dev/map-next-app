"use client";

import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <main style={{ height: "400px", width: "400px" }}>
      <LazyMap />
    </main>
  );
}
