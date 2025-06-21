import {
  properties,
  testimonials,
  inquiries,
  type Property,
  type InsertProperty,
  type Testimonial,
  type InsertTestimonial,
  type Inquiry,
  type InsertInquiry,
} from "@shared/schema";

export interface IStorage {
  // Properties
  getProperties(): Promise<Property[]>;
  getFeaturedProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  searchProperties(filters: {
    location?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
  }): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;

  // Testimonials
  getActiveTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
}

export class MemStorage implements IStorage {
  private properties: Map<number, Property>;
  private testimonials: Map<number, Testimonial>;
  private inquiries: Map<number, Inquiry>;
  private currentPropertyId: number;
  private currentTestimonialId: number;
  private currentInquiryId: number;

  constructor() {
    this.properties = new Map();
    this.testimonials = new Map();
    this.inquiries = new Map();
    this.currentPropertyId = 1;
    this.currentTestimonialId = 1;
    this.currentInquiryId = 1;

    // Initialize with luxury property data
    this.initializeProperties();
    this.initializeTestimonials();
  }

  private initializeProperties() {
    const luxuryProperties: InsertProperty[] = [
      {
        title: "Modern Hillside Villa",
        description:
          "This stunning modern villa offers breathtaking views of the city skyline and Pacific Ocean. Featuring floor-to-ceiling windows, an infinity pool, and state-of-the-art smart home technology, this property represents the pinnacle of luxury living.",
        price: "4200000",
        location: "Beverly Hills, CA",
        city: "Beverly Hills",
        state: "CA",
        propertyType: "villa",
        bedrooms: 5,
        bathrooms: 4,
        sqft: 6500,
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        ],
        features: [
          "Infinity Pool",
          "Smart Home System",
          "Panoramic Views",
          "Gourmet Kitchen",
          "Wine Cellar",
          "Home Theater",
          "Guest House",
          "3-Car Garage",
        ],
        isAvailable: true,
        isFeatured: true,
      },
      {
        title: "Sky Tower Penthouse",
        description:
          "Located on the 45th floor, this exceptional penthouse offers unparalleled views of Central Park and the Manhattan skyline. Premium finishes and custom millwork throughout create an atmosphere of sophisticated elegance.",
        price: "6800000",
        location: "Manhattan, NY",
        city: "Manhattan",
        state: "NY",
        propertyType: "penthouse",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 4200,
        images: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        ],
        features: [
          "Central Park Views",
          "Private Elevator",
          "Marble Finishes",
          "Chef's Kitchen",
          "Master Suite",
          "Library",
          "Terrace",
          "Concierge Service",
        ],
        isAvailable: true,
        isFeatured: true,
      },
      {
        title: "Oceanfront Estate",
        description:
          "This magnificent oceanfront estate sits on 2 acres of pristine coastline. With private beach access, a resort-style pool, and multiple entertaining spaces, it's perfect for the ultimate California lifestyle.",
        price: "8900000",
        location: "Malibu, CA",
        city: "Malibu",
        state: "CA",
        propertyType: "mansion",
        bedrooms: 6,
        bathrooms: 5,
        sqft: 8200,
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        ],
        features: [
          "Private Beach",
          "Resort Pool",
          "Beach Access",
          "Outdoor Kitchen",
          "Tennis Court",
          "Spa",
          "Guest Cottages",
          "Boat Dock",
        ],
        isAvailable: true,
        isFeatured: true,
      },
      {
        title: "Glass House Modern",
        description:
          "An architectural masterpiece featuring floor-to-ceiling glass walls and an open-concept design. This ultra-modern home seamlessly blends indoor and outdoor living with premium materials throughout.",
        price: "5400000",
        location: "Austin, TX",
        city: "Austin",
        state: "TX",
        propertyType: "mansion",
        bedrooms: 4,
        bathrooms: 4,
        sqft: 5800,
        images: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
          "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        ],
        features: [
          "Glass Walls",
          "Open Concept",
          "Modern Design",
          "Premium Materials",
          "Smart Technology",
          "Outdoor Living",
          "Minimalist Style",
          "Energy Efficient",
        ],
        isAvailable: true,
        isFeatured: true,
      },
      {
        title: "Downtown Luxury Loft",
        description:
          "This converted warehouse loft combines industrial charm with modern luxury. Exposed brick walls, soaring ceilings, and premium finishes create a unique urban oasis in the heart of downtown.",
        price: "3200000",
        location: "Chicago, IL",
        city: "Chicago",
        state: "IL",
        propertyType: "loft",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 3400,
        images: [
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
          "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        ],
        features: [
          "Exposed Brick",
          "High Ceilings",
          "Industrial Design",
          "Urban Location",
          "Rooftop Access",
          "Modern Kitchen",
          "Hardwood Floors",
          "City Views",
        ],
        isAvailable: true,
        isFeatured: true,
      },
      {
        title: "Smart Home Paradise",
        description:
          "The future of home living is here. This smart home features cutting-edge automation, sustainable design, and premium amenities. Control everything from lighting to security with your smartphone.",
        price: "2800000",
        location: "Seattle, WA",
        city: "Seattle",
        state: "WA",
        propertyType: "villa",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 4600,
        images: [
          "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
        ],
        features: [
          "Smart Automation",
          "Sustainable Design",
          "Voice Control",
          "Energy Efficient",
          "Security System",
          "Modern Kitchen",
          "Home Office",
          "Garden Views",
        ],
        isAvailable: true,
        isFeatured: true,
      },
    ];

    luxuryProperties.forEach((property) => {
      const id = this.currentPropertyId++;
      this.properties.set(id, {
        ...property,
        id,
        createdAt: new Date(),
        images: property.images as string[],
        features: property.features as string[],
        isAvailable: property.isAvailable ?? true,
        isFeatured: property.isFeatured ?? false,
      });
    });
  }

  private initializeTestimonials() {
    const testimonialData: InsertTestimonial[] = [
      {
        name: "Sarah Johnson",
        role: "CEO, Tech Innovations",
        content:
          "Exceptional service and attention to detail. The team found us our dream penthouse in record time.",
        rating: 5,
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        isActive: true,
      },
      {
        name: "Michael Chen",
        role: "Investment Banker",
        content:
          "Professional, knowledgeable, and truly caring. They made the entire process seamless and enjoyable.",
        rating: 5,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        isActive: true,
      },
      {
        name: "Emma Rodriguez",
        role: "Interior Designer",
        content:
          "Their market knowledge and negotiation skills saved us hundreds of thousands. Highly recommended!",
        rating: 5,
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        isActive: true,
      },
    ];

    testimonialData.forEach((testimonial) => {
      const id = this.currentTestimonialId++;
      this.testimonials.set(id, {
        ...testimonial,
        id,
        createdAt: new Date(),
        rating: testimonial.rating ?? 5,
        avatar: testimonial.avatar ?? null,
        isActive: testimonial.isActive ?? true,
      });
    });
  }

  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter((p) => p.isAvailable);
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (p) => p.isAvailable && p.isFeatured
    );
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async searchProperties(filters: {
    location?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
  }): Promise<Property[]> {
    return Array.from(this.properties.values()).filter((property) => {
      if (!property.isAvailable) return false;

      if (
        filters.location &&
        !property.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.propertyType &&
        property.propertyType !== filters.propertyType
      ) {
        return false;
      }

      const price = parseFloat(property.price);
      if (filters.minPrice && price < filters.minPrice) return false;
      if (filters.maxPrice && price > filters.maxPrice) return false;

      if (filters.minBedrooms && property.bedrooms < filters.minBedrooms)
        return false;
      if (filters.maxBedrooms && property.bedrooms > filters.maxBedrooms)
        return false;

      return true;
    });
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = {
      ...insertProperty,
      id,
      createdAt: new Date(),
      images: insertProperty.images ?? [],
      features: insertProperty.features ?? [],
      isAvailable: insertProperty.isAvailable ?? true,
      isFeatured: insertProperty.isFeatured ?? false,
    };
    this.properties.set(id, property);
    return property;
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter((t) => t.isActive);
  }

  async createTestimonial(
    insertTestimonial: InsertTestimonial
  ): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      createdAt: new Date(),
      rating: insertTestimonial.rating ?? 5,
      avatar: insertTestimonial.avatar ?? null,
      isActive: insertTestimonial.isActive ?? true,
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = {
      ...insertInquiry,
      id,
      createdAt: new Date(),
      propertyInterest: insertInquiry.propertyInterest ?? null,
      propertyId: insertInquiry.propertyId ?? null,
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
}

export const storage = new MemStorage();
