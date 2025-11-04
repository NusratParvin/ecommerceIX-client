// "use client";

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { TShopInputProp } from "@/types";
// import { format } from "date-fns";
// import Image from "next/image";

// interface ShopDetailsDrawerProps {
//   shop: Partial<TShopInputProp> | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const ShopDetailsDrawer = ({
//   shop,
//   isOpen,
//   onClose,
// }: ShopDetailsDrawerProps) => {
//   if (!shop) return null;

//   return (
//     <Sheet open={isOpen} onOpenChange={onClose}>
//       <SheetContent className="max-w-md p-4 text-sm">
//         <SheetHeader>
//           <SheetTitle className="text-lg font-bold">Shop Details</SheetTitle>
//         </SheetHeader>
//         <div className="mt-4 max-h-[70vh]  space-y-1">
//           {[
//             { label: "Name", value: shop.name },
//             { label: "Owner", value: shop?.owner?.name },
//             { label: "Products", value: shop.productCount },
//             { label: "Followers", value: shop.followerCount },
//             { label: "Description", value: shop.description || "N/A" },
//             {
//               label: "Status",
//               value: (
//                 <span
//                   className={`px-2 py-1 inline-block rounded-md text-xs font-semibold ${
//                     shop.status === "ACTIVE"
//                       ? "bg-green-100 text-green-600"
//                       : "bg-red-100 text-red-600"
//                   }`}
//                 >
//                   {shop.status}
//                 </span>
//               ),
//             },
//             {
//               label: "Created At",
//               value: format(new Date(shop?.createdAt), "MMM d, yyyy h:mm a"),
//             },
//             {
//               label: "Last Updated",
//               value: format(new Date(shop?.updatedAt), "MMM d, yyyy h:mm a"),
//             },
//           ].map((detail) => (
//             <div
//               key={detail.label}
//               className="flex justify-between items-center py-2"
//             >
//               <h3 className="font-medium text-gray-700">{detail.label}</h3>
//               <p className="text-gray-600">{detail.value}</p>
//             </div>
//           ))}

//           {/* Shop Logo */}
//           {shop.logo && (
//             <div className="flex items-center justify-between py-2">
//               <h3 className="font-medium text-gray-700">Shop Logo</h3>
//               <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300">
//                 <Image
//                   src={shop.logo}
//                   alt={`${shop.name}'s Logo`}
//                   fill
//                   className="object-cover"
//                   placeholder="blur"
//                   blurDataURL="/placeholder.png"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// };

"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TShopInputProp } from "@/types";
import { format } from "date-fns";
import Image from "next/image";

interface ShopDetailsDrawerProps {
  shop: TShopInputProp | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShopDetailsDrawer = ({
  shop,
  isOpen,
  onClose,
}: ShopDetailsDrawerProps) => {
  if (!shop) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="max-w-md p-4 text-sm">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold">Shop Details</SheetTitle>
        </SheetHeader>
        <div className="mt-4 max-h-[70vh] space-y-1">
          {[
            { label: "Name", value: shop.name },
            { label: "Owner", value: shop.owner?.name || "N/A" },
            { label: "Products", value: shop.productCount || 0 },
            { label: "Followers", value: shop.followerCount || 0 },
            { label: "Description", value: shop.description || "N/A" },
            {
              label: "Status",
              value: (
                <span
                  className={`px-2 py-1 inline-block rounded-md text-xs font-semibold ${
                    shop.status === "ACTIVE"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {shop.status}
                </span>
              ),
            },
            {
              label: "Created At",
              value: shop.createdAt
                ? format(new Date(shop.createdAt), "MMM d, yyyy h:mm a")
                : "N/A",
            },
            {
              label: "Last Updated",
              value: shop.updatedAt
                ? format(new Date(shop.updatedAt), "MMM d, yyyy h:mm a")
                : "N/A",
            },
          ].map((detail) => (
            <div
              key={detail.label}
              className="flex justify-between items-center py-2"
            >
              <h3 className="font-medium text-gray-700">{detail.label}</h3>
              <p className="text-gray-600">{detail.value}</p>
            </div>
          ))}

          {/* Shop Logo */}
          {shop.logo && (
            <div className="flex items-center justify-between py-2">
              <h3 className="font-medium text-gray-700">Shop Logo</h3>
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                <Image
                  src={shop.logo}
                  alt={`${shop.name}'s Logo`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
