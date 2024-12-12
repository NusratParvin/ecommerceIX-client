import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Product } from "@/types";
import { format } from "date-fns";
import Image from "next/image";

interface ProductDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDrawer = ({
  product,
  isOpen,
  onClose,
}: ProductDrawerProps) => {
  if (!product) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Product Details</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-10 max-h-[80vh] overflow-y-auto px-2">
          {product.imageUrl && (
            <div className="relative w-full h-48 mb-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="object-cover rounded-md"
                width={400}
                height={400}
                layout="responsive"
                priority={true}
              />
            </div>
          )}
          <div className="grid gap-3 text-sm">
            <div>
              <h3 className="font-semibold">Name</h3>
              <p className="text-muted-foreground">{product.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground">
                {product.description || "N/A"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Price</h3>
                <p className="text-muted-foreground">${product.price}</p>
              </div>
              <div>
                <h3 className="font-semibold">Stock</h3>
                <p className="text-muted-foreground">{product.stock}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Category</h3>
                <p className="text-muted-foreground">
                  {product.category?.name || "Uncategorized"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Shop</h3>
                <p className="text-muted-foreground">
                  {product.shop?.name || "Unknown"}
                </p>
              </div>
            </div>
            {product.isFlashSale && (
              <div className="bg-red-50 p-3 rounded-md">
                <h3 className="font-semibold text-red-600">Flash Sale</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-red-600">Sale Price</p>
                    <p className="font-medium text-red-600">
                      ${product.flashSalePrice?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-red-600">Period</p>
                    <p className="text-sm text-red-600">
                      {product.flashSaleStartDate &&
                        format(new Date(product.flashSaleStartDate), "PPP")}
                      {" - "}
                      {product.flashSaleEndDate &&
                        format(new Date(product.flashSaleEndDate), "PPP")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
