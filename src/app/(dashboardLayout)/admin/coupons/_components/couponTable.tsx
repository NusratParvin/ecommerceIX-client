import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2, Edit3, Eye, Calendar } from "lucide-react";
import { Ticket } from "lucide-react";
import moment from "moment";
import { TCoupon } from "@/types";

interface CouponsTableProps {
  coupons: TCoupon[];

  searchTerm: string;
  onEditCoupon: (coupon: TCoupon) => void;
  onDeleteCoupon: (id: string, code: string) => void;
  onViewCoupon: (coupon: TCoupon) => void;
}

const CouponsTable = ({
  coupons,

  searchTerm,
  onEditCoupon,
  onDeleteCoupon,
  onViewCoupon,
}: CouponsTableProps) => {
  const getCouponStatus = (expirationDate: string) => {
    return moment(expirationDate).isAfter(moment()) ? "active" : "expired";
  };

  const getDaysUntilExpiry = (expirationDate: string) => {
    const now = moment();
    const expiry = moment(expirationDate);
    return expiry.diff(now, "days");
  };

  if (coupons.length === 0) {
    return (
      <div className="text-center py-12">
        <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">
          {searchTerm ? "No matching coupons found" : "No coupons yet"}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {searchTerm
            ? "Try adjusting your search"
            : "Create your first coupon to get started"}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Table Header with Stats */}
      {/*  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
         <div>
          <h2 className="text-lg font-semibold text-gray-900">Coupons</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {coupons.length} of {totalCoupons} coupons
          </p>
        </div> 
       
      </div>*/}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 font-bold">#</TableHead>
              <TableHead className="min-w-[140px] font-bold">
                Coupon Code
              </TableHead>
              <TableHead className="min-w-[100px] font-bold">
                Discount
              </TableHead>
              <TableHead className="min-w-[120px] font-bold">
                Expiration
              </TableHead>
              <TableHead className="min-w-[100px] font-bold">Status</TableHead>
              <TableHead className="min-w-[120px] font-bold">Created</TableHead>
              <TableHead className="text-right min-w-[160px] font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon: TCoupon, index: number) => (
              <TableRow key={coupon.id} className="hover:bg-gray-50/50">
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-gray-900 font-mono text-sm py-1 rounded cursor-help">
                          {coupon.code}
                        </div>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-xs text-gray-500 font-mono truncate cursor-help">
                            ID: {coupon.id.slice(0, 8)}...
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{coupon.id}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-center font-semibold text-green-700">
                    {coupon.discountAmount}%
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">
                        {moment(coupon.expirationDate).format("MMM DD, YYYY")}
                      </div>
                      {getCouponStatus(coupon.expirationDate) === "active" && (
                        <div className="text-xs text-green-600">
                          {getDaysUntilExpiry(coupon.expirationDate)} days left
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      getCouponStatus(coupon.expirationDate) === "active"
                        ? "default"
                        : "destructive"
                    }
                    className={
                      getCouponStatus(coupon.expirationDate) === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }
                  >
                    {getCouponStatus(coupon.expirationDate) === "active"
                      ? "Active"
                      : "Expired"}
                  </Badge>
                </TableCell>

                <TableCell className="text-sm text-gray-600">
                  {moment(coupon.createdAt).format("MMM DD, YYYY")}
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => onViewCoupon(coupon)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View coupon details</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => onEditCoupon(coupon)}
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit coupon</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeleteCoupon(coupon.id, coupon.code)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete coupon</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CouponsTable;
