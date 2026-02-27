export interface Service {
  slug: string;
  title: string;
  description: string;
  image: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    slug: "wildlife",
    title: "Wildlife & Nature",
    description:
      "Conservation events, game reserves, and private wildlife experiences. South Africa's extraordinary biodiversity provides access to subjects most photographers can only dream of.",
    image: "/images/services/wildlife.jpg",
    deliverables: [
      "Edited high-resolution digital files",
      "Print-ready on request",
      "On-location shoots",
    ],
  },
  {
    slug: "pets",
    title: "Pet Photography",
    description:
      "Dogs, cats, and other beloved pets captured in natural or studio settings. A strong SPCA relationship means I understand animals and know how to bring out their personality.",
    image: "/images/services/pets.jpg",
    deliverables: [
      "Edited high-resolution digital gallery",
      "Print packages available",
      "Natural or studio settings",
    ],
  },
  {
    slug: "portraits",
    title: "Portraits",
    description:
      "Environmental portraits for personal branding, LinkedIn, and social media. Natural light preferred, shot in locations that tell your story.",
    image: "/images/services/portraits.jpg",
    deliverables: [
      "Edited high-resolution digital files",
      "Private online gallery delivery",
      "Location or studio options",
    ],
  },
];
