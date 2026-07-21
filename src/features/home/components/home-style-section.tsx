import Image from "next/image";
import Link from "next/link";

/**
 * HOME STYLE section from the design: room-inspiration image tiles
 * (Outdoor hero, then Living Room / Bedroom / Bathroom / Kitchen).
 */
const ROOMS = [
  { slug: "outdoors", label: "", image: "/images/banners/outdoor_clean.png", hero: true },
  { slug: "living", label: "", image: "/images/banners/living_room_clean.png", hero: false },
  { slug: "bedroom", label: "", image: "/images/banners/bedroom_clean.png", hero: false },
  { slug: "bathroom", label: "", image: "/images/banners/room-bathroom.png", hero: false },
  { slug: "kitchen", label: "", image: "/images/banners/kitchen.png", hero: false },
] as const;

export function HomeStyleSection() {
  return (
    <section aria-labelledby="home-style-heading" className="space-y-3">
      <h2
        id="home-style-heading"
        className="text-sm font-bold uppercase text-brand-navy md:text-base"
      >
        Home style
      </h2>
      {/* Mobile: 2 cols, hero spans full width. md: 3 cols (hero 2x2). lg: 4 cols. */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {ROOMS.map((room) => (
          <Link
            key={room.slug}
            href={`/categories/${room.slug}`}
            className={
              room.hero
                ? "relative col-span-2 aspect-[2/1] overflow-hidden rounded-lg transition-shadow hover:shadow-md md:row-span-2 md:aspect-auto"
                : "relative aspect-[4/3] overflow-hidden rounded-lg transition-shadow hover:shadow-md"
            }
          >
            <Image
              src={room.image}
              alt={`${room.label} inspiration`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
            {/* <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase shadow">
              {room.label}
            </span> */}
          </Link>
        ))}
      </div>
    </section>
  );
}
