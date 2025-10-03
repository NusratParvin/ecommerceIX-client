"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/types";

export function RecentlyViewedProducts() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const recentProductsKey = "recentProducts";

    // Fetch and parse localStorage
    const storedProducts = JSON.parse(
      localStorage.getItem(recentProductsKey) || "[]"
    ) as (Product | null)[];

    // Filter out null or undefined values
    const validProducts = storedProducts.filter(
      (product): product is Product => product !== null && product !== undefined
    );

    setRecentProducts(validProducts);
  }, []);

  return (
    <Card className="lg:col-span-4 bg-white border border-dashed border-slate-300 rounded-none shadow-none text-slate-700">
      <CardHeader>
        <CardTitle className="text-lg">Recently Viewed Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="flex items-center space-x-4  ">
              <div className="relative h-14 w-20 overflow-hidden rounded-none">
                <Image
                  src={product.imageUrl || " "}
                  alt={product.name}
                  fill
                  className="object-cover rounded-none"
                />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold leading-none">
                  {product.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {product.shop?.name}
                </p>
              </div>
              <div className="text-sm font-bold font-sans">
                ${product.price}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
