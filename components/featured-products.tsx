"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { OrderModal } from "@/components/order-modal";
import Image from "next/image";
const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "Smartphones",
    price: 150000,
    discountPrice: 147000,
    rating: 4.9,
    image: "iphone-15-pro-max.jpg",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    category: "Laptops",
    price: 300000,
    discountPrice: null,
    rating: 4.8,
    image: "macbook-pro-laptop-silver.jpg",
    tag: "New Arrival",
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    category: "Smartphones",
    price: 140000,
    discountPrice: 138000,
    rating: 4.7,
    image: "samsung-galaxy-s24-ultra.jpg",
    tag: "Hot Deal",
  },
  {
    id: 4,
    name: "AirPods Pro 2nd Gen",
    category: "Audio",
    price: 2500,
    discountPrice: 2400,
    rating: 4.6,
    image: "apple-airpods-pro-white-earbuds.jpg",
    tag: "Limited Offer",
  },
];

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof featuredProducts)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderClick = (product: (typeof featuredProducts)[0]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  function formatNumber(num: number): string {
    return new Intl.NumberFormat("en-US").format(num);
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover our handpicked selection of the latest and most popular
            tech products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={`/${product.image}`}
                    alt={product.name}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={400}
                    height={256}
                  />
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                    {product.tag}
                  </Badge>
                </div>

                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {product.category}
                    </p>
                    <h3 className="font-semibold text-lg text-balance leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {product.discountPrice ? (
                      <>
                        <span className="text-lg font-bold text-primary">
                          {formatNumber(product.discountPrice)} birr
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {formatNumber(product.price)} birr
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-foreground">
                        {formatNumber(product.price)} birr
                      </span>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => handleOrderClick(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>

      {selectedProduct && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={closeModal}
          productName={selectedProduct.name}
          productPrice={
            selectedProduct.discountPrice
              ? `$${selectedProduct.discountPrice}`
              : `$${selectedProduct.price}`
          }
        />
      )}
    </section>
  );
}
