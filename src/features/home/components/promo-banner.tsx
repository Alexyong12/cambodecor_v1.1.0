"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { bannerService } from "../services/banner.service";

/**
 * Hero banner carousel — displays the banners from src/data/banner.json
 * (real images cropped from the CamboDecor 2.0 design file). Auto-advances
 * every 4s with carousel dots, exactly like the design's banner slot.
 */
export function BannerCarousel() {
  const banners = bannerService.getAll();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % banners.length),
      4000,
    );
    return () => clearInterval(timer);
  }, [banners.length]);

  const banner = banners[index] ?? banners[0];
  if (!banner) return null;

  return (
    <section aria-label="Promotions" className="space-y-2">
      <Link
        href={banner.href ?? "#"}
        className="relative block h-44 overflow-hidden rounded-lg bg-neutral-100 sm:h-56 md:h-64 lg:h-72"
      >
        <img
          key={banner.id}
          src={banner.imageUrl}
          alt={banner.alt}
          sizes="(max-width: 1536px) 100vw, 1320px"
          className="object-cover object-center"
        />
      </Link>

      {banners.length > 1 && (
        <div className="flex justify-center gap-1.5" role="tablist" aria-label="Banner slides">
          {banners.map((b, i) => (
            <button
              key={b.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${b.alt}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-4 bg-brand-orange" : "w-1.5 bg-neutral-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
