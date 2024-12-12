"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

const topProducts = [
  { name: "Gaming Laptop", sales: 125, revenue: "$125,000" },
  { name: "Wireless Earbuds", sales: 89, revenue: "$8,900" },
  { name: "Smart Watch", sales: 65, revenue: "$19,500" },
];

export function TopProducts() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product) => (
            <div
              key={product.name}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Package className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.sales} sales
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium">{product.revenue}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
