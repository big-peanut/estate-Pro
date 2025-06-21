import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyModal } from "@/components/property/property-modal";
import { PropertyComparison } from "@/components/property/property-comparison";
import { PropertySearch } from "@/components/property/property-search";
import { Navbar } from "@/components/layout/navbar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { useProperties, useSearchProperties } from "@/hooks/use-properties";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import type { Property } from "@shared/schema";
import type { PropertyFilters } from "@/types/property";

export default function Properties() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { data: allProperties, isLoading } = useProperties();
  const {
    mutate: searchProperties,
    data: searchResults,
    isPending,
  } = useSearchProperties();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comparisonProperties, setComparisonProperties] = useState<Property[]>(
    []
  );
  const [isSearchActive, setIsSearchActive] = useState(false);

  const displayProperties = searchResults || allProperties || [];

  const handlePropertyView = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handlePropertyCompare = (property: Property) => {
    setComparisonProperties((prev) => {
      const isAlreadyInComparison = prev.find((p) => p.id === property.id);
      if (isAlreadyInComparison) {
        return prev.filter((p) => p.id !== property.id);
      } else if (prev.length < 3) {
        return [...prev, property];
      }
      return prev;
    });
  };

  const handleSearch = (filters: PropertyFilters) => {
    setIsSearchActive(true);
    searchProperties(filters);
  };

  const clearSearch = () => {
    setIsSearchActive(false);
    searchProperties({});
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onMobileMenuToggle={handleMobileSidebarToggle} />
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center mb-8">
              <Skeleton className="h-10 w-32 mr-4" />
              <Skeleton className="h-12 w-48" />
            </div>
            <div className="mb-8">
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMobileMenuToggle={handleMobileSidebarToggle} />
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="outline" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  {isSearchActive ? "Search Results" : "All"}{" "}
                  <span className="gradient-text">Properties</span>
                </h1>
                <p className="text-xl text-muted-foreground mt-2">
                  {isSearchActive
                    ? `Found ${displayProperties.length} properties matching your criteria`
                    : `Discover our complete collection of ${displayProperties.length} luxury properties`}
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-12">
            <PropertySearch
              onSearch={handleSearch}
              variant="compact"
              className="bg-card border shadow-lg rounded-2xl p-6"
            />
            {isSearchActive && (
              <div className="text-center mt-4">
                <Button
                  variant="outline"
                  onClick={clearSearch}
                  disabled={isPending}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>

          {/* Properties Grid */}
          {displayProperties.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">
                No properties found
              </h3>
              <p className="text-muted-foreground mb-8">
                {isSearchActive
                  ? "Try adjusting your search criteria to find more properties."
                  : "No properties are currently available."}
              </p>
              {
                <Button onClick={clearSearch} className="btn-gradient">
                  View All Properties
                </Button>
              }
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
              {displayProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onView={handlePropertyView}
                  onCompare={handlePropertyCompare}
                  isInComparison={comparisonProperties.some(
                    (p) => p.id === property.id
                  )}
                />
              ))}
            </div>
          )}

          <PropertyModal
            property={selectedProperty}
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />

          <PropertyComparison properties={comparisonProperties} />
        </div>
      </div>
    </div>
  );
}
