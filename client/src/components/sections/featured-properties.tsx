import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyModal } from "@/components/property/property-modal";
import { PropertyComparison } from "@/components/property/property-comparison";
import { useFeaturedProperties, useProperties } from "@/hooks/use-properties";
import { Skeleton } from "@/components/ui/skeleton";
import type { Property } from "@shared/schema";

interface FeaturedPropertiesProps {
  searchResults?: Property[];
}

export function FeaturedProperties({ searchResults }: FeaturedPropertiesProps) {
  const { data: featuredProperties, isLoading: featuredLoading } = useFeaturedProperties();
  const { data: allProperties, isLoading: allLoading } = useProperties();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comparisonProperties, setComparisonProperties] = useState<Property[]>([]);
  const [showAllProperties, setShowAllProperties] = useState(false);

  const displayProperties = searchResults || (showAllProperties ? allProperties : featuredProperties) || [];
  const sectionTitle = searchResults ? "Search Results" : (showAllProperties ? "All Properties" : "Featured Properties");
  const sectionSubtitle = searchResults 
    ? `Found ${searchResults.length} properties matching your criteria`
    : showAllProperties 
      ? "Complete collection of our luxury properties"
      : "Handpicked selection of the most exclusive properties";

  const handlePropertyView = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handlePropertyCompare = (property: Property) => {
    setComparisonProperties(prev => {
      const isAlreadyInComparison = prev.find(p => p.id === property.id);
      if (isAlreadyInComparison) {
        return prev.filter(p => p.id !== property.id);
      } else if (prev.length < 3) {
        return [...prev, property];
      }
      return prev;
    });
  };

  const isLoading = showAllProperties ? allLoading : featuredLoading;

  if (isLoading) {
    return (
      <section id="properties" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="properties" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {sectionTitle.split(" ").map((word, index) => 
              word === "Featured" || word === "Search" ? (
                <span key={index} className="gradient-text">{word} </span>
              ) : (
                <span key={index}>{word} </span>
              )
            )}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        {displayProperties.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-4">No properties found</h3>
            <p className="text-muted-foreground mb-8">
              Try adjusting your search criteria to find more properties.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="btn-gradient"
            >
              Reset Search
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
              {displayProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onView={handlePropertyView}
                  onCompare={handlePropertyCompare}
                  isInComparison={comparisonProperties.some(p => p.id === property.id)}
                />
              ))}
            </div>

            {!searchResults && (
              <div className="text-center mt-12">
                <Link href="/properties">
                  <Button className="btn-gradient px-8 py-4 text-lg">
                    View All Properties
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}

        <PropertyModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />

        <PropertyComparison properties={comparisonProperties} />
      </div>
    </section>
  );
}
