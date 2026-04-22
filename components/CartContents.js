"use client";

import Link from "next/link";
import { useStore } from "./StoreProvider";

export default function CartContents({ compact = false, onNavigate } = {}) {
  const {
    cart,
    language,
    totalPrice,
    formatPrice,
    changeCartQuantity,
    removeFromCart,
    clearCart
  } = useStore();
  const isEnglish = language === "en";
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!cart.length) {
    return (
      <div className="cart-empty-state">
        <p className="cart-empty">
          {isEnglish
            ? "Your cart is empty for now."
            : "Votre panier est vide pour le moment."}
        </p>
        <p className="cart-empty-help">
          {isEnglish
            ? "Explore the collection and add your favorite pieces before moving to checkout."
            : "Explorez la collection et ajoutez vos pieces preferees avant de passer a la validation."}
        </p>
        <Link href="/boutique" className="button button-primary" onClick={onNavigate}>
          {isEnglish ? "Discover the collection" : "Decouvrir la collection"}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="cart-status-card">
        <div>
          <p className="cart-status-label">{isEnglish ? "Cart summary" : "Resume du panier"}</p>
          <strong>
            {totalItems} {isEnglish ? (totalItems > 1 ? "items" : "item") : totalItems > 1 ? "articles" : "article"}
          </strong>
        </div>
        <p className="cart-status-note">
          {isEnglish
            ? "Adjust quantities freely before the next step."
            : "Ajustez les quantites librement avant l'etape suivante."}
        </p>
      </div>

      <ul className="cart-items">
        {cart.map((item) => (
          <li className="cart-item" key={item.id}>
            <div
              className="cart-item-media"
              style={{ backgroundImage: `url("${item.images[0].src}")` }}
            ></div>
            <div className="cart-item-copy">
              <h3>{item.name}</h3>
              <p>{isEnglish ? item.categoryEn || item.category : item.category}</p>
              <span className="cart-item-qty">
                {isEnglish ? "Quantity" : "Quantite"} : {item.quantity}
              </span>
              <div className="cart-item-controls">
                <button
                  className="cart-qty-button"
                  type="button"
                  aria-label={isEnglish ? "Decrease quantity" : "Reduire la quantite"}
                  onClick={() => changeCartQuantity(item.id, -1)}
                >
                  −
                </button>
                <span className="cart-qty-value">{item.quantity}</span>
                <button
                  className="cart-qty-button"
                  type="button"
                  aria-label={isEnglish ? "Increase quantity" : "Augmenter la quantite"}
                  onClick={() => changeCartQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="cart-item-actions">
              <strong>{formatPrice(item.price * item.quantity)}</strong>
              <button
                className="cart-remove"
                type="button"
                onClick={() => removeFromCart(item.id)}
              >
                {isEnglish ? "Remove" : "Supprimer"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-panel-footer">
        <div className="cart-summary">
          <span>{isEnglish ? "Total" : "Total"}</span>
          <strong>{formatPrice(totalPrice)}</strong>
        </div>
        <div className="cart-footer-actions">
          {!compact ? (
            <button className="button button-secondary cart-clear" type="button" onClick={clearCart}>
              {isEnglish ? "Clear cart" : "Vider le panier"}
            </button>
          ) : null}
          {compact ? (
            <Link
              href="/panier"
              className="button button-secondary cart-clear"
              onClick={onNavigate}
            >
              {isEnglish ? "View cart" : "Voir le panier"}
            </Link>
          ) : null}
          <Link
            href="/account?redirect=checkout"
            className="button button-primary cart-checkout"
            onClick={onNavigate}
          >
            {isEnglish ? "Validate cart" : "Valider le panier"}
          </Link>
        </div>
        <p className="cart-helper-text">
          {isEnglish
            ? "Next step: sign in or create your account, then confirm your delivery details."
            : "Etape suivante : connectez-vous ou creez votre compte, puis confirmez votre livraison."}
        </p>
      </div>
    </>
  );
}
