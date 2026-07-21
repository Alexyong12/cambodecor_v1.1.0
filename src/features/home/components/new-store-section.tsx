import Link from "next/link";

/**
 * NEW STORE section from the Main Category page: partner store promo tiles
 * (FUJIAIRE hero, then Rinnai / Jotun / 24 Store / UPG pipes).
 */
const STORES = [
  { slug: "outdoors", image: "/images/banners/store-fujiaire.png", alt: "FUJIAIRE store — air conditioning, 5 years warranty", hero: true },
  { slug: "furniture-home-decor", image: "/images/banners/store-rinnai.png", alt: "Rinnai store — kitchen and gas appliances", hero: false },
  { slug: "jotun", image: "/images/banners/store-jotun.png", alt: "JOTUN store — Jotashield exterior protection", hero: false },
  { slug: "24-store", image: "/images/banners/store-24.png", alt: "24 Store — tools and hardware", hero: false },
  { slug: "upg", image: "/images/banners/store-upg.png", alt: "UPG — PVC pipes and fittings", hero: false },
] as const;

export function NewStoreSection() {
  return (
    <section aria-labelledby="new-store-heading" className="space-y-3">
      <h2
        id="new-store-heading"
        className="text-sm font-bold uppercase text-brand-navy md:text-base"
      >
        New store
      </h2>
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {STORES.map((store) => (
          <Link
            key={store.slug}
            href={`/categories/${store.slug}`}
            className={
              store.hero
                ? "relative col-span-2 aspect-[2/1] overflow-hidden rounded-lg transition-shadow hover:shadow-md lg:col-span-2 lg:row-span-2 lg:aspect-auto"
                : "relative aspect-[3/2] overflow-hidden rounded-lg transition-shadow hover:shadow-md"
            }
          >
            <img
              src={store.image}
              alt={store.alt}
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
