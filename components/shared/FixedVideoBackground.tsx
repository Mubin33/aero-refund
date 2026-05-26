"use client";

import Image from "next/image";

export function FixedVideoBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <Image
        src="/hero.png"
        alt=" Background"
        fill
        priority
        className="object-cover object-center"
      />
    </div>
  );
}
