"use client";

import CartContents from "./CartContents";
import { useStore } from "./StoreProvider";

export default function CartDrawer() {
  const { cartOpen, closeCart, language } = useStore();
  const isEnglish = language === "en";

  return (
    <>
      <div
        className={`cart-overlay${cartOpen ? " is-visible" : ""}`}
        aria-hidden={!cartOpen}
        onClick={closeCart}
      ></div>
      <aside
        className={`cart-panel${cartOpen ? " is-open" : ""}`}
        aria-hidden={!cartOpen}
        aria-label={isEnglish ? "Cart panel" : "Panneau panier"}
      >
        <div className="cart-panel-header">
          <div>
            <p className="cart-panel-eyebrow">{isEnglish ? "Your selection" : "Votre selection"}</p>
            <h2>{isEnglish ? "Cart" : "Panier"}</h2>
          </div>
          <button className="cart-close" type="button" aria-label={isEnglish ? "Close cart" : "Fermer le panier"} onClick={closeCart}>
            ×
          </button>
        </div>
        <div className="cart-panel-body">
          <CartContents compact onNavigate={closeCart} />
        </div>
      </aside>
    </>
  );
}
