"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageToggle from "./LanguageToggle";
import HeaderCommerceActions from "./HeaderCommerceActions";

export default function SiteNavbar({
  navItems = [],
  actions = null,
  mobileOpen,
  onMobileOpenChange,
  sticky = false
}) {
  const isControlled = typeof mobileOpen === "boolean" && typeof onMobileOpenChange === "function";
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const currentMobileOpen = isControlled ? mobileOpen : internalMobileOpen;

  function setMenuOpen(value) {
    if (isControlled) {
      onMobileOpenChange(value);
      return;
    }

    setInternalMobileOpen(value);
  }

  useEffect(() => {
    if (!currentMobileOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [currentMobileOpen]);

  return (
    <header className={`site-header${sticky ? " auth-header" : ""}`} id="top">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label="Mady Mode accueil" onClick={() => setMenuOpen(false)}>
          <span className="logo-text">
            <span className="logo-overline">Maison</span>
            <strong>Mady Mode</strong>
            <span>Mode modeste</span>
          </span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={currentMobileOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen(!currentMobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`site-nav${currentMobileOpen ? " is-open" : ""}`} id="site-nav" aria-label="Navigation principale">
          <ul>
            {navItems.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link
                  href={item.href}
                  onClick={(event) => {
                    item.onClick?.(event);
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <LanguageToggle />
          <HeaderCommerceActions />
          {actions}
        </div>
      </div>
    </header>
  );
}
