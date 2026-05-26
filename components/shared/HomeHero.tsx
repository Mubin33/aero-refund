import { FixedVideoBackground } from "@/components/shared/FixedVideoBackground";
import { HeroSection } from "@/components/shared/HeroSection";
import { Navbar } from "@/components/shared/Navbar";

export function HomeHero() {
  return (
    <section id="hero" className="relative lg:h-screen min-h-screen overflow-hidden pb-7 lg:py-1">
      <FixedVideoBackground />
      <div className="relative z-10 flex h-full flex-col">
        <Navbar /> 
        <HeroSection />
      </div>
    </section>
  );
}
