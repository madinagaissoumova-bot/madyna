"use client";

import SiteNavbar from "./SiteNavbar";
import { getMainNavItems } from "../lib/siteContent";
import { useStore } from "./StoreProvider";

export default function PageShell({ children, mainClassName = "page-main" }) {
  const { language } = useStore();
  const isEnglish = language === "en";

  return (
    <>
      <SiteNavbar sticky navItems={getMainNavItems(isEnglish)} />
      <main className={mainClassName}>{children}</main>
    </>
  );
}
