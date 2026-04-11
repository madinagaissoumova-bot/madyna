"use client";

import { useState } from "react";
import { isValidEmail } from "../lib/validators";
import { useStore } from "./StoreProvider";

export default function NewsletterSection() {
  const { language, showToast } = useStore();
  const isEnglish = language === "en";
  const [newsletterMessage, setNewsletterMessage] = useState({ text: "", type: "" });

  function handleNewsletterSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("newsletter-email") || "").trim();

    if (!email) {
      setNewsletterMessage({
        text: isEnglish ? "Please enter your email address." : "Veuillez renseigner votre adresse e-mail.",
        type: "error"
      });
      return;
    }

    if (!isValidEmail(email)) {
      setNewsletterMessage({
        text: isEnglish ? "Please enter a valid email address." : "Veuillez entrer une adresse e-mail valide.",
        type: "error"
      });
      return;
    }

    event.currentTarget.reset();
    setNewsletterMessage({
      text: isEnglish
        ? "Thank you, your newsletter subscription has been confirmed."
        : "Merci, votre inscription a la newsletter a bien ete prise en compte.",
      type: "success"
    });
    showToast(isEnglish ? "Newsletter subscription confirmed." : "Inscription newsletter confirmee.");
  }

  return (
    <section className="newsletter section">
      <div className="container newsletter-card">
        <div>
          <p className="eyebrow">{isEnglish ? "Newsletter" : "Newsletter"}</p>
          <h2>{isEnglish ? "Receive our capsules, new arrivals and inspirations first" : "Recevez en avant-premiere nos capsules, nouveautes et inspirations"}</h2>
          <p>
            {isEnglish
              ? "Subscribe to discover exclusive launches, the most awaited restocks and the refined world of Mady Mode before everyone else."
              : "Inscrivez-vous pour decouvrir les lancements exclusifs, les reassorts les plus attendus et l'univers raffine de Mady Mode avant tout le monde."}
          </p>
        </div>

        <form className="newsletter-form" onSubmit={handleNewsletterSubmit} noValidate>
          <label className="sr-only" htmlFor="newsletter-email">{isEnglish ? "Email address" : "Adresse e-mail"}</label>
          <input type="email" id="newsletter-email" name="newsletter-email" placeholder={isEnglish ? "Your email address" : "Votre adresse e-mail"} required />
          <button type="submit" className="button button-primary">{isEnglish ? "Subscribe" : "S'inscrire"}</button>
          <p className={`form-message${newsletterMessage.type ? ` ${newsletterMessage.type}` : ""}`} aria-live="polite">
            {newsletterMessage.text}
          </p>
        </form>
      </div>
    </section>
  );
}
