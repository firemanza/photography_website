import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import CategoryFilter from "@/components/portfolio/category-filter";
import MasonryGrid from "@/components/portfolio/masonry-grid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse wildlife, event, portrait, pet, and motorsport photography from Johannesburg, South Africa.",
};

export default function PortfolioPage() {
  return (
    <section className="pt-32 pb-24">
      <Container>
        <SectionHeading
          title="Portfolio"
          subtitle="A curated selection of my favourite work across every genre"
        />
        <Suspense fallback={<div className="h-12" />}>
          <CategoryFilter />
          <MasonryGrid />
        </Suspense>
      </Container>
    </section>
  );
}
