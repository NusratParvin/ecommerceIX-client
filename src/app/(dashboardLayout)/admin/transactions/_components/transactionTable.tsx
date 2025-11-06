"use client";

import { TTransaction } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import moment from "moment";

interface TransactionsTableProps {
  transactions: TTransaction[];
  currentPage: number;
  itemsPerPage: number;
  onRowClick: (transaction: TTransaction) => void;
}

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

export const TransactionsTable = ({
  transactions,
  currentPage,
  itemsPerPage,
  onRowClick,
}: TransactionsTableProps) => {
  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 font-bold">#</TableHead>
              <TableHead className="min-w-32 font-bold">
                Transaction ID
              </TableHead>
              <TableHead className="min-w-28 font-bold">User</TableHead>
              <TableHead className="min-w-28 font-bold">Order ID</TableHead>
              <TableHead className="min-w-24 font-bold">Amount</TableHead>
              <TableHead className="min-w-28 font-bold">
                Payment Method
              </TableHead>
              <TableHead className="min-w-28 font-bold">Status</TableHead>
              <TableHead className="min-w-24 font-bold">Type</TableHead>
              <TableHead className="min-w-32 font-bold">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction: TTransaction, index: number) => (
              <TableRow
                key={transaction.id}
                className="hover:bg-gray-50/50 cursor-pointer"
                onClick={() => onRowClick(transaction)}
              >
                <TableCell className="font-medium">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>

                {/* Transaction ID with Tooltip */}
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded cursor-help">
                        {transaction.id.slice(0, 8)}...
                      </code>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{transaction.id}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>

                <TableCell>
                  <div>
                    <div className="font-medium text-sm">
                      {transaction.user.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {transaction.user.email}
                    </div>
                  </div>
                </TableCell>

                {/* Order ID with Tooltip */}
                <TableCell>
                  {transaction.order ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded cursor-help">
                          {transaction.order.id.slice(0, 8)}...
                        </code>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{transaction.order.id}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <span className="text-gray-400 text-sm">N/A</span>
                  )}
                </TableCell>

                <TableCell className="font-semibold text-green-600">
                  ${transaction.amount.toFixed(2)}
                </TableCell>

                <TableCell>
                  <span className="text-sm capitalize">
                    {transaction.paymentMethod?.toLowerCase()}
                  </span>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getPaymentStatusVariant(
                      transaction.paymentStatus
                    )}`}
                  >
                    {transaction.paymentStatus}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getTransactionTypeVariant(
                      transaction.type
                    )}`}
                  >
                    {transaction.type}
                  </Badge>
                </TableCell>

                <TableCell className="text-sm text-gray-600">
                  {moment(transaction.createdAt).format("MMM DD, YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};
