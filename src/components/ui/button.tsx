import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-surface hover:bg-accent hover:text-surface border border-foreground shadow-[4px_4px_0_var(--color-accent)] hover:shadow-[2px_2px_0_var(--color-accent)]",
  secondary:
    "border border-foreground/35 text-foreground hover:bg-foreground hover:text-surface",
  ghost: "text-muted hover:text-foreground",
};

export default function Button({
  variant = "primary",
  href,
  className,
  children,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-sm px-6 py-3 text-xs font-medium tracking-[0.16em] uppercase transition-all duration-200",
    variantStyles[variant],
    disabled && "cursor-not-allowed opacity-50",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
