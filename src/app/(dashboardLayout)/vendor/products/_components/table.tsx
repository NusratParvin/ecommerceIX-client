// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   CircleEllipsis,
//   Copy,
//   Edit2,
//   Percent,
//   Trash2,
//   Zap,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Product } from "@/types";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// interface ProductTableProps {
//   products: Product[];
//   onView: (product: Product) => void;
//   onEdit: (product: Product) => void;
//   onDelete: (product: Product) => void;
// }

// export const ProductTable = ({
//   products,
//   onView,
//   onEdit,
//   onDelete,
// }: ProductTableProps) => {
//   console.log(products);
//   const router = useRouter();

//   const onDuplicate = (product: Product) => {
//     const
//     const duplicatedProduct = {
//       ...product,
//       id: "",
//       name: `${product.name} (Copy)`,
//     };

//     // You can redirect to a page to edit this new product or directly call a function to add it
//     router.push({
//       pathname: "/vendor/products/addProduct",
//       query: { ...duplicatedProduct },
//     });

//     // Alternatively, you could call a function to directly add the duplicated product
//     // addProduct(duplicatedProduct);
//   };

//   return (
//     // <Table>
//     //   <TableHeader>
//     //     <TableRow>
//     //       <TableHead>#</TableHead>
//     //       <TableHead>Product Image</TableHead>
//     //       <TableHead>Product Name</TableHead>
//     //       <TableHead>Price</TableHead>
//     //       <TableHead>Stock</TableHead>
//     //       <TableHead>Category</TableHead>
//     //       <TableHead>Discount</TableHead>
//     //       <TableHead>On Flash Sale?</TableHead>
//     //       <TableHead className="text-right">Actions</TableHead>
//     //     </TableRow>
//     //   </TableHeader>
//     //   <TableBody>
//     //     {products.map((product, index) => (
//     //       <TableRow
//     //         key={product.id}
//     //         className="cursor-pointer hover:bg-muted/50"
//     //         onClick={() => onView(product)}
//     //       >
//     //         {/* Serial Number */}
//     //         <TableCell>{index + 1}</TableCell>

//     //         {/* Product Image */}
//     //         <TableCell>
//     //           {product.imageUrl ? (
//     //             <div className="w-12 h-12 relative">
//     //               <Image
//     //                 src={product.imageUrl}
//     //                 alt={product.name}
//     //                 layout="fill"
//     //                 objectFit="cover"
//     //                 className="rounded"
//     //               />
//     //             </div>
//     //           ) : (
//     //             <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
//     //               <span className="text-gray-500 text-sm">N/A</span>
//     //             </div>
//     //           )}
//     //         </TableCell>

//     //         {/* Product Name */}
//     //         <TableCell className="font-medium">{product.name}</TableCell>

//     //         {/* Product Price */}
//     //         <TableCell>${product.price}</TableCell>

//     //         {/* Product Stock */}
//     //         <TableCell>{product.stock}</TableCell>

//     //         {/* Product Category */}
//     //         <TableCell>{product?.category?.name ?? "Uncategorized"}</TableCell>

//     //         {/* Discount Icon */}
//     //         <TableCell>
//     //           {product?.discount && product?.discount > 0 ? (
//     //             <span className=" text-green-500 text-sm flex justify-center items-center">
//     //               {product.discount} <Percent className="w-3 h-3" />
//     //             </span>
//     //           ) : (
//     //             <>
//     //               <span className="text-sm text-gray-500">No Discount</span>
//     //             </>
//     //           )}
//     //         </TableCell>

//     //         {/* Flash Sale Icon */}
//     //         <TableCell>
//     //           {product.isFlashSale ? (
//     //             <Zap className="w-4 h-4 text-green-700" fill="green" />
//     //           ) : (
//     //             <Zap className="w-4 h-4 text-gray-300" />
//     //           )}
//     //         </TableCell>

//     //         {/* Actions */}
//     //         <TableCell className="text-right space-x-2">
//     //           <Button
//     //             variant="ghost"
//     //             size="icon"
//     //             onClick={(e) => {
//     //               e.stopPropagation();
//     //               onView(product);
//     //             }}
//     //           >
//     //             <CircleEllipsis className="h-4 w-4" />
//     //           </Button>
//     //           <Button
//     //             variant="ghost"
//     //             size="icon"
//     //             onClick={(e) => {
//     //               e.stopPropagation();
//     //               onEdit(product);
//     //             }}
//     //           >
//     //             <Edit2 className="h-4 w-4" />
//     //           </Button>
//     //           <Button
//     //             variant="ghost"
//     //             size="icon"
//     //             className="text-red-500 hover:text-red-600"
//     //             onClick={(e) => {
//     //               e.stopPropagation();
//     //               onDelete(product);
//     //             }}
//     //           >
//     //             <Trash2 className="h-4 w-4" />
//     //           </Button>
//     //         </TableCell>
//     //       </TableRow>
//     //     ))}
//     //   </TableBody>
//     // </Table>

//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>#</TableHead>
//           <TableHead>Product Image</TableHead>
//           <TableHead>Product Name</TableHead>
//           <TableHead>Price</TableHead>
//           <TableHead>Stock</TableHead>
//           <TableHead>Category</TableHead>
//           <TableHead>Discount</TableHead>
//           <TableHead>On Flash Sale?</TableHead>
//           <TableHead className="text-right">Actions</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {products.map((product, index) => (
//           <TableRow
//             key={product.id}
//             className="cursor-pointer hover:bg-muted/50"
//             onClick={() => onView(product)}
//           >
//             {/* Serial Number */}
//             <TableCell>{index + 1}</TableCell>

//             {/* Product Image */}
//             <TableCell>
//               {product.imageUrl ? (
//                 <div className="w-12 h-12 relative">
//                   <Image
//                     src={product.imageUrl}
//                     alt={product.name}
//                     layout="fill"
//                     objectFit="cover"
//                     className="rounded"
//                   />
//                 </div>
//               ) : (
//                 <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
//                   <span className="text-gray-500 text-sm">N/A</span>
//                 </div>
//               )}
//             </TableCell>

//             {/* Product Name */}
//             <TableCell className="font-medium">{product.name}</TableCell>

//             {/* Product Price */}
//             <TableCell>${product.price}</TableCell>

//             {/* Product Stock */}
//             <TableCell>{product.stock}</TableCell>

//             {/* Product Category */}
//             <TableCell>{product?.category?.name ?? "Uncategorized"}</TableCell>

//             {/* Discount Icon */}
//             <TableCell>
//               {product?.discount && product?.discount > 0 ? (
//                 <span className="text-green-500 text-sm flex justify-center items-center">
//                   {product.discount} <Percent className="w-3 h-3" />
//                 </span>
//               ) : (
//                 <span className="text-sm text-gray-500">No Discount</span>
//               )}
//             </TableCell>

//             {/* Flash Sale Icon */}
//             <TableCell>
//               {product.isFlashSale ? (
//                 <Zap className="w-4 h-4 text-green-700" fill="green" />
//               ) : (
//                 <Zap className="w-4 h-4 text-gray-300" />
//               )}
//             </TableCell>

//             {/* Actions */}
//             <TableCell className="text-right space-x-2">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onView(product);
//                 }}
//               >
//                 <CircleEllipsis className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onEdit(product);
//                 }}
//               >
//                 <Edit2 className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-red-500 hover:text-red-600"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onDelete(product);
//                 }}
//               >
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onDuplicate(product);
//                 }}
//               >
//                 <Copy className="h-4 w-4 text-blue-500" />
//               </Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CircleEllipsis,
  Copy,
  Edit2,
  Percent,
  Trash2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductTableProps {
  products: Product[];
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  currentPage: number;
  itemsPerPage: number;
}

export const ProductTable = ({
  products,
  onView,
  onEdit,
  onDelete,
  currentPage,
  itemsPerPage,
}: ProductTableProps) => {
  const router = useRouter();

  const onDuplicate = (product: Product) => {
    router.push(`/vendor/products/duplicateProduct?id=${product.id}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Product Image</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>On Flash Sale?</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow
            key={product.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onView(product)}
          >
            {/* Serial Number */}
            <TableCell>
              {(currentPage - 1) * itemsPerPage + index + 1}
            </TableCell>

            {/* Product Image */}
            <TableCell>
              {product.imageUrl ? (
                <div className="w-12 h-12 relative">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-sm">N/A</span>
                </div>
              )}
            </TableCell>

            {/* Product Name */}
            <TableCell className="font-medium">{product.name}</TableCell>

            {/* Product Price */}
            <TableCell>${product.price}</TableCell>

            {/* Product Stock */}
            <TableCell>{product.stock}</TableCell>

            {/* Product Category */}
            <TableCell>{product?.category?.name ?? "Uncategorized"}</TableCell>

            {/* Discount Icon */}
            <TableCell>
              {product?.discount && product?.discount > 0 ? (
                <span className="text-green-500 text-sm flex justify-center items-center">
                  {product.discount} <Percent className="w-3 h-3" />
                </span>
              ) : (
                <span className="text-sm text-gray-500">No Discount</span>
              )}
            </TableCell>

            {/* Flash Sale Icon */}
            <TableCell>
              {product.isFlashSale ? (
                <Zap className="w-4 h-4 text-green-700" fill="green" />
              ) : (
                <Zap className="w-4 h-4 text-gray-300" />
              )}
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onView(product);
                }}
              >
                <CircleEllipsis className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(product);
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(product);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate(product);
                }}
              >
                <Copy className="h-4 w-4 text-blue-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
