"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import LanguageToggle from "./LanguageToggle";
import { useStore } from "./StoreProvider";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [message, setMessage] = useState({ text: "", type: "" });
  const { showToast, language } = useStore();
  const isEnglish = language === "en";

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("account-email") || "").trim();
    const password = String(formData.get("account-password") || "").trim();

    if (!isValidEmail(email) || !password) {
      setMessage({
        text: isEnglish
          ? "Please enter a valid email and your password."
          : "Merci de renseigner un e-mail valide et votre mot de passe.",
        type: "error"
      });
      return;
    }

    if (redirect === "checkout") {
      router.push("/confirmation");
      return;
    }

    setMessage({
      text: isEnglish
        ? "Demo sign-in confirmed. Your customer area will be available soon."
        : "Connexion de demonstration validee. Votre espace cliente sera bientot disponible.",
      type: "success"
    });
    showToast(isEnglish ? "Demo sign-in successful." : "Connexion cliente simulee avec succes.");
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
          <div className="header-actions">
            <LanguageToggle />
            <Link href="/#produits" className="button button-secondary auth-back-link">
              {isEnglish ? "Back to shop" : "Retour a la boutique"}
            </Link>
          </div>
        </div>
      </header>

      <main className="auth-main">
        <section className="auth-section">
          <div className="container auth-shell">
            <div className="auth-copy">
              <p className="eyebrow">{isEnglish ? "Customer area" : "Espace cliente"}</p>
              <h1>{isEnglish ? "Sign in to continue your order" : "Connectez-vous pour poursuivre votre commande"}</h1>
              <p>
                {isEnglish
                  ? "Find your Mady Mode selection, complete your request and contact the boutique more easily."
                  : "Retrouvez votre selection Mady Mode, finalisez votre demande et echangez plus facilement avec la boutique."}
              </p>
              <ul className="auth-benefits">
                <li>{isEnglish ? "Access to your current selection" : "Acces a votre selection en cours"}</li>
                <li>{isEnglish ? "Simplified request follow-up" : "Suivi simplifie de votre demande"}</li>
                <li>{isEnglish ? "Personalized support" : "Accompagnement personnalise"}</li>
              </ul>
            </div>

            <div className="auth-card">
              <p className="auth-context">
                {redirect === "checkout"
                  ? isEnglish
                    ? "Sign in to your account to complete your order."
                    : "Connectez-vous a votre compte pour finaliser votre commande."
                  : isEnglish
                    ? "Sign in to your account to continue."
                    : "Connectez-vous a votre compte pour continuer."}
              </p>
              <form className="account-form auth-page-form" onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                  <label htmlFor="account-email">{isEnglish ? "Email address" : "Adresse e-mail"}</label>
                  <input type="email" id="account-email" name="account-email" required />
                </div>
                <div className="form-field">
                  <label htmlFor="account-password">{isEnglish ? "Password" : "Mot de passe"}</label>
                  <input type="password" id="account-password" name="account-password" required />
                </div>
                <button className="button button-primary" type="submit">{isEnglish ? "Sign in" : "Se connecter"}</button>
                <p className={`form-message${message.type ? ` ${message.type}` : ""}`} aria-live="polite">
                  {message.text}
                </p>
              </form>
              <div className="auth-footer-note">
                <p>{isEnglish ? "No account yet?" : "Pas encore de compte ?"}</p>
                <Link href="/#contact">{isEnglish ? "Contact customer service" : "Ecrire au service client"}</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
