import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product, TOrderItem } from "@/types";
import { ShoppingCart } from "lucide-react";

export const OrdersTab = ({ product }: { product: Product }) => {
  const orderCount = (product.OrderItem || []).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>
          {orderCount} orders placed for this product
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orderCount > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                {/* <TableHead>Date</TableHead> */}
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product?.OrderItem?.map((order: TOrderItem) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">
                    {order.orderId.slice(0, 8)}...
                  </TableCell>
                  {/* <TableCell className="text-sm">
                  {moment(order?.createdAt).format("MMMM DD,YYYY")}
                </TableCell> */}
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.price}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${(order.price * order.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              This product has not been ordered yet. Orders will appear here
              once customers start purchasing.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
