"use client";

import SectionHeading from "./SectionHeading";
import { useStore } from "./StoreProvider";

export default function BenefitsSection() {
  const { language } = useStore();
  const isEnglish = language === "en";

  return (
    <section className="benefits section">
      <div className="container benefits-grid">
        <SectionHeading
          align="left"
          eyebrow={isEnglish ? "Why choose us" : "Pourquoi nous choisir"}
          title={
            isEnglish
              ? "The care of a house that values elegance and comfort"
              : "Le soin d'une maison qui valorise l'allure et le confort"
          }
          description={
            isEnglish
              ? "Every detail has been designed to offer a serene experience, from fabric selection to order delivery."
              : "Chaque detail a ete pense pour offrir une experience sereine, du choix des matieres jusqu'a la reception de votre commande."
          }
        />

        <div className="benefits-list">
          <article className="benefit-card"><h3>{isEnglish ? "Selected fabrics" : "Matieres choisies"}</h3><p>{isEnglish ? "Elegant drape fabrics, comfortable to wear and pleasant all day long." : "Des tissus au tombe elegant, confortables a porter et agreables toute la journee."}</p></article>
          <article className="benefit-card"><h3>{isEnglish ? "Careful finishes" : "Finitions soignees"}</h3><p>{isEnglish ? "Clean seams, refined palettes and harmonious cuts for an impeccable look." : "Coutures nettes, palettes raffinees et coupes harmonieuses pour une allure irreprochable."}</p></article>
          <article className="benefit-card"><h3>{isEnglish ? "Personal advice" : "Conseil personalise"}</h3><p>{isEnglish ? "A team available to guide you according to your style, size and preferences." : "Une equipe disponible pour vous guider selon votre style, votre taille et vos envies."}</p></article>
          <article className="benefit-card"><h3>{isEnglish ? "Careful shipping" : "Expedition soignee"}</h3><p>{isEnglish ? "Your pieces are prepared with care in a refined and elegant package." : "Vos pieces sont preparees avec attention dans un ecrin sobre et elegant."}</p></article>
        </div>
      </div>
    </section>
  );
}
