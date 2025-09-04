"use client";

import type React from "react";

import { use } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Star } from "lucide-react";
import { products } from "@/lib/product-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ViewProduct({ params }: PageProps) {
  const { id } = use(params);
  const product = products.find((p) => p.id === Number.parseInt(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link href="/admin">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Product Details</h1>
            <p className="text-muted-foreground">View product information</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/admin/product/${product.id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Product
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <Card>
          <CardContent className="p-6">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </CardContent>
        </Card>

        {/* Product Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Product Name
                </Label>
                <p className="text-lg font-semibold">{product.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Category
                  </Label>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Brand
                  </Label>
                  <p className="font-medium">{product.brand}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Tag
                </Label>
                <div className="mt-1">
                  <Badge variant="secondary">{product.tag}</Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Stock Status
                </Label>
                <div className="mt-1">
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Original Price
                  </Label>
                  <p className="text-lg font-semibold">${product.price}</p>
                </div>
                {product.discountPrice && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Discount Price
                    </Label>
                    <p className="text-lg font-semibold text-primary">
                      ${product.discountPrice}
                    </p>
                  </div>
                )}
              </div>

              {product.discountPrice && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Savings
                  </Label>
                  <p className="text-lg font-semibold text-green-600">
                    ${product.price - product.discountPrice}
                    <span className="text-sm ml-1">
                      (
                      {Math.round(
                        ((product.price - product.discountPrice) /
                          product.price) *
                          100
                      )}
                      % off)
                    </span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Label({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={className} {...props}>
      {children}
    </label>
  );
}
