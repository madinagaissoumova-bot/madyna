"use client";

import { testimonials } from "../lib/siteContent";
import SectionHeading from "./SectionHeading";
import { useStore } from "./StoreProvider";

export default function TestimonialsSection() {
  const { language } = useStore();
  const isEnglish = language === "en";

  return (
    <section className="testimonials section">
      <div className="container">
        <SectionHeading
          eyebrow={isEnglish ? "Customer reviews" : "Avis clientes"}
          title={
            isEnglish
              ? "What our customers feel when discovering the Mady Mode universe"
              : "Ce que nos clientes ressentent en decouvrant l'univers Mady Mode"
          }
          description={
            isEnglish
              ? "Sincere words about the quality of the cuts, the beauty of the fabrics and that rare feeling of being elegant, confident and fully yourself."
              : "Des mots sinceres sur la qualite des coupes, la noblesse des matieres et cette sensation rare de se sentir a la fois elegante, confiante et pleinement soi-meme."
          }
        />

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
  );
}
