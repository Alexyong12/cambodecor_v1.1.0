import categoriesJson from "@/data/categories.json";
import { SubCategoryScreen } from "./sub-category-screen";

interface PageProps {
  params: Promise<{ slug: string; sub: string }>;
}

/**
 * Pre-render every category × sub-category pair for the static export.
 * Flattened from categories.json so the build covers exactly the
 * combinations that exist in the data — no more, no less.
 */
export function generateStaticParams() {
  return categoriesJson.flatMap((c) =>
    (c.subCategories ?? []).map((s) => ({ slug: c.slug, sub: s.slug })),
  );
}

/** Sub Category #2 (e.g. Floor & Wall → Wall Decor; Kitchen → Tableware). */
export default async function SubCategoryPage({ params }: PageProps) {
  const { slug, sub } = await params;
  return <SubCategoryScreen categorySlug={slug} subSlug={sub} />;
}
