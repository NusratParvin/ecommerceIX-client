"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";

interface CouponDetailsDrawerProps {
  coupon: {
    id: string;
    code: string;
    discountAmount: number;
    expirationDate: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CouponDetailsDrawer = ({
  coupon,
  isOpen,
  onClose,
}: CouponDetailsDrawerProps) => {
  if (!coupon) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="max-w-md p-4 text-sm">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold">Coupon Details</SheetTitle>
        </SheetHeader>
        <div className="mt-4 max-h-[70vh] space-y-1">
          {[
            { label: "Code", value: coupon.code },
            {
              label: "Discount Amount",
              value: `$${coupon.discountAmount.toFixed(2)}`,
            },
            {
              label: "Expiration Date",
              value: format(
                new Date(coupon.expirationDate),
                "MMM d, yyyy h:mm a"
              ),
            },
            {
              label: "Created At",
              value: format(new Date(coupon.createdAt), "MMM d, yyyy h:mm a"),
            },
            {
              label: "Last Updated",
              value: format(new Date(coupon.updatedAt), "MMM d, yyyy h:mm a"),
            },
          ].map((detail) => (
            <div
              key={detail.label}
              className="flex justify-between items-center py-2"
            >
              <h3 className="font-medium text-gray-700">{detail.label}</h3>
              <p className="text-gray-600">{detail.value}</p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
