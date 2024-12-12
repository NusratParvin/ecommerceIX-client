"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, CreditCard, Package, Bookmark } from "lucide-react";

interface UserStatsProps {
  stats?: {
    totalOrders: number;
    totalSpent: number;
    activeOrders: number;
    savedItems: number;
  };
}

export function UserStats({ stats }: UserStatsProps) {
  if (!stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalOrders}</div>
          <p className="text-xs text-muted-foreground">Lifetime purchases</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${stats.totalSpent.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Lifetime value</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeOrders}</div>
          <p className="text-xs text-muted-foreground">In progress</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
          <Bookmark className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.savedItems}</div>
          <p className="text-xs text-muted-foreground">Wishlist items</p>
        </CardContent>
      </Card>
    </div>
  );
}
