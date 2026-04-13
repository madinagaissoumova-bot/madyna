"use client";

import { useState } from "react";
import { isValidEmail } from "../lib/validators";
import SectionHeading from "./SectionHeading";
import { useStore } from "./StoreProvider";

const CONTACT_STORAGE_KEY = "mady-mode-contact-form";
const EMPTY_CONTACT_FORM = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

function getStoredContactForm() {
  if (typeof window === "undefined") {
    return EMPTY_CONTACT_FORM;
  }

  const storedForm = window.localStorage.getItem(CONTACT_STORAGE_KEY);

  if (!storedForm) {
    return EMPTY_CONTACT_FORM;
  }

  try {
    const parsedForm = JSON.parse(storedForm);
    return {
      name: typeof parsedForm.name === "string" ? parsedForm.name : "",
      email: typeof parsedForm.email === "string" ? parsedForm.email : "",
      subject: typeof parsedForm.subject === "string" ? parsedForm.subject : "",
      message: typeof parsedForm.message === "string" ? parsedForm.message : ""
    };
  } catch {
    window.localStorage.removeItem(CONTACT_STORAGE_KEY);
    return EMPTY_CONTACT_FORM;
  }
}

export default function ContactSection() {
  const { language, showToast } = useStore();
  const isEnglish = language === "en";
  const [contactMessage, setContactMessage] = useState({ text: "", type: "" });
  const [formValues, setFormValues] = useState(getStoredContactForm);

  function handleFieldChange(event) {
    const { name, value } = event.target;

    setFormValues((currentValues) => {
      const nextValues = {
        ...currentValues,
        [name]: value
      };

      window.localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(nextValues));
      return nextValues;
    });
  }

  function handleContactSubmit(event) {
    event.preventDefault();
    const entries = ["name", "email", "subject", "message"];
    const isValid = entries.every((field) => {
      const value = String(formValues[field] || "").trim();
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

    setFormValues(EMPTY_CONTACT_FORM);
    window.localStorage.removeItem(CONTACT_STORAGE_KEY);
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
            <div className="form-field"><label htmlFor="name">{isEnglish ? "Full name" : "Nom complet"}</label><input type="text" id="name" name="name" value={formValues.name} onChange={handleFieldChange} required /></div>
            <div className="form-field"><label htmlFor="email">{isEnglish ? "Email address" : "Adresse e-mail"}</label><input type="email" id="email" name="email" value={formValues.email} onChange={handleFieldChange} required /></div>
          </div>
          <div className="form-field"><label htmlFor="subject">{isEnglish ? "Subject" : "Sujet"}</label><input type="text" id="subject" name="subject" value={formValues.subject} onChange={handleFieldChange} required /></div>
          <div className="form-field"><label htmlFor="message">{isEnglish ? "Message" : "Message"}</label><textarea id="message" name="message" rows="6" value={formValues.message} onChange={handleFieldChange} placeholder={isEnglish ? "Describe your request..." : "Decrivez votre demande..."} required></textarea></div>
          <button type="submit" className="button button-primary">{isEnglish ? "Send message" : "Envoyer le message"}</button>
          <p className={`form-message${contactMessage.type ? ` ${contactMessage.type}` : ""}`} aria-live="polite">
            {contactMessage.text}
          </p>
        </form>
      </div>
    </section>
  );
}
