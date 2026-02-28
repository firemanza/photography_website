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
    "border border-foreground bg-foreground text-surface shadow-[3px_3px_0_var(--color-accent)] hover:-translate-y-0.5 hover:bg-accent hover:text-surface hover:shadow-[4px_5px_0_var(--color-accent)]",
  secondary:
    "border border-foreground/35 text-foreground hover:border-foreground/55 hover:bg-foreground/8",
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
    "inline-flex items-center justify-center rounded-sm px-6 py-3 text-xs font-medium tracking-[0.16em] uppercase transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out",
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
