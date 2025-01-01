import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product, TOrderItem } from "@/types";

interface OrdersSectionProps {
  product: Product;
}

export const OrdersSection = ({ product }: OrdersSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!product?.OrderItem?.length ? (
          <div>No Order placed yet!</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product?.OrderItem?.map((order: TOrderItem) => (
                <TableRow key={order?.id}>
                  <TableCell className="font-medium">
                    {order?.orderId.slice(0, 8)}...
                  </TableCell>
                  <TableCell>{order?.quantity}</TableCell>
                  <TableCell>${order?.price}</TableCell>
                  <TableCell className="text-right">
                    ${(order?.price * order?.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
