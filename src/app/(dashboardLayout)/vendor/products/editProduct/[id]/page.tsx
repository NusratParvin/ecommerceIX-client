"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { DollarSign, ImageIcon, Info, Zap } from "lucide-react";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/features/products/productsApi";
import { Product, TCategory } from "@/types";
import { useGetCategoriesForAllQuery } from "@/redux/features/categories/categoriesApi";
import { Spinner } from "@/components/ui/spinner";

const EditProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  // Fetch product by ID
  const { data, isLoading: isProductLoading } = useGetProductByIdQuery(id);
  const productData = data?.data;
  console.log(productData);
  const { data: categoriesData = [], isLoading: isCategoriesLoading } =
    useGetCategoriesForAllQuery(undefined);
  const categories = categoriesData?.data || [];

  const [updateProduct] = useUpdateProductMutation();
  console.log(productData);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      discount: 0,
      categoryId: "",
      isFlashSale: false,
      flashSalePrice: 0,
      flashSaleStartDate: "",
      flashSaleEndDate: "",
    },
  });

  useEffect(() => {
    if (productData) {
      setValue("name", productData.name || "");
      setValue("description", productData.description || "");
      setValue("price", productData.price || 0);
      setValue("stock", productData.stock || 0);
      setValue("discount", productData.discount || 0);
      setValue("categoryId", productData.categoryId || "");
      setValue("isFlashSale", productData.isFlashSale || false);
      setValue("flashSalePrice", productData.flashSalePrice || 0);
      setValue(
        "flashSaleStartDate",
        productData.flashSaleStartDate
          ? new Date(productData.flashSaleStartDate).toISOString().slice(0, 16)
          : ""
      );
      setValue(
        "flashSaleEndDate",
        productData.flashSaleEndDate
          ? new Date(productData.flashSaleEndDate).toISOString().slice(0, 16)
          : ""
      );

      setImagePreview(productData.imageUrl || null);
    }
  }, [productData, setValue]);

  // Handle Image Upload
  const handleImageUpload = (file: File) => {
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("File size must be less than 4MB.");
        return;
      }
      setUploadedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit Handler
  // const onSubmit = async (data: FieldValues) => {
  //   const updatedFields: Partial<Product> = {};
  //   console.log(data);
  //   // Check and add only updated fields
  //   if (data.name !== productData.name) updatedFields.name = data.name;
  //   if (data.description !== productData.description)
  //     updatedFields.description = data.description;
  //   if (data.price !== productData.price) updatedFields.price = data.price;
  //   if (data.stock !== productData.stock) updatedFields.stock = data.stock;
  //   if (data.discount !== productData.discount)
  //     updatedFields.discount = data.discount;
  //   if (data.categoryId !== productData.categoryId)
  //     updatedFields.categoryId = data.categoryId;
  //   if (data.isFlashSale !== productData.isFlashSale)
  //     updatedFields.isFlashSale = data.isFlashSale;
  //   if (data.flashSalePrice !== productData.flashSalePrice)
  //     updatedFields.flashSalePrice = data.flashSalePrice;
  //   if (data.flashSaleStartDate !== productData.flashSaleStartDate)
  //     updatedFields.flashSaleStartDate = data.flashSaleStartDate;
  //   if (data.flashSaleEndDate !== productData.flashSaleEndDate)
  //     updatedFields.flashSaleEndDate = data.flashSaleEndDate;

  //   const formData = new FormData();

  //   // Check if there are any fields to update
  //   if (Object.keys(updatedFields).length > 0) {
  //     console.log("Adding updated fields to FormData:", updatedFields);
  //     formData.append("data", JSON.stringify(updatedFields)); // Add text data
  //   }

  //   // Check if image needs to be updated
  //   if (uploadedImage) {
  //     console.log("Adding uploaded image to FormData:", uploadedImage);
  //     formData.append("file", uploadedImage); // Add image file
  //   }
  //   // Debugging: Log all FormData entries
  //   for (const [key, value] of formData.entries()) {
  //     console.log(`${key}: ${value}`);
  //   }
  //   console.log(formData);
  //   try {
  //     await updateProduct({ id, formData }).unwrap();
  //     toast.success("Product updated successfully!");
  //     // router.push("/vendor/products");
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     toast.error(error.message || "Failed to update product.");
  //   }
  // };

  const onSubmit = async (data: FieldValues) => {
    const updatedFields: Partial<Product> = {};

    // Check and add only updated fields
    if (data.name !== productData.name) updatedFields.name = data.name;
    if (data.description !== productData.description)
      updatedFields.description = data.description;
    if (data.price !== productData.price)
      updatedFields.price = parseFloat(data.price);
    if (data.stock !== productData.stock)
      updatedFields.stock = parseInt(data.stock);
    if (data.discount !== productData.discount)
      updatedFields.discount = parseFloat(data.discount);
    if (data.categoryId !== productData.categoryId)
      updatedFields.categoryId = data.categoryId;
    if (data.isFlashSale !== productData.isFlashSale)
      updatedFields.isFlashSale = data.isFlashSale;
    if (data.flashSalePrice !== productData.flashSalePrice)
      updatedFields.flashSalePrice = parseFloat(data.flashSalePrice);
    if (data.flashSaleStartDate !== productData.flashSaleStartDate)
      updatedFields.flashSaleStartDate = new Date(data.flashSaleStartDate);
    if (data.flashSaleEndDate !== productData.flashSaleEndDate)
      updatedFields.flashSaleEndDate = new Date(data.flashSaleEndDate);

    const formData = new FormData();

    if (Object.keys(updatedFields).length > 0) {
      formData.append("data", JSON.stringify(updatedFields));
    }
    console.log(uploadedImage);

    if (uploadedImage) {
      formData.append("file", uploadedImage);
    }
    console.log(formData, id);
    try {
      await updateProduct({ id, formData }).unwrap();
      toast.success("Product updated successfully!");
      router.push("/vendor/products");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Failed to update product.");
    }
  };

  if (isProductLoading) return <Spinner />;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-deep-brown">Edit Product</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Basic Information */}
        <div className="space-y-4 md:col-span-2 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-charcoal flex items-center space-x-2">
            <Info className="w-5 h-5 text-charcoal" />
            <span>Basic Information</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                placeholder="Enter product name"
                {...register("name", { required: "Product name is required" })}
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Controller
                name="categoryId"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={productData?.categoryId || ""}
                    disabled={isCategoriesLoading || categories.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isCategoriesLoading
                            ? "Loading categories..."
                            : productData?.category?.name || "Select category"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category: TCategory) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.categoryId && (
                <p className="text-red-600 text-sm">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pricing & Inventory and Product Image */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pricing */}
          <div className="space-y-4 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-charcoal flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-charcoal" />
              <span>Pricing & Inventory</span>
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && (
                  <p className="text-red-600 text-sm">{errors.price.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  {...register("stock", { required: "Stock is required" })}
                />
                {errors.stock && (
                  <p className="text-red-600 text-sm">{errors.stock.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-charcoal flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-charcoal" />
              <span>Product Image</span>
            </h2>
            <p className="text-xs text-red-700">
              Please click on image to change & choose image below 4MB
            </p>

            {/* <label
              htmlFor="image-upload"
              className="bg-white text-gray-500 font-semibold text-base rounded-lg max-w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-warm-brown mx-auto transition-all duration-200 hover:border-deep-brown relative"
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover rounded-lg"
                    fill
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg text-warm-brown">
                    Click to upload or drag & drop
                  </p>
                </div>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
              }}
            /> */}
            <label
              htmlFor="image-upload"
              className="bg-white text-gray-500 font-semibold text-base rounded-lg max-w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-warm-brown mx-auto transition-all duration-200 hover:border-deep-brown relative"
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover rounded-lg"
                    fill
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg text-warm-brown">
                    Click to upload or drag & drop
                  </p>
                </div>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
              }}
            />
          </div>
        </div>

        {/* Flash Sale */}
        <div className="space-y-4 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-charcoal flex items-center space-x-2">
              <Zap className="w-5 h-5 text-charcoal" />
              <span>Flash Sale</span>
            </h2>
            <Controller
              name="isFlashSale"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
          {watch("isFlashSale") && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="flashSalePrice">Flash Sale Price</Label>
                <Input
                  id="flashSalePrice"
                  type="number"
                  {...register("flashSalePrice")}
                />
              </div>
              <div>
                <Label htmlFor="flashSaleStartDate">Start Date</Label>
                <Input
                  id="flashSaleStartDate"
                  type="datetime-local"
                  {...register("flashSaleStartDate")}
                />
              </div>
              <div>
                <Label htmlFor="flashSaleEndDate">End Date</Label>
                <Input
                  id="flashSaleEndDate"
                  type="datetime-local"
                  {...register("flashSaleEndDate")}
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end">
          <Button
            type="submit"
            className="bg-deep-brown hover:bg-warm-brown text-white"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
