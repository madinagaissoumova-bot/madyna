"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CART_STORAGE_KEY = "mady-mode-cart";

const StoreContext = createContext(null);

function formatPrice(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      setCart(stored ? JSON.parse(stored) : []);
    } catch {
      setCart([]);
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
    if (!toastMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const whatsappHref = cart.length
    ? `https://wa.me/336184002819?text=${encodeURIComponent(
        [
          "Bonjour Mady Mode,",
          "je souhaite commander les articles suivants :",
          "",
          ...cart.map(
            (item) =>
              `- ${item.name} x${item.quantity} : ${formatPrice(item.price * item.quantity)}`
          ),
          "",
          `Total : ${formatPrice(totalPrice)}`
        ].join("\n")
      )}`
    : "#";

  const value = {
    cart,
    totalPrice,
    totalQuantity,
    whatsappHref,
    formatPrice,
    toastMessage,
    showToast: setToastMessage,
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
