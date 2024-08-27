"use client"

import {SearchBox} from '@/components/SearchBox'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Weather Search</h1>
        <SearchBox />
    </main>
  );
}
