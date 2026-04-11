"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "../lib/store";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";
import { useStore } from "./StoreProvider";

export default function BoutiqueSection({
  heading,
  description,
  eyebrow,
  previewCount = null,
  showToolbar = true,
  showMoreLink = false,
  sectionId = "produits"
}) {
  const { formatPrice, addToCart, showToast, language } = useStore();
  const [priceSort, setPriceSort] = useState("default");
  const isEnglish = language === "en";

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (priceSort === "price-asc") {
      return items.sort((firstProduct, secondProduct) => firstProduct.price - secondProduct.price);
    }

    if (priceSort === "price-desc") {
      return items.sort((firstProduct, secondProduct) => secondProduct.price - firstProduct.price);
    }

    return items;
  }, [priceSort]);

  const displayedProducts = previewCount ? sortedProducts.slice(0, previewCount) : sortedProducts;

  function handleAddToCart(product) {
    addToCart(product);
    showToast(isEnglish ? `${product.name} has been added to your cart.` : `${product.name} a ete ajoute au panier.`);
  }

  return (
    <section className="products section" id={sectionId}>
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={heading} description={description} />

        {showToolbar ? (
          <div className="products-toolbar">
            <label className="products-sort" htmlFor={`${sectionId}-sort`}>
              <span>{isEnglish ? "Sort by price" : "Trier par prix"}</span>
              <select
                id={`${sectionId}-sort`}
                name={`${sectionId}-sort`}
                value={priceSort}
                onChange={(event) => setPriceSort(event.target.value)}
              >
                <option value="default">{isEnglish ? "Featured order" : "Ordre par defaut"}</option>
                <option value="price-asc">{isEnglish ? "Lowest to highest" : "Du moins cher au plus cher"}</option>
                <option value="price-desc">{isEnglish ? "Highest to lowest" : "Du plus cher au moins cher"}</option>
              </select>
            </label>
          </div>
        ) : null}

        <div className="products-grid">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isEnglish={isEnglish}
              formatPrice={formatPrice}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {showMoreLink ? (
          <div className="section-cta">
            <Link href="/boutique" className="button button-primary">
              {isEnglish ? "See the full boutique" : "Voir toute la boutique"}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
