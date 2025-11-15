import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, User, Package, Users } from "lucide-react";
import Image from "next/image";
import { TShopInputProp } from "@/types";

interface ViewShopDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shop: TShopInputProp | null;
}

const ViewShopDialog = ({ open, onOpenChange, shop }: ViewShopDialogProps) => {
  if (!shop) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "BLACKLISTED":
        return "bg-red-100 text-red-800";
      case "RESTRICTED":
        return "bg-yellow-100 text-yellow-800";
      case "DELETED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            Shop Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Shop Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Store className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Shop Name
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {shop.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Products
                    </p>
                    <p className="text-lg font-bold text-purple-700">
                      {shop.productCount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Followers
                    </p>
                    <p className="text-lg font-bold text-orange-700">
                      {shop.followerCount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shop Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 mb-3">
                Shop Information
              </h3>

              {/* Shop Logo */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 ">
                    {shop.logo ? (
                      <div className="h-20 w-20 relative">
                        <Image
                          src={shop.logo}
                          alt={shop.name}
                          fill
                          className="rounded-lg object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Store className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{shop.name}</p>
                      <Badge className={getStatusColor(shop.status)}>
                        {shop.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shop Description */}
              {shop.description && (
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Description
                    </h4>
                    <p className="text-sm text-gray-700">{shop.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Technical Details */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Technical Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Shop ID</span>
                      <code className="text-xs bg-gray-50 px-2 py-1 rounded border">
                        {shop.id.slice(0, 12)}...
                      </code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Created</span>
                      <span className="text-sm text-gray-900">
                        {new Date(shop.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Updated</span>
                      <span className="text-sm text-gray-900">
                        {new Date(shop.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 mb-3">
                Owner Information
              </h3>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {shop.owner.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {shop.owner.email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Owner ID</span>
                      <code className="text-xs bg-gray-50 px-2 py-1 rounded border">
                        {shop.owner.id.slice(0, 12)}...
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Shop Statistics
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {shop.productCount}
                      </div>
                      <div className="text-sm text-gray-600">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {shop.followerCount}
                      </div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewShopDialog;
