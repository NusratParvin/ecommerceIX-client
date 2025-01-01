// "use client";

// import { Button } from "@/components/ui/button";
// import { Spinner } from "@/components/ui/spinner";
// import { useGetCategoriesForAllQuery } from "@/redux/features/categories/categoriesApi";
// import { TCategory } from "@/types";
// import { Search, X } from "lucide-react";
// import Link from "next/link";

// type SearchInputProps = {
//   isSearchOpen: boolean;
//   setIsSearchOpen: (isOpen: boolean) => void;
// };

// const SearchInput = ({ isSearchOpen, setIsSearchOpen }: SearchInputProps) => {
//   const { data, isFetching: isFetchingCategories } =
//     useGetCategoriesForAllQuery(undefined);

//       const { data: productsData, isFetching } = useGetProductsQuery({

//         search: debouncedSearch,
//       });

//   const categoriesData = data?.data;

//   if (isFetchingCategories) return <Spinner />;

//   return (
//     <div
//       className={`fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${
//         isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
//       }`}
//     >
//       {/* Search Panel */}
//       <div
//         className={`bg-white shadow-lg rounded-lg transition-transform duration-300 transform ${
//           isSearchOpen ? "translate-y-0" : "-translate-y-full"
//         } w-full h-full md:w-2/3 md:h-2/3`}
//       >
//         <div className="container mx-auto px-4 py-6">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-4">
//             <span className="text-gray-500 text-sm uppercase">
//               What are you looking for?
//             </span>
//             <Button
//               variant="ghost"
//               size="icon"
//               aria-label="Close Search"
//               onClick={() => setIsSearchOpen(false)}
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </Button>
//           </div>

//           {/* Search Input */}
//           <div className="flex items-center border-b border-gray-300 pb-2">
//             <input
//               type="text"
//               placeholder="Search Products..."
//               className="flex-1 text-lg text-gray-800 placeholder-gray-400 focus:outline-none"
//             />
//             <Search className="h-5 w-5 text-gray-500 ml-2" />
//           </div>

//           {/* Categories */}
//           <div className="mt-4">
//             <h4 className="text-gray-500 text-sm uppercase mb-2">Categories</h4>
//             <div className="flex space-x-4 flex-wrap">
//               {categoriesData.map((category: TCategory) => (
//                 <div
//                   key={category?.id}
//                   className="text-gray-800 hover:underline cursor-pointer flex flex-row gap-3"
//                 >
//                   <Link href={`/allProducts/${category?.id}`}>
//                     {category?.name}
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchInput;

"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGetCategoriesForAllQuery } from "@/redux/features/categories/categoriesApi";
import { TCategory } from "@/types";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SearchInputProps = {
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
};

const SearchInput = ({ isSearchOpen, setIsSearchOpen }: SearchInputProps) => {
  const { data, isFetching: isFetchingCategories } =
    useGetCategoriesForAllQuery(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const categoriesData = data?.data;

  if (isFetchingCategories) return <Spinner />;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to the product search page
      router.push(`/allProducts/search/${searchQuery}`);
      setIsSearchOpen(false); // Close the search modal
    }
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${
        isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Search Panel */}
      <div
        className={`bg-white shadow-lg rounded-lg transition-transform duration-300 transform w-full h-full md:w-2/3 md:h-2/3 ${
          isSearchOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 text-sm uppercase">
              What are you looking for?
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close Search"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>

          {/* Search Input */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border-b border-gray-300 pb-2"
          >
            <input
              type="text"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-lg text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <button type="submit">
              <Search className="h-5 w-5 text-gray-500 ml-2" />
            </button>
          </form>

          {/* Categories */}
          <div className="mt-4">
            <h4 className="text-gray-500 text-sm uppercase mb-2">Categories</h4>
            <div className="flex space-x-4 flex-wrap">
              {categoriesData?.map((category: TCategory) => (
                <div
                  key={category?.id}
                  className="text-gray-800 hover:underline cursor-pointer flex flex-row gap-3"
                >
                  <Link href={`/allProducts/${category?.id}`}>
                    {category?.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
