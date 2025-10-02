import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Users, ShoppingBag } from "lucide-react";

interface Shop {
  id: string;
  name: string;
  productCount: number;
  followers: number;
}

interface FollowedShopsProps {
  shops?: Shop[];
  className?: string;
}

export function FollowedShops({ shops, className }: FollowedShopsProps) {
  if (!shops) return null;

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Followed Shops</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shops.map((shop) => (
            <div key={shop.id} className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{shop.name}</h3>
              </div>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <ShoppingBag className="mr-1 h-4 w-4" />
                  {shop.productCount} Products
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  {shop.followers} Followers
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
