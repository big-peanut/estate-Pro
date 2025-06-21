import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X, Plus, Bed, Bath, Square, MapPin, Check } from "lucide-react";
import { cn, formatPrice, formatNumber } from "@/lib/utils";
import type { Property } from "@shared/schema";

interface PropertyComparisonProps {
  properties: Property[];
}

export function PropertyComparison({ properties }: PropertyComparisonProps) {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToComparison = (property: Property) => {
    if (selectedProperties.length < 3 && !selectedProperties.find(p => p.id === property.id)) {
      setSelectedProperties([...selectedProperties, property]);
    }
  };

  const removeFromComparison = (propertyId: number) => {
    setSelectedProperties(selectedProperties.filter(p => p.id !== propertyId));
  };

  const clearComparison = () => {
    setSelectedProperties([]);
  };

  if (selectedProperties.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Comparison Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <Card className="glass-effect border-primary/20 shadow-xl animate-slide-up">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-sm">
                Compare Properties ({selectedProperties.length}/3)
              </span>
              <Button variant="ghost" size="sm" onClick={clearComparison}>
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex space-x-2 mb-3">
              {selectedProperties.map((property) => (
                <div key={property.id} className="relative">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-destructive text-white rounded-full"
                    onClick={() => removeFromComparison(property.id)}
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </div>
              ))}
              
              {Array.from({ length: 3 - selectedProperties.length }).map((_, i) => (
                <div key={i} className="w-12 h-12 border-2 border-dashed border-muted rounded flex items-center justify-center">
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="w-full btn-gradient text-sm" disabled={selectedProperties.length < 2}>
                  Compare Now
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Property Comparison</DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedProperties.map((property) => (
                    <Card key={property.id} className="relative">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge variant="secondary" className="absolute top-3 left-3">
                          {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                          {property.title}
                        </h3>
                        
                        <div className="flex items-center text-muted-foreground text-sm mb-3">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.city}, {property.state}
                        </div>
                        
                        <div className="text-2xl font-bold text-primary mb-4">
                          {formatPrice(property.price)}
                        </div>
                        
                        {/* Stats Comparison */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center">
                              <Bed className="h-4 w-4 mr-2" />
                              Bedrooms
                            </span>
                            <span className="font-semibold">{property.bedrooms}</span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center">
                              <Bath className="h-4 w-4 mr-2" />
                              Bathrooms
                            </span>
                            <span className="font-semibold">{property.bathrooms}</span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center">
                              <Square className="h-4 w-4 mr-2" />
                              Square Feet
                            </span>
                            <span className="font-semibold">{formatNumber(property.sqft)}</span>
                          </div>
                        </div>
                        
                        {/* Top Features */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Key Features</h4>
                          {property.features.slice(0, 4).map((feature, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Add to Comparison Buttons */}
      <div className="hidden">
        {properties.map((property) => (
          <Button
            key={property.id}
            variant="outline"
            size="sm"
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm"
            onClick={() => addToComparison(property)}
            disabled={selectedProperties.length >= 3 || selectedProperties.find(p => p.id === property.id) !== undefined}
          >
            {selectedProperties.find(p => p.id === property.id) ? "Added" : "Compare"}
          </Button>
        ))}
      </div>
    </>
  );
}