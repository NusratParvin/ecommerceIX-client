// "use client";

// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { RootState } from "@/redux/store";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Star, Store, Timer, Flame } from "lucide-react";
// import Link from "next/link";
// import { format } from "date-fns";

// const ComparePage = () => {
//   const { products } = useSelector((state: RootState) => state.compare);
//   const router = useRouter();
//   console.log(products);
//   useEffect(() => {
//     if (products.length < 2) {
//       router.push("/");
//     }
//   }, [products.length, router]);

//   // Animation Variants
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

//   return (
//     <div>
//       <div className="h-36 bg-deep-brown"></div>
//       <motion.div
//         className="mx-auto w-full md:w-10/12 min-h-screen mt-12 mb-36"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         {/* Header */}
//         <motion.div
//           className="grid grid-cols-3
//            mb-12"
//           variants={itemVariants}
//         >
//           <Button
//             variant="ghost"
//             onClick={() => router.back()}
//             className="gap-2 text-deep-brown hover:text-deep-brown/80 justify-start"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </Button>
//           <h1 className="text-3xl font-bold text-deep-brown   text-center">
//             Compare Products
//           </h1>
//         </motion.div>

//         {/* Comparison Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <motion.div
//               key={product?.id}
//               variants={itemVariants}
//               className="border-none rounded-xl   bg-white shadow-lg hover:shadow-xl transition-shadow"
//             >
//               {/* Product Image */}
//               <div className="relative h-64 mb-4 rounded-none overflow-hidden group">
//                 <Image
//                   src={product?.imageUrl as string}
//                   alt={product?.name}
//                   fill
//                   className="object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//                 {product?.isFlashSale && (
//                   <Badge
//                     variant="destructive"
//                     className="absolute top-2 left-2 animate-pulse"
//                   >
//                     <Flame className="w-4 h-4 mr-1" />
//                     Flash Sale
//                   </Badge>
//                 )}
//               </div>

//               {/* Product Info */}
//               <div className="space-y-4 px-4  pt-4 pb-8">
//                 <div>
//                   <h2 className="text-xl font-semibold text-deep-brown mb-1">
//                     {product?.name}
//                   </h2>
//                   <div className="flex flex-row justify-between items-center text-sm">
//                     <p>Sold By:</p>
//                     <Link href={`/shop/${product?.shop?.id}`}>
//                       <Badge
//                         variant="outline"
//                         className="flex items-center gap-1 text-warm-brown"
//                       >
//                         <Store className="w-3 h-3" />
//                         {product?.shop?.name}
//                       </Badge>
//                     </Link>
//                   </div>
//                 </div>

//                 {/* Pricing */}
//                 <div className="space-y-2">
//                   <div className="flex items-baseline gap-2">
//                     {product?.isFlashSale && product?.flashSalePrice ? (
//                       <>
//                         <span className="text-2xl font-bold text-red-500">
//                           ${product?.flashSalePrice}
//                         </span>
//                         <span className="text-sm text-gray-500 line-through">
//                           ${product?.price}
//                         </span>
//                         <Badge variant="destructive">
//                           {Math.round(
//                             ((product?.price - product?.flashSalePrice) /
//                               product?.price) *
//                               100
//                           )}
//                           % OFF
//                         </Badge>
//                       </>
//                     ) : product?.discount ? (
//                       <>
//                         <span className="text-2xl font-bold text-deep-brown">
//                           $
//                           {(
//                             product?.price *
//                             (1 - product?.discount / 100)
//                           ).toFixed(2)}
//                         </span>
//                         <span className="text-sm text-gray-500 line-through">
//                           ${product?.price}
//                         </span>
//                         <Badge variant="secondary">
//                           {product?.discount}% OFF
//                         </Badge>
//                       </>
//                     ) : (
//                       <span className="text-2xl font-bold text-deep-brown">
//                         ${product?.price}
//                       </span>
//                     )}
//                   </div>

//                   {product?.isFlashSale && product?.flashSaleEndDate && (
//                     <div className="text-sm text-gray-600 flex items-center gap-1">
//                       <Timer className="w-4 h-4" />
//                       Ends: {format(new Date(product?.flashSaleEndDate), "PPp")}
//                     </div>
//                   )}
//                 </div>

//                 {/* Other Details */}
//                 <div className="space-y-2 pt-2">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Category</span>
//                     <span className="font-medium">
//                       {product?.category?.name}
//                     </span>
//                   </div>

//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Stock</span>
//                     <Badge
//                       variant={
//                         product?.stock < 10 ? "destructive" : "secondary"
//                       }
//                     >
//                       {product?.stock} available
//                     </Badge>
//                   </div>

//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Rating</span>
//                     <div className="flex items-center gap-1">
//                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                       <span>{product?.rating || "No ratings"}</span>
//                     </div>
//                   </div>

//                   {product?.description && (
//                     <div className="pt-2">
//                       <span className="text-sm text-gray-600">Description</span>
//                       <p className="text-sm mt-1">{product?.description}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
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
        ((product.price - product.flashSalePrice) / product.price) * 100
      );
    }
    return product.discount || 0;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFinalPrice = (product: any) => {
    if (product.isFlashSale && product.flashSalePrice) {
      return product.flashSalePrice;
    }
    if (product.discount) {
      return (product.price * (1 - product.discount / 100)).toFixed(2);
    }
    return product.price;
  };

  return (
    <div>
      <div className="h-36 bg-deep-brown"></div>
      <motion.div
        className="mx-auto w-full md:w-10/12 min-h-screen mt-12 mb-36 px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-12"
          variants={itemVariants}
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2 text-deep-brown hover:text-deep-brown/80"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-deep-brown">
            Compare Products
          </h1>
          <div className="w-24"></div>
        </motion.div>

        {/* Product Images */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={itemVariants}
        >
          {products.map((product) => (
            <div
              key={`image-${product.id}`}
              className="relative h-64 rounded-none overflow-hidden group shadow-xl"
            >
              <Image
                src={product.imageUrl as string}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {product.isFlashSale && (
                <Badge
                  variant="destructive"
                  className="absolute top-2 left-2 animate-pulse"
                >
                  <Flame className="w-4 h-4 mr-1" />
                  Flash Sale
                </Badge>
              )}
            </div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          variants={itemVariants}
        >
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-deep-brown">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {products.map((product) => (
                <div key={`basic-${product.id}`} className="space-y-4">
                  <Link href={`products/product?.id`}>
                    <h3 className="text-lg font-semibold text-deep-brown hover:underline">
                      {product.name}
                    </h3>
                  </Link>
                  <Link
                    href={`/shop/${product.shop?.id}`}
                    className="flex gap-2 items-center"
                  >
                    {/* <Badge
                      variant="outline"
                      className="flex items-center gap-1 text-warm-brown"
                    > */}
                    <Store className="w-3 h-3" />
                    <span className="hover:underline text-sm text-semibold text-blue-800">
                      {product?.shop?.name}
                    </span>

                    {/* </Badge> */}
                  </Link>
                  <p className="text-sm text-gray-600">
                    {product.description || "No description available"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Pricing */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-deep-brown">
              Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={`pricing-${product.id}`} className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-deep-brown">
                      ${getFinalPrice(product)}
                    </span>
                    {calculateDiscountPercentage(product) > 0 && (
                      <>
                        <span className="text-sm text-gray-500 line-through">
                          ${product.price}
                        </span>
                        <Badge variant="destructive">
                          {calculateDiscountPercentage(product)}% OFF
                        </Badge>
                      </>
                    )}
                  </div>
                  {product.isFlashSale && product.flashSaleEndDate && (
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Timer className="w-4 h-4" />
                      Ends: {format(new Date(product.flashSaleEndDate), "PPp")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Availability */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-deep-brown">
              Availability
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={`availability-${product.id}`} className="space-y-2">
                  <div className="grid grid-cols-2 justify-start items-center   text-sm  ">
                    <span className="text-gray-600">Stock Status</span>
                    <div>
                      <Badge
                        variant={
                          product.stock < 10 ? "destructive" : "secondary"
                        }
                      >
                        {product.stock} available
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center justify-start text-sm pt-4">
                    <span className="text-gray-600">Flash Sale</span>
                    {product.isFlashSale ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Additional Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-deep-brown">
              Additional Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={`details-${product.id}`}
                  className="space-y-2 text-sm "
                >
                  <div className="grid grid-cols-2 items-center justify-start">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">
                      {product.category?.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 items-center justify-start">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating || "No ratings"}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center justify-start">
                    <span className="text-gray-600">Status</span>
                    <div>
                      <Badge variant="outline" className="capitalize">
                        {product?.status?.toLowerCase()}
                      </Badge>
                    </div>
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
