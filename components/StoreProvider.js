"use client";

import { createContext, useContext, useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";

const CART_STORAGE_KEY = "mady-mode-cart";
const LANGUAGE_STORAGE_KEY = "mady-mode-language";
const ACCOUNT_STORAGE_KEY = "mady-mode-account";
const ACCOUNT_SESSION_STORAGE_KEY = "mady-mode-account-session";

const StoreContext = createContext(null);

function formatPriceForLanguage(value, language) {
  return new Intl.NumberFormat(language === "en" ? "en-GB" : "fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [language, setLanguage] = useState("fr");
  const [isHydrated, setIsHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [account, setAccount] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      setCart(stored ? JSON.parse(stored) : []);
      const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      setLanguage(storedLanguage === "en" ? "en" : "fr");
      const storedAccount = window.localStorage.getItem(ACCOUNT_STORAGE_KEY);
      const parsedAccount = storedAccount ? JSON.parse(storedAccount) : null;
      setAccount(parsedAccount);
      const storedSession = window.localStorage.getItem(ACCOUNT_SESSION_STORAGE_KEY);
      setCurrentUser(storedSession ? JSON.parse(storedSession) : parsedAccount);
    } catch {
      setCart([]);
      setLanguage("fr");
      setAccount(null);
      setCurrentUser(null);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (account) {
      window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(account));
    } else {
      window.localStorage.removeItem(ACCOUNT_STORAGE_KEY);
    }
  }, [account, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (currentUser) {
      window.localStorage.setItem(ACCOUNT_SESSION_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      window.localStorage.removeItem(ACCOUNT_SESSION_STORAGE_KEY);
    }
  }, [currentUser, isHydrated]);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  useEffect(() => {
    document.body.classList.toggle("cart-open", cartOpen);
    return () => document.body.classList.remove("cart-open");
  }, [cartOpen]);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formatPrice = (value) => formatPriceForLanguage(value, language);
  const whatsappHref = cart.length
    ? `https://wa.me/336184002819?text=${encodeURIComponent(
        [
          language === "en" ? "Hello Mady Mode," : "Bonjour Mady Mode,",
          language === "en"
            ? "I would like to order the following items:"
            : "je souhaite commander les articles suivants :",
          "",
          ...cart.map(
            (item) =>
              `- ${item.name} x${item.quantity} : ${formatPrice(item.price * item.quantity)}`
          ),
          "",
          `${language === "en" ? "Total" : "Total"} : ${formatPrice(totalPrice)}`
        ].join("\n")
      )}`
    : "#";

  const value = {
    cart,
    language,
    setLanguage,
    account,
    currentUser,
    totalPrice,
    totalQuantity,
    cartOpen,
    whatsappHref,
    formatPrice,
    toastMessage,
    showToast: setToastMessage,
    openCart() {
      setCartOpen(true);
    },
    closeCart() {
      setCartOpen(false);
    },
    createAccount(email, password) {
      const nextAccount = { email, password };
      setAccount(nextAccount);
      setCurrentUser({ email });
      return { ok: true };
    },
    signInAccount(email, password) {
      if (!account) {
        return { ok: false, reason: "no_account" };
      }

      if (account.email !== email || account.password !== password) {
        return { ok: false, reason: "invalid_credentials" };
      }

      setCurrentUser({ email });
      return { ok: true };
    },
    signOutAccount() {
      setCurrentUser(null);
    },
    addToCart(product) {
      setCart((currentCart) => {
        const existing = currentCart.find((item) => item.id === product.id);
        if (existing) {
          return currentCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }

        return [...currentCart, { ...product, quantity: 1 }];
      });
    },
    changeCartQuantity(productId, delta) {
      setCart((currentCart) =>
        currentCart
          .map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + delta } : item
          )
          .filter((item) => item.quantity > 0)
      );
    },
    removeFromCart(productId) {
      setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
    },
    clearCart() {
      setCart([]);
    }
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
      <CartDrawer />
      <div className={`toast${toastMessage ? " is-visible" : ""}`} aria-live="polite" aria-atomic="true">
        {toastMessage}
      </div>
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}
