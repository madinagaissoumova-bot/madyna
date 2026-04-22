"use client";

import Link from "next/link";
import { useState } from "react";
import { getMainNavItems } from "../lib/siteContent";
import SiteNavbar from "./SiteNavbar";
import { useStore } from "./StoreProvider";

export default function ConfirmationPage() {
  const { cart, totalPrice, formatPrice, showToast, language } = useStore();
  const [message, setMessage] = useState({ text: "", type: "" });
  const isEnglish = language === "en";

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
        text: isEnglish
          ? "Please complete your address and delivery method correctly."
          : "Merci de completer correctement votre adresse et le mode de livraison.",
        type: "error"
      });
      return;
    }

    setMessage({
      text: isEnglish
        ? "Your delivery information has been saved. You can now send your order to Mady Mode."
        : "Vos informations de livraison ont bien ete enregistrees. Vous pouvez maintenant transmettre votre commande a Mady Mode.",
      type: "success"
    });
    showToast(isEnglish ? "Delivery information saved." : "Informations de livraison enregistrees.");
  }

  return (
    <div className="account-page-body">
      <SiteNavbar
        sticky
        navItems={getMainNavItems(isEnglish)}
        actions={
          <Link href="/boutique" className="button button-secondary auth-back-link">
            {isEnglish ? "Continue shopping" : "Continuer vos achats"}
          </Link>
        }
      />

      <main className="auth-main" id="main-content">
        <section className="auth-section confirmation-section">
          <div className="container auth-shell confirmation-shell">
            <div className="auth-copy">
              <p className="eyebrow">{isEnglish ? "Order confirmed" : "Commande confirmee"}</p>
              <div className="checkout-steps" aria-label={isEnglish ? "Checkout steps" : "Etapes de commande"}>
                <span className="checkout-step is-complete">{isEnglish ? "1. Account" : "1. Compte"}</span>
                <span className="checkout-step is-active">{isEnglish ? "2. Delivery" : "2. Livraison"}</span>
                <span className="checkout-step">{isEnglish ? "3. Confirmation" : "3. Confirmation"}</span>
              </div>
              <h1>{isEnglish ? "Your request is ready" : "Votre demande est prete"}</h1>
              <p>
                {isEnglish
                  ? "Thank you for confirming your order with Mady Mode. Find your selection summary below before the final exchange with the boutique."
                  : "Merci d'avoir valide votre commande chez Mady Mode. Retrouvez ci-dessous le recapitulatif de votre selection avant le dernier echange avec la boutique."}
              </p>
              <ul className="auth-benefits">
                <li>{isEnglish ? "Your cart has been saved" : "Votre panier a bien ete conserve"}</li>
                <li>{isEnglish ? "Your selection is ready to be sent" : "Votre selection est prete a etre transmise"}</li>
                <li>{isEnglish ? "Our team can now assist you" : "Notre equipe peut maintenant vous accompagner"}</li>
              </ul>
            </div>

            <div className="auth-card confirmation-card">
              <p className="auth-context">{isEnglish ? "Order summary" : "Recapitulatif de commande"}</p>
              {cart.length ? (
                <ul className="confirmation-items">
                  {cart.map((item) => (
                    <li className="confirmation-item" key={item.id}>
                      <div
                        className="confirmation-item-media"
                        style={{ backgroundImage: `url("${item.images[0].src}")` }}
                      ></div>
                      <div className="confirmation-item-copy">
                        <h3>{item.name}</h3>
                        <p>{(isEnglish ? item.categoryEn || item.category : item.category)} • {isEnglish ? "Quantity" : "Quantite"} : {item.quantity}</p>
                      </div>
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="confirmation-empty">{isEnglish ? "Your order does not contain any items yet." : "Votre commande ne contient pas encore d'articles."}</div>
              )}
              <div className="confirmation-total-row">
                <span>{isEnglish ? "Total" : "Total"}</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
            </div>

            <div className="auth-card delivery-card">
              <p className="auth-context">{isEnglish ? "Address & delivery" : "Adresse & livraison"}</p>
              <form className="delivery-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="delivery-firstname">{isEnglish ? "First name" : "Prenom"}</label>
                    <input type="text" id="delivery-firstname" name="delivery-firstname" autoComplete="given-name" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="delivery-lastname">{isEnglish ? "Last name" : "Nom"}</label>
                    <input type="text" id="delivery-lastname" name="delivery-lastname" autoComplete="family-name" required />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="delivery-phone">{isEnglish ? "Phone" : "Telephone"}</label>
                  <input type="tel" id="delivery-phone" name="delivery-phone" autoComplete="tel" required />
                </div>
                <div className="form-field">
                  <label htmlFor="delivery-address">{isEnglish ? "Full address" : "Adresse complete"}</label>
                  <textarea id="delivery-address" name="delivery-address" rows="4" autoComplete="street-address" placeholder={isEnglish ? "Street, number, additional details..." : "Rue, numero, complement..."} required></textarea>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="delivery-city">{isEnglish ? "City" : "Ville"}</label>
                    <input type="text" id="delivery-city" name="delivery-city" autoComplete="address-level2" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="delivery-postal">{isEnglish ? "Postal code" : "Code postal"}</label>
                    <input type="text" id="delivery-postal" name="delivery-postal" autoComplete="postal-code" required />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="delivery-method">{isEnglish ? "Delivery method" : "Mode de livraison"}</label>
                  <select id="delivery-method" name="delivery-method" required>
                    <option value="">{isEnglish ? "Choose an option" : "Choisir une option"}</option>
                    <option value="standard">{isEnglish ? "Standard delivery" : "Livraison standard"}</option>
                    <option value="express">{isEnglish ? "Express delivery" : "Livraison express"}</option>
                    <option value="pickup">{isEnglish ? "Store pickup" : "Retrait boutique"}</option>
                  </select>
                </div>
                <p className="delivery-helper-text">
                  {isEnglish
                    ? "Save your information first, then share your request with the boutique to finalize the order."
                    : "Enregistrez d'abord vos informations, puis partagez votre demande avec la boutique pour finaliser la commande."}
                </p>
                <button className="button button-primary" type="submit">{isEnglish ? "Save information" : "Enregistrer les informations"}</button>
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
