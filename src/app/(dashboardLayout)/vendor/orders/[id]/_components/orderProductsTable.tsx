import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { OrderDetailsViewProps } from "./orderDetailsView";

const OrderProductsTable = ({ order }: OrderDetailsViewProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px] font-medium">Product</TableHead>
          <TableHead className="text-center font-medium">Category</TableHead>
          <TableHead className="text-center font-medium">Quantity</TableHead>
          <TableHead className="text-center font-medium">
            Discount Applied
          </TableHead>
          <TableHead className="text-center font-medium">
            Original Price
          </TableHead>
          <TableHead className="text-center font-medium">
            Discounted Price
          </TableHead>
          {/* <TableHead className="text-center">You Saved</TableHead> */}
          <TableHead className="text-right">Item Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order?.items?.map((item, index) => (
          <TableRow key={item.id || index}>
            {/* Product Column */}
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 relative rounded-none overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.imageUrl || ""}
                    alt={item.product.name || "Product image"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">
                    {item.product.name}
                  </p>
                  {/* {getPriceBadge(item)} */}
                </div>
              </div>
            </TableCell>

            {/* Category */}
            <TableCell className="text-center">
              <Badge variant="outline" className="text-xs">
                {item.product.category?.name || "N/A"}
              </Badge>
            </TableCell>

            {/* Quantity */}
            <TableCell className="text-center">
              <span className="font-medium">{item.quantity}</span>
            </TableCell>

            {/* Discount Info */}
            <TableCell className="text-center">
              {item.product.isFlashSale && item.product.flashSalePrice ? (
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-purple-600">
                    Flash Sale
                  </span>
                  <span className="text-xs text-slate-500">
                    Save ${item.product.flashSalePrice.toFixed(2)} each
                  </span>
                </div>
              ) : item.product.discount > 0 ? (
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-green-600">
                    {item.product.discount}% Discount
                  </span>
                  <span className="text-xs text-slate-500">
                    Save $
                    {((item.price * item.product.discount) / 100).toFixed(2)}{" "}
                    each
                  </span>
                </div>
              ) : (
                <span className="text-slate-400 text-sm">No discount</span>
              )}
            </TableCell>

            {/* Original Price */}
            <TableCell className="text-center">
              <div className="flex flex-col items-center">
                <span className="font-medium">${item.price.toFixed(2)}</span>
                <span className="text-xs text-slate-500">per item</span>
              </div>
            </TableCell>

            {/* Discounted Price */}
            <TableCell className="text-center">
              <div className="flex flex-col items-center">
                <span className="font-medium text-green-600">
                  {item.product.isFlashSale && item.product.flashSalePrice
                    ? `$${(item.price - item.product.flashSalePrice).toFixed(
                        2
                      )}`
                    : item.product.discount > 0
                    ? `$${(
                        item.price -
                        (item.price * item.product.discount) / 100
                      ).toFixed(2)}`
                    : `$${item.price.toFixed(2)}`}
                </span>
                <span className="text-xs text-slate-500">per item</span>
              </div>
            </TableCell>

            {/* Savings
              <TableCell className="text-center">
                {item.product.isFlashSale && item.product.flashSalePrice ? (
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-red-600">
                      -$
                      {(
                        (item.price - item.product.flashSalePrice) *
                        item.quantity
                      ).toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-500">flash sale</span>
                  </div>
                ) : item.product.discount > 0 ? (
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-red-600">
                      -$
                      {(
                        ((item.price * item.product.discount) / 100) *
                        item.quantity
                      ).toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-500">
                      {item.product.discount}% off
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-400 text-sm">-</span>
                )}
              </TableCell> */}

            {/* Total */}
            <TableCell className="text-right">
              <div className="flex flex-col items-end">
                <span className="font-semibold text-lg font-sans">
                  {item.product.isFlashSale && item.product.flashSalePrice
                    ? `$${(
                        (item.price - item.product.flashSalePrice) *
                        item.quantity
                      ).toFixed(2)}`
                    : item.product.discount > 0
                    ? `$${(
                        (item.price -
                          (item.price * item.product.discount) / 100) *
                        item.quantity
                      ).toFixed(2)}`
                    : `$${(item.price * item.quantity).toFixed(2)}`}
                </span>
                {(item.product.isFlashSale && item.product.flashSalePrice) ||
                item.product.discount > 0 ? (
                  <span className="text-sm text-slate-500 line-through">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                ) : null}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderProductsTable;
