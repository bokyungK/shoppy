import React from 'react';

export default function Loading({ isHome }) {
  const heightClass = isHome ? 'h-[calc(100vh-361px)]' : 'h-[calc(100vh-61px)]'

  return (
    <section className={`w-full ${heightClass} flex justify-center items-center`}>
      <div id="loader"></div>
    </section>
  );
}

