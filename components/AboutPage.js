"use client";

import AboutSection from "./AboutSection";
import BenefitsSection from "./BenefitsSection";
import PageShell from "./PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <AboutSection />
      <BenefitsSection />
    </PageShell>
  );
}
