"use client";

import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { useStore } from "./StoreProvider";

export default function AboutSection() {
  const { language } = useStore();
  const isEnglish = language === "en";

  return (
    <section className="about section">
      <div className="container about-grid">
        <div className="about-visual">
          <div className="about-frame">
            <img
              src="/products/abaya-nila-bleu-ciel/1.jpeg"
              alt={isEnglish ? "Abaya Nila Bleu Ciel worn in a soft elegant setting" : "Abaya Nila Bleu Ciel portee dans une ambiance douce et elegante"}
              className="about-image"
            />
            <p className="about-caption">Mady Mode</p>
          </div>
        </div>
        <div className="about-content">
          <SectionHeading
            align="left"
            eyebrow={isEnglish ? "About" : "A propos"}
            title={
              isEnglish
                ? "A modest fashion house imagined as a wardrobe of contemporary elegance"
                : "Une maison de mode modeste pensee comme un vestiaire d'elegance contemporaine"
            }
          />
          <p>
            {isEnglish
              ? "Mady Mode celebrates a refined vision of femininity where modesty meets elegance, softness and beautiful fabrics."
              : "Mady Mode celebre une vision raffinee de la feminite, ou la pudeur rencontre l'allure, la douceur et l'exigence des belles matieres."}
          </p>
          <p>
            {isEnglish
              ? "Our pieces are designed to offer a precious balance between absolute comfort, lasting quality and understated sophistication."
              : "Nos pieces sont concues pour offrir un equilibre precieux entre confort absolu, qualite durable et sophistication discrete."}
          </p>
          <Link href="/contact" className="button button-primary">
            {isEnglish ? "Get in touch" : "Prendre contact"}
          </Link>
        </div>
      </div>
    </section>
  );
}
