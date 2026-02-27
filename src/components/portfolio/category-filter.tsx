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
    <div className="mb-12 flex flex-wrap justify-center gap-2">
      <button
        onClick={() => setCategory("all")}
        className={cn(
          "rounded-full px-5 py-2 text-sm tracking-wide transition-all duration-300",
          activeCategory === "all"
            ? "bg-accent text-background"
            : "border border-surface-light text-muted hover:border-accent hover:text-accent"
        )}
      >
        All
      </button>
      {siteConfig.categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => setCategory(category.slug)}
          className={cn(
            "rounded-full px-5 py-2 text-sm tracking-wide transition-all duration-300",
            activeCategory === category.slug
              ? "bg-accent text-background"
              : "border border-surface-light text-muted hover:border-accent hover:text-accent"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
