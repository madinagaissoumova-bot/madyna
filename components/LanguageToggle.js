"use client";

import { useStore } from "./StoreProvider";

export default function LanguageToggle() {
  const { language, setLanguage } = useStore();

  return (
    <div className="language-toggle" aria-label="Language switcher">
      <button
        className={`language-button${language === "fr" ? " is-active" : ""}`}
        type="button"
        onClick={() => setLanguage("fr")}
      >
        FR
      </button>
      <button
        className={`language-button${language === "en" ? " is-active" : ""}`}
        type="button"
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
