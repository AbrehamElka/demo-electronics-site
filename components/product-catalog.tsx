"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Search, Filter, X, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderModal } from "@/components/order-modal";

// Mock product data
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "Smartphones",
    brand: "Apple",
    price: 1199,
    discountPrice: 1099,
    rating: 4.9,
    reviews: 128,
    image: "/iphone-15-pro-max.jpg",
    tag: "Best Seller",
    inStock: true,
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    category: "Laptops",
    brand: "Apple",
    price: 2399,
    discountPrice: null,
    rating: 4.8,
    reviews: 89,
    image: "/macbook-pro-laptop-silver.jpg",
    tag: "New Arrival",
    inStock: true,
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    category: "Smartphones",
    brand: "Samsung",
    price: 1299,
    discountPrice: 1199,
    rating: 4.7,
    reviews: 156,
    image: "/samsung-galaxy-s24-ultra.jpg",
    tag: "Hot Deal",
    inStock: true,
  },
  {
    id: 4,
    name: "AirPods Pro 2nd Gen",
    category: "Audio",
    brand: "Apple",
    price: 249,
    discountPrice: 199,
    rating: 4.6,
    reviews: 203,
    image: "/apple-airpods-pro-white-earbuds.jpg",
    tag: "Limited Offer",
    inStock: true,
  },
  {
    id: 5,
    name: "Dell XPS 13",
    category: "Laptops",
    brand: "Dell",
    price: 1299,
    discountPrice: 1199,
    rating: 4.5,
    reviews: 67,
    image: "/iphone-15-pro-max.jpg",
    tag: "Popular",
    inStock: true,
  },
  {
    id: 6,
    name: "iPad Pro 12.9",
    category: "Tablets",
    brand: "Apple",
    price: 1099,
    discountPrice: null,
    rating: 4.8,
    reviews: 94,
    image: "/macbook-pro-laptop-silver.jpg",
    tag: "Professional",
    inStock: false,
  },
  {
    id: 7,
    name: "Sony WH-1000XM5",
    category: "Audio",
    brand: "Sony",
    price: 399,
    discountPrice: 349,
    rating: 4.7,
    reviews: 178,
    image: "/apple-airpods-pro-white-earbuds.jpg",
    tag: "Premium",
    inStock: true,
  },
  {
    id: 8,
    name: "Google Pixel 8 Pro",
    category: "Smartphones",
    brand: "Google",
    price: 999,
    discountPrice: 899,
    rating: 4.6,
    reviews: 112,
    image: "/samsung-galaxy-s24-ultra.jpg",
    tag: "AI Powered",
    inStock: true,
  },
  {
    id: 9,
    name: "Surface Laptop 5",
    category: "Laptops",
    brand: "Microsoft",
    price: 1599,
    discountPrice: null,
    rating: 4.4,
    reviews: 45,
    image: "/samsung-galaxy-s24-ultra.jpg",
    tag: "Business",
    inStock: true,
  },
  {
    id: 10,
    name: "Samsung Galaxy Tab S9",
    category: "Tablets",
    brand: "Samsung",
    price: 799,
    discountPrice: 699,
    rating: 4.5,
    reviews: 87,
    image: "/macbook-pro-laptop-silver.jpg",
    tag: "Creative",
    inStock: true,
  },
  {
    id: 11,
    name: "Bose QuietComfort 45",
    category: "Audio",
    brand: "Bose",
    price: 329,
    discountPrice: 279,
    rating: 4.6,
    reviews: 145,
    image: "/apple-airpods-pro-white-earbuds.jpg",
    tag: "Noise Cancelling",
    inStock: true,
  },
  {
    id: 12,
    name: "OnePlus 12",
    category: "Smartphones",
    brand: "OnePlus",
    price: 899,
    discountPrice: 799,
    rating: 4.5,
    reviews: 98,
    image: "/macbook-pro-laptop-silver.jpg",
    tag: "Fast Charging",
    inStock: true,
  },
];

const categories = ["All", "Smartphones", "Laptops", "Tablets", "Audio"];
const brands = [
  "All",
  "Apple",
  "Samsung",
  "Google",
  "Dell",
  "Sony",
  "Bose",
  "Microsoft",
  "OnePlus",
];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

export function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function formatNumber(num: number): string {
    return new Intl.NumberFormat("en-US").format(num);
  }
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      // Brand filter
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      // Price filter
      const currentPrice = product.discountPrice || product.price;
      const matchesPrice =
        currentPrice >= priceRange[0] && currentPrice <= priceRange[1];

      // Stock filter
      const matchesStock = !inStockOnly || product.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesStock
      );
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
        );
        break;
      case "price-high":
        filtered.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
        );
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [
    searchQuery,
    selectedCategory,
    selectedBrands,
    priceRange,
    sortBy,
    inStockOnly,
  ]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedBrands([]);
    setPriceRange([0, 3000]);
    setInStockOnly(false);
    setSortBy("featured");
  };

  const handleOrderClick = (product: (typeof products)[0]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-muted-foreground text-lg">
          Discover our complete collection of mobile phones and electronics
        </p>
      </div>

      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products, brands, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            {(selectedBrands.length > 0 ||
              selectedCategory !== "All" ||
              searchQuery) && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Active filters:
                </span>
                {selectedCategory !== "All" && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCategory}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedCategory("All")}
                    />
                  </Badge>
                )}
                {selectedBrands.map((brand) => (
                  <Badge key={brand} variant="secondary" className="gap-1">
                    {brand}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleBrandChange(brand, false)}
                    />
                  </Badge>
                ))}
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    &quot;{searchQuery}&quot;
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSearchQuery("")}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                No products found matching your criteria
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                        {product.tag}
                      </Badge>
                      {!product.inStock && (
                        <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {product.category} • {product.brand}
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
                            <Badge variant="destructive" className="text-xs">
                              Save
                              {formatNumber(
                                product.price - product.discountPrice
                              )}{" "}
                              birr
                            </Badge>
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
                        disabled={!product.inStock}
                        onClick={() => handleOrderClick(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? "Order Now" : "Out of Stock"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* OrderModal component */}
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
    </div>
  );
}
