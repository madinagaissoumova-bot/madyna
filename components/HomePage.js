"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { heroSlides, products } from "../lib/store";
import { useStore } from "./StoreProvider";

const testimonials = [
  {
    quote:
      "Des que je l'ai portee, j'ai senti la difference. La coupe est sublime, le tombe est magnifique et l'allure est immediatement tres chic.",
    name: "Samira B.",
    city: "Paris"
  },
  {
    quote:
      "On sent un vrai travail de maison de mode. Les finitions sont delicates, les couleurs sont raffinees et chaque piece inspire l'elegance.",
    name: "Amina K.",
    city: "Lyon"
  },
  {
    quote:
      "Tout est soigne, du vetement jusqu'a la presentation. L'experience est elegante du debut a la fin, et la qualite est vraiment au rendez-vous.",
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
    showToast
  } = useStore();
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
    showToast(`${product.name} a ete ajoute au panier.`);
  }

  function handleAccountSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("account-email") || "").trim();
    const password = String(formData.get("account-password") || "").trim();

    if (!isValidEmail(email) || !password) {
      setAccountMessage({
        text: "Merci de renseigner un e-mail valide et votre mot de passe.",
        type: "error"
      });
      return;
    }

    setAccountMessage({
      text: "Connexion de demonstration validee. Votre espace cliente sera bientot disponible.",
      type: "success"
    });
    showToast("Connexion cliente simulee avec succes.");
  }

  function handleNewsletterSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("newsletter-email") || "").trim();

    if (!email) {
      setNewsletterMessage({
        text: "Veuillez renseigner votre adresse e-mail.",
        type: "error"
      });
      return;
    }

    if (!isValidEmail(email)) {
      setNewsletterMessage({
        text: "Veuillez entrer une adresse e-mail valide.",
        type: "error"
      });
      return;
    }

    event.currentTarget.reset();
    setNewsletterMessage({
      text: "Merci, votre inscription a la newsletter a bien ete prise en compte.",
      type: "success"
    });
    showToast("Inscription newsletter confirmee.");
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
        text: "Merci de completer correctement tous les champs du formulaire.",
        type: "error"
      });
      return;
    }

    event.currentTarget.reset();
    setContactMessage({
      text: "Votre message a bien ete envoye. Nous vous repondrons tres prochainement.",
      type: "success"
    });
    showToast("Message envoye avec succes.");
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
              {[
                ["accueil", "Accueil"],
                ["categories", "Collections"],
                ["produits", "Pieces phares"],
                ["a-propos", "Maison"],
                ["avis", "Avis"],
                ["contact", "Contact"]
              ].map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(event) => scrollToSection(event, id)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
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
              Connexion
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
              <span className="cart-button-label">Panier</span>
              <span className="cart-count">{totalQuantity}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero section" id="accueil">
          <div className="container hero-grid">
            <div className="hero-content">
              <p className="eyebrow">Maison de mode modeste</p>
              <p className="hero-kicker">Capsule studio 2026</p>
              <h1>Le raffinement modeste pense comme une signature de style.</h1>
              <p className="hero-text">
                Mady Mode imagine des abayas et silhouettes voilees a l'allure couture,
                entre douceur poudree, lignes fluides et elegance contemporaine inspiree
                des plus belles adresses de Dubai.
              </p>
              <div className="hero-actions">
                <a href="#produits" className="button button-primary" onClick={(event) => scrollToSection(event, "produits")}>
                  Decouvrir la collection
                </a>
                <a
                  href="https://wa.me/336184002819?text=Bonjour%20Mady%20Mode%2C%20je%20souhaite%20obtenir%20des%20informations%20sur%20vos%20articles."
                  className="button button-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ecrire sur WhatsApp
                </a>
              </div>
              <ul className="hero-highlights">
                <li>Capsules exclusives</li>
                <li>Finitions couture</li>
                <li>Livraison offerte des 120 EUR</li>
              </ul>
            </div>

            <div className="hero-visual">
              <div className="hero-carousel">
                <div className="hero-slides">
                  {heroSlides.map((slide, index) => (
                    <div key={slide.src} className={`hero-slide${index === heroIndex ? " is-active" : ""}`}>
                      <img src={slide.src} alt={slide.alt} />
                    </div>
                  ))}
                </div>
                <div className="hero-carousel-controls">
                  <button className="hero-control hero-control-prev" type="button" aria-label="Image precedente" onClick={() => setHeroIndex((heroIndex - 1 + heroSlides.length) % heroSlides.length)}>
                    ‹
                  </button>
                  <div className="hero-dots" aria-label="Navigation du carrousel">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.src}
                        className={`hero-dot${index === heroIndex ? " is-active" : ""}`}
                        type="button"
                        aria-label={`Aller a l'image ${index + 1}`}
                        onClick={() => setHeroIndex(index)}
                      ></button>
                    ))}
                  </div>
                  <button className="hero-control hero-control-next" type="button" aria-label="Image suivante" onClick={() => setHeroIndex((heroIndex + 1) % heroSlides.length)}>
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
              <p className="eyebrow">Collections</p>
              <h2>Des lignes pensees pour chaque moment de vie</h2>
              <p>
                Une garde-robe complete, entre essentiels epures et pieces
                signature pour les occasions les plus precieuses.
              </p>
            </div>

            <div className="categories-grid">
              <article className="category-card">
                <span className="category-tag">Elegance quotidienne</span>
                <h3>Abayas contemporaines</h3>
                <p>Des coupes longues et aeriennes pour des journees rythmees avec style et aisance.</p>
              </article>
              <article className="category-card">
                <span className="category-tag">Signature maison</span>
                <h3>Ensembles coordonnes</h3>
                <p>Des silhouettes harmonieuses a porter ensemble ou separement, toujours impeccables.</p>
              </article>
              <article className="category-card">
                <span className="category-tag">Finitions delicates</span>
                <h3>Hijabs premium</h3>
                <p>Mousseline, jersey luxe et textures satinees dans une palette douce et intemporelle.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="products section" id="produits">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Pieces phares</p>
              <h2>La selection Mady Mode</h2>
              <p>
                Neuf creations selectionnees pour refleter l'allure couture de Mady Mode :
                abayas signature, capsules elegantes et voiles premium aux finitions delicates.
              </p>
            </div>

            <div className="products-grid">
              {products.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className={`product-visual ${product.visualClass}`}></div>
                  <div className="product-body">
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-footer">
                      <strong>{formatPrice(product.price)}</strong>
                      <button className="add-to-cart" type="button" onClick={() => handleAddToCart(product)}>
                        Ajouter au panier
                      </button>
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
              <p className="eyebrow">Pourquoi nous choisir</p>
              <h2>Le soin d'une maison qui valorise l'allure et le confort</h2>
              <p>
                Chaque detail a ete pense pour offrir une experience sereine, du
                choix des matieres jusqu'a la reception de votre commande.
              </p>
            </div>

            <div className="benefits-list">
              <article className="benefit-card"><h3>Matieres choisies</h3><p>Des tissus au tombe elegant, confortables a porter et agreables toute la journee.</p></article>
              <article className="benefit-card"><h3>Finitions soignees</h3><p>Coutures nettes, palettes raffinees et coupes harmonieuses pour une allure irreprochable.</p></article>
              <article className="benefit-card"><h3>Conseil personnalise</h3><p>Une equipe disponible pour vous guider selon votre style, votre taille et vos envies.</p></article>
              <article className="benefit-card"><h3>Expedition delicate</h3><p>Vos pieces sont preparees avec attention dans un ecrin sobre et elegant.</p></article>
            </div>
          </div>
        </section>

        <section className="about section" id="a-propos">
          <div className="container about-grid">
            <div className="about-visual">
              <div className="about-frame">
                <img
                  src="https://images.pexels.com/photos/29188564/pexels-photo-29188564.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Modele voilee portant une abaya elegante beige dans un style premium"
                  className="about-image"
                />
                <p className="about-caption">Mady Mode</p>
              </div>
            </div>
            <div className="about-content">
              <p className="eyebrow">A propos</p>
              <h2>Une maison de mode modeste pensee comme un vestiaire d'elegance contemporaine</h2>
              <p>
                Mady Mode celebre une vision raffinee de la feminite, ou la pudeur
                rencontre l'allure, la douceur et l'exigence des belles matieres.
              </p>
              <p>
                Nos pieces sont concues pour offrir un equilibre precieux entre
                confort absolu, qualite durable et sophistication discrete.
              </p>
              <a href="#contact" className="button button-primary" onClick={(event) => scrollToSection(event, "contact")}>
                Prendre contact
              </a>
            </div>
          </div>
        </section>

        <section className="testimonials section" id="avis">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Avis clientes</p>
              <h2>Ce que nos clientes ressentent en decouvrant l'univers Mady Mode</h2>
              <p>
                Des mots sinceres sur la qualite des coupes, la noblesse des
                matieres et cette sensation rare de se sentir a la fois elegante,
                confiante et pleinement soi-meme.
              </p>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.name}>
                  <p>"{testimonial.quote}"</p>
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
              <p className="eyebrow">Newsletter</p>
              <h2>Recevez en avant-premiere nos capsules, nouveautes et inspirations</h2>
              <p>
                Inscrivez-vous pour decouvrir les lancements exclusifs, les
                reassorts les plus attendus et l'univers raffine de Mady Mode avant tout le monde.
              </p>
            </div>

            <form className="newsletter-form" onSubmit={handleNewsletterSubmit} noValidate>
              <label className="sr-only" htmlFor="newsletter-email">Adresse e-mail</label>
              <input type="email" id="newsletter-email" name="newsletter-email" placeholder="Votre adresse e-mail" required />
              <button type="submit" className="button button-primary">S'inscrire</button>
              <p className={`form-message${newsletterMessage.type ? ` ${newsletterMessage.type}` : ""}`} aria-live="polite">
                {newsletterMessage.text}
              </p>
            </form>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">Contact</p>
              <h2>Parlons de votre prochaine silhouette</h2>
              <p>Une question sur une taille, une matiere ou une commande ? Ecrivez-nous.</p>
              <ul className="contact-details">
                <li>Studio Mady Mode, 24 rue des Ateliers, 75003 Paris</li>
                <li>contact@madymode.com</li>
                <li>+33 1 84 00 28 19</li>
              </ul>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="form-row">
                <div className="form-field"><label htmlFor="name">Nom complet</label><input type="text" id="name" name="name" required /></div>
                <div className="form-field"><label htmlFor="email">Adresse e-mail</label><input type="email" id="email" name="email" required /></div>
              </div>
              <div className="form-field"><label htmlFor="subject">Sujet</label><input type="text" id="subject" name="subject" required /></div>
              <div className="form-field"><label htmlFor="message">Message</label><textarea id="message" name="message" rows="6" placeholder="Decrivez votre demande..." required></textarea></div>
              <button type="submit" className="button button-primary">Envoyer le message</button>
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
            <p>Une boutique de vetements modestes pensee comme un vestiaire precieux, feminin et contemporain.</p>
          </div>
          <div>
            <h3>Navigation</h3>
            <ul>
              <li><a href="#categories" onClick={(event) => scrollToSection(event, "categories")}>Collections</a></li>
              <li><a href="#produits" onClick={(event) => scrollToSection(event, "produits")}>Produits</a></li>
              <li><a href="#a-propos" onClick={(event) => scrollToSection(event, "a-propos")}>A propos</a></li>
              <li><a href="#contact" onClick={(event) => scrollToSection(event, "contact")}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h3>Informations</h3>
            <ul>
              <li>Livraison France & Europe</li>
              <li>Paiement securise</li>
              <li>Retours sous 14 jours</li>
              <li>Service client du lundi au samedi</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom"><p>© 2026 Mady Mode - Tous droits reserves.</p></div>
      </footer>

      <div className={`account-overlay${accountOpen ? " is-visible" : ""}`} hidden={!accountOpen} onClick={() => setAccountOpen(false)}></div>
      <section className={`account-panel${accountOpen ? " is-open" : ""}`} id="account-panel" aria-hidden={!accountOpen} aria-labelledby="account-title">
        <button className="account-panel-close" type="button" aria-label="Fermer l'espace client" onClick={() => setAccountOpen(false)}>×</button>
        <p className="account-panel-eyebrow">Mady Mode</p>
        <h2 id="account-title">Espace cliente</h2>
        <p className="account-panel-text">
          Connectez-vous pour retrouver vos selections, suivre vos commandes et acceder a votre univers Mady Mode.
        </p>
        <form className="account-form" onSubmit={handleAccountSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="account-email">Adresse e-mail</label>
            <input type="email" id="account-email" name="account-email" required />
          </div>
          <div className="form-field">
            <label htmlFor="account-password">Mot de passe</label>
            <input type="password" id="account-password" name="account-password" required />
          </div>
          <button className="button button-primary" type="submit">Se connecter</button>
          <p className={`form-message${accountMessage.type ? ` ${accountMessage.type}` : ""}`} aria-live="polite">
            {accountMessage.text}
          </p>
        </form>
        <div className="account-panel-footer">
          <p>Vous n'avez pas encore de compte ?</p>
          <button
            className="account-create-button"
            type="button"
            onClick={() =>
              setAccountMessage({
                text: "Creation de compte bientot disponible. Ecrivez-nous pour etre accompagnee en priorite.",
                type: "success"
              })
            }
          >
            Creer un compte
          </button>
        </div>
      </section>

      <div className={`cart-overlay${cartOpen ? " is-visible" : ""}`} hidden={!cartOpen} onClick={() => setCartOpen(false)}></div>
      <aside className={`cart-panel${cartOpen ? " is-open" : ""}`} id="cart-panel" aria-hidden={!cartOpen} aria-labelledby="cart-title">
        <div className="cart-panel-header">
          <div>
            <p className="cart-panel-eyebrow">Mady Mode</p>
            <h2 id="cart-title">Votre panier</h2>
          </div>
          <button className="cart-close" type="button" aria-label="Fermer le panier" onClick={() => setCartOpen(false)}>×</button>
        </div>
        <div className="cart-panel-body">
          {!cart.length ? (
            <p className="cart-empty">Votre panier est vide pour le moment.</p>
          ) : (
            <ul className="cart-items">
              {cart.map((item) => (
                <li className="cart-item" key={item.id}>
                  <div className={`cart-item-media product-visual ${item.visualClass}`}></div>
                  <div className="cart-item-copy">
                    <h3>{item.name}</h3>
                    <p>{item.category} • {formatPrice(item.price)}</p>
                    <span className="cart-item-qty">Quantite</span>
                    <div className="cart-item-controls">
                      <button type="button" className="cart-qty-button" aria-label={`Retirer une unite de ${item.name}`} onClick={() => changeCartQuantity(item.id, -1)}>−</button>
                      <span className="cart-qty-value">{item.quantity}</span>
                      <button type="button" className="cart-qty-button" aria-label={`Ajouter une unite de ${item.name}`} onClick={() => changeCartQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                    <button type="button" className="cart-remove" onClick={() => removeFromCart(item.id)}>Retirer</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="cart-panel-footer">
          <div className="cart-summary">
            <span>Total</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>
          <div className="cart-footer-actions">
            <button
              className="button button-secondary cart-clear"
              type="button"
              onClick={() => {
                if (!cart.length) {
                  showToast("Votre panier est deja vide.");
                  return;
                }

                clearCart();
                showToast("Le panier a ete vide.");
              }}
            >
              Vider le panier
            </button>
            <Link
              href={cart.length ? "/account?redirect=checkout" : "#"}
              className="button button-primary cart-checkout"
              onClick={(event) => {
                if (!cart.length) {
                  event.preventDefault();
                  showToast("Votre panier est encore vide.");
                }
              }}
            >
              Finaliser la commande
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
                showToast("Ajoutez au moins une piece avant de continuer sur WhatsApp.");
              } else {
                showToast("Le message de commande est pret pour WhatsApp.");
              }
            }}
          >
            Commander via WhatsApp
          </a>
          <p className="cart-order-note" aria-live="polite">
            {cart.length ? "Votre selection est prete a etre envoyee." : ""}
          </p>
        </div>
      </aside>

      <button
        className={`back-to-top${showBackToTop ? " is-visible" : ""}`}
        type="button"
        aria-label="Retour en haut"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </>
  );
}
