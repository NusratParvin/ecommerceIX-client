"use client";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Package, Wallet } from "lucide-react";

interface UserStatsProps {
  stats?: {
    totalOrders: number;
    totalSpent: number;
    activeOrders: number;
    // savedItems: number;
  };
}

export function UserStats({ stats }: UserStatsProps) {
  if (!stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* <Card className="border border-dashed border-slate-300 rounded-none shadow-none h-[140px]">
        <div className="flex h-full w-full items-center justify-start gap-4">
          <CardHeader className="p-0">
            <ShoppingBag className="h-16 w-16 text-deep-brown/80" />
          </CardHeader>

          <CardContent className="p-0">
            <div className="text-sm font-medium">Total Orders</div>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">Lifetime purchases</p>
          </CardContent>
        </div>
      </Card> */}

      <Card className="relative overflow-hidden bg-white border border-dashed border-slate-300 rounded-none shadow-none h-[120px]">
        {/* left accent line */}
        <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-deep-brown/80 rounded-full" />

        <div className="flex h-full items-center gap-6 ps-6 pe-5">
          <div className="shrink-0">
            <ShoppingBag
              className="h-14 w-14 text-deep-brown/80"
              strokeWidth={1.6}
            />
          </div>

          <div className="leading-tight">
            <div className="text-3xl font-semibold font-sans">
              {stats.totalOrders}
            </div>
            <div className="text-base text-slate-700 mt-1">Total Orders</div>
          </div>
        </div>
      </Card>
      <Card className="relative overflow-hidden bg-white border border-dashed border-slate-300 rounded-none shadow-none h-[120px]">
        {/* left accent line */}
        <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-deep-brown/80 rounded-full" />

        <div className="flex h-full items-center gap-6 ps-6 pe-5">
          <div className="shrink-0">
            <Wallet
              className="h-14 w-14 text-deep-brown/80"
              strokeWidth={1.6}
            />
          </div>

          <div className="leading-tight">
            <div className="text-3xl font-semibold font-sans">
              ${stats.totalSpent.toFixed(2)}
            </div>
            <div className="text-base text-slate-700 mt-1">Total Spent</div>
          </div>
        </div>
      </Card>
      <Card className="relative overflow-hidden bg-white border border-dashed border-slate-300 rounded-none shadow-none h-[120px]">
        {/* left accent line */}
        <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-deep-brown/80 rounded-full" />

        <div className="flex h-full items-center gap-6 ps-6 pe-5">
          <div className="shrink-0">
            <Package
              className="h-14 w-14 text-deep-brown/80"
              strokeWidth={1.6}
            />
          </div>

          <div className="leading-tight">
            <div className="text-3xl font-semibold font-sans">
              {stats.activeOrders}
            </div>
            <div className="text-base text-slate-700 mt-1">Active Orders</div>
          </div>
        </div>
      </Card>

      {/*  <Card>
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
      </Card> */}
    </div>
  );
}
