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
      <SheetContent className="w-[500px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Product Details</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {product.imageUrl && (
            <div className="relative h-48 w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="object-cover rounded-md"
                width={500}
                height={500}
                layout="responsive"
                priority={true}
              />
            </div>
          )}
          <div className="grid gap-4">
            <div>
              <h3 className="font-semibold">Name</h3>
              <p className="text-muted-foreground">{product.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
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
            {product.isFlashSale && (
              <div className="bg-red-50 p-4 rounded-md">
                <h3 className="font-semibold text-red-600">Flash Sale</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-red-600">Price</p>
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
