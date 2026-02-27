import type { Metadata } from "next";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import AnimatedSection from "@/components/ui/animated-section";
import ServiceCard from "@/components/services/service-card";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wildlife, pet, event, portrait, and motorsport photography services in Johannesburg, South Africa.",
};

export default function ServicesPage() {
  return (
    <section className="pt-32 pb-24">
      <Container>
        <SectionHeading
          title="Services"
          subtitle="Professional photography for every occasion. Enquire for a personalised quote."
        />

        <div className="space-y-24">
          {services.map((service, index) => (
            <AnimatedSection key={service.slug}>
              <ServiceCard service={service} reversed={index % 2 !== 0} />
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
