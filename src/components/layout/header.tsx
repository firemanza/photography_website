"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 36);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-5">
      <nav
        className={cn(
          "mx-auto max-w-7xl rounded-sm border transition-all duration-300",
          isScrolled
            ? "border-foreground/15 bg-surface/92 shadow-[0_12px_40px_rgba(30,24,20,0.15)] backdrop-blur"
            : "border-foreground/10 bg-surface/72 backdrop-blur-sm"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="group flex shrink-0 items-end gap-2 text-foreground">
            <span className="whitespace-nowrap font-heading text-lg leading-none tracking-[0.06em] uppercase sm:text-2xl lg:text-[1.7rem]">
              {siteConfig.name}
            </span>
            <span className="mb-0.5 hidden h-px w-10 origin-left bg-accent transition-transform group-hover:scale-x-125 sm:block" />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative inline-flex rounded-sm px-4 py-2 text-xs tracking-[0.18em] uppercase transition-all",
                      active
                        ? "bg-foreground text-surface"
                        : "text-muted hover:bg-foreground/8 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            className="relative z-50 grid h-10 w-10 place-items-center rounded-sm border border-foreground/20 bg-surface/85 md:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-0.5 w-5 bg-foreground transition-all duration-300",
                  isMobileMenuOpen && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-foreground transition-all duration-300",
                  isMobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-foreground transition-all duration-300",
                  isMobileMenuOpen && "-translate-y-2 -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-40 grid place-items-center bg-[linear-gradient(160deg,rgba(251,247,236,0.98),rgba(237,229,212,0.98))] px-6 transition-all duration-300 md:hidden",
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <ul className="flex flex-col items-center gap-4">
          {navLinks.map((link, index) => (
            <li
              key={link.href}
              style={{ transitionDelay: `${index * 45}ms` }}
              className={cn(
                "transition-all duration-300",
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              )}
            >
              <Link
                href={link.href}
                onClick={closeMobileMenu}
                className={cn(
                  "inline-block rounded-sm px-6 py-2 font-heading text-3xl tracking-[0.06em]",
                  pathname === link.href
                    ? "bg-foreground text-surface"
                    : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
