"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageToggle from "./LanguageToggle";
import { heroSlides, products } from "../lib/store";
import { useStore } from "./StoreProvider";

const testimonials = [
  {
    quote:
      "Des que je l'ai portee, j'ai senti la difference. La coupe est sublime, le tombe est magnifique et l'allure est immediatement tres chic.",
    quoteEn:
      "As soon as I wore it, I felt the difference. The cut is stunning, the drape is beautiful and the look feels instantly chic.",
    name: "Samira B.",
    city: "Paris"
  },
  {
    quote:
      "On sent un vrai travail de maison de mode. Les finitions sont delicates, les couleurs sont raffinees et chaque piece inspire l'elegance.",
    quoteEn:
      "You can feel true fashion-house craftsmanship. The finishes are delicate, the colors refined and every piece inspires elegance.",
    name: "Amina K.",
    city: "Lyon"
  },
  {
    quote:
      "Tout est soigne, du vetement jusqu'a la presentation. L'experience est elegante du debut a la fin, et la qualite est vraiment au rendez-vous.",
    quoteEn:
      "Everything is carefully done, from the garment to the presentation. The whole experience feels elegant from start to finish, and the quality is truly there.",
    name: "Maryam D.",
    city: "Bruxelles"
  }
];

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function HomePage() {
  const {
    cart,
    totalPrice,
    totalQuantity,
    whatsappHref,
    formatPrice,
    addToCart,
    changeCartQuantity,
    removeFromCart,
    clearCart,
    showToast,
    language
  } = useStore();
  const isEnglish = language === "en";
  const navItems = [
    ["accueil", isEnglish ? "Home" : "Accueil"],
    ["categories", isEnglish ? "Collections" : "Collections"],
    ["produits", isEnglish ? "Featured Pieces" : "Pieces phares"],
    ["a-propos", isEnglish ? "About" : "Maison"],
    ["avis", isEnglish ? "Reviews" : "Avis"],
    ["contact", isEnglish ? "Contact" : "Contact"]
  ];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [accountMessage, setAccountMessage] = useState({ text: "", type: "" });
  const [newsletterMessage, setNewsletterMessage] = useState({ text: "", type: "" });
  const [contactMessage, setContactMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroIndex((currentIndex) => (currentIndex + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    document.body.classList.toggle("account-open", accountOpen);
    document.body.classList.toggle("cart-open", cartOpen);

    return () => {
      document.body.classList.remove("menu-open", "account-open", "cart-open");
    };
  }, [mobileOpen, accountOpen, cartOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setAccountOpen(false);
        setCartOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function scrollToSection(event, id) {
    const targetSection = document.getElementById(id);
    if (!targetSection) {
      return;
    }

    event.preventDefault();
    const header = document.querySelector(".site-header");
    const headerOffset = header ? header.offsetHeight - 1 : 0;
    const top = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });
    setMobileOpen(false);
  }

  function handleAddToCart(product) {
    addToCart(product);
    setAccountOpen(false);
    setCartOpen(true);
    showToast(isEnglish ? `${product.name} has been added to your cart.` : `${product.name} a ete ajoute au panier.`);
  }

  function handleAccountSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("account-email") || "").trim();
    const password = String(formData.get("account-password") || "").trim();

    if (!isValidEmail(email) || !password) {
      setAccountMessage({
        text: isEnglish
          ? "Please enter a valid email and your password."
          : "Merci de renseigner un e-mail valide et votre mot de passe.",
        type: "error"
      });
      return;
    }

    setAccountMessage({
      text: isEnglish
        ? "Demo sign-in confirmed. Your customer area will be available soon."
        : "Connexion de demonstration validee. Votre espace cliente sera bientot disponible.",
      type: "success"
    });
    showToast(isEnglish ? "Demo sign-in successful." : "Connexion cliente simulee avec succes.");
  }

  function handleNewsletterSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("newsletter-email") || "").trim();

    if (!email) {
      setNewsletterMessage({
        text: isEnglish ? "Please enter your email address." : "Veuillez renseigner votre adresse e-mail.",
        type: "error"
      });
      return;
    }

    if (!isValidEmail(email)) {
      setNewsletterMessage({
        text: isEnglish ? "Please enter a valid email address." : "Veuillez entrer une adresse e-mail valide.",
        type: "error"
      });
      return;
    }

    event.currentTarget.reset();
    setNewsletterMessage({
      text: isEnglish
        ? "Thank you, your newsletter subscription has been confirmed."
        : "Merci, votre inscription a la newsletter a bien ete prise en compte.",
      type: "success"
    });
    showToast(isEnglish ? "Newsletter subscription confirmed." : "Inscription newsletter confirmee.");
  }

  function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const entries = ["name", "email", "subject", "message"];
    const isValid = entries.every((field) => {
      const value = String(formData.get(field) || "").trim();
      return field === "email" ? isValidEmail(value) : Boolean(value);
    });

    if (!isValid) {
      setContactMessage({
        text: isEnglish
          ? "Please complete all form fields correctly."
          : "Merci de completer correctement tous les champs du formulaire.",
        type: "error"
      });
      return;
    }

    event.currentTarget.reset();
    setContactMessage({
      text: isEnglish
        ? "Your message has been sent. We will get back to you very soon."
        : "Votre message a bien ete envoye. Nous vous repondrons tres prochainement.",
      type: "success"
    });
    showToast(isEnglish ? "Message sent successfully." : "Message envoye avec succes.");
  }

  return (
    <>
      <header className="site-header" id="top">
        <div className="container header-inner">
          <a href="#accueil" className="logo" aria-label="Mady Mode accueil" onClick={(event) => scrollToSection(event, "accueil")}>
            <span className="logo-mark">M</span>
            <span className="logo-text">
              <strong>Mady Mode</strong>
              <span>Mode modeste</span>
            </span>
          </a>

          <button
            className="nav-toggle"
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
            aria-controls="site-nav"
            onClick={() => setMobileOpen((current) => !current)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`site-nav${mobileOpen ? " is-open" : ""}`} id="site-nav" aria-label="Navigation principale">
            <ul>
              {navItems.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(event) => scrollToSection(event, id)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <LanguageToggle />
            <button
              className="account-button"
              type="button"
              aria-label="Ouvrir l'espace client"
              aria-controls="account-panel"
              aria-expanded={accountOpen}
              onClick={() => {
                setCartOpen(false);
                setAccountOpen(true);
              }}
            >
              {isEnglish ? "Sign in" : "Connexion"}
            </button>
            <button
              className="cart-button"
              type="button"
              aria-label="Ouvrir le panier"
              aria-controls="cart-panel"
              aria-expanded={cartOpen}
              onClick={() => {
                setAccountOpen(false);
                setCartOpen((current) => !current);
              }}
            >
              <span className="cart-button-label">{isEnglish ? "Cart" : "Panier"}</span>
              <span className="cart-count">{totalQuantity}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero section" id="accueil">
          <div className="container hero-grid">
            <div className="hero-content">
              <p className="eyebrow">{isEnglish ? "Modest fashion house" : "Maison de mode modeste"}</p>
              <p className="hero-kicker">{isEnglish ? "Studio capsule 2026" : "Capsule studio 2026"}</p>
              <h1>{isEnglish ? "Refined modestwear designed as a true style signature." : "Le raffinement modeste pense comme une signature de style."}</h1>
              <p className="hero-text">
                {isEnglish
                  ? "Mady Mode imagines abayas and veiled silhouettes with couture spirit, blending soft tones, fluid lines and contemporary elegance inspired by the most beautiful addresses in Dubai."
                  : "Mady Mode imagine des abayas et silhouettes voilees a l'allure couture, entre douceur poudree, lignes fluides et elegance contemporaine inspiree des plus belles adresses de Dubai."}
              </p>
              <div className="hero-actions">
                <a href="#produits" className="button button-primary" onClick={(event) => scrollToSection(event, "produits")}>
                  {isEnglish ? "Discover the collection" : "Decouvrir la collection"}
                </a>
                <a
                  href="https://wa.me/336184002819?text=Bonjour%20Mady%20Mode%2C%20je%20souhaite%20obtenir%20des%20informations%20sur%20vos%20articles."
                  className="button button-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  {isEnglish ? "Chat on WhatsApp" : "Ecrire sur WhatsApp"}
                </a>
              </div>
              <ul className="hero-highlights">
                <li>
                  <strong>{isEnglish ? "Exclusive capsules" : "Capsules exclusives"}</strong>
                  <span>{isEnglish ? "Small-series editions." : "Editions pensees en petite serie."}</span>
                </li>
                <li>
                  <strong>{isEnglish ? "Couture finishes" : "Finitions couture"}</strong>
                  <span>{isEnglish ? "Delicate details and fluid lines." : "Details delicats et lignes fluides."}</span>
                </li>
                <li>
                  <strong>{isEnglish ? "Free delivery" : "Livraison offerte"}</strong>
                  <span>{isEnglish ? "From 120 EUR in France." : "Des 120 EUR d'achat en France."}</span>
                </li>
              </ul>
            </div>

            <div className="hero-visual">
              <div className="hero-carousel">
                <div className="hero-slides">
                  {heroSlides.map((slide, index) => (
                    <div key={slide.src} className={`hero-slide${index === heroIndex ? " is-active" : ""}`}>
                      <img src={slide.src} alt={isEnglish ? slide.altEn || slide.alt : slide.alt} />
                    </div>
                  ))}
                </div>
                <div className="hero-carousel-controls">
                  <button className="hero-control hero-control-prev" type="button" aria-label={isEnglish ? "Previous image" : "Image precedente"} onClick={() => setHeroIndex((heroIndex - 1 + heroSlides.length) % heroSlides.length)}>
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
                  <button className="hero-control hero-control-next" type="button" aria-label={isEnglish ? "Next image" : "Image suivante"} onClick={() => setHeroIndex((heroIndex + 1) % heroSlides.length)}>
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="categories section" id="categories">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{isEnglish ? "Collections" : "Collections"}</p>
              <h2>{isEnglish ? "Lines designed for every moment of life" : "Des lignes pensees pour chaque moment de vie"}</h2>
              <p>
                {isEnglish
                  ? "A complete wardrobe shaped by clean essentials and signature pieces for the most precious occasions."
                  : "Une garde-robe complete, entre essentiels epures et pieces signature pour les occasions les plus precieuses."}
              </p>
            </div>

            <div className="categories-grid">
              <article className="category-card">
                <span className="category-index">01</span>
                <span className="category-tag">{isEnglish ? "Everyday elegance" : "Elegance quotidienne"}</span>
                <h3>{isEnglish ? "Contemporary abayas" : "Abayas contemporaines"}</h3>
                <p>{isEnglish ? "Long, airy cuts for busy days with style and ease." : "Des coupes longues et aeriennes pour des journees rythmees avec style et aisance."}</p>
              </article>
              <article className="category-card">
                <span className="category-index">02</span>
                <span className="category-tag">{isEnglish ? "House signature" : "Signature maison"}</span>
                <h3>{isEnglish ? "Matching sets" : "Ensembles coordonnes"}</h3>
                <p>{isEnglish ? "Harmonious silhouettes to wear together or separately, always polished." : "Des silhouettes harmonieuses a porter ensemble ou separement, toujours impeccables."}</p>
              </article>
              <article className="category-card">
                <span className="category-index">03</span>
                <span className="category-tag">{isEnglish ? "Delicate finishes" : "Finitions delicates"}</span>
                <h3>{isEnglish ? "Premium hijabs" : "Hijabs premium"}</h3>
                <p>{isEnglish ? "Chiffon, premium jersey and satin textures in a soft timeless palette." : "Mousseline, jersey luxe et textures satinees dans une palette douce et intemporelle."}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="products section" id="produits">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{isEnglish ? "Featured pieces" : "Pieces phares"}</p>
              <h2>{isEnglish ? "Current selection" : "La selection du moment"}</h2>
              <p>
                {isEnglish
                  ? "We add products progressively. Find the pieces currently available here."
                  : "Nous ajoutons les produits au fur et a mesure. Retrouvez ici les pieces actuellement disponibles."}
              </p>
            </div>

            <div className="products-grid">
              {products.map((product) => (
                <article className="product-card" key={product.id}>
                  <Link href={`/produit/${product.id}`} className="product-card-link" aria-label={`Voir la fiche de ${product.name}`}>
                    <div
                      className={`product-visual ${product.images?.length ? "" : product.visualClass}`.trim()}
                      style={
                        product.images?.length
                          ? {
                              backgroundImage: `url("${product.cardImageSrc || product.images[0].src}")`
                            }
                          : undefined
                      }
                    ></div>
                  </Link>
                  <div className="product-body">
                    <div className="product-head">
                      <p className="product-category">{isEnglish ? product.categoryEn || product.category : product.category}</p>
                      <span className="product-badge">{isEnglish ? "Available" : "Disponible"}</span>
                    </div>
                    <h3>
                      <Link href={`/produit/${product.id}`} className="product-title-link">
                        {product.name}
                      </Link>
                    </h3>
                    <p>{isEnglish ? product.descriptionEn || product.description : product.description}</p>
                    <div className="product-footer">
                      <div className="product-price-block">
                        <strong>{formatPrice(product.price)}</strong>
                        <span>{isEnglish ? "Size guidance on request" : "Conseil taille sur demande"}</span>
                      </div>
                      <div className="product-card-actions">
                        <Link href={`/produit/${product.id}`} className="button button-secondary product-detail-link">
                          {isEnglish ? "View product" : "Voir le produit"}
                        </Link>
                        <button className="add-to-cart" type="button" onClick={() => handleAddToCart(product)}>
                          {isEnglish ? "Add" : "Ajouter"}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="benefits section">
          <div className="container benefits-grid">
            <div className="section-heading align-left">
              <p className="eyebrow">{isEnglish ? "Why choose us" : "Pourquoi nous choisir"}</p>
              <h2>{isEnglish ? "The care of a house that values elegance and comfort" : "Le soin d'une maison qui valorise l'allure et le confort"}</h2>
              <p>
                {isEnglish
                  ? "Every detail has been designed to offer a serene experience, from fabric selection to order delivery."
                  : "Chaque detail a ete pense pour offrir une experience sereine, du choix des matieres jusqu'a la reception de votre commande."}
              </p>
            </div>

            <div className="benefits-list">
              <article className="benefit-card"><h3>{isEnglish ? "Selected fabrics" : "Matieres choisies"}</h3><p>{isEnglish ? "Elegant drape fabrics, comfortable to wear and pleasant all day long." : "Des tissus au tombe elegant, confortables a porter et agreables toute la journee."}</p></article>
              <article className="benefit-card"><h3>{isEnglish ? "Careful finishes" : "Finitions soignees"}</h3><p>{isEnglish ? "Clean seams, refined palettes and harmonious cuts for an impeccable look." : "Coutures nettes, palettes raffinees et coupes harmonieuses pour une allure irreprochable."}</p></article>
              <article className="benefit-card"><h3>{isEnglish ? "Personal advice" : "Conseil personalise"}</h3><p>{isEnglish ? "A team available to guide you according to your style, size and preferences." : "Une equipe disponible pour vous guider selon votre style, votre taille et vos envies."}</p></article>
              <article className="benefit-card"><h3>{isEnglish ? "Careful shipping" : "Expedition delicate"}</h3><p>{isEnglish ? "Your pieces are prepared with care in a refined and elegant package." : "Vos pieces sont preparees avec attention dans un ecrin sobre et elegant."}</p></article>
            </div>
          </div>
        </section>

        <section className="about section" id="a-propos">
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
              <p className="eyebrow">{isEnglish ? "About" : "A propos"}</p>
              <h2>{isEnglish ? "A modest fashion house imagined as a wardrobe of contemporary elegance" : "Une maison de mode modeste pensee comme un vestiaire d'elegance contemporaine"}</h2>
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
              <a href="#contact" className="button button-primary" onClick={(event) => scrollToSection(event, "contact")}>
                {isEnglish ? "Get in touch" : "Prendre contact"}
              </a>
            </div>
          </div>
        </section>

        <section className="testimonials section" id="avis">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{isEnglish ? "Customer reviews" : "Avis clientes"}</p>
              <h2>{isEnglish ? "What our customers feel when discovering the Mady Mode universe" : "Ce que nos clientes ressentent en decouvrant l'univers Mady Mode"}</h2>
              <p>
                {isEnglish
                  ? "Sincere words about the quality of the cuts, the beauty of the fabrics and that rare feeling of being elegant, confident and fully yourself."
                  : "Des mots sinceres sur la qualite des coupes, la noblesse des matieres et cette sensation rare de se sentir a la fois elegante, confiante et pleinement soi-meme."}
              </p>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.name}>
                  <p>"{isEnglish ? testimonial.quoteEn || testimonial.quote : testimonial.quote}"</p>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.city}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="newsletter section" id="newsletter">
          <div className="container newsletter-card">
            <div>
              <p className="eyebrow">{isEnglish ? "Newsletter" : "Newsletter"}</p>
              <h2>{isEnglish ? "Receive our capsules, new arrivals and inspirations first" : "Recevez en avant-premiere nos capsules, nouveautes et inspirations"}</h2>
              <p>
                {isEnglish
                  ? "Subscribe to discover exclusive launches, the most awaited restocks and the refined world of Mady Mode before everyone else."
                  : "Inscrivez-vous pour decouvrir les lancements exclusifs, les reassorts les plus attendus et l'univers raffine de Mady Mode avant tout le monde."}
              </p>
            </div>

            <form className="newsletter-form" onSubmit={handleNewsletterSubmit} noValidate>
              <label className="sr-only" htmlFor="newsletter-email">{isEnglish ? "Email address" : "Adresse e-mail"}</label>
              <input type="email" id="newsletter-email" name="newsletter-email" placeholder={isEnglish ? "Your email address" : "Votre adresse e-mail"} required />
              <button type="submit" className="button button-primary">{isEnglish ? "Subscribe" : "S'inscrire"}</button>
              <p className={`form-message${newsletterMessage.type ? ` ${newsletterMessage.type}` : ""}`} aria-live="polite">
                {newsletterMessage.text}
              </p>
            </form>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">{isEnglish ? "Contact" : "Contact"}</p>
              <h2>{isEnglish ? "Let’s talk about your next silhouette" : "Parlons de votre prochaine silhouette"}</h2>
              <p>{isEnglish ? "A question about size, fabric or an order? Write to us." : "Une question sur une taille, une matiere ou une commande ? Ecrivez-nous."}</p>
              <ul className="contact-details">
                <li>Studio Mady Mode, 24 rue des Ateliers, 75003 Paris</li>
                <li>contact@madymode.com</li>
                <li>+33 1 84 00 28 19</li>
              </ul>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="form-row">
                <div className="form-field"><label htmlFor="name">{isEnglish ? "Full name" : "Nom complet"}</label><input type="text" id="name" name="name" required /></div>
                <div className="form-field"><label htmlFor="email">{isEnglish ? "Email address" : "Adresse e-mail"}</label><input type="email" id="email" name="email" required /></div>
              </div>
              <div className="form-field"><label htmlFor="subject">{isEnglish ? "Subject" : "Sujet"}</label><input type="text" id="subject" name="subject" required /></div>
              <div className="form-field"><label htmlFor="message">{isEnglish ? "Message" : "Message"}</label><textarea id="message" name="message" rows="6" placeholder={isEnglish ? "Describe your request..." : "Decrivez votre demande..."} required></textarea></div>
              <button type="submit" className="button button-primary">{isEnglish ? "Send message" : "Envoyer le message"}</button>
              <p className={`form-message${contactMessage.type ? ` ${contactMessage.type}` : ""}`} aria-live="polite">
                {contactMessage.text}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a href="#accueil" className="logo footer-logo" onClick={(event) => scrollToSection(event, "accueil")}>
              <span className="logo-mark">M</span>
              <span className="logo-text"><strong>Mady Mode</strong><span>Mode modeste</span></span>
            </a>
            <p>{isEnglish ? "A modest fashion boutique imagined as a precious, feminine and contemporary wardrobe." : "Une boutique de vetements modestes pensee comme un vestiaire precieux, feminin et contemporain."}</p>
          </div>
          <div>
            <h3>{isEnglish ? "Navigation" : "Navigation"}</h3>
            <ul>
              <li><a href="#categories" onClick={(event) => scrollToSection(event, "categories")}>{isEnglish ? "Collections" : "Collections"}</a></li>
              <li><a href="#produits" onClick={(event) => scrollToSection(event, "produits")}>{isEnglish ? "Products" : "Produits"}</a></li>
              <li><a href="#a-propos" onClick={(event) => scrollToSection(event, "a-propos")}>{isEnglish ? "About" : "A propos"}</a></li>
              <li><a href="#contact" onClick={(event) => scrollToSection(event, "contact")}>Contact</a></li>
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
        <div className="container footer-bottom"><p>{isEnglish ? "© 2026 Mady Mode - All rights reserved." : "© 2026 Mady Mode - Tous droits reserves."}</p></div>
      </footer>

      <div className={`account-overlay${accountOpen ? " is-visible" : ""}`} hidden={!accountOpen} onClick={() => setAccountOpen(false)}></div>
      <section className={`account-panel${accountOpen ? " is-open" : ""}`} id="account-panel" aria-hidden={!accountOpen} aria-labelledby="account-title">
        <button className="account-panel-close" type="button" aria-label={isEnglish ? "Close customer area" : "Fermer l'espace client"} onClick={() => setAccountOpen(false)}>×</button>
        <p className="account-panel-eyebrow">Mady Mode</p>
        <h2 id="account-title">{isEnglish ? "Customer area" : "Espace cliente"}</h2>
        <p className="account-panel-text">
          {isEnglish
            ? "Sign in to find your selections, track your orders and access your Mady Mode universe."
            : "Connectez-vous pour retrouver vos selections, suivre vos commandes et acceder a votre univers Mady Mode."}
        </p>
        <form className="account-form" onSubmit={handleAccountSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="account-email">{isEnglish ? "Email address" : "Adresse e-mail"}</label>
            <input type="email" id="account-email" name="account-email" required />
          </div>
          <div className="form-field">
            <label htmlFor="account-password">{isEnglish ? "Password" : "Mot de passe"}</label>
            <input type="password" id="account-password" name="account-password" required />
          </div>
          <button className="button button-primary" type="submit">{isEnglish ? "Sign in" : "Se connecter"}</button>
          <p className={`form-message${accountMessage.type ? ` ${accountMessage.type}` : ""}`} aria-live="polite">
            {accountMessage.text}
          </p>
        </form>
        <div className="account-panel-footer">
          <p>{isEnglish ? "No account yet?" : "Vous n'avez pas encore de compte ?"}</p>
          <button
            className="account-create-button"
            type="button"
            onClick={() =>
              setAccountMessage({
                text: isEnglish
                  ? "Account creation will be available soon. Contact us for priority support."
                  : "Creation de compte bientot disponible. Ecrivez-nous pour etre accompagnee en priorite.",
                type: "success"
              })
            }
          >
            {isEnglish ? "Create account" : "Creer un compte"}
          </button>
        </div>
      </section>

      <div className={`cart-overlay${cartOpen ? " is-visible" : ""}`} hidden={!cartOpen} onClick={() => setCartOpen(false)}></div>
      <aside className={`cart-panel${cartOpen ? " is-open" : ""}`} id="cart-panel" aria-hidden={!cartOpen} aria-labelledby="cart-title">
        <div className="cart-panel-header">
          <div>
            <p className="cart-panel-eyebrow">Mady Mode</p>
            <h2 id="cart-title">{isEnglish ? "Your cart" : "Votre panier"}</h2>
          </div>
          <button className="cart-close" type="button" aria-label={isEnglish ? "Close cart" : "Fermer le panier"} onClick={() => setCartOpen(false)}>×</button>
        </div>
        <div className="cart-panel-body">
          {!cart.length ? (
            <p className="cart-empty">{isEnglish ? "Your cart is empty for now." : "Votre panier est vide pour le moment."}</p>
          ) : (
            <ul className="cart-items">
              {cart.map((item) => (
                <li className="cart-item" key={item.id}>
                  <div
                    className={`cart-item-media product-visual ${item.images?.length ? "" : item.visualClass}`.trim()}
                    style={
                      item.images?.length
                        ? { backgroundImage: `url("${item.images[0].src}")` }
                        : undefined
                    }
                  ></div>
                  <div className="cart-item-copy">
                    <h3>{item.name}</h3>
                    <p>{isEnglish ? item.categoryEn || item.category : item.category} • {formatPrice(item.price)}</p>
                    <span className="cart-item-qty">{isEnglish ? "Quantity" : "Quantite"}</span>
                    <div className="cart-item-controls">
                      <button type="button" className="cart-qty-button" aria-label={isEnglish ? `Remove one unit of ${item.name}` : `Retirer une unite de ${item.name}`} onClick={() => changeCartQuantity(item.id, -1)}>−</button>
                      <span className="cart-qty-value">{item.quantity}</span>
                      <button type="button" className="cart-qty-button" aria-label={isEnglish ? `Add one unit of ${item.name}` : `Ajouter une unite de ${item.name}`} onClick={() => changeCartQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                    <button type="button" className="cart-remove" onClick={() => removeFromCart(item.id)}>{isEnglish ? "Remove" : "Retirer"}</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="cart-panel-footer">
          <div className="cart-summary">
            <span>{isEnglish ? "Total" : "Total"}</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>
          <div className="cart-footer-actions">
            <button
              className="button button-secondary cart-clear"
              type="button"
              onClick={() => {
                if (!cart.length) {
                  showToast(isEnglish ? "Your cart is already empty." : "Votre panier est deja vide.");
                  return;
                }

                clearCart();
                showToast(isEnglish ? "The cart has been emptied." : "Le panier a ete vide.");
              }}
            >
              {isEnglish ? "Clear cart" : "Vider le panier"}
            </button>
            <Link
              href={cart.length ? "/account?redirect=checkout" : "#"}
              className="button button-primary cart-checkout"
              onClick={(event) => {
                if (!cart.length) {
                  event.preventDefault();
                  showToast(isEnglish ? "Your cart is still empty." : "Votre panier est encore vide.");
                }
              }}
            >
              {isEnglish ? "Checkout" : "Finaliser la commande"}
            </Link>
          </div>
          <a
            className="cart-whatsapp"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!cart.length}
            onClick={(event) => {
              if (!cart.length) {
                event.preventDefault();
                showToast(isEnglish ? "Add at least one item before continuing on WhatsApp." : "Ajoutez au moins une piece avant de continuer sur WhatsApp.");
              } else {
                showToast(isEnglish ? "Your order message is ready for WhatsApp." : "Le message de commande est pret pour WhatsApp.");
              }
            }}
          >
            {isEnglish ? "Order via WhatsApp" : "Commander via WhatsApp"}
          </a>
          <p className="cart-order-note" aria-live="polite">
            {cart.length ? (isEnglish ? "Your selection is ready to be sent." : "Votre selection est prete a etre envoyee.") : ""}
          </p>
        </div>
      </aside>

      <button
        className={`back-to-top${showBackToTop ? " is-visible" : ""}`}
        type="button"
        aria-label={isEnglish ? "Back to top" : "Retour en haut"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </>
  );
}
