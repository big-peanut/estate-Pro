import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home as HomeIcon, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROPERTY_TYPES, PRICE_RANGES } from "@/types/property";
import type { PropertyFilters } from "@/types/property";

interface PropertySearchProps {
  onSearch: (filters: PropertyFilters) => void;
  className?: string;
  variant?: "hero" | "compact";
}

export function PropertySearch({ onSearch, className, variant = "hero" }: PropertySearchProps) {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    const filters: PropertyFilters = {};
    
    if (location) filters.location = location;
    if (propertyType && propertyType !== "all") filters.propertyType = propertyType;
    
    if (priceRange && priceRange !== "any") {
      const [min, max] = priceRange.split("-");
      if (min) filters.minPrice = parseInt(min);
      if (max) filters.maxPrice = parseInt(max);
    }
    
    onSearch(filters);
  };

  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        isHero ? "glass-effect rounded-2xl p-6 animate-slide-up" : "bg-card rounded-lg p-4 shadow-sm",
        className
      )}
    >
      <div className={cn(
        "flex gap-4",
        isHero ? "flex-col md:flex-row" : "flex-col sm:flex-row"
      )}>
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={cn(
              "pl-10",
              isHero ? "bg-white/20 border-white/30 text-white placeholder:text-gray-300" : ""
            )}
          />
        </div>
        
        <div className="flex-1">
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className={cn(
              isHero ? "bg-white/20 border-white/30 text-white" : ""
            )}>
              <HomeIcon className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className={cn(
              isHero ? "bg-white/20 border-white/30 text-white" : ""
            )}>
              <DollarSign className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Price</SelectItem>
              {PRICE_RANGES.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={handleSearch}
          className={cn(
            "btn-gradient font-semibold",
            isHero ? "px-8 py-3" : "px-6"
          )}
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  );
}
