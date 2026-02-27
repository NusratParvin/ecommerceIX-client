// "use client";

// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { RootState } from "@/redux/store";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Star, Store, Timer, Flame, Check, X } from "lucide-react";
// import Link from "next/link";
// import { format } from "date-fns";
// import { Separator } from "@/components/ui/separator";

// const ComparePage = () => {
//   const { products } = useSelector((state: RootState) => state.compare);
//   const router = useRouter();

//   useEffect(() => {
//     if (products.length < 2) {
//       router.push("/");
//     }
//   }, [products.length, router]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1 },
//   };

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const calculateDiscountPercentage = (product: any) => {
//     if (product.isFlashSale && product.flashSalePrice) {
//       return Math.round(
//         ((product.price - product.flashSalePrice) / product.price) * 100
//       );
//     }
//     return product.discount || 0;
//   };

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const getFinalPrice = (product: any) => {
//     if (product.isFlashSale && product.flashSalePrice) {
//       return product.flashSalePrice;
//     }
//     if (product.discount) {
//       return (product.price * (1 - product.discount / 100)).toFixed(2);
//     }
//     return product.price;
//   };

//   return (
//     <div>
//       <div className="h-24 bg-deep-brown"></div>
//       <motion.div
//         className="mx-auto w-full md:w-10/12 min-h-screen mt-12 mb-36 px-4"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         {/* Header */}
//         <motion.div
//           className="flex justify-between items-center mb-12"
//           variants={itemVariants}
//         >
//           <Button
//             variant="ghost"
//             onClick={() => router.back()}
//             className="gap-2 text-deep-brown hover:text-deep-brown/80"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </Button>
//           <h1 className="text-3xl font-bold text-deep-brown">
//             Compare Products
//           </h1>
//           <div className="w-24"></div>
//         </motion.div>

//         {/* Product Images */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
//           variants={itemVariants}
//         >
//           {products.map((product) => (
//             <div
//               key={`image-${product.id}`}
//               className="relative h-64 rounded-none overflow-hidden group shadow-xl"
//             >
//               <Image
//                 src={product.imageUrl as string}
//                 alt={product.name}
//                 fill
//                 className="object-cover transition-transform duration-300 group-hover:scale-110"
//               />
//               {product.isFlashSale && (
//                 <Badge
//                   variant="destructive"
//                   className="absolute top-2 left-2 animate-pulse"
//                 >
//                   <Flame className="w-4 h-4 mr-1" />
//                   Flash Sale
//                 </Badge>
//               )}
//             </div>
//           ))}
//         </motion.div>

//         {/* Comparison Table */}
//         <motion.div
//           className="bg-white rounded-xl shadow-lg p-6"
//           variants={itemVariants}
//         >
//           {/* Basic Information */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-deep-brown">
//               Basic Information
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
//               {products.map((product) => (
//                 <div key={`basic-${product.id}`} className="space-y-4">
//                   <Link href={`products/product?.id`}>
//                     <h3 className="text-lg font-semibold text-deep-brown hover:underline">
//                       {product.name}
//                     </h3>
//                   </Link>
//                   <Link
//                     href={`/shop/${product.shop?.id}`}
//                     className="flex gap-2 items-center"
//                   >
//                     {/* <Badge
//                       variant="outline"
//                       className="flex items-center gap-1 text-warm-brown"
//                     > */}
//                     <Store className="w-3 h-3" />
//                     <span className="hover:underline text-sm text-semibold text-blue-800">
//                       {product?.shop?.name}
//                     </span>

//                     {/* </Badge> */}
//                   </Link>
//                   <p className="text-sm text-gray-600">
//                     {product.description || "No description available"}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Separator className="my-6" />

//           {/* Pricing */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-deep-brown">
//               Pricing
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {products.map((product) => (
//                 <div key={`pricing-${product.id}`} className="space-y-2">
//                   <div className="flex items-baseline gap-2">
//                     <span className="text-2xl font-bold text-deep-brown">
//                       ${getFinalPrice(product)}
//                     </span>
//                     {calculateDiscountPercentage(product) > 0 && (
//                       <>
//                         <span className="text-sm text-gray-500 line-through">
//                           ${product.price}
//                         </span>
//                         <Badge variant="destructive">
//                           {calculateDiscountPercentage(product)}% OFF
//                         </Badge>
//                       </>
//                     )}
//                   </div>
//                   {product.isFlashSale && product.flashSaleEndDate && (
//                     <div className="text-sm text-gray-600 flex items-center gap-1">
//                       <Timer className="w-4 h-4" />
//                       Ends: {format(new Date(product.flashSaleEndDate), "PPp")}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Separator className="my-6" />

//           {/* Availability */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold mb-4 text-deep-brown">
//               Availability
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {products.map((product) => (
//                 <div key={`availability-${product.id}`} className="space-y-2">
//                   <div className="grid grid-cols-2 justify-start items-center   text-sm  ">
//                     <span className="text-gray-600">Stock Status</span>
//                     <div>
//                       <Badge
//                         variant={
//                           product.stock < 10 ? "destructive" : "secondary"
//                         }
//                       >
//                         {product.stock} available
//                       </Badge>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 items-center justify-start text-sm pt-4">
//                     <span className="text-gray-600">Flash Sale</span>
//                     {product.isFlashSale ? (
//                       <Check className="w-5 h-5 text-green-500" />
//                     ) : (
//                       <X className="w-5 h-5 text-red-500" />
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <Separator className="my-6" />

//           {/* Additional Details */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4 text-deep-brown">
//               Additional Details
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {products.map((product) => (
//                 <div
//                   key={`details-${product.id}`}
//                   className="space-y-2 text-sm "
//                 >
//                   <div className="grid grid-cols-2 items-center justify-start">
//                     <span className="text-gray-600">Category</span>
//                     <span className="font-medium">
//                       {product.category?.name}
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-2 items-center justify-start">
//                     <span className="text-gray-600">Rating</span>
//                     <div className="flex items-center gap-1">
//                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                       <span>{product.rating || "No ratings"}</span>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 items-center justify-start">
//                     <span className="text-gray-600">Status</span>
//                     <div>
//                       <Badge variant="outline" className="capitalize">
//                         {product?.status?.toLowerCase()}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default ComparePage;

"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Store, Timer, Flame, Check, X } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

const ComparePage = () => {
  const { products } = useSelector((state: RootState) => state.compare);
  const router = useRouter();

  useEffect(() => {
    if (products.length < 2) {
      router.push("/");
    }
  }, [products.length, router]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calculateDiscountPercentage = (product: any) => {
    if (product.isFlashSale && product.flashSalePrice) {
      return Math.round(
        ((product.price - product.flashSalePrice) / product.price) * 100,
      );
    }
    return product.discount || 0;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFinalPrice = (product: any) => {
    if (product.isFlashSale && product.flashSalePrice) {
      return product.flashSalePrice.toFixed(2);
    }
    if (product.discount) {
      return (product.price * (1 - product.discount / 100)).toFixed(2);
    }
    return product.price.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="h-20 md:h-24 bg-slate-700"></div>

      <motion.div
        className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl py-6 md:py-8 lg:py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8 lg:mb-12"
          variants={itemVariants}
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2 text-deep-brown hover:text-deep-brown/80 order-2 sm:order-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-deep-brown order-1 sm:order-2">
            Compare Products
          </h1>

          <div className="hidden sm:block w-24 order-3"></div>
        </motion.div>

        {/* Product Images Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-6 md:mb-8"
          variants={itemVariants}
        >
          {products.map((product) => (
            <div
              key={`image-${product.id}`}
              className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={product.imageUrl as string}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {product.isFlashSale && (
                <Badge
                  variant="destructive"
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 animate-pulse text-xs sm:text-sm"
                >
                  <Flame className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Flash Sale
                </Badge>
              )}
            </div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-8"
          variants={itemVariants}
        >
          {/* Basic Information */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4 text-deep-brown border-b pb-2">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {products.map((product) => (
                <div key={`basic-${product.id}`} className="space-y-3">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-base sm:text-lg font-semibold text-deep-brown hover:underline line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <Link
                    href={`/shop/${product.shop?.id}`}
                    className="flex items-center gap-1 text-xs sm:text-sm text-blue-600 hover:underline"
                  >
                    <Store className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium truncate">
                      {product?.shop?.name}
                    </span>
                  </Link>

                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                    {product.description || "No description available"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4 md:my-6" />

          {/* Pricing */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4 text-deep-brown border-b pb-2">
              Pricing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <div
                  key={`pricing-${product.id}`}
                  className="space-y-2 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-deep-brown">
                      ${getFinalPrice(product)}
                    </span>

                    {calculateDiscountPercentage(product) > 0 && (
                      <>
                        <span className="text-xs sm:text-sm text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                        <Badge variant="destructive" className="text-xs">
                          {calculateDiscountPercentage(product)}% OFF
                        </Badge>
                      </>
                    )}
                  </div>

                  {product.isFlashSale && product.flashSaleEndDate && (
                    <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                      <Timer className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate">
                        Ends:{" "}
                        {format(
                          new Date(product.flashSaleEndDate),
                          "MMM d, h:mm a",
                        )}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4 md:my-6" />

          {/* Availability */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4 text-deep-brown border-b pb-2">
              Availability
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <div
                  key={`availability-${product.id}`}
                  className="space-y-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-600">Stock Status</span>
                    <Badge
                      variant={product.stock < 10 ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {product.stock} available
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-600">Flash Sale</span>
                    {product.isFlashSale ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="text-xs">Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-500">
                        <X className="w-4 h-4" />
                        <span className="text-xs">Inactive</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4 md:my-6" />

          {/* Additional Details */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 md:mb-4 text-deep-brown border-b pb-2">
              Additional Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <div
                  key={`details-${product.id}`}
                  className="space-y-2 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-right truncate ml-2">
                      {product.category?.name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating?.toFixed(1) || "N/A"}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-600">Status</span>
                    <Badge variant="outline" className="capitalize text-xs">
                      {product?.status?.toLowerCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComparePage;
