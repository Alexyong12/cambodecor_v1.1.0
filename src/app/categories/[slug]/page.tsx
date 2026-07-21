import categoriesJson from "@/data/categories.json";
import { CategoryScreen } from "./category-screen";

interface PageProps {
  params: Promise<{ slug: string }>; // Next 15: params is async
}

/**
 * Pre-render one page per category at build time (static export).
 * Sourced from the same JSON the runtime reads, so params can never
 * drift from the data.
 */
export function generateStaticParams() {
  return categoriesJson.map((c) => ({ slug: c.slug }));
}

/** Main/Sub Category screen: sub-category chips + filterable product grid. */
export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  return <CategoryScreen slug={slug} />;
}
