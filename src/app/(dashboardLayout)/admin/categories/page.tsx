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
import { Plus, Pencil, Trash2, FolderPlus, Undo, Search } from "lucide-react";
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
} from "@/components/ui/select";
import Image from "next/image";

const AdminCategoriesPage = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
  const [editCategory, setEditCategory] = useState<TCategory | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(
    editCategory?.imageUrl || null
  );
  const [imageError, setImageError] = useState<string | null>(null);

  const { data, isLoading } = useGetCategoriesQuery({
    page,
    limit,
    sortBy,
    sortOrder,
    searchTerm,
  });
  const categories = data?.data || [];
  const totalRecords = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalRecords / limit);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  console.log(categories);
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

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
    console.log("FormData for submission:", Object.fromEntries(formData));

    try {
      await createCategory(formData).unwrap();
      setNewCategoryName("");
      setNewCategoryImage(null);
      setCreateDialogOpen(false);

      toast.success("Category created successfully!", {
        id: toastId,
        className: "text-green-700",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error);
      toast.error("Failed to create category.");
    }
  };

  // Update Category
  const handleUpdateCategory = async () => {
    if (!editCategory?.name.trim()) {
      toast.error("Category name is required!");
      return;
    }

    try {
      await updateCategory({
        id: editCategory.id,
        payload: { name: editCategory.name },
      }).unwrap();
      setEditDialogOpen(false);
      setEditCategory(null);
      toast.success("Category updated successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.log(error);
      const errorMessage =
        (error as CustomError)?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  // Undo Delete
  const handleUndoDeleteCategory = async (id: string) => {
    try {
      await updateCategory({ id, payload: { isDeleted: false } }).unwrap();
      toast.success("Category restored successfully!");
    } catch (error) {
      toast.error("Failed to restore category.");
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="p-2 space-y-2">
      {/* Heading */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FolderPlus className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold text-charcoal">Categories</h1>
        </div>

        {/* Create Button */}
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-white text-deep-brown hover:bg-gray-200">
              <Plus className="h-4 w-4" />
              Create Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Name Field */}
              <Input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category Name"
                className="w-full"
              />

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Category Image
                </label>
                <div className="flex items-center space-x-4">
                  {/* Image Preview */}
                  {newCategoryImage && (
                    <div className="relative h-16 w-16 rounded overflow-hidden border">
                      <Image
                        src={URL.createObjectURL(newCategoryImage)}
                        alt="Preview"
                        className="object-cover"
                        layout="fill"
                      />
                    </div>
                  )}

                  {/* File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      setNewCategoryImage(e.target.files[0])
                    }
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

      {/* filter  */}

      <div className="flex flex-wrap justify-around items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <Input
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        {/* Sort By Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sortBy" className="text-sm font-medium text-gray-900">
            Sort By:
          </label>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <span>{sortBy}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Created At</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Sort Order Dropdown */}
        <div className="flex items-center space-x-2">
          <label
            htmlFor="sortOrder"
            className="text-sm font-medium text-gray-600"
          >
            Order:
          </label>
          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value)}
          >
            <SelectTrigger className="w-32">
              <span>{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg p-4 shadow-md">
        {isLoading ? (
          <Spinner />
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">No data found.</p>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Total Records: <span className="font-medium">{totalRecords}</span>
            </p>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Deleted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category: TCategory, index: number) => (
                  <TableRow key={category.id}>
                    {/* Serial Number */}
                    <TableCell className="font-medium">
                      {(page - 1) * limit + index + 1}
                    </TableCell>

                    {/* Category ID */}
                    <TableCell className=" text-charcoal/70">
                      {category.id}
                    </TableCell>

                    {/* Category Name */}
                    <TableCell>{category.name}</TableCell>

                    {/* Category Image */}
                    <TableCell>
                      <div className="w-16 h-16 relative">
                        <Image
                          src={category.imageUrl || ""}
                          alt={category.name}
                          fill
                          className="object-cover rounded-md border"
                        />
                      </div>
                    </TableCell>

                    {/* Number of Products */}
                    <TableCell>{category?.products?.length || 0}</TableCell>

                    {/* Deleted Status */}
                    <TableCell>
                      {category.isDeleted ? (
                        <span className="text-red-600">Yes</span>
                      ) : (
                        <span className="text-green-600">No</span>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
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
                          Change
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
                            Undo
                          </Button>
                        ) : (
                          <Button
                            variant="destructive"
                            size="sm"
                            className="gap-1"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-between items-center bg-warm-brown/10mt-4">
              <Button
                variant="outline"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span>Page {page}</span>
              <Button
                variant="outline"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={
                  data?.meta?.totalPages && page >= data.meta.totalPages
                }
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
      {/* Edit Category Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              type="text"
              value={editCategory?.id || ""}
              disabled
              className="bg-muted"
            />
            <Input
              type="text"
              value={editCategory?.name || ""}
              onChange={(e) =>
                setEditCategory((prev) =>
                  prev ? { ...prev, name: e.target.value } : null
                )
              }
            />
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
