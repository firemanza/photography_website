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
    "bg-accent text-background hover:bg-accent-light font-medium",
  secondary:
    "border border-accent text-accent hover:bg-accent hover:text-background",
  ghost:
    "text-muted hover:text-foreground",
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
    "inline-flex items-center justify-center rounded px-6 py-3 text-sm tracking-wide transition-all duration-300",
    variantStyles[variant],
    disabled && "opacity-50 cursor-not-allowed",
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
    <button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
