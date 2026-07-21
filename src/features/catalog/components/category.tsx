"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
//import { CategoryIcon } from "@/components/ui/category-icon";
import { useCategories } from "../hooks/use-categories";
/**
 * The category grid from the Home Page design (icon above label, 6 per row
 * on tablet). Data comes from the static JSON via the hook — this component
 * doesn't know or care that there's no API yet.
 */
export function CategoryGrid() {
      const { data: categories, isPending, isError } = useCategories();

      if (isPending) {
            return (
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:gap-4 xl:grid-cols-8">
                        {Array.from({ length: 18 }).map((_, i) => (
                              <Skeleton key={i} className="aspect-square" />
                        ))}
                  </div>
            );
      }

      if (isError) {
            return (
                  <p className="text-sm text-muted-foreground">
                        Couldn&apos;t load categories. Refresh the page to try again.
                  </p>
            );
      }

      return (
            <nav aria-label="Product categories">
                  <ul className="grid grid-cols-6 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:gap-2 xl:grid-cols-11">
                        {categories.map((category) => (
                              <li key={category.id}>
                                    <Link
                                          href={`/categories/${category.slug}`}
                                          className="flex h-full flex-col items-center gap-3 rounded-md bg-card p-3 text-center transition-colors"
                                    >
                                          {/* <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                                                <CategoryIcon name={category.imageUrl} className="h-6 w-6 text-brand-navy" />
                                          </span> */}
                                          <span className="flex w-14 lg:w-17 lg:h-17 items-center justify-center bg-secondary">
                                                <img
                                                      src={category.imageUrl ?? "/images/categories/default.png"}
                                                      alt={category.name}
                                                      className="object-cover h-full w-full"
                                                      sizes="64px"
                                                />
                                          </span>
                                          <span className="text-[6px] font-semibold uppercase leading-tight md:text-[11px]">
                                                {category.name}
                                          </span>
                                    </Link>
                              </li>
                        ))}
                  </ul>
            </nav>
      );
}
