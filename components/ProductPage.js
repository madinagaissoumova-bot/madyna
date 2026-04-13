"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import SiteNavbar from "./SiteNavbar";
import { getMainNavItems } from "../lib/siteContent";
import { products } from "../lib/store";
import { useStore } from "./StoreProvider";

export default function ProductPage({ product }) {
  const { addToCart, showToast, formatPrice, language } = useStore();
  const isEnglish = language === "en";
  const images = product.images;
  const relatedProducts = useMemo(() => {
    const sameCategoryProducts = products.filter(
      (candidate) => candidate.id !== product.id && candidate.category === product.category
    );

    if (sameCategoryProducts.length >= 3) {
      return sameCategoryProducts.slice(0, 3);
    }

    const fallbackProducts = products.filter(
      (candidate) => candidate.id !== product.id && candidate.category !== product.category
    );

    return [...sameCategoryProducts, ...fallbackProducts].slice(0, 3);
  }, [product]);
  const [activeImage, setActiveImage] = useState(0);

  function handleAddToCart() {
    addToCart(product);
    showToast(isEnglish ? `${product.name} has been added to your cart.` : `${product.name} a ete ajoute au panier.`);
  }

  function handleAddRelatedProductToCart(relatedProduct) {
    addToCart(relatedProduct);
    showToast(
      isEnglish
        ? `${relatedProduct.name} has been added to your cart.`
        : `${relatedProduct.name} a ete ajoute au panier.`
    );
  }

  function goToImage(nextIndex) {
    const total = images.length;
    setActiveImage((nextIndex + total) % total);
  }

  return (
    <div className="product-page-shell">
      <SiteNavbar
        sticky
        navItems={getMainNavItems(isEnglish)}
      />

      <main className="product-main">
        <section className="product-detail-section">
          <div className="container product-detail-grid">
            <div className="product-gallery-card">
              <div className="product-gallery-main">
                <img
                  src={images[activeImage].src}
                  alt={images[activeImage].alt}
                  className="product-detail-image"
                />
                {images.length > 1 ? (
                  <>
                    <button
                      className="product-gallery-arrow product-gallery-prev"
                      type="button"
                      aria-label="Image precedente"
                      onClick={() => goToImage(activeImage - 1)}
                    >
                      ‹
                    </button>
                    <button
                      className="product-gallery-arrow product-gallery-next"
                      type="button"
                      aria-label="Image suivante"
                      onClick={() => goToImage(activeImage + 1)}
                    >
                      ›
                    </button>
                  </>
                ) : null}
              </div>

              {images.length > 1 ? (
                <div className="product-gallery-thumbs" aria-label="Photos du produit">
                  {images.map((image, index) => (
                    <button
                      key={image.src}
                      className={`product-thumb${index === activeImage ? " is-active" : ""}`}
                      type="button"
                      aria-label={`Voir la photo ${index + 1}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img src={image.src} alt={image.alt} />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="product-copy-card">
              <p className="product-detail-category">{isEnglish ? product.categoryEn || product.category : product.category}</p>
              <h1>{product.name}</h1>
              <p className="product-detail-price">{formatPrice(product.price)}</p>
              <p className="product-detail-description">{isEnglish ? product.descriptionEn || product.description : product.description}</p>
              <p className="product-detail-description">
                {isEnglish
                  ? product.detailsEn ||
                    "Selected for its elegance, comfort and premium look. More photos and details can be added at any time."
                  : product.details ||
                    "Piece selectionnee pour son elegance, son confort et son allure premium. D autres photos et precisions peuvent etre ajoutees a tout moment."}
              </p>

              <div className="product-detail-actions">
                <button className="button button-primary" type="button" onClick={handleAddToCart}>
                  {isEnglish ? "Add to cart" : "Ajouter au panier"}
                </button>
                <Link href="/boutique" className="button button-secondary">
                  {isEnglish ? "Continue shopping" : "Continuer vos achats"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length ? (
          <section className="product-related-section">
            <div className="container">
              <div className="section-heading">
                <p className="eyebrow">{isEnglish ? "You may also like" : "Vous aimerez aussi"}</p>
                <h2>{isEnglish ? "Similar pieces to discover" : "Des pieces similaires a decouvrir"}</h2>
                <p>
                  {isEnglish
                    ? "A curated selection in the same spirit to continue exploring the collection."
                    : "Une selection dans le meme esprit pour prolonger la decouverte de la collection."}
                </p>
              </div>

              <div className="products-grid boutique-products-grid">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    isEnglish={isEnglish}
                    formatPrice={formatPrice}
                    onAddToCart={handleAddRelatedProductToCart}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
