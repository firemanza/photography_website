import { siteConfig } from "@/config/site";
import { portfolioImages as legacyPortfolioImages, type PortfolioImage } from "@/data/portfolio";
import { createPublicSupabaseClient, getSupabasePublicFileUrl } from "@/lib/supabase/public";

export interface PortfolioCategory {
  slug: string;
  label: string;
}

export interface PortfolioFeed {
  categories: PortfolioCategory[];
  images: PortfolioImage[];
  source: "supabase" | "legacy";
}

type FeedImage = PortfolioImage & {
  _categoryOrder: number;
};

function mixImagesForAllView(images: PortfolioImage[], categories: PortfolioCategory[]): PortfolioImage[] {
  const categoryOrder = new Map(categories.map((category, index) => [category.slug, index]));
  const groupedImages = new Map<string, FeedImage[]>();

  images.forEach((image) => {
    const enrichedImage: FeedImage = {
      ...image,
      _categoryOrder: categoryOrder.get(image.category) ?? Number.MAX_SAFE_INTEGER,
    };

    const bucket = groupedImages.get(image.category);
    if (bucket) {
      bucket.push(enrichedImage);
      return;
    }

    groupedImages.set(image.category, [enrichedImage]);
  });

  const categoryQueue = Array.from(groupedImages.entries())
    .filter(([, bucket]) => bucket.length > 0)
    .sort((a, b) => {
      const firstImageA = a[1][0];
      const firstImageB = b[1][0];

      if (firstImageA && firstImageB && firstImageA._categoryOrder !== firstImageB._categoryOrder) {
        return firstImageA._categoryOrder - firstImageB._categoryOrder;
      }

      return a[0].localeCompare(b[0]);
    })
    .map(([slug]) => slug);

  const mixedImages: PortfolioImage[] = [];

  while (categoryQueue.length > 0) {
    const currentSlug = categoryQueue.shift();

    if (!currentSlug) {
      continue;
    }

    const bucket = groupedImages.get(currentSlug);

    if (!bucket?.length) {
      continue;
    }

    const nextImage = bucket.shift();

    if (nextImage) {
      const { _categoryOrder: _ignored, ...cleanImage } = nextImage;
      mixedImages.push(cleanImage);
    }

    if (bucket.length > 0) {
      categoryQueue.push(currentSlug);
    }
  }

  return mixedImages;
}

export async function getPortfolioFeed(): Promise<PortfolioFeed> {
  const supabase = createPublicSupabaseClient();

  if (!supabase) {
    return {
      categories: [...siteConfig.categories],
      images: legacyPortfolioImages,
      source: "legacy",
    };
  }

  const [{ data: categoryRows, error: categoryError }, { data: photoRows, error: photoError }] =
    await Promise.all([
      supabase.from("categories").select("slug, label, sort_order").eq("is_active", true).order("sort_order"),
      supabase
        .from("photos")
        .select(
          "title, alt_text, category_slug, width, height, thumbnail_bucket, thumbnail_path, display_bucket, display_path, original_bucket, original_path, watermark_position"
        )
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .order("updated_at", { ascending: false })
        .order("sort_order", { ascending: false }),
    ]);

  if (categoryError || photoError || !photoRows?.length) {
    return {
      categories: [...siteConfig.categories],
      images: legacyPortfolioImages,
      source: "legacy",
    };
  }

  const categories =
    categoryRows?.map((category) => ({
      slug: category.slug,
      label: category.label,
    })) ?? [...siteConfig.categories];

  const images = photoRows.map((photo) => ({
      src: getSupabasePublicFileUrl(photo.display_bucket, photo.display_path),
      alt: photo.alt_text ?? photo.title,
      category: photo.category_slug,
      width: photo.width ?? 2400,
      height: photo.height ?? 1600,
      title: photo.title,
      thumbnailSrc: getSupabasePublicFileUrl(
        photo.thumbnail_bucket,
        photo.thumbnail_path ?? photo.display_path
      ),
      displaySrc: getSupabasePublicFileUrl(photo.display_bucket, photo.display_path),
      fullSrc: getSupabasePublicFileUrl(photo.display_bucket, photo.display_path),
    }));

  return {
    categories,
    images: mixImagesForAllView(images, categories),
    source: "supabase",
  };
}
