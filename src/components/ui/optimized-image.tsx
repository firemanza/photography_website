import ExportedImage from "next-image-export-optimizer";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  priority = false,
  className,
  sizes,
}: OptimizedImageProps) {
  return (
    <ExportedImage
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      className={cn("object-cover", className)}
      sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
