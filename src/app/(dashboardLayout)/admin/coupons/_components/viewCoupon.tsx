import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, Hash, Percent } from "lucide-react";
import moment from "moment";
import { TCoupon } from "@/types";

interface ViewCouponDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  viewCoupon: TCoupon | null;
  onEditClick: () => void;
}

const ViewCouponDialog = ({
  open,
  onOpenChange,
  viewCoupon,
  onEditClick,
}: ViewCouponDialogProps) => {
  if (!viewCoupon) return null;

  const getCouponStatus = (expirationDate: string) => {
    return moment(expirationDate).isAfter(moment()) ? "active" : "expired";
  };

  const getDaysUntilExpiry = (expirationDate: string) => {
    const now = moment();
    const expiry = moment(expirationDate);
    return expiry.diff(now, "days");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5" />
            Coupon Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Coupon Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Hash className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Coupon Code
                    </p>
                    <p className="text-xl font-bold text-gray-900 font-mono">
                      {viewCoupon.code}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Percent className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Discount
                    </p>
                    <p className="text-xl font-bold text-green-700">
                      {viewCoupon.discountAmount}% OFF
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Coupon Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge
                      variant={
                        getCouponStatus(viewCoupon.expirationDate) === "active"
                          ? "default"
                          : "destructive"
                      }
                      className={
                        getCouponStatus(viewCoupon.expirationDate) === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {getCouponStatus(viewCoupon.expirationDate) === "active"
                        ? "Active"
                        : "Expired"}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Created</span>
                    <span className="text-sm text-gray-900">
                      {moment(viewCoupon.createdAt).format("MMM DD, YYYY")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Expires</span>
                    <span className="text-sm text-gray-900">
                      {moment(viewCoupon.expirationDate).format("MMM DD, YYYY")}
                    </span>
                  </div>

                  {getCouponStatus(viewCoupon.expirationDate) === "active" && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Days Left</span>
                      <span className="text-sm text-green-600 font-medium">
                        {getDaysUntilExpiry(viewCoupon.expirationDate)} days
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Coupon ID
                  </p>
                  <code className="text-xs bg-gray-50 px-2 py-1 rounded border break-all">
                    {viewCoupon.id}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={onEditClick}>Edit Coupon</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCouponDialog;
