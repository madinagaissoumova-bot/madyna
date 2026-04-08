import { notFound } from "next/navigation";
import ProductPage from "../../../components/ProductPage";
import { getProductById, products } from "../../../lib/store";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id
  }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
