import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Bed, Bath, Square, MapPin, BarChart3 } from "lucide-react";
import { cn, formatPrice, formatNumber } from "@/lib/utils";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
  onView: (property: Property) => void;
  onCompare?: (property: Property) => void;
  isInComparison?: boolean;
  className?: string;
}

export function PropertyCard({
  property,
  onView,
  onCompare,
  isInComparison,
  className,
}: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCompare) {
      onCompare(property);
    }
  };

  return (
    <Card
      className={cn(
        "property-card cursor-pointer group overflow-hidden",
        "hover:shadow-xl transition-all duration-300",
        className
      )}
      onClick={() => onView(property)}
    >
      <div className="relative overflow-hidden">
        {!imageLoaded && <div className="w-full h-64 bg-muted animate-pulse" />}
        <img
          src={property.images[0]}
          alt={property.title}
          className={cn(
            "w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110",
            imageLoaded ? "block" : "hidden"
          )}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Property Type Badge */}
        <Badge
          variant="secondary"
          className="absolute top-4 left-4 bg-black/50 text-white border-0"
        >
          {property.propertyType.charAt(0).toUpperCase() +
            property.propertyType.slice(1)}
        </Badge>

        {/* Featured Badge */}
        {property.isFeatured && (
          <Badge className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 border-0">
            Featured
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-3xl font-bold gradient-text mb-1">
              {formatPrice(property.price)}
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              {property.city}, {property.state}
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3 line-clamp-2 leading-tight">
          {property.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.bedrooms} Beds
            </span>
            <span className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.bathrooms} Baths
            </span>
            <span className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {formatNumber(property.sqft)} sqft
            </span>
          </div>
        </div>

        <Button
          className="w-full mt-4 btn-gradient"
          onClick={(e) => {
            e.stopPropagation();
            onView(property);
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
