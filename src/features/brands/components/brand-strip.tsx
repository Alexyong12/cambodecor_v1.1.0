import Image from "next/image";

import { brandService } from "../services/brand.service";
import Link from "next/link";

/**
 * POPULAR BRANDS strip from the Main Category page: circular partner logos.
 * Placeholder circles show brand initials in the brand's color until real
 * logo images arrive (drop them in /public/images/brands and swap here).
 * Static data → renderable on the server, no hook needed.
 */
export function BrandStrip() {
  const brands = brandService.getAll().slice(0, 15); // the 15 shown in the design

  return (
    <section aria-labelledby="brands-heading" className="space-y-3">
      <h2
        id="brands-heading"
        className="text-sm font-bold uppercase text-brand-navy md:text-base"
      >
        Popular brands
      </h2>
      <ul className="grid grid-cols-5 gap-3 md:gap-4 lg:grid-cols-10">
        {brands.map((brand) => (
          <li key={brand.id} className="flex flex-col items-center gap-1">
            {brand.imageUrl ? (
              <Link href={`/brands/${brand.slug}`} className="relative h-14 w-14 overflow-hidden rounded-full border bg-white md:h-16 md:w-16">
                <Image
                  src={brand.imageUrl}
                  alt={brand.name}
                  fill
                  sizes="64px"
                  className="object-cover h-full w-full"
                />
              </Link>
            ) : (
              <Link
                href={`/brands/${brand.slug}`}
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white text-xs font-bold md:h-16 md:w-16"
                style={{ borderColor: brand.color, color: brand.color }}
              >
                {brand.name.slice(0, 4).toUpperCase()}
              </Link>
            )}
            <span className="text-[9px] text-muted-foreground md:text-[10px]">
              {brand.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
