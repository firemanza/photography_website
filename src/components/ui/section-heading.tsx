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
    <div className={cn("mb-14", align === "center" && "text-center", className)}>
      <p
        className={cn(
          "font-mono text-xs tracking-[0.2em] text-muted uppercase",
          align === "center" && "justify-center"
        )}
      >
        Field Notes
      </p>
      <h2 className="mt-3 font-heading text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          {subtitle}
        </p>
      )}
      <div className={cn("mt-6 h-[2px] w-20 bg-accent", align === "center" && "mx-auto")} />
    </div>
  );
}
