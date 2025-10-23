"use client";

import { useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  CirclePlus,
  DollarSign,
  ImageIcon,
  ImageUp,
  Info,
  Loader2,
  Save,
  Zap,
} from "lucide-react";
import { useCreateProductMutation } from "@/redux/features/products/productsApi";
import { useGetCategoriesForAllQuery } from "@/redux/features/categories/categoriesApi";
import { useGetShopByOwnerQuery } from "@/redux/features/shops/shopsApi";
import { ProductSuccessModal } from "./_components/creationSuccess";
import { Product, TCategory } from "@/types";

const AddProduct = () => {
  const { data: categoriesData = [], isLoading: isCategoriesLoading } =
    useGetCategoriesForAllQuery(undefined);
  const categories = categoriesData?.data || [];

  const { data: shopData, isLoading: isShopLoading } =
    useGetShopByOwnerQuery(undefined);
  const shopId = shopData?.data?.id;

  const [createProduct] = useCreateProductMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [createdProduct, setCreatedProduct] = useState<Product | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const today = new Date().toISOString().slice(0, 16);

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
      price: 0,
      stock: 0,
      discount: 0,
      description: "",
      categoryId: "",
      isFlashSale: false,
      flashSalePrice: 0,
      flashSaleStartDate: "",
      flashSaleEndDate: "",
    },
  });

  const productPrice = watch("price");

  const handleImageUpload = (file: File) => {
    if (file) {
      // console.log(file.size);
      if (file.size > 4 * 1024 * 1024) {
        toast.error("File size must be less than 4MB.");
        return;
      }
      setUploadedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError(null);
    }
  };

  const validateForm = () => {
    if (!uploadedImage) {
      setImageError("Product image is required");
      return false;
    }
    return true;
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    reset();
    setImagePreview(null);
    setUploadedImage(null);
  };

  const handleEdit = () => {
    setShowSuccessModal(false);
  };

  const onSubmit = async (data: FieldValues) => {
    if (!shopId) {
      toast.error("Shop ID is missing. Please try again.");
      return;
    }
    if (!validateForm()) return;

    const toastId = toast.loading("Creating Product...");
    console.log(data);
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        shopId: shopId,

        ...data,
        isFlashSale: data.isFlashSale,
        flashSalePrice: data.isFlashSale ? data.flashSalePrice : undefined,
        flashSaleStartDate: data.isFlashSale
          ? data.flashSaleStartDate
          : undefined,
        flashSaleEndDate: data.isFlashSale ? data.flashSaleEndDate : undefined,
      })
    );
    if (uploadedImage) {
      formData.append("file", uploadedImage);
    }

    // console.log("FormData for submission:", Object.fromEntries(formData));

    try {
      const response = await createProduct(formData).unwrap();
      toast.success("Product added successfully!", {
        id: toastId,
        className: "text-green-700",
      });
      reset();
      setImagePreview(null);
      setUploadedImage(null);
      setCreatedProduct(response.data);
      setShowSuccessModal(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Failed to add product.", {
        id: toastId,
        className: "text-red-700",
      });
    }
  };

  return (
    <>
      <div className="relative  mx-auto p-2 space-y-1 text-charcoal rounded-none shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center gap-1">
          <CirclePlus className="w-4 h-4 mb-1" />
          <h1 className="text-lg font-semibold text-slate-700">New Product</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 "
        >
          {/* Basic Information */}
          <div className="space-y-4 md:col-span-2 p-6 shadow-sm bg-white">
            <h2 className="text-base font-semibold text-charcoal flex items-center space-x-2">
              <Info className="w-4 h-4 text-charcoal" />
              <span>Basic Information</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  {...register("name", {
                    required: "Product name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="categoryId"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isCategoriesLoading || categories.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isCategoriesLoading
                              ? "Loading categories..."
                              : "Select category"
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

            {/* Description */}
            <div className="mt-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description (optional)"
                {...register("description")}
                className="w-full h-28"
              />
            </div>
          </div>

          {/* Pricing & Inventory and Product Image */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Pricing and Inventory */}
            <div className="space-y-4 p-6 shadow-sm bg-white">
              <h2 className="text-base font-semibold text-charcoal flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-charcoal" />
                <span>Pricing & Inventory</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                      validate: (value) => value > 0 || "  Price is required",
                    })}
                  />
                  {errors.price && (
                    <p className="text-red-600 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    {...register("stock", {
                      required: "Stock is required",
                      valueAsNumber: true,
                      validate: (value) => value > 0 || "Stock  is required",
                    })}
                  />
                  {errors.stock && (
                    <p className="text-red-600 text-sm">
                      {errors.stock.message}
                    </p>
                  )}
                </div>

                {/* <div>
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min={0}
                    max={100}
                    {...register("discount", {
                      valueAsNumber: true,
                      validate: (value) =>
                        value >= 0 || "Discount cannot be a negative value",
                    })}
                  />
                  {errors.discount && (
                    <p className="text-red-600 text-sm">
                      {errors.discount.message}
                    </p>
                  )}
                </div> */}

                {/* Discount Section, disabled if flash sale is switched on */}
                <div>
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min={0}
                    max={100}
                    disabled={watch("isFlashSale")}
                    {...register("discount", {
                      valueAsNumber: true,
                      validate: (value) =>
                        value >= 0 || "Discount cannot be a negative value",
                    })}
                  />
                  {errors.discount && (
                    <p className="text-red-600 text-sm">
                      {errors.discount.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="space-y-4 p-6 shadow-sm bg-white">
              <h2 className="text-base font-semibold text-charcoal flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-charcoal" />
                <span>Product Image</span>
              </h2>

              <label
                htmlFor="image-upload"
                className="bg-white text-gray-500 font-medium text-base rounded-lg max-w-full h-52 flex flex-col items-center justify-center cursor-pointer border border-dashed border-slate-300 mx-auto transition-all duration-200 hover:border-slate-400"
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0])
                    handleImageUpload(e.dataTransfer.files[0]);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                {imagePreview ? (
                  <div className="relative h-40 w-full">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <>
                    <ImageUp className="w-12 h-12 text-slate-300 mb-2" />

                    <p className="text-base text-slate-500">
                      Drag and drop your image here
                    </p>
                    <p className="text-sm text-gray-400">or click to browse</p>
                    <p className="text-xs text-red-700 font-medium">
                      Please upload image below 4MB
                    </p>
                  </>
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
              {imageError && (
                <p className="text-red-600 text-sm">{imageError}</p>
              )}
            </div>
          </div>

          {/* Flash Sale Section */}
          <div className="space-y-4 p-6 shadow-sm bg-white">
            <div className="flex items-center justify-between ">
              <h2 className="text-base font-semibold text-charcoal flex items-center space-x-2">
                <Zap className="w-4 h-4 text-charcoal" />
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
                  <Label htmlFor="flashSalePrice">Flash Sale Price ($)</Label>
                  <Input
                    id="flashSalePrice"
                    type="number"
                    {...register("flashSalePrice", {
                      required: "Flash sale price is required",
                      validate: (value) =>
                        value <= productPrice ||
                        `Flash sale price must be less than or equal to $${productPrice}`,
                    })}
                  />
                  {errors.flashSalePrice && (
                    <p className="text-red-600 text-sm">
                      {errors.flashSalePrice.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="flashSaleStartDate">Start Date</Label>
                  <Input
                    id="flashSaleStartDate"
                    type="datetime-local"
                    min={today} // Set the min attribute to today's date
                    {...register("flashSaleStartDate", {
                      required: "Flash sale start date is required",
                      validate: (value) =>
                        new Date(value) >= new Date(today) ||
                        "Start date cannot be in the past",
                    })}
                  />
                  {errors.flashSaleStartDate && (
                    <p className="text-red-600 text-sm">
                      {errors.flashSaleStartDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="flashSaleEndDate">End Date</Label>
                  <Input
                    id="flashSaleEndDate"
                    type="datetime-local"
                    {...register("flashSaleEndDate", {
                      required: "Flash sale end date is required",
                    })}
                  />
                  {errors.flashSaleEndDate && (
                    <p className="text-red-600 text-sm">
                      {errors.flashSaleEndDate.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex justify-end space-x-4 mt-7 mb-12">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setImagePreview(null);
                setUploadedImage(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!shopId || isShopLoading}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-white font-semibold rounded-md transition-all duration-300 ${
                !shopId || isShopLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : // : "bg-deep-brown hover:bg-warm-brown"
                    "bg-white text-deep-brown hover:bg-deep-brown hover:text-white"
              }`}
            >
              {" "}
              {isShopLoading ? (
                <>
                  {" "}
                  <Loader2 className="animate-spin w-4 h-4" />{" "}
                  {/* Loader Icon */} <span>Saving...</span>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Save className="w-4 h-4" /> {/* Save Icon */}{" "}
                  <span>Save Product</span>{" "}
                </>
              )}{" "}
            </Button>
          </div>
        </form>
      </div>
      <ProductSuccessModal
        product={createdProduct}
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        onEdit={handleEdit}
      />
    </>
  );
};

export default AddProduct;
