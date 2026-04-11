"use client";

import BoutiqueSection from "./BoutiqueSection";
import PageShell from "./PageShell";
import { useStore } from "./StoreProvider";

export default function BoutiquePage() {
  const { language } = useStore();
  const isEnglish = language === "en";

  return (
    <PageShell>
      <BoutiqueSection
        eyebrow={isEnglish ? "Boutique" : "Boutique"}
        heading={isEnglish ? "Explore the full collection" : "Explorez toute la collection"}
        description={
          isEnglish
            ? "Browse every available piece, compare prices and discover the silhouettes that suit you best."
            : "Parcourez toutes les pieces disponibles, comparez les prix et trouvez les silhouettes qui vous correspondent."
        }
        sectionId="boutique"
      />
    </PageShell>
  );
}
