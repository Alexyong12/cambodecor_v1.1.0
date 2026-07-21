import productsJson from "@/data/products.json";
import { ProductScreen } from "./product-screen";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Pre-render a detail page for every product in the catalog (static export).
 * 500 products → 500 HTML files, each hydrated by the client ProductScreen.
 */
export function generateStaticParams() {
  return productsJson.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  return <ProductScreen id={id} />;
}
