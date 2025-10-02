"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  shop: string;
}

interface RecentlyViewedProductsProps {
  products?: Product[];
  className?: string;
}

export function RecentlyViewedProducts({
  products,
  className,
}: RecentlyViewedProductsProps) {
  if (!products) return null;

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Recently Viewed Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center space-x-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image
                  src={product.imageUrl || " "}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {product.name}
                </p>
                <p className="text-sm text-muted-foreground">{product.shop}</p>
              </div>
              <div className="text-sm font-medium">${product.price}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
