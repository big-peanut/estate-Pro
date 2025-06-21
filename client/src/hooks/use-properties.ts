import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Property, InsertInquiry } from "@shared/schema";
import type { PropertyFilters } from "@/types/property";

export function useProperties() {
  return useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });
}

export function useFeaturedProperties() {
  return useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });
}

export function useProperty(id: number) {
  return useQuery<Property>({
    queryKey: ["/api/properties", id],
    enabled: !!id,
  });
}

export function useSearchProperties() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (filters: PropertyFilters) => {
      const response = await apiRequest("POST", "/api/properties/search", filters);
      return response.json() as Promise<Property[]>;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/properties/search"], data);
    },
  });
}

export function useCreateInquiry() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (inquiry: InsertInquiry) => {
      const response = await apiRequest("POST", "/api/inquiries", inquiry);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["/api/testimonials"],
  });
}
