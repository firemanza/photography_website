import { siteConfig } from "@/config/site";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    areaServed: {
      "@type": "City",
      name: "Johannesburg",
    },
    serviceType: "Photography",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography Services",
      itemListElement: siteConfig.categories.map((cat) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: cat.label,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
