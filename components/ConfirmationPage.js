"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "./StoreProvider";

export default function ConfirmationPage() {
  const { cart, totalPrice, formatPrice, showToast } = useStore();
  const [message, setMessage] = useState({ text: "", type: "" });

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fields = [
      "delivery-firstname",
      "delivery-lastname",
      "delivery-phone",
      "delivery-address",
      "delivery-city",
      "delivery-postal",
      "delivery-method"
    ];
    const isValid = fields.every((field) => Boolean(String(formData.get(field) || "").trim()));

    if (!isValid) {
      setMessage({
        text: "Merci de completer correctement votre adresse et le mode de livraison.",
        type: "error"
      });
      return;
    }

    setMessage({
      text: "Vos informations de livraison ont bien ete enregistrees. Vous pouvez maintenant transmettre votre commande a Mady Mode.",
      type: "success"
    });
    showToast("Informations de livraison enregistrees.");
  }

  return (
    <div className="account-page-body">
      <header className="site-header auth-header">
        <div className="container header-inner">
          <Link href="/#accueil" className="logo" aria-label="Mady Mode accueil">
            <span className="logo-mark">M</span>
            <span className="logo-text">
              <strong>Mady Mode</strong>
              <span>Mode modeste</span>
            </span>
          </Link>
          <Link href="/#produits" className="button button-secondary auth-back-link">Continuer vos achats</Link>
        </div>
      </header>

      <main className="auth-main">
        <section className="auth-section confirmation-section">
          <div className="container auth-shell confirmation-shell">
            <div className="auth-copy">
              <p className="eyebrow">Commande confirmee</p>
              <h1>Votre demande est prete</h1>
              <p>
                Merci d'avoir valide votre commande chez Mady Mode. Retrouvez ci-dessous le recapitulatif de votre selection avant le dernier echange avec la boutique.
              </p>
              <ul className="auth-benefits">
                <li>Votre panier a bien ete conserve</li>
                <li>Votre selection est prete a etre transmise</li>
                <li>Notre equipe peut maintenant vous accompagner</li>
              </ul>
              <div className="hero-actions confirmation-actions">
                <Link href="/#produits" className="button button-secondary">Retour a la boutique</Link>
                <a
                  href="https://wa.me/336184002819?text=Bonjour%20Mady%20Mode%2C%20je%20viens%20de%20confirmer%20ma%20commande%20et%20je%20souhaite%20la%20finaliser."
                  className="button button-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Envoyer sur WhatsApp
                </a>
              </div>
            </div>

            <div className="auth-card confirmation-card">
              <p className="auth-context">Recapitulatif de commande</p>
              {cart.length ? (
                <ul className="confirmation-items">
                  {cart.map((item) => (
                    <li className="confirmation-item" key={item.id}>
                      <div className={`confirmation-item-media product-visual ${item.visualClass}`}></div>
                      <div className="confirmation-item-copy">
                        <h3>{item.name}</h3>
                        <p>{item.category} • Quantite : {item.quantity}</p>
                      </div>
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="confirmation-empty">Votre commande ne contient pas encore d'articles.</div>
              )}
              <div className="confirmation-total-row">
                <span>Total</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
            </div>

            <div className="auth-card delivery-card">
              <p className="auth-context">Adresse & livraison</p>
              <form className="delivery-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="delivery-firstname">Prenom</label>
                    <input type="text" id="delivery-firstname" name="delivery-firstname" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="delivery-lastname">Nom</label>
                    <input type="text" id="delivery-lastname" name="delivery-lastname" required />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="delivery-phone">Telephone</label>
                  <input type="tel" id="delivery-phone" name="delivery-phone" required />
                </div>
                <div className="form-field">
                  <label htmlFor="delivery-address">Adresse complete</label>
                  <textarea id="delivery-address" name="delivery-address" rows="4" placeholder="Rue, numero, complement..." required></textarea>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="delivery-city">Ville</label>
                    <input type="text" id="delivery-city" name="delivery-city" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="delivery-postal">Code postal</label>
                    <input type="text" id="delivery-postal" name="delivery-postal" required />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="delivery-method">Mode de livraison</label>
                  <select id="delivery-method" name="delivery-method" required>
                    <option value="">Choisir une option</option>
                    <option value="standard">Livraison standard</option>
                    <option value="express">Livraison express</option>
                    <option value="pickup">Retrait boutique</option>
                  </select>
                </div>
                <button className="button button-primary" type="submit">Enregistrer les informations</button>
                <p className={`form-message${message.type ? ` ${message.type}` : ""}`} aria-live="polite">
                  {message.text}
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
