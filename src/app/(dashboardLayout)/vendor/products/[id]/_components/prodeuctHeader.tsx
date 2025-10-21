import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { format } from "date-fns";
import { Clock, Star, Store } from "lucide-react";
import Image from "next/image";

interface ProductHeaderProps {
  product: Product;
}

export const ProductHeader = ({ product }: ProductHeaderProps) => {
  return (
    // <div className="flex flex-col md:flex-row gap-8">
    //   <div className="relative w-full md:w-1/3 aspect-square rounded-lg overflow-hidden">
    //     <Image
    //       src={product?.imageUrl as string}
    //       alt={product?.name}
    //       fill
    //       className="object-cover"
    //     />
    //   </div>

    //   <div className="flex-1 space-y-4">
    //     <div>
    //       <h1 className="text-xl font-bold text-deep-brown">{product?.name}</h1>
    //       <div className="flex items-center gap-2 mt-2 text-muted-foreground ">
    //         <Store className="w-4 h-4 mb-1" />
    //         <span className="text-sm">{product?.shop?.name}</span>
    //       </div>
    //       <div className="text-muted-foreground text-sm flex gap-3 mt-4">
    //         Product Status:
    //         <Badge
    //           className={`text-white font-medium pt-1  ${
    //             product?.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"
    //           } `}
    //         >
    //           {product?.status}
    //         </Badge>
    //       </div>
    //     </div>

    //     <div className="flex items-center gap-4">
    //       <Badge variant="outline" className="text-deep-brown">
    //         Category: {product?.category?.name}
    //       </Badge>
    //       <div className="flex items-center gap-1">
    //         <Clock className="w-4 h-4 text-muted-foreground" />
    //         <span className="text-sm text-muted-foreground">
    //           Listed on {format(new Date(product?.createdAt), "PPP")}
    //         </span>
    //       </div>
    //     </div>

    //     <p className="text-muted-foreground">{product?.description}</p>
    //   </div>
    // </div>

    <div className="flex flex-col md:flex-row gap-8">
      {/* Product Image */}
      <div className="relative w-full md:w-1/3 aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <Image
          src={product?.imageUrl as string}
          alt={product?.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 space-y-3">
        {/* Header Section */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-deep-brown">
            {product?.name}
          </h1>

          {/* Shop and Rating Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Shop Info */}
            <div className="flex items-center gap-2 text-slate-600">
              <Store className="w-4 h-4" />
              <span className="text-sm font-medium">{product?.shop?.name}</span>
            </div>

            {/* Rating Info */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-slate-700">
                  {product?.rating?.toFixed(1) || "0.0"}
                </span>
              </div>
              <span className="text-sm text-slate-500">
                ({product?.reviews?.length || 0} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Status and Category Row */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">
              Category:
            </span>
            <Badge
              variant="outline"
              className="text-deep-brown border-deep-brown/30"
            >
              {product?.category?.name}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">Status:</span>
            <Badge
              className={`text-white font-medium px-3 py-1 ${
                product?.status === "ACTIVE"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {product?.status}
            </Badge>
          </div>
        </div>

        {/* Listing Date */}
        <div className="flex items-center gap-2 text-slate-500">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            Listed on {format(new Date(product?.createdAt), "MMMM d, yyyy")}
          </span>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-slate-800">
            Description
          </h3>
          <div className="max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400">
            <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
              {product?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
