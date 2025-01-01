import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { format } from "date-fns";
import { Clock, Store } from "lucide-react";
import Image from "next/image";

interface ProductHeaderProps {
  product: Product;
}

export const ProductHeader = ({ product }: ProductHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="relative w-full md:w-1/3 aspect-square rounded-lg overflow-hidden">
        <Image
          src={product?.imageUrl as string}
          alt={product?.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-deep-brown">
            {product?.name}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <Store className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{product?.shop?.name}</span>
          </div>
          <div className="text-muted-foreground text-sm flex gap-3 mt-2">
            Product Status:
            <Badge
              className={`text-white font-medium pt-1  ${
                product?.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"
              } `}
            >
              {product?.status}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-deep-brown">
            Category: {product?.category?.name}
          </Badge>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Listed on {format(new Date(product?.createdAt), "PPP")}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground">{product?.description}</p>
      </div>
    </div>
  );
};
