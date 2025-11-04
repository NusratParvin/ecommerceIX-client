/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import {
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  Calendar,
  Store,
  Copy,
} from "lucide-react";
import Image from "next/image";
import moment from "moment";
import { ShopDetailsDrawer } from "../../../shops/_components/shopDrawer";
import { useState } from "react";
import { TShopInputProp } from "@/types";

interface OverviewTabProps {
  product: Product;
  copyToClipboard: (text: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  product,
  copyToClipboard,
}) => {
  const [selectedShop, setSelectedShop] = useState<TShopInputProp | null>(null);

  const handleViewShop = (shop: any) => {
    if (!shop) return;

    // Transform the shop data to match TShopInputProp
    const transformedShop: TShopInputProp = {
      id: shop.id,
      name: shop.name,
      description: shop.description,
      logo: shop.logo || "",
      ownerId: shop.ownerId,
      owner: shop.owner || { name: "Unknown", id: "", email: "" },
      status: shop.status || "ACTIVE",
      productCount: shop.productCount || 0,
      followerCount: shop.followerCount || 0,
      createdAt: shop.createdAt,
      updatedAt: shop.updatedAt,
    };
    setSelectedShop(transformedShop);
  };

  const closeDrawer = () => {
    setSelectedShop(null);
  };

  // console.log(product);
  // Calculate stats
  const totalRevenue = product.OrderItem
    ? product.OrderItem.reduce((acc, order) => {
        return acc + order.price * order.quantity;
      }, 0)
    : 0;

  const totalUnitsSold = product.OrderItem
    ? product.OrderItem.reduce((acc, order) => {
        return acc + order.quantity;
      }, 0)
    : 0;

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length
      : 0;

  const orderCount = (product.OrderItem || []).length;
  const reviewCount = (product.reviews || []).length;

  //   console.log(product?.shop);
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              From {totalUnitsSold} units sold
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stock Level</p>
                <p
                  className={`text-2xl font-bold ${
                    product.stock < 10
                      ? "text-red-600"
                      : product.stock < 20
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {product.stock}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {product.stock < 10
                ? "Low stock"
                : product.stock < 20
                ? "Moderate stock"
                : "Good stock"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Customer Rating
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {averageRating.toFixed(1)}
                  </p>
                  <Users className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{reviewCount} reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Order Count</p>
                <p className="text-2xl font-bold text-gray-900">{orderCount}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Total orders placed</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-square rounded-lg overflow-hidden border">
                  <Image
                    src={product.imageUrl || ""}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Category
                      </p>
                      <p className="text-sm text-gray-900">
                        {product.category?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Product ID
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-sm text-gray-900 font-mono">
                          {product.id.slice(0, 8)}...
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(product.id)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Product Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Product Created</p>
                  <p className="text-xs text-gray-500">
                    {moment(product.createdAt).format("MMMM DD,YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-xs text-gray-500">
                    {moment(product.updatedAt).format("MMMM DD,YYYY")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shop Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Shop Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {product.shop?.logo ? (
                    <Image
                      src={product.shop.logo}
                      alt={product.shop.name}
                      width={40}
                      height={40}
                      className=" object-cover "
                    />
                  ) : (
                    <Store className="w-5 h-5 text-gray-600" />
                  )}
                </div>

                <div>
                  <p className="font-medium">{product.shop?.name}</p>
                  <p className="text-sm text-gray-500">
                    {product.shop?.status}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleViewShop(product?.shop)}
              >
                View Shop Details
              </Button>
            </CardContent>
          </Card>
          {/* Shop Details Drawer */}
          <ShopDetailsDrawer
            isOpen={!!selectedShop}
            onClose={closeDrawer}
            shop={selectedShop}
          />
        </div>
      </div>
    </div>
  );
};
