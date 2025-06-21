export interface PropertyFilters {
  location?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
}

export interface SearchFilters extends PropertyFilters {
  sortBy?: "price" | "bedrooms" | "sqft" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export const PROPERTY_TYPES = [
  { value: "villa", label: "Villa" },
  { value: "apartment", label: "Apartment" },
  { value: "penthouse", label: "Penthouse" },
  { value: "mansion", label: "Mansion" },
  { value: "loft", label: "Loft" },
] as const;

export const PRICE_RANGES = [
  { value: "1000000-2000000", label: "$1M - $2M" },
  { value: "2000000-5000000", label: "$2M - $5M" },
  { value: "5000000-10000000", label: "$5M - $10M" },
  { value: "10000000-", label: "$10M+" },
] as const;

export const BEDROOM_OPTIONS = [
  { value: "1", label: "1+ Bedrooms" },
  { value: "2", label: "2+ Bedrooms" },
  { value: "3", label: "3+ Bedrooms" },
  { value: "4", label: "4+ Bedrooms" },
  { value: "5", label: "5+ Bedrooms" },
] as const;
