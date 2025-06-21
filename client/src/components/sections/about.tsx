import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  const stats = [
    { value: "500+", label: "Properties Sold" },
    { value: "$2.5B+", label: "Total Sales Volume" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "25+", label: "Years Experience" },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Luxe Properties</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              For over two decades, we've been the premier destination for
              luxury real estate. Our commitment to excellence and attention to
              detail has made us the trusted choice for discerning clients
              worldwide.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="animate-slide-up">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Market analysis charts and graphs"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
