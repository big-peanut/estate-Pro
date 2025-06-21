import { ChevronDown } from "lucide-react";
import { PropertySearch } from "@/components/property/property-search";
import { useSearchProperties } from "@/hooks/use-properties";
import type { PropertyFilters } from "@/types/property";

interface HeroProps {
  onSearch: (properties: any[]) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const searchMutation = useSearchProperties();

  const handleSearch = async (filters: PropertyFilters) => {
    try {
      const properties = await searchMutation.mutateAsync(filters);
      onSearch(properties);

      // Scroll to properties section
      const element = document.querySelector("#properties");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background */}
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
          alt="Luxury modern home exterior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto animate-fade-in">
        <div className="mb-4">
          <span className="inline-block px-6 py-2 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-semibold tracking-wider uppercase backdrop-blur-sm border border-yellow-400/30">
            Premium Real Estate
          </span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tight">
          Discover <span className="gradient-text">Luxury</span>
          <br />
          <span className="text-5xl md:text-7xl text-white/90">Living</span>
        </h1>
        <p className="text-xl md:text-3xl text-gray-200 mb-12 leading-relaxed font-light max-w-4xl mx-auto">
          Exclusive properties that redefine elegance and sophistication in the
          world's most prestigious locations
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => {
          const element = document.querySelector("#properties");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-float hover:text-yellow-400 transition-colors cursor-pointer"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
