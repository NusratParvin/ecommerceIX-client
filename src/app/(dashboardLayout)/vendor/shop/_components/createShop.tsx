/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCreateShopMutation } from "@/redux/features/shops/shopsApi";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import Image from "next/image";

interface ShopSetupFormInputs {
  name: string;
  description: string;
  logo?: FileList | null;
}

interface CreateShopProps {
  onShopCreated: () => void;
}

const CreateShop: React.FC<CreateShopProps> = ({ onShopCreated }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState } =
    useForm<ShopSetupFormInputs>();
  const { errors } = formState;

  const [createShop] = useCreateShopMutation();
  const user = useAppSelector(useCurrentUser);

  const onSubmit = async (data: ShopSetupFormInputs) => {
    const toastId = toast.loading("Setting up your shop...");
    setIsSubmitting(true);

    const shopData = {
      name: data.name,
      description: data.description,
      email: user?.email,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(shopData));

    if (data.logo && data.logo[0]) {
      formData.append("file", data.logo[0]);
    }

    try {
      await createShop(formData).unwrap();
      toast.success("Shop created successfully!", { id: toastId });
      reset();
      setImagePreview(null);

      onShopCreated();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create shop.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        toast.error("File size should not exceed 2MB.");
        return;
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h1 className="text-2xl font-bold">Set Up Your Shop</h1>

      {/* Shop Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Shop Name</label>
        <Input
          {...register("name", { required: "Shop name is required" })}
          placeholder="Enter shop name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Write about your shop..."
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Logo */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Logo</label>
        <Input type="file" {...register("logo")} onChange={handleFileChange} />
        {imagePreview && (
          <div className="relative h-24 w-24 mt-2">
            <Image
              src={imagePreview}
              alt="Preview"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-warm-brown text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Create Shop"}
      </Button>
    </form>
  );
};

export default CreateShop;
