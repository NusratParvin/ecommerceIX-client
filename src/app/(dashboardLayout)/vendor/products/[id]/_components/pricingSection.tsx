import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import { format } from "date-fns";
import { Timer, Tag } from "lucide-react";

interface PricingSectionProps {
  product: Product;
}

export const PricingSection = ({ product }: PricingSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Pricing & Promotions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Base Price</p>
            <p className="text-2xl font-bold text-deep-brown">
              ${product?.price}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Current Stock</p>
            <Badge variant={product?.stock < 10 ? "destructive" : "secondary"}>
              {product?.stock} units available
            </Badge>
          </div>
        </div>

        {product?.discount > 0 && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-green-700">
                Discount Active
              </span>
              <Badge variant="secondary" className="text-green-700">
                {product?.discount}% OFF
              </Badge>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Sale Price: $
              {(product?.price * (1 - product?.discount / 100)).toFixed(2)}
            </p>
          </div>
        )}

        {product?.isFlashSale && product?.flashSalePrice && (
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-red-700">
                Flash Sale Active
              </span>
              <Badge variant="destructive">
                {Math.round(
                  ((product?.price - product?.flashSalePrice) /
                    product?.price) *
                    100
                )}
                % OFF
              </Badge>
            </div>
            <p className="text-sm text-red-600 mt-1">
              Flash Sale Price: ${product?.flashSalePrice}
            </p>
            {product?.flashSaleEndDate && (
              <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                <Timer className="w-4 h-4" />
                Ends: {format(new Date(product?.flashSaleEndDate), "PPP")}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
