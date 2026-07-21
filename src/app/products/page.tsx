import type { Metadata } from "next";
import { ProductsScreen } from "./products-screen";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse every product on CamboDecor — furniture, tools, paint, appliances and more.",
};

/** /products — the full catalog with search and sort. */
export default function ProductsPage() {
  return <ProductsScreen />;
}
