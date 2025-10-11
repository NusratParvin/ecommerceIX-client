"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
// import { Package } from "lucide-react";
import Image from "next/image";

export const TrendingProducts = ({ products }: { products: Product[] }) => {
  // Filter first, then process only products with orders
  const productsWithOrders = products.filter(
    (product) => product.OrderItem && product.OrderItem.length > 0
  );

  const trendingProducts = productsWithOrders?.map((p) => {
    const totalSold = p.OrderItem?.reduce((sum, o) => sum + o.quantity, 0) || 0;
    const totalRevenue =
      p.OrderItem?.reduce((sum, o) => sum + o.quantity * o.price, 0) || 0;

    return {
      name: p.name,
      image: p.imageUrl,
      sold: totalSold,
      revenue: totalRevenue,
    };
  });

  trendingProducts.sort((a, b) => b?.revenue - a?.revenue).slice(0, 5);

  // console.log(trendingProducts);

  return (
    <Card className="col-span-2 bg-white border border-dashed border-slate-300 rounded-none shadow-none max-h-[400px] overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-base">Trending products</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 text-sm">
          {trendingProducts.map((product) => (
            <div
              key={product.name}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <div className="h-14 w-16 relative bg-primary/10 rounded-none">
                  <Image
                    src={product.image || ""}
                    fill
                    alt="Product Image"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.sold} sold
                  </p>
                </div>
              </div>
              <p className="font-bold font-sans">${product.revenue}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
