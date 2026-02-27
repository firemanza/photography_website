import type { Metadata } from "next";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import PortfolioShowcase from "@/components/portfolio/portfolio-showcase";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse wildlife, event, portrait, pet, and motorsport photography from Johannesburg, South Africa.",
};

export default function PortfolioPage() {
  return (
    <section className="pb-24 pt-36 sm:pt-40">
      <Container>
        <SectionHeading
          title="Portfolio"
          subtitle="A cinematic stage with uncropped full-frame viewing and curated navigation."
        />
        <PortfolioShowcase />
      </Container>
    </section>
  );
}
