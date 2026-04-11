"use client";

import Link from "next/link";
import { useStore } from "./StoreProvider";

export default function HeaderAccountButton() {
  const { language } = useStore();
  const isEnglish = language === "en";

  return (
    <Link href="/account" className="account-button">
      {isEnglish ? "Customer area" : "Espace cliente"}
    </Link>
  );
}
