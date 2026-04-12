"use client";

import Link from "next/link";
import { useStore } from "./StoreProvider";

export default function HeaderAccountButton() {
  const { language } = useStore();
  const isEnglish = language === "en";

  return (
    <Link href="/account" className="account-button" aria-label={isEnglish ? "Customer area" : "Espace cliente"}>
      <span className="header-button-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
        </svg>
      </span>
      <span className="header-button-text">{isEnglish ? "Customer area" : "Espace cliente"}</span>
    </Link>
  );
}
