"use client";

import Link from "next/link";

export default function ProductCard({ product, isEnglish, formatPrice, onAddToCart, variant = "default" }) {
  const isRelated = variant === "related";

  return (
    <article className={`product-card${isRelated ? " product-card-related" : ""}`}>
      <Link href={`/produit/${product.id}`} className="product-card-link" aria-label={`Voir la fiche de ${product.name}`}>
        <div
          className="product-visual"
          style={{ backgroundImage: `url("${product.cardImageSrc || product.images[0].src}")` }}
        ></div>
      </Link>
      <div className="product-body">
        <div className="product-head">
          <p className="product-category">{isEnglish ? product.categoryEn || product.category : product.category}</p>
        </div>
        <h3>
          <Link href={`/produit/${product.id}`} className="product-title-link">
            {product.name}
          </Link>
        </h3>
        <p className="product-description">{isEnglish ? product.descriptionEn || product.description : product.description}</p>
        <div className="product-footer">
          <div className="product-price-block">
            <strong>{formatPrice(product.price)}</strong>
            <span>{isEnglish ? "One size" : "Taille unique"}</span>
          </div>
          <div className="product-card-actions">
            <Link href={`/produit/${product.id}`} className="button button-secondary product-detail-link">
              {isRelated ? (isEnglish ? "Open" : "Ouvrir") : (isEnglish ? "View product" : "Voir le produit")}
            </Link>
            <button className="add-to-cart" type="button" onClick={() => onAddToCart(product)}>
              {isEnglish ? "Add" : "Ajouter"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
