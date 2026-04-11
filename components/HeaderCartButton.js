"use client";

import { useStore } from "./StoreProvider";

export default function HeaderCartButton() {
  const { language, totalQuantity, openCart } = useStore();
  const isEnglish = language === "en";

  return (
    <button className="cart-button" type="button" aria-label={isEnglish ? "Cart" : "Panier"} onClick={openCart}>
      <span className="cart-button-label">{isEnglish ? "Cart" : "Panier"}</span>
      <span className="cart-count" aria-live="polite">
        {totalQuantity}
      </span>
    </button>
  );
}
