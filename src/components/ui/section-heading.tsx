import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="font-heading text-3xl text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-muted md:text-lg">{subtitle}</p>
      )}
      <div
        className={cn(
          "mt-4 h-px w-16 bg-accent",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
