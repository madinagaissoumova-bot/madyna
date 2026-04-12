"use client";

import Link from "next/link";

export default function ProductCard({ product, isEnglish, formatPrice, onAddToCart }) {
  return (
    <article className="product-card">
      <Link href={`/produit/${product.id}`} className="product-card-link" aria-label={`Voir la fiche de ${product.name}`}>
        <div
          className="product-visual"
          style={{ backgroundImage: `url("${product.cardImageSrc || product.images[0].src}")` }}
        ></div>
      </Link>
      <div className="product-body">
        <div className="product-head">
          <p className="product-category">{isEnglish ? product.categoryEn || product.category : product.category}</p>
          <span className="product-badge">{isEnglish ? "Available" : "Disponible"}</span>
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
            <span>{isEnglish ? "Size guidance on request" : "Conseil taille sur demande"}</span>
          </div>
          <div className="product-card-actions">
            <Link href={`/produit/${product.id}`} className="button button-secondary product-detail-link">
              {isEnglish ? "View product" : "Voir le produit"}
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
