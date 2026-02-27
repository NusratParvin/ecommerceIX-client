import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, User, Store, DollarSign, MapPin } from "lucide-react";
import { TOrder } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ViewOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: TOrder | null;
}

const ViewOrderDialog = ({
  open,
  onOpenChange,
  order,
}: ViewOrderDialogProps) => {
  if (!order) return null;

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "UNPAID":
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] md:max-w-4xl max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          {/* Order Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Order ID
                    </p>
                    <p className="text-base font-bold text-gray-900 font-mono">
                      {order.id}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Amount
                    </p>
                    <p className="text-base font-bold text-purple-700">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer and Shop Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 mb-3">
                Customer Information
              </h3>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.user.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.user.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 mb-3">
                Shop Information
              </h3>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Store className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.shop.name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 mb-3">
                Order Information
              </h3>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Payment Status
                      </span>
                      <Badge
                        className={getPaymentStatusColor(order.paymentStatus)}
                      >
                        {order.paymentStatus}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Payment Method
                      </span>
                      <span className="text-sm text-gray-900 capitalize">
                        {order.paymentMethod.replace("_", " ")}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Order Date</span>
                      <span className="text-sm text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {order.coupon && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Coupon Used
                        </span>
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700"
                        >
                          {order.coupon.code} (-{order.coupon.discountAmount}%)
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 mb-3">
                Shipping Information
              </h3>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">
                        {order.shippingInfo.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.shippingInfo.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.shippingInfo.city}, {order.shippingInfo.country}
                      </p>
                      <p className="text-sm text-gray-600">
                        Postal Code: {order.shippingInfo.postalCode}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Order Items ({order.items.length})
            </h3>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-2 border-b last:border-b-0"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          Item {index + 1}
                        </p>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-sm text-gray-600 cursor-help">
                              Product ID: {item.productId.slice(0, 8)}...
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.productId}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewOrderDialog;
