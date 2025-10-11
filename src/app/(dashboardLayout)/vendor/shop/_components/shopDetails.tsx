"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, X } from "lucide-react";
import Image from "next/image";
import { useUpdateShopByVendorMutation } from "@/redux/features/shops/shopsApi";
import { TShop } from "@/types";
import moment from "moment";

const ShopDetails = ({
  shop,
  onShopCreated,
}: {
  shop?: TShop;
  onShopCreated: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedShop, setEditedShop] = useState<TShop | null>(null);
  const [newLogo, setNewLogo] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [updateShop] = useUpdateShopByVendorMutation();
  // console.log(shop);
  useEffect(() => {
    if (shop) {
      setEditedShop(shop);
      setImagePreview(shop.logo || null);
    }
  }, [shop]);

  if (!shop || !editedShop) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-secondary/20 rounded-lg">
        <p className="text-muted-foreground">No shop information available.</p>
      </div>
    );
  }

  console.log(shop);

  const handleUpdate = async () => {
    const updatedFields: Partial<TShop> = {};

    if (editedShop.name !== shop.name) updatedFields.name = editedShop.name;
    if (editedShop.description !== shop.description)
      updatedFields.description = editedShop.description;

    // Prepare FormData
    const formData = new FormData();

    // Append updated fields if they exist
    if (Object.keys(updatedFields).length > 0) {
      formData.append("data", JSON.stringify(updatedFields));
    }

    // Append logo file if it exists
    if (newLogo) {
      formData.append("file", newLogo);
    }

    // Debugging FormData
    formData.forEach((value, key) => {
      console.log(`FormData Key: ${key}`, value);
    });

    try {
      const res = await updateShop({
        shopId: shop.id,
        formData,
      }).unwrap();

      console.log(res);
      if (res.success) {
        toast.success("Shop details updated successfully!");
        setIsEditing(false);
        onShopCreated();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update shop details.");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditedShop(shop);
    setNewLogo(null);
    setImagePreview(shop.logo || null);
    setIsEditing(false);
  };

  return (
    <div
      className={`bg-card bg-white border border-dashed border-slate-300 rounded-none shadow-none overflow-hidden transition-all duration-500 ease-in-out pb-10 ${
        isEditing ? "max-h-[800px]" : "max-h-auto"
      }`}
    >
      <div className="flex items-center justify-between  p-4 ">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={imagePreview || "/placeholder.svg"}
              alt="Shop Logo"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-deep-brown">
            {editedShop.name}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Edit Mode</span>
          <Switch
            checked={isEditing}
            onCheckedChange={setIsEditing}
            disabled={isLoading}
          />
        </div>
      </div>
      <div className=" border-b border-dashed border-slate-300 mb-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4  p-4">
        {/* Left Column: Name and Description */}
        <div className="md:col-span-2 w-full flex flex-col gap-4 transition-all duration-300 ease-in-out ps-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">Shop Name :</label>
            {isEditing ? (
              <Input
                value={editedShop.name}
                onChange={(e) =>
                  setEditedShop({ ...editedShop, name: e.target.value })
                }
                placeholder="Shop Name"
                className="text-lg font-medium transition-all duration-300 ease-in-out transform scale-100"
              />
            ) : (
              <div className="text-base font-semibold transition-all duration-300 ease-in-out transform scale-100">
                {shop.name}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Description :
            </label>
            {isEditing ? (
              <Textarea
                value={editedShop.description}
                onChange={(e) =>
                  setEditedShop({ ...editedShop, description: e.target.value })
                }
                placeholder="Shop Description"
                className="min-h-[100px] resize-none transition-all duration-300 ease-in-out transform scale-100"
              />
            ) : (
              <p className="text-foreground/90 leading-relaxed transition-all duration-300 ease-in-out transform scale-100">
                {shop.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            {!isEditing && (
              <>
                <label className="text-sm font-medium text-muted-foreground">
                  Total number of Products :
                </label>
                <p className="text-base font-medium transition-all duration-300 ease-in-out transform scale-100">
                  {shop.productCount} Products
                </p>
              </>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Email Address :
            </label>
            <p className="text-base font-medium transition-all duration-300 ease-in-out transform scale-100">
              {shop.name.toLowerCase().replace(/[^a-z0-9]/g, "") + "@gmail.com"}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Category :
            </label>
            <p className="text-base font-medium transition-all duration-300 ease-in-out transform scale-100">
              Fashion Store
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Date Established :
            </label>
            <p className="text-base font-medium transition-all duration-300 ease-in-out transform scale-100">
              {moment(shop.createdAt).format("MMM Do YYYY")}
            </p>
          </div>
        </div>

        {/* Right Column: Shop Logo */}

        <div className="md:col-span-1 w-full flex justify-center items-start transition-all duration-300 ease-in-out transform scale-100  ">
          <div className="relative h-72 w-[90%]">
            <div className="group relative h-full w-full rounded-none overflow-hidden border border-none">
              <Image
                src={imagePreview || "/placeholder.svg"}
                alt="Shop Logo"
                fill
                className="object-cover transition-all duration-300 ease-in-out"
              />
            </div>

            {/* Display Change Logo button below the image */}
            {isEditing && (
              <div className="flex flex-col items-center mt-8">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewLogo(file); // Update the newLogo state
                      setImagePreview(URL.createObjectURL(file)); // Update the preview
                    }
                  }}
                  className="hidden"
                  id="logoUpload"
                />
                <label
                  htmlFor="logoUpload"
                  className="cursor-pointer bg-background text-sm border border-slate-300/60 hover:bg-slate-300/30 px-8 py-2 rounded-none text-center"
                >
                  Change Logo
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="col-span-full flex items-center gap-4 p-4 ps-8 transition-all duration-300 ease-in-out">
            <Button
              onClick={handleUpdate}
              disabled={isLoading}
              className="bg-deep-brown hover:bg-deep-brown/90 text-white rounded-none px-8"
            >
              {isLoading ? (
                "Updating..."
              ) : (
                <>
                  <Save className="mb-1 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="rounded-none px-8"
            >
              <X className="mb-1 h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopDetails;
