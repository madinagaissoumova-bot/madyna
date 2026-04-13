"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMainNavItems } from "../lib/siteContent";
import { isValidEmail } from "../lib/validators";
import SiteNavbar from "./SiteNavbar";
import { useStore } from "./StoreProvider";

const ACCOUNT_FORM_STORAGE_KEY = "mady-mode-account-form";

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [accountMode, setAccountMode] = useState("signin");
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const { showToast, language, account, currentUser, createAccount, signInAccount } = useStore();
  const isEnglish = language === "en";

  useEffect(() => {
    try {
      const storedDraft = window.localStorage.getItem(ACCOUNT_FORM_STORAGE_KEY);
      if (storedDraft) {
        const parsedDraft = JSON.parse(storedDraft);
        setFormValues({
          email: parsedDraft.email || "",
          password: parsedDraft.password || ""
        });
        return;
      }
    } catch {}

    setFormValues({
      email: currentUser?.email || account?.email || "",
      password: account?.password || ""
    });
  }, [account, currentUser]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ACCOUNT_FORM_STORAGE_KEY, JSON.stringify(formValues));
    } catch {}
  }, [formValues]);

  function handleSubmit(event) {
    event.preventDefault();
    const email = formValues.email.trim();
    const password = formValues.password.trim();

    if (!isValidEmail(email) || !password) {
      setMessage({
        text: isEnglish
          ? "Please enter a valid email and your password."
          : "Merci de renseigner un e-mail valide et votre mot de passe.",
        type: "error"
      });
      return;
    }

    if (accountMode === "create") {
      createAccount(email, password);
      setMessage({
        text: isEnglish
          ? "Your account has been created locally on this device."
          : "Votre compte a ete cree localement sur cet appareil.",
        type: "success"
      });
      showToast(isEnglish ? "Account created." : "Compte cree.");

      if (redirect === "checkout") {
        router.push("/confirmation");
      }
      return;
    }

    const signInResult = signInAccount(email, password);

    if (!signInResult.ok) {
      setMessage({
        text: signInResult.reason === "no_account"
          ? isEnglish
            ? "No local account found yet. Create one first."
            : "Aucun compte local trouve pour le moment. Creez-en un d'abord."
          : isEnglish
            ? "Incorrect email or password."
            : "E-mail ou mot de passe incorrect.",
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
        ? "Sign-in confirmed. Your local account is available on this device."
        : "Connexion validee. Votre compte local est disponible sur cet appareil.",
      type: "success"
    });
    showToast(
      isEnglish
        ? "Sign-in successful."
        : "Connexion cliente reussie."
    );
  }

  return (
    <div className="account-page-body">
      <SiteNavbar
        sticky
        navItems={getMainNavItems(isEnglish)}
      />

      <main className="account-main">
        <section className="auth-section account-section">
          <div className="container auth-shell">
            <div className="auth-copy">
              <p className="eyebrow">{isEnglish ? "Customer area" : "Espace cliente"}</p>
              <h1>
                {redirect === "checkout"
                  ? isEnglish
                    ? "Sign in or create an account"
                    : "Connectez-vous ou creez un compte"
                  : isEnglish
                    ? "Sign in to continue your order"
                    : "Connectez-vous pour poursuivre votre commande"}
              </h1>
              <p>
                {redirect === "checkout"
                  ? isEnglish
                    ? "Choose the option that suits you best to validate your cart and continue your order."
                    : "Choisissez l'option qui vous convient pour valider votre panier et poursuivre votre commande."
                  : isEnglish
                    ? "Find your Mady Mode selection, complete your request and get in touch with the boutique more easily."
                    : "Retrouvez votre selection Mady Mode, finalisez votre demande et echangez plus facilement avec la boutique."}
              </p>
            </div>

            <div className="auth-card">
              <p className="auth-context">
                {redirect === "checkout"
                  ? isEnglish
                    ? "Choose to sign in or create an account to complete your order."
                    : "Choisissez de vous connecter ou de creer un compte pour finaliser votre commande."
                  : isEnglish
                    ? "Sign in to your account to continue."
                    : "Connectez-vous a votre compte pour continuer."}
              </p>
              {account ? (
                <p className="auth-context auth-saved-account">
                  {isEnglish
                    ? `Local account found: ${account.email}`
                    : `Compte local detecte : ${account.email}`}
                </p>
              ) : null}
              <div className="auth-mode-switch" role="tablist" aria-label={isEnglish ? "Account options" : "Options de compte"}>
                <button
                  type="button"
                  className={`auth-mode-button${accountMode === "signin" ? " is-active" : ""}`}
                  onClick={() => setAccountMode("signin")}
                >
                  {isEnglish ? "Sign in" : "Se connecter"}
                </button>
              </div>
              <form className="account-form auth-page-form" onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                  <label htmlFor="account-email">{isEnglish ? "Email address" : "Adresse e-mail"}</label>
                  <input
                    type="email"
                    id="account-email"
                    name="account-email"
                    value={formValues.email}
                    onChange={(event) =>
                      setFormValues((currentValues) => ({
                        ...currentValues,
                        email: event.target.value
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="account-password">{isEnglish ? "Password" : "Mot de passe"}</label>
                  <input
                    type="password"
                    id="account-password"
                    name="account-password"
                    value={formValues.password}
                    onChange={(event) =>
                      setFormValues((currentValues) => ({
                        ...currentValues,
                        password: event.target.value
                      }))
                    }
                    required
                  />
                </div>
                <button className="button button-primary" type="submit">
                  {accountMode === "create"
                    ? isEnglish
                      ? "Create my account"
                      : "Creer mon compte"
                    : isEnglish
                      ? "Sign in"
                      : "Se connecter"}
                </button>
                <p className={`form-message${message.type ? ` ${message.type}` : ""}`} aria-live="polite">
                  {message.text}
                </p>
              </form>
              <div className="auth-footer-note">
                <button
                  type="button"
                  className="account-create-button"
                  onClick={() => setAccountMode(accountMode === "create" ? "signin" : "create")}
                >
                  {accountMode === "create"
                    ? isEnglish
                      ? "Already have an account? Sign in"
                      : "Vous avez deja un compte ? Se connecter"
                    : isEnglish
                      ? "No account yet? Create one"
                      : "Pas encore de compte ? Creer un compte"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
