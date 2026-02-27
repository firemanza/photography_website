"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") || "all";

  const setCategory = (slug: string) => {
    if (slug === "all") {
      router.push("/portfolio", { scroll: false });
    } else {
      router.push(`/portfolio?category=${slug}`, { scroll: false });
    }
  };

  return (
    <div className="mb-14 flex flex-wrap justify-center gap-2 sm:gap-3">
      <button
        onClick={() => setCategory("all")}
        className={cn(
          "rounded-sm border px-4 py-2 text-xs tracking-[0.14em] uppercase transition-all duration-200 sm:px-5",
          activeCategory === "all"
            ? "border-foreground bg-foreground text-surface"
            : "border-foreground/20 text-muted hover:border-accent hover:text-accent"
        )}
      >
        All
      </button>
      {siteConfig.categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => setCategory(category.slug)}
          className={cn(
            "rounded-sm border px-4 py-2 text-xs tracking-[0.14em] uppercase transition-all duration-200 sm:px-5",
            activeCategory === category.slug
              ? "border-foreground bg-foreground text-surface"
              : "border-foreground/20 text-muted hover:border-accent hover:text-accent"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
