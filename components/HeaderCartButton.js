"use client";

import { useStore } from "./StoreProvider";

export default function HeaderCartButton() {
  const { language, totalQuantity, openCart } = useStore();
  const isEnglish = language === "en";

  return (
    <button className="cart-button" type="button" aria-label={isEnglish ? "Cart" : "Panier"} onClick={openCart}>
      <span className="header-button-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="19" r="1.6" />
          <circle cx="17" cy="19" r="1.6" />
          <path d="M3 5h2l2.2 9.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H7.2" />
        </svg>
      </span>
      <span className="cart-button-label">{isEnglish ? "Cart" : "Panier"}</span>
      <span className="cart-count" aria-live="polite">
        {totalQuantity}
      </span>
    </button>
  );
}
