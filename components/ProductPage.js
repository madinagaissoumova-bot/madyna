"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import LanguageToggle from "./LanguageToggle";
import { productImagesByVisualClass } from "../lib/store";
import { useStore } from "./StoreProvider";

export default function ProductPage({ product }) {
  const { addToCart, showToast, formatPrice, language } = useStore();
  const isEnglish = language === "en";
  const images = useMemo(() => {
    if (product.images?.length) {
      return product.images;
    }

    return [
      {
        src: productImagesByVisualClass[product.visualClass],
        alt: product.name
      }
    ];
  }, [product]);
  const [activeImage, setActiveImage] = useState(0);

  function handleAddToCart() {
    addToCart(product);
    showToast(isEnglish ? `${product.name} has been added to your cart.` : `${product.name} a ete ajoute au panier.`);
  }

  function goToImage(nextIndex) {
    const total = images.length;
    setActiveImage((nextIndex + total) % total);
  }

  return (
    <div className="product-page-shell">
      <header className="site-header auth-header">
        <div className="container header-inner">
          <Link href="/#accueil" className="logo" aria-label="Mady Mode accueil">
            <span className="logo-mark">M</span>
            <span className="logo-text">
              <strong>Mady Mode</strong>
              <span>Mode modeste</span>
            </span>
          </Link>
          <div className="header-actions">
            <LanguageToggle />
            <Link href="/#produits" className="button button-secondary auth-back-link">
              {isEnglish ? "Back to shop" : "Retour a la boutique"}
            </Link>
          </div>
        </div>
      </header>

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
              <p className="eyebrow">{isEnglish ? "Product page" : "Fiche produit"}</p>
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
                <Link href="/#produits" className="button button-secondary">
                  {isEnglish ? "Continue shopping" : "Continuer vos achats"}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
