/* eslint-disable @typescript-eslint/no-explicit-any */
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
  DialogDescription,
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
  EyeOff,
  EyeIcon,
  Package,
  DollarSign,
  Star,
  Tag,
  Calendar,
  Folders,
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
import moment from "moment";
import Link from "next/link";
import ViewCategoryDialog from "./_components/viewCategory";
import { EditCategory } from "./_components/editCategory";

const AdminCategoriesPage = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
  const [editCategory, setEditCategory] = useState<TCategory | null>(null);
  const [viewCategory, setViewCategory] = useState<TCategory | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

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
  // console.log(categories);
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter]);

  // Filter categories based on status
  const filteredCategories = categories.filter((category: TCategory) => {
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
      }),
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

  //view category
  const handleViewCategory = (category: TCategory) => {
    setViewCategory(category);
    setViewDialogOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen p-2 space-y-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-1 text-slate-700">
            <Folders className="w-4 h-4" />
            <h1 className="text-lg font-semibold tracking-tight ">
              Categories Management
            </h1>
          </div>
          <p className="text-sm text-muted-foreground ps-5">
            Manage and monitor all product categories in your system
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button> */}
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-white text-deep-brown hover:bg-slate-600 hover:text-white ">
                <Plus className="h-4 w-4 mb-1" />
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

      <div className="flex flex-col sm:flex-row gap-4 ">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search categories by name  ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="gap-2">
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

      {/* Table Section */}

      <div className="flex-grow border border-slate-200/60 rounded-none shadow-xl p-4 min-h-screen">
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
                <TableHeader className="text-slate-800">
                  <TableRow>
                    <TableHead className="w-12 text-center font-bold">
                      #
                    </TableHead>
                    <TableHead className="min-w-[200px] font-bold">
                      Category
                    </TableHead>
                    <TableHead className="min-w-[120px] font-bold">
                      Products
                    </TableHead>
                    <TableHead className="min-w-[100px] font-bold">
                      Status
                    </TableHead>
                    <TableHead className="min-w-[120px] font-bold">
                      Created
                    </TableHead>
                    <TableHead className="min-w-[120px] font-bold">
                      Updated
                    </TableHead>
                    <TableHead className="text-right min-w-[140px] font-bold">
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
                                  category.imageUrl || "/placeholder-image.jpg"
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
                          {moment(category.createdAt).format("MMM DD, YYYY")}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {moment(category.updatedAt).format("MMM DD, YYYY")}
                        </TableCell>

                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              onClick={() => handleViewCategory(category)}
                            >
                              <EyeIcon className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              onClick={() => {
                                setEditCategory(category);
                                setEditDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            {category.isDeleted ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 text-green-600 border-green-600 hover:bg-green-100"
                                onClick={() =>
                                  handleUndoDeleteCategory(category.id)
                                }
                              >
                                <Undo className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button
                                variant="destructive"
                                size="sm"
                                className="gap-1"
                                onClick={() =>
                                  handleDeleteCategory(category.id)
                                }
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t">
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-medium">{filteredCategories.length}</span>{" "}
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
                    {categories.filter((c: TCategory) => !c.isDeleted).length}{" "}
                    Active
                  </Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700">
                    {categories.filter((c: TCategory) => c.isDeleted).length}{" "}
                    Deleted
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
      </div>

      {/* Edit Category Dialog */}
      <EditCategory
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        editCategory={editCategory}
        setEditCategory={setEditCategory}
        onSave={handleUpdateCategory}
      />

      {/* View Category Dialog */}
      <ViewCategoryDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        category={viewCategory}
        onEdit={(cat: TCategory) => {
          setEditCategory(cat);
          setViewDialogOpen(false);
          setEditDialogOpen(true);
        }}
      />
    </div>
  );
};

export default AdminCategoriesPage;
