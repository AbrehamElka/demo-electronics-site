import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Laptop, Headphones } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                Latest <span className="text-primary">Mobile</span> &
                <span className="text-gray-700"> Electronics</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-lg">
                Discover cutting-edge technology with our premium collection of
                smartphones, laptops, and electronics. Quality guaranteed,
                prices unmatched.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent"
              >
                View Deals
              </Button>
            </div>

            {/* Feature Icons */}
            <div className="flex items-center gap-8 pt-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Smartphone className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Latest Phones</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Laptop className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">Premium Laptops</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Headphones className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Audio Gear</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/landingPageImage.png"
                alt="Latest mobile phones and electronics"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
