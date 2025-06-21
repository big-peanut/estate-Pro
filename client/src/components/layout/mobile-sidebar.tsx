import { X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#properties", label: "Properties" },
    { href: "#about", label: "About" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Home className="text-black" size={18} />
                </div>
                <div className="flex flex-col">
                  <SheetTitle className="text-xl font-bold gradient-text tracking-tight">
                    LUXE
                  </SheetTitle>
                  <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
                    Properties
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>
          
          <nav className="flex flex-col p-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  "text-left p-3 rounded-lg transition-colors",
                  "hover:bg-primary/10 hover:text-primary",
                  "text-foreground/80"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
