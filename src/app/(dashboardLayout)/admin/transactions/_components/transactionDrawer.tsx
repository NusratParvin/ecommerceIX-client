"use client";

import { TTransaction } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin } from "lucide-react";

interface TransactionDrawerProps {
  transaction: TTransaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionDrawer = ({
  transaction,
  isOpen,
  onClose,
}: TransactionDrawerProps) => {
  if (!transaction) return null;

  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-50 text-green-700 border-green-200";
      case "PENDING":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "FAILED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getTransactionTypeVariant = (type: string) => {
    switch (type) {
      case "ORDER_PAYMENT":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "REFUND":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "SUBSCRIPTION":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
          <DialogTitle className="text-xl">Transaction Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Transaction Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3 ps-5">
              <div className="flex items-baseline gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-600">Amount</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${transaction.amount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Payment Method
                  </p>
                  <p className="text-sm capitalize">
                    {transaction.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <Badge
                  className={`mt-1 ${getPaymentStatusVariant(
                    transaction.paymentStatus
                  )}`}
                >
                  {transaction.paymentStatus}
                </Badge>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600">Type</p>
                <Badge
                  className={`mt-1 ${getTransactionTypeVariant(
                    transaction.type
                  )}`}
                >
                  {transaction.type.replace("_", " ")}
                </Badge>
              </div>
            </div>
          </div>

          {/* Transaction IDs */}
          <div className="grid grid-cols-1 gap-3 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Transaction ID
              </p>
              <code className="text-xs bg-white px-2 py-1 rounded border break-all">
                {transaction.id}
              </code>
            </div>
            {transaction.stripePaymentIntentId && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Stripe Payment ID
                </p>
                <code className="text-xs bg-white px-2 py-1 rounded border break-all">
                  {transaction.stripePaymentIntentId}
                </code>
              </div>
            )}
          </div>

          {/* Order Information */}
          {transaction.order && (
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-green-600" />
                <h3 className="font-medium text-green-900">
                  Order Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-700">Order ID</p>
                  <code className="text-xs bg-white px-2 py-1 rounded border break-all">
                    {transaction.order.id}
                  </code>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">
                    Total Price
                  </p>
                  <p className="text-sm font-semibold">
                    ${transaction.order.totalPrice.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">
                    Payment Status
                  </p>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      transaction.order.paymentStatus === "PAID"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {transaction.order.paymentStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">
                    Payment Method
                  </p>
                  <p className="text-sm capitalize">
                    {transaction.order.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Shipping Information */}
              {transaction.order.shippingInfo && (
                <div className="mt-4 pt-4 border-t border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <h4 className="font-medium text-green-900">
                      Shipping Information
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-green-700">Name</p>
                      <p className="text-sm">
                        {transaction.order.shippingInfo.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-700">
                        Address
                      </p>
                      <p className="text-sm">
                        {transaction.order.shippingInfo.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-700">City</p>
                      <p className="text-sm">
                        {transaction.order.shippingInfo.city}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-700">
                        Country
                      </p>
                      <p className="text-sm">
                        {transaction.order.shippingInfo.country}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-700">
                        Postal Code
                      </p>
                      <p className="text-sm">
                        {transaction.order.shippingInfo.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
