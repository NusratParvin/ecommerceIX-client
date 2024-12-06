import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductSuccessModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export const ProductSuccessModal = ({
  product,
  isOpen,
  onClose,
}: ProductSuccessModalProps) => {
  const router = useRouter();

  if (!product) return null;

  const formatDate = (date: string | Date) => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return format(parsedDate, "do MMMM, yyyy 'at' h:mm a");
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-gray-200 max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-deep-brown">
            Product Created Successfully!
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col md:flex-row items-start gap-6 mt-4">
              {/* Image */}
              <div className="flex-shrink-0 w-48 h-48 relative border border-gray-300 rounded-lg overflow-hidden">
                <Image
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <p className="font-medium text-deep-brown mb-4">
                  Product Details:
                </p>
                <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <div>
                    <p className="text-sm font-medium text-warm-brown">Name</p>
                    <p className="text-charcoal">{product.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-warm-brown">Price</p>
                    <p className="text-charcoal">${product.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-warm-brown">Stock</p>
                    <p className="text-charcoal">{product.stock}</p>
                  </div>
                  {product.discount && (
                    <div>
                      <p className="text-sm font-medium text-warm-brown">
                        Discount
                      </p>
                      <p className="text-charcoal">{product.discount}%</p>
                    </div>
                  )}
                  {product.isFlashSale && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-warm-brown">
                          Flash Sale Price
                        </p>
                        <p className="text-charcoal">
                          ${product.flashSalePrice?.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-warm-brown">
                          Flash Sale Start
                        </p>
                        <p className="text-charcoal">
                          {formatDate(product.flashSaleStartDate!)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-warm-brown">
                          Flash Sale End
                        </p>
                        <p className="text-charcoal">
                          {formatDate(product.flashSaleEndDate!)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:space-x-4">
          <AlertDialogAction asChild>
            <Button
              onClick={onClose}
              className="bg-deep-brown text-white hover:bg-warm-brown"
            >
              OK
            </Button>
          </AlertDialogAction>
          <Button
            onClick={() =>
              router.push(`/vendor/products/editProduct/${product.id}`)
            }
            variant="outline"
            className="border-deep-brown text-deep-brown hover:bg-deep-brown/10"
          >
            Edit Product
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
