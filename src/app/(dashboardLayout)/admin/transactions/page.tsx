// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { Spinner } from "@/components/ui/spinner";
// import {
//   BarChart3,
//   Search,
//   Filter,
//   Download,
//   Calendar,
//   CreditCard,
//   User,
//   Package,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { TTransaction } from "@/types";
// import { useGetAdminTransactionsQuery } from "@/redux/features/transactions/transactionsApi";
// import { TransactionDrawer } from "./_components/transactionDrawer";

// const AdminTransactionsPage = () => {
//   const initialSortBy = "createdAt";
//   const initialSortOrder = "desc";
//   const initialSearchTerm = "";
//   const initialPage = 1;

//   const [userId, setUserId] = useState<string | null>(null);
//   const [orderId, setOrderId] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
//   const [page, setPage] = useState(initialPage);
//   const [limit] = useState(10);
//   const [sortBy, setSortBy] = useState(initialSortBy);
//   const [sortOrder, setSortOrder] = useState(initialSortOrder);
//   const [selectedTransaction, setSelectedTransaction] =
//     useState<TTransaction | null>(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const { data, isLoading, error } = useGetAdminTransactionsQuery({
//     page,
//     limit,
//     userId,
//     orderId,
//     searchTerm,
//     sortBy,
//     sortOrder,
//   });

//   const transactions = data?.data || [];
//   const totalRecords = data?.meta?.total || 0;
//   const totalPages = Math.ceil(totalRecords / limit);

//   useEffect(() => {
//     setPage(1);
//   }, [searchTerm, userId, orderId, sortBy, sortOrder]);

//   const getPaymentStatusVariant = (status: string) => {
//     switch (status) {
//       case "PAID":
//         return "bg-green-50 text-green-700 border-green-200";
//       case "PENDING":
//         return "bg-yellow-50 text-yellow-700 border-yellow-200";
//       case "FAILED":
//         return "bg-red-50 text-red-700 border-red-200";
//       default:
//         return "bg-gray-50 text-gray-700 border-gray-200";
//     }
//   };

//   const getTransactionTypeVariant = (type: string) => {
//     switch (type) {
//       case "ORDER_PAYMENT":
//         return "bg-blue-50 text-blue-700 border-blue-200";
//       case "REFUND":
//         return "bg-orange-50 text-orange-700 border-orange-200";
//       case "SUBSCRIPTION":
//         return "bg-purple-50 text-purple-700 border-purple-200";
//       default:
//         return "bg-gray-50 text-gray-700 border-gray-200";
//     }
//   };

//   const handleRowClick = (transaction: TTransaction) => {
//     setSelectedTransaction(transaction);
//     setIsDrawerOpen(true);
//   };

//   const paidTransactions = transactions.filter(
//     (t: TTransaction) => t.paymentStatus === "PAID"
//   ).length;
//   const pendingTransactions = transactions.filter(
//     (t: TTransaction) => t.paymentStatus === "UNPAID"
//   ).length;

//   return (
//     <div className="min-h-screen bg-gray-50/30 p-2 space-y-4">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <div className="flex items-center gap-1 text-slate-700">
//             <BarChart3 className="w-4 h-4" />
//             <h1 className="text-lg font-semibold  tracking-tight">
//               Transaction Management
//             </h1>
//           </div>
//           <p className="text-sm text-muted-foreground ps-5">
//             Monitor and manage all financial transactions
//           </p>
//         </div>

//         {/* <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" className="gap-2">
//             <Download className="w-4 h-4" />
//             Export
//           </Button>
//         </div> */}
//       </div>

//       {/* Filters Card */}

//       <div className="flex flex-col lg:flex-row justify-between gap-4">
//         {/* Search Input */}
//         <div className="w-1/2">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder="Search by Transaction ID, User Email, or Order ID"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3">
//           {/* Sort By */}
//           <div className="flex flex-col gap-2">
//             {/* <label className="text-sm font-medium text-gray-700">Sort By</label> */}
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger className="w-40 h-9">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="createdAt">Date</SelectItem>
//                 <SelectItem value="amount">Amount</SelectItem>
//                 <SelectItem value="paymentStatus">Status</SelectItem>
//                 <SelectItem value="type">Type</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Sort Order */}
//           <div className="flex flex-col gap-2">
//             {/* <label className="text-sm font-medium text-gray-700">Order</label> */}
//             <Select value={sortOrder} onValueChange={setSortOrder}>
//               <SelectTrigger className="w-32 h-9">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="desc">Descending</SelectItem>
//                 <SelectItem value="asc">Ascending</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* Transactions Table Card */}
//       <div className="flex-grow border border-slate-200/60 rounded-none shadow-xl p-2 min-h-screen">
//         {isLoading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="text-center">
//               <Spinner />
//               <p className="text-sm text-gray-600 mt-2">
//                 Loading transactions...
//               </p>
//             </div>
//           </div>
//         ) : transactions.length === 0 ? (
//           <div className="text-center py-12">
//             <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//             <p className="text-gray-500 font-medium">No transactions found</p>
//             <p className="text-sm text-gray-400 mt-1">
//               Try adjusting your search or filters
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-12 font-bold">#</TableHead>
//                     <TableHead className="min-w-32 font-bold">
//                       Transaction ID
//                     </TableHead>
//                     <TableHead className="min-w-28 font-bold">User</TableHead>
//                     <TableHead className="min-w-28 font-bold">
//                       Order ID
//                     </TableHead>
//                     <TableHead className="min-w-24 font-bold">Amount</TableHead>
//                     <TableHead className="min-w-28 font-bold">
//                       Payment Method
//                     </TableHead>
//                     <TableHead className="min-w-28 font-bold">Status</TableHead>
//                     <TableHead className="min-w-24 font-bold">Type</TableHead>
//                     <TableHead className="min-w-32 font-bold">Date</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {transactions.map(
//                     (transaction: TTransaction, index: number) => (
//                       <TableRow
//                         key={transaction.id}
//                         className="hover:bg-gray-50/50 cursor-pointer"
//                         onClick={() => handleRowClick(transaction)}
//                       >
//                         <TableCell className="font-medium">
//                           {(page - 1) * limit + index + 1}
//                         </TableCell>
//                         <TableCell>
//                           <code className="text-xs bg-gray-100 px-2 py-1 rounded">
//                             {transaction.id.slice(0, 8)}...
//                           </code>
//                         </TableCell>
//                         <TableCell>
//                           <div>
//                             <div className="font-medium text-sm">
//                               {transaction.user.name}
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               {transaction.user.email}
//                             </div>
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           {transaction.order ? (
//                             <code className="text-xs bg-gray-100 px-2 py-1 rounded">
//                               {transaction.order.id.slice(0, 8)}...
//                             </code>
//                           ) : (
//                             <span className="text-gray-400 text-sm">N/A</span>
//                           )}
//                         </TableCell>
//                         <TableCell className="font-semibold text-green-600">
//                           ${transaction.amount.toFixed(2)}
//                         </TableCell>
//                         <TableCell>
//                           <span className="text-sm capitalize">
//                             {transaction.paymentMethod?.toLowerCase()}
//                           </span>
//                         </TableCell>
//                         <TableCell>
//                           <Badge
//                             variant="outline"
//                             className={`text-xs ${getPaymentStatusVariant(
//                               transaction.paymentStatus
//                             )}`}
//                           >
//                             {transaction.paymentStatus}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>
//                           <Badge
//                             variant="outline"
//                             className={`text-xs ${getTransactionTypeVariant(
//                               transaction.type
//                             )}`}
//                           >
//                             {transaction.type.replace("_", " ")}
//                           </Badge>
//                         </TableCell>
//                         <TableCell className="text-sm text-gray-600">
//                           {new Date(transaction.createdAt).toLocaleDateString(
//                             "en-US",
//                             {
//                               year: "numeric",
//                               month: "short",
//                               day: "numeric",
//                             }
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     )
//                   )}
//                 </TableBody>
//               </Table>
//             </div>

//             {/* Stats Badges */}
//             <div className="flex flex-wrap justify-end gap-2 p-4 border-t">
//               <Badge variant="outline" className="bg-blue-50 text-blue-700">
//                 {totalRecords} Total
//               </Badge>
//               <Badge variant="outline" className="bg-green-50 text-green-700">
//                 {paidTransactions} Paid
//               </Badge>
//               <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
//                 {pendingTransactions} Pending
//               </Badge>
//             </div>

//             {/* Pagination */}
//             {totalPages && (
//               <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t">
//                 <div className="text-sm text-gray-600">
//                   <p className="text-sm text-gray-600 mt-1">
//                     Showing {transactions.length} of {totalRecords} transactions
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={page === 1}
//                   >
//                     Previous
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() =>
//                       setPage((prev) => Math.min(prev + 1, totalPages))
//                     }
//                     disabled={page >= totalPages}
//                   >
//                     Next
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Transaction Details Drawer */}
//       <TransactionDrawer
//         transaction={selectedTransaction}
//         isOpen={isDrawerOpen}
//         onClose={() => {
//           setIsDrawerOpen(false);
//           setSelectedTransaction(null);
//         }}
//       />
//     </div>
//   );
// };

// export default AdminTransactionsPage;

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { BarChart3, Search } from "lucide-react";
import { TTransaction } from "@/types";
import { useGetAdminTransactionsQuery } from "@/redux/features/transactions/transactionsApi";
import { TransactionDrawer } from "./_components/transactionDrawer";
import { Badge } from "@/components/ui/badge";
import { TransactionsTable } from "./_components/transactionTable";
import { TransactionsPagination } from "./_components/transactionPagination";

const AdminTransactionsPage = () => {
  const initialSortBy = "createdAt";
  const initialSortOrder = "desc";
  const initialSearchTerm = "";
  const initialPage = 1;

  const [userId, setUserId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TTransaction | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data, isLoading, error } = useGetAdminTransactionsQuery({
    page,
    limit,
    userId,
    orderId,
    searchTerm,
    sortBy,
    sortOrder,
  });

  const transactions = data?.data || [];
  const totalRecords = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalRecords / limit);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, userId, orderId, sortBy, sortOrder]);

  const handleRowClick = (transaction: TTransaction) => {
    setSelectedTransaction(transaction);
    setIsDrawerOpen(true);
  };

  const paidTransactions = transactions.filter(
    (t: TTransaction) => t.paymentStatus === "PAID"
  ).length;
  const pendingTransactions = transactions.filter(
    (t: TTransaction) => t.paymentStatus === "UNPAID"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50/30 p-2 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-1 text-slate-700">
            <BarChart3 className="w-4 h-4" />
            <h1 className="text-lg font-semibold tracking-tight">
              Transaction Management
            </h1>
          </div>
          <p className="text-sm text-muted-foreground ps-5">
            Monitor and manage all financial transactions
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        {/* Search Input */}
        <div className="w-1/2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by Transaction ID, User Email, or Order ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Sort By */}
          <div className="flex flex-col gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="paymentStatus">Status</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <div className="flex flex-col gap-2">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="flex-grow border border-slate-200/60 rounded-none shadow-xl p-2 min-h-screen">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <Spinner />
              <p className="text-sm text-gray-600 mt-2">
                Loading transactions...
              </p>
            </div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No transactions found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <TransactionsTable
              transactions={transactions}
              currentPage={page}
              itemsPerPage={limit}
              onRowClick={handleRowClick}
            />

            {/* Stats Badges */}
            <div className="flex flex-wrap justify-end gap-2 p-4 border-t">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {totalRecords} Total
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {paidTransactions} Paid
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                {pendingTransactions} Pending
              </Badge>
            </div>

            {/* Pagination */}
            <TransactionsPagination
              currentPage={page}
              totalPages={totalPages}
              totalRecords={totalRecords}
              // itemsPerPage={limit}
              currentItemsCount={transactions.length}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {/* Transaction Details Drawer */}
      <TransactionDrawer
        transaction={selectedTransaction}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedTransaction(null);
        }}
      />
    </div>
  );
};

export default AdminTransactionsPage;
