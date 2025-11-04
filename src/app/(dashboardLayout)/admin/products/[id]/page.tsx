// "use client";

// import { useGetProductByIdQuery } from "@/redux/features/products/productsApi";
// import { useParams } from "next/navigation";
// import { motion } from "framer-motion";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { format } from "date-fns";
// import {
//   Star,
//   Loader,
//   AlertTriangle,
//   Package,
//   DollarSign,
//   Users,
//   Timer,
//   ShoppingCart,
//   Store,
//   Tag,
//   Calendar,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { TOrderItem, TReview } from "@/types";

// const AdminProductDetails = () => {
//   const { id } = useParams();
//   const { data, isLoading, isError } = useGetProductByIdQuery(id);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader className="w-8 h-8 animate-spin" />
//       </div>
//     );
//   }

//   if (isError || !data?.data) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen gap-4">
//         <AlertTriangle className="w-12 h-12 text-red-500" />
//         <p className="text-xl font-medium text-red-500">Product not found!</p>
//       </div>
//     );
//   }

//   const product = data.data;
//   const averageRating =
//     product.reviews.length > 0
//       ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         product.reviews.reduce((acc: number, review: any) => {
//           return acc + parseFloat(review?.rating || 0);
//         }, 0) / product.reviews.length
//       : 0;

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="space-y-8"
//       >
//         {/* Product Header */}
//         <div className="flex flex-col md:flex-row gap-8">
//           <div className="w-full md:w-1/3">
//             <div className="relative aspect-square rounded-lg overflow-hidden">
//               <Image
//                 src={product?.imageUrl as string}
//                 alt={product?.name}
//                 fill
//                 className="object-cover"
//               />
//               <Badge
//                 variant={
//                   product?.status === "ACTIVE" ? "default" : "destructive"
//                 }
//                 className="absolute top-4 right-4"
//               >
//                 {product?.status}
//               </Badge>
//             </div>
//           </div>

//           <div className="flex-1 space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 {product?.name}
//               </h1>
//               <div className="flex items-center gap-2 mt-2">
//                 <Link href={`/admin/shops/${product?.shop?.id}`}>
//                   <Badge variant="outline" className="flex items-center gap-1">
//                     <Store className="w-3 h-3" />
//                     {product?.shop?.name}
//                   </Badge>
//                 </Link>
//                 <Badge variant="secondary">ID: {product?.id}</Badge>
//               </div>
//             </div>

//             <p className="text-gray-600">{product?.description}</p>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <Card>
//                 <CardHeader className="p-4">
//                   <CardTitle className="text-sm flex items-center gap-2">
//                     <DollarSign className="w-4 h-4" />
//                     Base Price
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-2xl font-bold">${product?.price}</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="p-4">
//                   <CardTitle className="text-sm flex items-center gap-2">
//                     <Package className="w-4 h-4" />
//                     Stock
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-2xl font-bold">{product?.stock}</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="p-4">
//                   <CardTitle className="text-sm flex items-center gap-2">
//                     <Users className="w-4 h-4" />
//                     Reviews
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <div className="flex items-center gap-2">
//                     <p className="text-2xl font-bold">
//                       {averageRating ? averageRating.toFixed(1) : "N/A"}
//                     </p>
//                     {averageRating && (
//                       <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="p-4">
//                   <CardTitle className="text-sm flex items-center gap-2">
//                     <ShoppingCart className="w-4 h-4" />
//                     Orders
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <p className="text-2xl font-bold">
//                     {product?.OrderItem.length}
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>

//         {/* Pricing & Promotions */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Tag className="w-5 h-5" />
//               Pricing & Promotions
//             </CardTitle>
//           </CardHeader>
//           {/* <CardContent className="space-y-6">
//             {product?.isFlashSale && (
//               <div className="bg-red-50 p-4 rounded-lg">
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium text-red-700">
//                     Flash Sale Active
//                   </span>
//                   <Badge variant="destructive">
//                     {Math.round(
//                       ((product?.price - product?.flashSalePrice) /
//                         product?.price) *
//                         100
//                     )}
//                     % OFF
//                   </Badge>
//                 </div>
//                 <div className="mt-2 space-y-2">
//                   <p className="text-sm text-red-600">
//                     Sale Price: ${product?.flashSalePrice}
//                   </p>
//                   <div className="flex items-center gap-1 text-sm text-red-600">
//                     <Timer className="w-4 h-4" />
//                     <span>
//                       {format(new Date(product?.flashSaleStartDate), "PPp")} -{" "}
//                       {format(new Date(product?.flashSaleEndDate), "PPp")}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {product?.discount > 0 && (
//               <div className="bg-green-50 p-4 rounded-lg">
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium text-green-700">
//                     Discount Active
//                   </span>
//                   <Badge variant="secondary" className="text-green-700">
//                     {product?.discount}% OFF
//                   </Badge>
//                 </div>
//                 <p className="text-sm text-green-600 mt-1">
//                   Sale Price: $
//                   {(product?.price * (1 - product?.discount / 100)).toFixed(2)}
//                 </p>
//               </div>
//             )}
//            </CardContent> */}

//           <CardContent className="space-y-6">
//             {/* Flash Sale Section */}
//             {product?.isFlashSale ? (
//               <div className="bg-red-50 p-4 rounded-lg">
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium text-red-700">
//                     Flash Sale Active
//                   </span>
//                   <Badge variant="destructive">
//                     {Math.round(
//                       ((product?.price - product?.flashSalePrice) /
//                         product?.price) *
//                         100
//                     )}
//                     % OFF
//                   </Badge>
//                 </div>
//                 <div className="mt-2 space-y-2">
//                   <p className="text-sm text-red-600">
//                     Sale Price: ${product?.flashSalePrice}
//                   </p>
//                   <div className="flex items-center gap-1 text-sm text-red-600">
//                     <Timer className="w-4 h-4" />
//                     <span>
//                       {format(new Date(product?.flashSaleStartDate), "PPp")} -{" "}
//                       {format(new Date(product?.flashSaleEndDate), "PPp")}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ) : product?.discount > 0 ? (
//               /* Discount Section */
//               <div className="bg-green-50 p-4 rounded-lg">
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium text-green-700">
//                     Discount Active
//                   </span>
//                   <Badge variant="secondary" className="text-green-700">
//                     {product?.discount}% OFF
//                   </Badge>
//                 </div>
//                 <p className="text-sm text-green-600 mt-1">
//                   Sale Price: $
//                   {(product?.price * (1 - product?.discount / 100)).toFixed(2)}
//                 </p>
//               </div>
//             ) : (
//               /* Regular Price Section */
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium text-gray-700">
//                     Regular Price
//                   </span>
//                   <span className="text-lg font-semibold text-gray-900">
//                     ${product?.price.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Order History */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <ShoppingCart className="w-5 h-5" />
//               Order History
//             </CardTitle>
//             <CardDescription>
//               Total Orders: {product?.OrderItem.length}
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Order ID</TableHead>
//                   <TableHead>Quantity</TableHead>
//                   <TableHead>Price</TableHead>
//                   <TableHead className="text-right">Total</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {product?.OrderItem?.map((order: TOrderItem) => (
//                   <TableRow key={order?.id}>
//                     <TableCell className="font-medium">
//                       {order?.orderId}
//                     </TableCell>
//                     <TableCell>{order?.quantity}</TableCell>
//                     <TableCell>${order?.price}</TableCell>
//                     <TableCell className="text-right">
//                       ${(order?.price * order?.quantity).toFixed(2)}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Reviews */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Users className="w-5 h-5" />
//                 Customer Reviews
//               </div>
//               <Badge variant="outline" className="flex items-center gap-1">
//                 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                 {averageRating ? averageRating?.toFixed(1) : "N/A"} (
//                 {product?.reviews?.length})
//               </Badge>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Accordion type="single" collapsible className="w-full">
//               {product?.reviews.map((review: TReview) => (
//                 <AccordionItem key={review?.id} value={review?.id}>
//                   <AccordionTrigger className="hover:no-underline">
//                     <div className="flex items-center justify-between w-full pr-4">
//                       <div className="flex items-center gap-4">
//                         <Avatar>
//                           <AvatarImage src={review?.user?.profilePhoto} />
//                           <AvatarFallback>
//                             {review?.user?.name[0]}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="text-left">
//                           <p className="font-medium">{review?.user?.name}</p>
//                           <p className="text-sm text-muted-foreground">
//                             {format(new Date(review?.createdAt), "PPP")}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`w-4 h-4 ${
//                               i < review?.rating
//                                 ? "fill-yellow-400 text-yellow-400"
//                                 : "text-gray-300"
//                             }`}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </AccordionTrigger>
//                   <AccordionContent>
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="pl-16 pr-4"
//                     >
//                       {review?.comment}
//                     </motion.div>
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </CardContent>
//         </Card>

//         {/* Product Timeline */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Calendar className="w-5 h-5" />
//               Product Timeline
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//               <div className="space-y-1">
//                 <p className="text-sm font-medium">Created</p>
//                 <p className="text-sm text-gray-500">
//                   {format(new Date(product?.createdAt), "PPp")}
//                 </p>
//               </div>
//               <Badge variant="outline">Initial Launch</Badge>
//             </div>
//             <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
//               <div className="space-y-1">
//                 <p className="text-sm font-medium">Last Updated</p>
//                 <p className="text-sm text-gray-500">
//                   {format(new Date(product?.updatedAt), "PPp")}
//                 </p>
//               </div>
//               <Badge variant="outline">Latest Modification</Badge>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// };

// export default AdminProductDetails;

"use client";

import { useGetProductByIdQuery } from "@/redux/features/products/productsApi";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { Edit, ArrowLeft, Copy } from "lucide-react";
import { Product } from "@/types";
import { OverviewTab } from "./_components/overviewTab";
import { OrdersTab } from "./_components/ordersTab";
import { ReviewsTab } from "./_components/reviewsTab";
import { SettingsTab } from "./_components/settingsTab";

// Tab Content Components

const AdminProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(id);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto mb-4" />
          <p className="text-sm text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 text-red-500">⚠️</div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link href="/admin/products">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const product = data?.data;

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-600 mt-1 font-medium">
                  Product ID: {product.id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => copyToClipboard(product.id)}
              >
                <Copy className="w-4 h-4" />
                Copy ID
              </Button>
              <Link href="/admin/products">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="container mx-auto py-4 px-2">
        <Tabs defaultValue="overview" className="space-y-2">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <span>📊</span>
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <span>🛒</span>
              Orders
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <span>⭐</span>
              Reviews
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <span>⚙️</span>
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab product={product} copyToClipboard={copyToClipboard} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab product={product} />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsTab product={product} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab product={product} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminProductDetails;
