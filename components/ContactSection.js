"use client";

import { useState } from "react";
import { isValidEmail } from "../lib/validators";
import SectionHeading from "./SectionHeading";
import { useStore } from "./StoreProvider";

export default function ContactSection() {
  const { language, showToast } = useStore();
  const isEnglish = language === "en";
  const [contactMessage, setContactMessage] = useState({ text: "", type: "" });

  function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const entries = ["name", "email", "subject", "message"];
    const isValid = entries.every((field) => {
      const value = String(formData.get(field) || "").trim();
      return field === "email" ? isValidEmail(value) : Boolean(value);
    });

    if (!isValid) {
      setContactMessage({
        text: isEnglish
          ? "Please complete all form fields correctly."
          : "Merci de completer correctement tous les champs du formulaire.",
        type: "error"
      });
      return;
    }

    event.currentTarget.reset();
    setContactMessage({
      text: isEnglish
        ? "Your message has been sent. We will get back to you very soon."
        : "Votre message a bien ete envoye. Nous vous repondrons tres prochainement.",
      type: "success"
    });
    showToast(isEnglish ? "Message sent successfully." : "Message envoye avec succes.");
  }

  return (
    <section className="contact section">
      <div className="container contact-grid">
        <div className="contact-copy">
          <SectionHeading
            align="left"
            eyebrow={isEnglish ? "Contact" : "Contact"}
            title={isEnglish ? "Let’s talk about your next silhouette" : "Parlons de votre prochaine silhouette"}
            description={isEnglish ? "A question about size, fabric or an order? Write to us." : "Une question sur une taille, une matiere ou une commande ? Ecrivez-nous."}
          />
          <ul className="contact-details">
            <li>Studio Mady Mode, 24 rue des Ateliers, 75003 Paris</li>
            <li>contact@madymode.com</li>
            <li>+33 1 84 00 28 19</li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
          <div className="form-row">
            <div className="form-field"><label htmlFor="name">{isEnglish ? "Full name" : "Nom complet"}</label><input type="text" id="name" name="name" required /></div>
            <div className="form-field"><label htmlFor="email">{isEnglish ? "Email address" : "Adresse e-mail"}</label><input type="email" id="email" name="email" required /></div>
          </div>
          <div className="form-field"><label htmlFor="subject">{isEnglish ? "Subject" : "Sujet"}</label><input type="text" id="subject" name="subject" required /></div>
          <div className="form-field"><label htmlFor="message">{isEnglish ? "Message" : "Message"}</label><textarea id="message" name="message" rows="6" placeholder={isEnglish ? "Describe your request..." : "Decrivez votre demande..."} required></textarea></div>
          <button type="submit" className="button button-primary">{isEnglish ? "Send message" : "Envoyer le message"}</button>
          <p className={`form-message${contactMessage.type ? ` ${contactMessage.type}` : ""}`} aria-live="polite">
            {contactMessage.text}
          </p>
        </form>
      </div>
    </section>
  );
}
