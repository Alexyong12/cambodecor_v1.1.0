import brandsJson from "@/data/brands.json";
import { BrandScreen } from "./brand-screen";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render a page for every brand in the static export. */
export function generateStaticParams() {
  return brandsJson.map((b) => ({ slug: b.slug }));
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  return <BrandScreen slug={slug} />;
}
