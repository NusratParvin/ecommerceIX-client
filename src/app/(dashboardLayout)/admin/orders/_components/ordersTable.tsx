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
import { Eye, Package } from "lucide-react";
import { TOrder } from "@/types";

interface OrdersTableProps {
  orders: TOrder[];
  currentPage: number;
  itemsPerPage: number;
  searchTerm: string;
  onViewOrder: (order: TOrder) => void;
}

const OrdersTable = ({
  orders,
  currentPage,
  itemsPerPage,
  searchTerm,
  onViewOrder,
}: OrdersTableProps) => {
  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case "PAID":
        return "default";
      case "PENDING":
        return "secondary";
      case "FAILED":
        return "destructive";
      case "REFUNDED":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "FAILED":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "REFUNDED":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">
          {searchTerm ? "No matching orders found" : "No orders yet"}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {searchTerm ? "Try adjusting your search" : "Orders will appear here"}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Table Content */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 font-bold">#</TableHead>
              <TableHead className="min-w-[140px] font-bold">
                Order ID
              </TableHead>

              <TableHead className="min-w-[100px] font-bold">Amount</TableHead>
              <TableHead className="min-w-[100px] font-bold">Items</TableHead>
              <TableHead className="min-w-[120px] font-bold">Coupon</TableHead>
              <TableHead className="min-w-[100px] font-bold">Status</TableHead>
              <TableHead className="min-w-[120px] font-bold">Date</TableHead>
              <TableHead className="text-right min-w-[100px] font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: TOrder, index: number) => (
              <TableRow key={order.id} className="hover:bg-gray-50/50">
                <TableCell className="font-medium text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 font-mono text-sm">
                        {order.id.slice(0, 8)}...
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-xs text-gray-500 font-mono truncate cursor-help">
                            ID: {order.id}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{order.id}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-center font-semibold text-green-700">
                    ${order.totalPrice.toFixed(2)}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-center font-medium text-blue-700">
                    {order.items.length}
                  </div>
                </TableCell>

                <TableCell>
                  {order.coupon ? (
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                      {order.coupon.code} (-{order.coupon.discountAmount}%)
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-gray-50 text-gray-500"
                    >
                      No Coupon
                    </Badge>
                  )}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={getPaymentStatusVariant(order.paymentStatus)}
                    className={getPaymentStatusColor(order.paymentStatus)}
                  >
                    {order.paymentStatus}
                  </Badge>
                </TableCell>

                <TableCell className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <div className="flex justify-end">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => onViewOrder(order)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View order details</p>
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

export default OrdersTable;
