import Button from "@/components/ui/button";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  reversed?: boolean;
}

export default function ServiceCard({ service, reversed }: ServiceCardProps) {
  return (
    <div
      className={`grid gap-8 md:grid-cols-2 md:items-center ${
        reversed ? "md:direction-rtl" : ""
      }`}
    >
      {/* Image */}
      <div className={`${reversed ? "md:order-2" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${service.image})`,
              backgroundColor: "#1e1e1e",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className={`${reversed ? "md:order-1" : ""}`}>
        <h3 className="font-heading text-2xl text-foreground md:text-3xl">
          {service.title}
        </h3>
        <div className="mt-3 h-px w-12 bg-accent" />
        <p className="mt-4 leading-relaxed text-muted">{service.description}</p>

        <ul className="mt-6 space-y-2">
          {service.deliverables.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-muted">
              <svg
                className="h-4 w-4 shrink-0 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button href={`/contact?service=${service.slug}`} variant="secondary">
            Enquire About {service.title}
          </Button>
        </div>
      </div>
    </div>
  );
}
