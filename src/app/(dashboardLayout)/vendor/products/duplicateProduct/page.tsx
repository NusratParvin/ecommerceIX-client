"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, ImageIcon, Info, Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetCategoriesForAllQuery } from "@/redux/features/categories/categoriesApi";
import Image from "next/image";
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
} from "@/redux/features/products/productsApi";
import { TCategory } from "@/types";

const DuplicateProductPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  // Fetch product by ID
  const { data, isLoading: isProductLoading } = useGetProductByIdQuery(id);
  const productData = data?.data;

  // Fetch categories for selection
  const { data: categoriesData = [], isLoading: isCategoriesLoading } =
    useGetCategoriesForAllQuery(undefined);
  const categories = categoriesData?.data || [];

  const [createProduct] = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
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

  // Prefill form with product data
  useEffect(() => {
    if (productData) {
      reset({
        name: `${productData.name} (Copy)`, // Modify name for duplication
        description: productData.description || "",
        price: productData.price || 0,
        stock: productData.stock || 0,
        discount: productData.discount || 0,
        categoryId: productData.categoryId || "",
        isFlashSale: productData.isFlashSale || false,
        flashSalePrice: productData.flashSalePrice || 0,
        flashSaleStartDate: productData.flashSaleStartDate
          ? new Date(productData.flashSaleStartDate).toISOString().slice(0, 16)
          : "",
        flashSaleEndDate: productData.flashSaleEndDate
          ? new Date(productData.flashSaleEndDate).toISOString().slice(0, 16)
          : "",
      });
      setImagePreview(productData.imageUrl || null);
    }
  }, [productData, reset]);

  console.log(productData);
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

  // Add Product Submission Handler
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Duplicating Product...");
    console.log("Raw data:", data);

    const formData = new FormData();

    // Prepare the JSON payload
    const payload = {
      shopId: productData.shopId,
      ...data,
      isFlashSale: data.isFlashSale,
      flashSalePrice: data.isFlashSale ? data.flashSalePrice : undefined,
      flashSaleStartDate: data.isFlashSale
        ? data.flashSaleStartDate
        : undefined,
      flashSaleEndDate: data.isFlashSale ? data.flashSaleEndDate : undefined,
      imageUrl: uploadedImage ? undefined : productData.imageUrl, // Include original URL if no new image
    };

    // Append JSON payload to FormData
    formData.append("data", JSON.stringify(payload));
    console.log(uploadedImage);
    // Check and append uploaded image if provided
    if (uploadedImage !== null) {
      console.log("Uploaded Image:", uploadedImage);
      formData.append("file", uploadedImage);
    } else {
      console.warn("No uploaded image provided. Sending original image URL.");
    }

    try {
      const response = await createProduct(formData).unwrap();
      console.log(response);
      toast.success("Product duplicated successfully!", { id: toastId });
      reset();
      setImagePreview(null);
      setUploadedImage(null);
      router.push("/vendor/products");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to duplicate product.", {
        id: toastId,
      });
    }
  };

  if (isProductLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-deep-brown">Duplicate Product</h1>
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
          {/* Image Upload */}
          <div className="space-y-4 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-charcoal flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-charcoal" />
              <span>Product Image</span>
            </h2>{" "}
            <p className="text-xs text-red-700">
              Please click on image to change & choose image below 4MB
            </p>
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

export default DuplicateProductPage;
