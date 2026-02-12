"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { TOrder } from "@/types";
import moment from "moment";
import { useGetAdminDashboardRecentOrdersInfoQuery } from "@/redux/features/analytics/analyticsApi";
import { Spinner } from "@/components/ui/spinner";

export const RecentOrders = () => {
  const {
    data: recentOrdersData,
    isLoading,
    error,
  } = useGetAdminDashboardRecentOrdersInfoQuery(undefined);

  const orders = recentOrdersData?.data || [];

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner />
        </div>
      ) : error ? (
        <div className="p-6 text-center text-sm text-red-600">
          Failed to load recent orders
        </div>
      ) : orders.length === 0 ? (
        <div className="p-6 text-center text-sm text-gray-500">
          No recent orders found
        </div>
      ) : (
        <TooltipProvider>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-semibold text-gray-700">
                    Order ID
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">
                    Amount
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 8).map((order: TOrder) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-gray-900 font-mono  text-sm">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">
                            #{order.id.slice(0, 8)}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{order.id}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    {/* <TableCell>
                      <div className="flex items-center gap-3 font-medium text-sm">
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
                    </TableCell> */}
                    <TableCell>
                      {order.paymentStatus === "PAID" ? (
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-700 hover:bg-green-100"
                        >
                          {order.paymentStatus}
                        </Badge>
                      ) : (
                        <Badge
                          variant="destructive"
                          className="bg-red-100 text-red-700 hover:bg-red-100"
                        >
                          {order.paymentStatus}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-green-600">
                      ${order.totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {moment(order.createdAt).format("MMM DD, YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TooltipProvider>
      )}
    </div>
  );
};
