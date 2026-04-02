import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-[calc(100%-2rem)] max-w-none", className)}>
      {children}
    </div>
  );
}
