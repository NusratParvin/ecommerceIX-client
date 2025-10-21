// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Package } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Product, TOrderItem } from "@/types";
// import Link from "next/link";

// interface OrdersSectionProps {
//   product: Product;
// }

// export const OrdersSection = ({ product }: OrdersSectionProps) => {
//   return (
//     <Card className="border border-dashed border-slate-300 rounded-none shadow-md">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Package className="w-5 h-5" />
//           Order History
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {!product?.OrderItem?.length ? (
//           <div>No Order placed yet!</div>
//         ) : (
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Order ID</TableHead>
//                 <TableHead>Quantity</TableHead>
//                 <TableHead>Price</TableHead>
//                 <TableHead className="text-right">Total</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {product?.OrderItem?.map((order: TOrderItem) => (
//                 <Link href={`/vendor/orders/${order.id}`}>
//                   <TableRow key={order?.id}>
//                     <TableCell className="font-medium">
//                       {order?.orderId.slice(0, 8)}...
//                     </TableCell>
//                     <TableCell>{order?.quantity}</TableCell>
//                     <TableCell>${order?.price}</TableCell>
//                     <TableCell className="text-right">
//                       ${(order?.price * order?.quantity).toFixed(2)}
//                     </TableCell>
//                   </TableRow>
//                 </Link>
//               ))}
//             </TableBody>
//           </Table>
//         )}
//       </CardContent>
//     </Card>
//   );
// };
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingUp, DollarSign } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product, TOrderItem } from "@/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface OrdersSectionProps {
  product: Product;
}

export const OrdersSection = ({ product }: OrdersSectionProps) => {
  // Calculate total units sold
  const totalUnitsSold =
    product?.OrderItem?.reduce((total, order) => {
      return total + (order?.quantity || 0);
    }, 0) || 0;

  return (
    <Card className="border border-dashed border-slate-300 rounded-none shadow-lg h-full flex flex-col px-2">
      <CardHeader className="bg-slate-50 border-b shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Package className="w-5 h-5" />
            Order History
          </CardTitle>
          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-slate-700">
              {totalUnitsSold}
            </span>
            <span className="text-slate-500">sold</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col min-h-0">
        {!product?.OrderItem?.length ? (
          <div className="text-center text-slate-500 py-12 flex-1 flex items-center justify-center">
            <div>
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-lg font-medium text-slate-400">
                No orders placed yet!
              </p>
              <p className="text-sm text-slate-400 mt-1">
                This product has not been purchased yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Scrollable Table Container */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              <Table>
                <TableHeader className="bg-slate-100/50 sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="font-semibold text-slate-700 bg-slate-100">
                      Order ID
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-center bg-slate-100">
                      Quantity
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-center bg-slate-100">
                      Unit Price
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-center bg-slate-100">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 text-right bg-slate-100">
                      Total Revenue
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.OrderItem.map((order: TOrderItem) => (
                    <Link
                      key={order?.id}
                      href={`/vendor/orders/${order.orderId}`}
                      className="contents"
                    >
                      <TableRow className="group hover:bg-blue-50/50 transition-all duration-200 border-b border-slate-100">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-slate-800 group-hover:text-blue-600 transition-colors">
                              #{order?.orderId?.slice(0, 8)}...
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 font-medium"
                          >
                            {order?.quantity || 0}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-center text-slate-700 font-medium">
                          ${order?.price?.toFixed(2) || "0.00"}
                        </TableCell>

                        <TableCell className="text-center">
                          <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                            Completed
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-0">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-semibold font-sans text-slate-900">
                              {(
                                (order?.price || 0) * (order?.quantity || 0)
                              ).toFixed(2)}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    </Link>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Summary footer */}
            <div className="bg-slate-50 border-t px-6 py-3 shrink-0">
              <div className="flex justify-between items-center text-sm">
                <div className="text-slate-600">
                  Showing{" "}
                  <span className="font-semibold">
                    {product.OrderItem.length}
                  </span>{" "}
                  orders
                </div>
                <div className="text-slate-600">
                  Total Revenue:{" "}
                  <span className="font-bold text-green-600">
                    $
                    {product.OrderItem.reduce(
                      (total, order) =>
                        total + (order?.price || 0) * (order?.quantity || 0),
                      0
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
