"use client";

import ContactSection from "./ContactSection";
import NewsletterSection from "./NewsletterSection";
import PageShell from "./PageShell";

export default function ContactPage() {
  return (
    <PageShell>
      <ContactSection />
      <NewsletterSection />
    </PageShell>
  );
}
