// "use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { CircleEllipsis, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Product } from "@/types";
// import Image from "next/image";
// import { useState } from "react";

// interface ProductTableProps {
//   products: Product[];
//   onView: (product: Product) => void;
//   onDelete: (product: Product) => void;
//   onUpdateStatus: (productId: string, status: "ACTIVE" | "HIDDEN") => void;
// }

// export const ProductTable = ({
//   products,
//   onView,
//   onDelete,
//   onUpdateStatus,
// }: ProductTableProps) => {
//   const [isEditingStatus, setIsEditingStatus] = useState(false);

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>#</TableHead>
//           <TableHead>Product Image</TableHead>
//           <TableHead>Product Name</TableHead>
//           <TableHead>Price</TableHead>
//           <TableHead>Stock</TableHead>
//           <TableHead>Category</TableHead>
//           <TableHead className="text-center">
//             <div className="flex items-center gap-2 justify-center">
//               Status
//               <input
//                 type="checkbox"
//                 checked={isEditingStatus}
//                 onChange={(e) => setIsEditingStatus(e.target.checked)}
//                 className="cursor-pointer"
//               />
//             </div>
//           </TableHead>
//           <TableHead className="text-right">Actions</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {products.map((product, index) => (
//           <TableRow key={product.id} className="hover:bg-muted/50">
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

//             {/* Product Status */}
//             <TableCell className="text-center">
//               {product.isDeleted ? (
//                 <span className="px-2 py-1 rounded-md text-xs font-semibold bg-gray-200 text-gray-600">
//                   DELETED
//                 </span>
//               ) : isEditingStatus ? (
//                 <select
//                   value={product.status}
//                   onChange={(e) =>
//                     onUpdateStatus(
//                       product.id,
//                       e.target.value as "ACTIVE" | "HIDDEN"
//                     )
//                   }
//                   className="p-1 text-xs border rounded"
//                 >
//                   <option value="ACTIVE">ACTIVE</option>
//                   <option value="HIDDEN">HIDDEN</option>
//                 </select>
//               ) : (
//                 <span
//                   className={`px-2 py-1 rounded-md text-xs font-semibold ${
//                     product.status === "ACTIVE"
//                       ? "bg-green-100 text-green-600"
//                       : "bg-yellow-100 text-yellow-600"
//                   }`}
//                 >
//                   {product.status}
//                 </span>
//               )}
//             </TableCell>

//             {/* Actions */}
//             <TableCell className="text-right space-x-2">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => onView(product)}
//               >
//                 <CircleEllipsis className="h-4 w-4" />
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
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleEllipsis, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import Image from "next/image";
import { useState } from "react";

interface ProductTableProps {
  products: Product[];
  onView: (product: Product) => void;
  onDelete: (product: Product) => void;
  onUpdateStatus: (productId: string, status: "ACTIVE" | "HIDDEN") => void;
}

export const ProductTable = ({
  products,
  onView,
  onDelete,
  onUpdateStatus,
}: ProductTableProps) => {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [confirmingProductId, setConfirmingProductId] = useState<string | null>(
    null
  );

  const handleDeleteRequest = (productId: string) => {
    setConfirmingProductId(productId);
  };

  const cancelDelete = () => {
    setConfirmingProductId(null);
  };

  const confirmDelete = (product: Product) => {
    setConfirmingProductId(null);
    onDelete(product);
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
          <TableHead className="text-center">
            <div className="flex items-center gap-2 justify-center">
              Status
              <input
                type="checkbox"
                checked={isEditingStatus}
                onChange={(e) => setIsEditingStatus(e.target.checked)}
                className="cursor-pointer"
              />
            </div>
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={product.id} className="hover:bg-muted/50">
            {/* Serial Number */}
            <TableCell>{index + 1}</TableCell>

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

            {/* Product Status */}
            <TableCell className="text-center">
              {product.isDeleted ? (
                <span
                  className="px-2 py-1 rounded-md text-xs font-semibold bg-gray-200 text-gray-600"
                  title="Product is deleted and cannot be edited"
                >
                  DELETED
                </span>
              ) : isEditingStatus ? (
                <select
                  value={product.status}
                  onChange={(e) =>
                    onUpdateStatus(
                      product.id,
                      e.target.value as "ACTIVE" | "HIDDEN"
                    )
                  }
                  className="p-1 text-xs border rounded"
                  disabled={product.isDeleted}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="HIDDEN">HIDDEN</option>
                </select>
              ) : (
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    product.status === "ACTIVE"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {product.status}
                </span>
              )}
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right space-x-2">
              {confirmingProductId === product.id ? (
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => confirmDelete(product)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Check className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={cancelDelete}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(product)}
                  >
                    <CircleEllipsis className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRequest(product.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
