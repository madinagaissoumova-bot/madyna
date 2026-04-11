"use client";

import NewsletterSection from "./NewsletterSection";
import PageShell from "./PageShell";
import TestimonialsSection from "./TestimonialsSection";
export default function ReviewsPage() {

  return (
    <PageShell>
      <TestimonialsSection />
      <NewsletterSection />
    </PageShell>
  );
}
