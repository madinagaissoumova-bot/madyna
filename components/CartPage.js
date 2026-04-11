"use client";

import PageShell from "./PageShell";
import CartContents from "./CartContents";
import { useStore } from "./StoreProvider";

export default function CartPage() {
  const { language } = useStore();
  const isEnglish = language === "en";

  return (
    <PageShell mainClassName="cart-page-main">
      <section className="section cart-page-section">
        <div className="container">
          <div className="section-heading align-left cart-page-heading">
            <p className="eyebrow">{isEnglish ? "Your selection" : "Votre selection"}</p>
            <h2>{isEnglish ? "Review your cart" : "Consultez votre panier"}</h2>
            <p>
              {isEnglish
                ? "Adjust quantities, review your pieces and continue to checkout when you are ready."
                : "Ajustez les quantites, relisez votre selection et poursuivez lorsque tout est pret."}
            </p>
          </div>
          <div className="cart-page-card">
            <CartContents />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
