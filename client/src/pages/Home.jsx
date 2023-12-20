import React from 'react'

export default function Home() {
  return (
    <section class="bg-indigo-900 h-screen flex items-center justify-center">
    <div class="container mx-auto px-4 py-8 w-1/2">
      <div class="relative">
        <input class="w-full h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg"
          type="search"
          placeholder="Paste the URL to be shortened"></input>
      </div>
    </div>
  </section>
  )
}