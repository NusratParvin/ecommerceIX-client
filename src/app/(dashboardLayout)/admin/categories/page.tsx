// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Plus, Pencil, Trash2, FolderPlus, Undo, Search } from "lucide-react";
// import {
//   useCreateCategoryMutation,
//   useDeleteCategoryMutation,
//   useGetCategoriesQuery,
//   useUpdateCategoryMutation,
// } from "@/redux/features/categories/categoriesApi";
// import { Spinner } from "@/components/ui/spinner";
// import { CustomError, TCategory } from "@/types";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
// } from "@/components/ui/select";
// import Image from "next/image";

// const AdminCategoriesPage = () => {
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
//   const [editCategory, setEditCategory] = useState<TCategory | null>(null);
//   const [createDialogOpen, setCreateDialogOpen] = useState(false);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);

//   // Pagination State
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [previewImage, setPreviewImage] = useState<string | null>(
//     editCategory?.imageUrl || null
//   );
//   const [imageError, setImageError] = useState<string | null>(null);

//   const { data, isLoading } = useGetCategoriesQuery({
//     page,
//     limit,
//     sortBy,
//     sortOrder,
//     searchTerm,
//   });
//   const categories = data?.data || [];
//   const totalRecords = data?.meta?.totalRecords || 0;
//   const totalPages = Math.ceil(totalRecords / limit);

//   const [createCategory] = useCreateCategoryMutation();
//   const [updateCategory] = useUpdateCategoryMutation();
//   const [deleteCategory] = useDeleteCategoryMutation();

//   console.log(categories);
//   useEffect(() => {
//     setPage(1);
//   }, [searchTerm]);

//   // Create Category
//   const handleCreateCategory = async () => {
//     if (!newCategoryName.trim()) {
//       toast.error("Category name is required!");
//       return;
//     }
//     if (!newCategoryImage) {
//       toast.error("Category image is required!");
//       return;
//     }

//     const toastId = toast.loading("Creating Category...");

//     const formData = new FormData();
//     formData.append(
//       "data",
//       JSON.stringify({
//         name: newCategoryName,
//       })
//     );
//     formData.append("file", newCategoryImage);
//     console.log("FormData for submission:", Object.fromEntries(formData));

//     try {
//       await createCategory(formData).unwrap();
//       setNewCategoryName("");
//       setNewCategoryImage(null);
//       setCreateDialogOpen(false);

//       toast.success("Category created successfully!", {
//         id: toastId,
//         className: "text-green-700",
//       });
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to create category.");
//     }
//   };

//   // Update Category
//   const handleUpdateCategory = async () => {
//     if (!editCategory?.name.trim()) {
//       toast.error("Category name is required!");
//       return;
//     }

//     try {
//       await updateCategory({
//         id: editCategory.id,
//         payload: { name: editCategory.name },
//       }).unwrap();
//       setEditDialogOpen(false);
//       setEditCategory(null);
//       toast.success("Category updated successfully!");
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       // console.log(error);
//       const errorMessage =
//         (error as CustomError)?.data?.message ||
//         error.message ||
//         "An unexpected error occurred.";
//       toast.error(errorMessage);
//     }
//   };

//   // Undo Delete
//   const handleUndoDeleteCategory = async (id: string) => {
//     try {
//       await updateCategory({ id, payload: { isDeleted: false } }).unwrap();
//       toast.success("Category restored successfully!");
//     } catch (error) {
//       toast.error("Failed to restore category.");
//     }
//   };

//   // Delete Category
//   const handleDeleteCategory = async (id: string) => {
//     try {
//       await deleteCategory(id).unwrap();
//       toast.success("Category deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete category.");
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen p-2 space-y-2">
//       {/* Heading */}
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-1">
//           <FolderPlus className="w-4 h-4 mb-1" />
//           <h1 className="text-lg font-semibold text-slate-700">Categories</h1>
//         </div>

//         <div className="flex flex-row gap-2 items-center">
//           <p className="text-sm text-gray-600 pe-2">
//             Total Records:{" "}
//             <span className="font-medium">{totalRecords ?? 0}</span>
//           </p>

//           {/* Create Button */}
//           <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
//             <DialogTrigger asChild>
//               <Button className="gap-1 bg-white text-deep-brown hover:bg-gray-200">
//                 <Plus className="h-4 w-4 mb-1" />
//                 Create Category
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Create New Category</DialogTitle>
//               </DialogHeader>

//               <div className="space-y-4">
//                 {/* Name Field */}
//                 <Input
//                   type="text"
//                   value={newCategoryName}
//                   onChange={(e) => setNewCategoryName(e.target.value)}
//                   placeholder="Category Name"
//                   className="w-full"
//                 />

//                 {/* Image Upload */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Category Image
//                   </label>
//                   <div className="flex items-center space-x-4">
//                     {/* Image Preview */}
//                     {newCategoryImage && (
//                       <div className="relative h-16 w-16 rounded overflow-hidden border">
//                         <Image
//                           src={URL.createObjectURL(newCategoryImage)}
//                           alt="Preview"
//                           className="object-cover"
//                           layout="fill"
//                         />
//                       </div>
//                     )}

//                     {/* File Input */}
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) =>
//                         e.target.files?.[0] &&
//                         setNewCategoryImage(e.target.files[0])
//                       }
//                       className="hidden"
//                       id="category-image-upload"
//                     />
//                     <label
//                       htmlFor="category-image-upload"
//                       className="cursor-pointer bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 rounded border border-gray-300 hover:bg-gray-200"
//                     >
//                       {newCategoryImage ? "Change Image" : "Upload Image"}
//                     </label>
//                   </div>
//                   {imageError && (
//                     <p className="text-red-600 text-sm mt-1">{imageError}</p>
//                   )}
//                 </div>
//               </div>

//               <DialogFooter>
//                 <Button
//                   variant="outline"
//                   onClick={() => setCreateDialogOpen(false)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button onClick={handleCreateCategory}>Create</Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       {/* filter  */}

//       <div className="flex justify-between items-center gap-4 mb-6">
//         {/* Search Input */}
//         <div className="relative w-full md:w-2/5 text-xs ">
//           <Input
//             placeholder="Search by name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10"
//           />
//           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//             <Search className="h-5 w-5 text-gray-400" />
//           </div>
//         </div>

//         <div className="flex flex-row  gap-4 justify-center items-center">
//           {/* Sort By Dropdown */}
//           <div className="flex items-center space-x-2">
//             <label
//               htmlFor="sortBy"
//               className="text-sm font-medium text-gray-900"
//             >
//               Sort By:
//             </label>
//             <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
//               <SelectTrigger className="w-40">
//                 <span>{sortBy}</span>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="createdAt">Created At</SelectItem>
//                 <SelectItem value="name">Name</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           {/* Sort Order Dropdown */}
//           <div className="flex items-center space-x-2">
//             <label
//               htmlFor="sortOrder"
//               className="text-sm font-medium text-gray-600"
//             >
//               Order:
//             </label>
//             <Select
//               value={sortOrder}
//               onValueChange={(value) => setSortOrder(value)}
//             >
//               <SelectTrigger className="w-32">
//                 <span>{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="asc">Ascending</SelectItem>
//                 <SelectItem value="desc">Descending</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="flex-grow border border-slate-200/60 rounded-none p-4 shadow-xl min-h-screen text-black">
//         {isLoading ? (
//           <Spinner />
//         ) : categories.length === 0 ? (
//           <p className="text-center text-gray-500">No data found.</p>
//         ) : (
//           <>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>#</TableHead>
//                   <TableHead>ID</TableHead>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Image</TableHead>
//                   <TableHead>Products</TableHead>
//                   <TableHead>Deleted</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {categories.map((category: TCategory, index: number) => (
//                   <TableRow key={category.id}>
//                     {/* Serial Number */}
//                     <TableCell className="font-medium">
//                       {(page - 1) * limit + index + 1}
//                     </TableCell>

//                     {/* Category ID */}
//                     <TableCell className=" text-charcoal/70">
//                       {category.id}
//                     </TableCell>

//                     {/* Category Name */}
//                     <TableCell>{category.name}</TableCell>

//                     {/* Category Image */}
//                     <TableCell>
//                       <div className="w-16 h-16 relative">
//                         <Image
//                           src={category.imageUrl || ""}
//                           alt={category.name}
//                           fill
//                           className="object-cover rounded-md border"
//                         />
//                       </div>
//                     </TableCell>

//                     {/* Number of Products */}
//                     <TableCell>{category?.products?.length || 0}</TableCell>

//                     {/* Deleted Status */}
//                     <TableCell>
//                       {category.isDeleted ? (
//                         <span className="text-red-600">Yes</span>
//                       ) : (
//                         <span className="text-green-600">No</span>
//                       )}
//                     </TableCell>

//                     {/* Actions */}
//                     <TableCell className="text-right">
//                       <div className="flex justify-end gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="gap-1"
//                           onClick={() => {
//                             setEditCategory(category);
//                             setEditDialogOpen(true);
//                           }}
//                         >
//                           <Pencil className="h-3 w-3" />
//                           Change
//                         </Button>
//                         {category.isDeleted ? (
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="gap-1 text-green-600 border-green-600 hover:bg-green-100"
//                             onClick={() =>
//                               handleUndoDeleteCategory(category.id)
//                             }
//                           >
//                             <Undo className="h-3 w-3" />
//                             Undo
//                           </Button>
//                         ) : (
//                           <Button
//                             variant="destructive"
//                             size="sm"
//                             className="gap-1"
//                             onClick={() => handleDeleteCategory(category.id)}
//                           >
//                             <Trash2 className="h-3 w-3" />
//                             Delete
//                           </Button>
//                         )}
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>

//             {/* Pagination */}
//             <div className="flex justify-between items-center bg-warm-brown/10mt-4">
//               <Button
//                 variant="outline"
//                 onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={page === 1}
//               >
//                 Previous
//               </Button>
//               <span>Page {page}</span>
//               <Button
//                 variant="outline"
//                 onClick={() => setPage((prev) => prev + 1)}
//                 disabled={
//                   data?.meta?.totalPages && page >= data.meta.totalPages
//                 }
//               >
//                 Next
//               </Button>
//             </div>
//           </>
//         )}
//       </div>
//       {/* Edit Category Dialog */}
//       <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Category</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <Input
//               type="text"
//               value={editCategory?.id || ""}
//               disabled
//               className="bg-muted"
//             />
//             <Input
//               type="text"
//               value={editCategory?.name || ""}
//               onChange={(e) =>
//                 setEditCategory((prev) =>
//                   prev ? { ...prev, name: e.target.value } : null
//                 )
//               }
//             />
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleUpdateCategory}>Save Changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminCategoriesPage;

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Pencil,
  Trash2,
  FolderPlus,
  Undo,
  Search,
  Filter,
  Download,
} from "lucide-react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/categories/categoriesApi";
import { Spinner } from "@/components/ui/spinner";
import { CustomError, TCategory } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";

const AdminCategoriesPage = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
  const [editCategory, setEditCategory] = useState<TCategory | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Pagination & Filter State
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "deleted"
  >("all");
  const [imageError, setImageError] = useState<string | null>(null);

  const { data, isLoading, error } = useGetCategoriesQuery({
    page,
    limit,
    sortBy,
    sortOrder,
    searchTerm,
  });

  const categories = data?.data || [];
  const totalRecords = data?.meta?.totalRecords || 0;
  const totalPages = Math.ceil(totalRecords / limit);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter]);

  // Filter categories based on status
  const filteredCategories = categories.filter((category) => {
    if (statusFilter === "active") return !category.isDeleted;
    if (statusFilter === "deleted") return category.isDeleted;
    return true;
  });

  // Create Category
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name is required!");
      return;
    }
    if (!newCategoryImage) {
      toast.error("Category image is required!");
      return;
    }

    const toastId = toast.loading("Creating Category...");

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        name: newCategoryName,
      })
    );
    formData.append("file", newCategoryImage);

    try {
      await createCategory(formData).unwrap();
      setNewCategoryName("");
      setNewCategoryImage(null);
      setCreateDialogOpen(false);

      toast.success("Category created successfully!", {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to create category.", { id: toastId });
    }
  };

  // Update Category
  const handleUpdateCategory = async () => {
    if (!editCategory?.name.trim()) {
      toast.error("Category name is required!");
      return;
    }

    const toastId = toast.loading("Updating Category...");

    try {
      await updateCategory({
        id: editCategory.id,
        payload: { name: editCategory.name },
      }).unwrap();
      setEditDialogOpen(false);
      setEditCategory(null);
      toast.success("Category updated successfully!", { id: toastId });
    } catch (error: any) {
      const errorMessage =
        (error as CustomError)?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  // Undo Delete
  const handleUndoDeleteCategory = async (id: string) => {
    const toastId = toast.loading("Restoring Category...");
    try {
      await updateCategory({ id, payload: { isDeleted: false } }).unwrap();
      toast.success("Category restored successfully!", { id: toastId });
    } catch (error) {
      toast.error("Failed to restore category.", { id: toastId });
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id: string) => {
    const toastId = toast.loading("Deleting Category...");
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully!", { id: toastId });
    } catch (error) {
      toast.error("Failed to delete category.", { id: toastId });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col min-h-screen p-4 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Categories Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor all product categories in your system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Category Name"
                  className="w-full"
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Category Image
                  </label>
                  <div className="flex items-center space-x-4">
                    {newCategoryImage && (
                      <div className="relative h-16 w-16 rounded overflow-hidden border">
                        <Image
                          src={URL.createObjectURL(newCategoryImage)}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setNewCategoryImage(file);
                          setImageError(null);
                        }
                      }}
                      className="hidden"
                      id="category-image-upload"
                    />
                    <label
                      htmlFor="category-image-upload"
                      className="cursor-pointer bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 rounded border border-gray-300 hover:bg-gray-200"
                    >
                      {newCategoryImage ? "Change Image" : "Upload Image"}
                    </label>
                  </div>
                  {imageError && (
                    <p className="text-red-600 text-sm mt-1">{imageError}</p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateCategory}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search categories by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Status:{" "}
                    {statusFilter === "all"
                      ? "All"
                      : statusFilter === "active"
                      ? "Active"
                      : "Deleted"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Categories
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    Active Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("deleted")}>
                    Deleted Only
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Created At</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Spinner />
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No categories found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow>
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead className="min-w-[200px]">Category</TableHead>
                      <TableHead className="min-w-[120px]">Products</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[120px]">Created</TableHead>
                      <TableHead className="min-w-[120px]">Updated</TableHead>
                      <TableHead className="text-right min-w-[140px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map(
                      (category: TCategory, index: number) => (
                        <TableRow
                          key={category.id}
                          className={
                            category.isDeleted
                              ? "bg-red-50/30 hover:bg-red-50/50"
                              : "hover:bg-gray-50/50"
                          }
                        >
                          <TableCell className="text-center font-medium text-gray-600">
                            {(page - 1) * limit + index + 1}
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 relative flex-shrink-0">
                                <Image
                                  src={
                                    category.imageUrl ||
                                    "/placeholder-image.jpg"
                                  }
                                  alt={category.name}
                                  fill
                                  className="object-cover rounded-lg border"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "/placeholder-image.jpg";
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 truncate">
                                  {category.name}
                                </div>
                                <div className="text-xs text-gray-500 font-mono truncate">
                                  ID: {category.id.slice(0, 8)}...
                                </div>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900">
                                {category?.products?.length || 0}
                              </span>
                              <span className="text-xs text-gray-500">
                                products
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <Badge
                              variant={
                                category.isDeleted ? "destructive" : "default"
                              }
                              className={
                                !category.isDeleted
                                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                                  : ""
                              }
                            >
                              {category.isDeleted ? "Deleted" : "Active"}
                            </Badge>
                          </TableCell>

                          <TableCell className="text-sm text-gray-600">
                            {formatDate(category.createdAt)}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {formatDate(category.updatedAt)}
                          </TableCell>

                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {!category.isDeleted ? (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setEditCategory(category);
                                        setEditDialogOpen(true);
                                      }}
                                    >
                                      <Pencil className="h-4 w-4 mr-2" />
                                      Edit Category
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleDeleteCategory(category.id)
                                      }
                                      className="text-red-600 focus:text-red-600"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete Category
                                    </DropdownMenuItem>
                                  </>
                                ) : (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleUndoDeleteCategory(category.id)
                                    }
                                    className="text-green-600 focus:text-green-600"
                                  >
                                    <Undo className="h-4 w-4 mr-2" />
                                    Restore Category
                                  </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t">
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-medium">
                    {filteredCategories.length}
                  </span>{" "}
                  of <span className="font-medium">{totalRecords}</span>{" "}
                  categories
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Status:</span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700"
                    >
                      {categories.filter((c) => !c.isDeleted).length} Active
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                      {categories.filter((c) => c.isDeleted).length} Deleted
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <span className="flex items-center px-3 text-sm">
                      Page {page} of {totalPages || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((prev) => prev + 1)}
                      disabled={page >= totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Category Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Category ID
              </label>
              <Input
                type="text"
                value={editCategory?.id || ""}
                disabled
                className="bg-muted mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Category Name
              </label>
              <Input
                type="text"
                value={editCategory?.name || ""}
                onChange={(e) =>
                  setEditCategory((prev) =>
                    prev ? { ...prev, name: e.target.value } : null
                  )
                }
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCategoriesPage;
