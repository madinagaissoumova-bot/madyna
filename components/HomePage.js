"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteNavbar from "./SiteNavbar";
import { getMainNavItems } from "../lib/siteContent";
import { heroSlides } from "../lib/store";
import { useStore } from "./StoreProvider";

export default function HomePage() {
  const { language } = useStore();
  const isEnglish = language === "en";
  const [heroIndex, setHeroIndex] = useState(0);
  const heroTitle = isEnglish
    ? "Abayas with a couture spirit, created for a refined and understated presence."
    : "L'élégance modeste";
  const heroDescription = isEnglish
    ? "Fluid silhouettes, beautiful fabrics and refined finishes imagined for a modern, elegant presence."
    : "Des silhouettes fluides, de belles matieres et des finitions raffinees, pensees pour une allure moderne et elegante.";

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <SiteNavbar sticky navItems={getMainNavItems(isEnglish)} />

      <main className="page-main home-main">
        <section className="hero section home-landing home-landing-desktop">
          <div className="container home-landing-grid">
            <div className="home-landing-visual">
              <div className="home-orb home-orb-large"></div>
              <div className="home-orb home-orb-small"></div>

              <div className="home-carousel-frame">
                <div className="home-carousel-shell">
                  {heroSlides.map((slide, index) => (
                    <div key={slide.src} className={`home-carousel-slide${index === heroIndex ? " is-active" : ""}`}>
                      <img src={slide.src} alt={isEnglish ? slide.altEn || slide.alt : slide.alt} />
                    </div>
                  ))}
                </div>

                <div className="home-carousel-controls">
                  <button
                    type="button"
                    className="hero-control"
                    aria-label={isEnglish ? "Previous image" : "Image precedente"}
                    onClick={() => setHeroIndex((heroIndex - 1 + heroSlides.length) % heroSlides.length)}
                  >
                    ‹
                  </button>
                  <div className="hero-dots" aria-label={isEnglish ? "Carousel navigation" : "Navigation du carrousel"}>
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.src}
                        className={`hero-dot${index === heroIndex ? " is-active" : ""}`}
                        type="button"
                        aria-label={isEnglish ? `Go to image ${index + 1}` : `Aller a l'image ${index + 1}`}
                        onClick={() => setHeroIndex(index)}
                      ></button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="hero-control"
                    aria-label={isEnglish ? "Next image" : "Image suivante"}
                    onClick={() => setHeroIndex((heroIndex + 1) % heroSlides.length)}
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            <div className="home-landing-shell">
              <div className="home-landing-content">
                <div className="home-landing-intro">
                  <p className="home-landing-note">
                    {isEnglish ? "House selection" : "Selection de la maison"}
                  </p>
                  <div className="home-landing-labels">
                    <p className="eyebrow">{isEnglish ? "Modest fashion house" : "Maison de mode modeste"}</p>
                    <p className="home-landing-kicker">{isEnglish ? "Studio capsule 2026" : "Capsule studio 2026"}</p>
                  </div>
                  <span className="home-landing-rule" aria-hidden="true"></span>
                </div>

                <h1 className="home-landing-title">
                  {heroTitle}
                </h1>

                <div className="home-landing-cta-block">
                  <div className="hero-actions home-landing-actions">
                    <Link href="/boutique" className="button button-primary">
                      {isEnglish ? "Discover the collection" : "Decouvrir la collection"}
                    </Link>
                  </div>
                  <p className="home-landing-meta">
                    {isEnglish ? "Beautiful fabrics. Careful finishes." : "Belles matieres. Finitions soignees."}
                  </p>
                  <div className="home-landing-signature" aria-label={isEnglish ? "Brand values" : "Valeurs de la maison"}>
                    <span>{isEnglish ? "Fluid drape" : "Tombe fluide"}</span>
                    <span>{isEnglish ? "Clean lines" : "Lignes sobres"}</span>
                    <span>{isEnglish ? "Refined allure" : "Allure raffinee"}</span>
                  </div>
                </div>

                <p className="home-landing-text">
                  {heroDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="hero section home-landing-mobile">
          <div className="container home-landing-mobile-shell">
            <div className="home-landing-mobile-copy">
              <p className="home-landing-mobile-note">
                {isEnglish ? "House selection" : "Selection de la maison"}
              </p>
              <p className="eyebrow">{isEnglish ? "Modest fashion house" : "Maison de mode modeste"}</p>
              <h1 className="home-landing-mobile-title">{heroTitle}</h1>
              <p className="home-landing-mobile-text">{heroDescription}</p>
              <Link href="/boutique" className="button button-primary home-landing-mobile-button">
                {isEnglish ? "Discover the collection" : "Decouvrir la collection"}
              </Link>
            </div>

            <div className="home-landing-mobile-visual">
              <div className="home-carousel-frame home-carousel-frame-mobile">
                <div className="home-carousel-shell">
                  {heroSlides.map((slide, index) => (
                    <div key={`mobile-${slide.src}`} className={`home-carousel-slide${index === heroIndex ? " is-active" : ""}`}>
                      <img src={slide.src} alt={isEnglish ? slide.altEn || slide.alt : slide.alt} />
                    </div>
                  ))}
                </div>

                <div className="home-carousel-controls home-carousel-controls-mobile">
                  <div className="hero-dots" aria-label={isEnglish ? "Carousel navigation" : "Navigation du carrousel"}>
                    {heroSlides.map((slide, index) => (
                      <button
                        key={`mobile-dot-${slide.src}`}
                        className={`hero-dot${index === heroIndex ? " is-active" : ""}`}
                        type="button"
                        aria-label={isEnglish ? `Go to image ${index + 1}` : `Aller a l'image ${index + 1}`}
                        onClick={() => setHeroIndex(index)}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
