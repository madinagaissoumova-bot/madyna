"use client";

import Link from "next/link";
import { getMainNavItems } from "../lib/siteContent";
import { useStore } from "./StoreProvider";

export default function SiteFooter() {
  const { language } = useStore();
  const isEnglish = language === "en";
  const navItems = getMainNavItems(isEnglish);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="logo footer-logo" aria-label="Mady Mode accueil">
            <span className="logo-mark">M</span>
            <span className="logo-text">
              <strong>Mady Mode</strong>
              <span>Mode modeste</span>
            </span>
          </Link>
          <p>
            {isEnglish
              ? "A modest fashion boutique imagined as a precious, feminine and contemporary wardrobe."
              : "Une boutique de vetements modestes pensee comme un vestiaire precieux, feminin et contemporain."}
          </p>
        </div>
        <div>
          <h3>{isEnglish ? "Navigation" : "Navigation"}</h3>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>{isEnglish ? "Information" : "Informations"}</h3>
          <ul>
            <li>{isEnglish ? "Delivery in France & Europe" : "Livraison France & Europe"}</li>
            <li>{isEnglish ? "Secure payment" : "Paiement securise"}</li>
            <li>{isEnglish ? "Returns within 14 days" : "Retours sous 14 jours"}</li>
            <li>{isEnglish ? "Customer service Monday to Saturday" : "Service client du lundi au samedi"}</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>{isEnglish ? "© 2026 Mady Mode - All rights reserved." : "© 2026 Mady Mode - Tous droits reserves."}</p>
      </div>
    </footer>
  );
}
