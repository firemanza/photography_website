import Hero from "@/components/home/hero";
import GenreGrid from "@/components/home/genre-grid";
import InstagramStrip from "@/components/home/instagram-strip";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <GenreGrid />
      <InstagramStrip />
    </>
  );
}
