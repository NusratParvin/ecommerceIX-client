import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useGetFollowedShopsQuery } from "@/redux/features/shops/shopsApi";
import { TShop } from "@/types";
import { Users, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function FollowedShops() {
  const { data, isLoading, isError } = useGetFollowedShopsQuery(undefined);
  const followedShops = data?.data?.followedShops;
  // console.log(followedShops);

  if (!followedShops) return null;
  if (isLoading) {
    return (
      <div className="text-center py-8 bg-white border border-dashed border-slate-300 rounded-none shadow-none text-slate-700">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-600">
        Failed to load shops .
      </div>
    );
  }

  if (!followedShops.length) {
    return (
      <div className="text-center py-8 bg-white border border-dashed border-slate-300 rounded-none shadow-none text-slate-700">
        You are not following any shops!
      </div>
    );
  }
  return (
    <Card className="lg:col-span-3 bg-white border border-dashed border-slate-300 rounded-none shadow-none text-slate-700">
      <CardHeader>
        <CardTitle className="text-lg">
          Followed Shops{" "}
          <span className="font-sans">({followedShops?.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {followedShops?.length ? (
          <div className="space-y-4">
            {followedShops.map((item: { shop: TShop }) => {
              const shop = item.shop;
              return (
                <div key={shop.id} className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <Link href={`/shop/${shop.id}`}>
                      <h3 className="font-medium text-deep-brown hover:cursor-pointer   ">
                        {shop.name}
                      </h3>
                    </Link>
                  </div>
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <ShoppingBag className="mr-1 h-4 w-4" />
                      {shop._count?.products ?? 0} Products
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {shop._count?.followers ?? 0} Followers
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            You haven’t followed any shops yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
