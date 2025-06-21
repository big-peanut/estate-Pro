import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Hero } from "@/components/sections/hero";
import { FeaturedProperties } from "@/components/sections/featured-properties";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import type { Property } from "@shared/schema";

export default function Home() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Property[] | undefined>();

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleSearch = (properties: Property[]) => {
    setSearchResults(properties);
  };

  return (
    <div className="min-h-screen">
      <Navbar onMobileMenuToggle={handleMobileSidebarToggle} />
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      
      <main>
        <Hero onSearch={handleSearch} />
        <FeaturedProperties searchResults={searchResults} />
        <About />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
