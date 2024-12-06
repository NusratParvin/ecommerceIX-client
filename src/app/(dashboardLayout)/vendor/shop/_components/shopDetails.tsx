"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, X } from "lucide-react";
import Image from "next/image";
import { useUpdateShopMutation } from "@/redux/features/shops/shopsApi";
import { TShop } from "@/types";

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
  const [isLoading, setIsLoading] = useState(false);
  const [updateShop] = useUpdateShopMutation();
  console.log(shop);
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

  const handleUpdate = async () => {
    setIsLoading(true);

    const updatedFields: Partial<TShop> = {};
    if (editedShop.name !== shop.name) updatedFields.name = editedShop.name;
    if (editedShop.description !== shop.description)
      updatedFields.description = editedShop.description;

    // Prepare FormData
    const formData = new FormData();
    formData.append("data", JSON.stringify(updatedFields));
    if (newLogo) {
      formData.append("file", newLogo);
    }
    console.log(formData);
    try {
      await updateShop({ shopId: shop.id, data: formData }).unwrap();
      toast.success("Shop details updated successfully!");
      onShopCreated();
      setIsEditing(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update shop details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedShop(shop);
    setNewLogo(null);
    setImagePreview(shop.logo || null);
    setIsEditing(false);
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewLogo(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    // <div className="bg-card p-16 rounded-xl shadow-none max-w-3xl mx-auto border border-border/50">
    <div
      className={`bg-card p-16 rounded-xl shadow-none max-w-4xl mx-auto border border-border/50 overflow-hidden transition-all duration-500 ease-in-out ${
        isEditing ? "max-h-[800px]" : "max-h-[500px]"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={imagePreview || "/placeholder.svg"}
              alt="Shop Logo"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-deep-brown">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Name and Description */}
        <div className="flex flex-col gap-4 transition-all duration-300 ease-in-out">
          <div className="space-y-2">
            <label className="text-sm font-medium">Shop Name</label>
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
              <div className="text-xl font-semibold transition-all duration-300 ease-in-out transform scale-100">
                {shop.name}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Description
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

          {/* <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Product Count
            </label>
            <p className="text-lg font-medium transition-all duration-300 ease-in-out transform scale-100">
              {shop.productCount} Products
            </p>
          </div> */}

          <div className="space-y-2">
            {!isEditing && (
              <>
                <label className="text-sm font-medium text-muted-foreground">
                  Product Count
                </label>
                <p className="text-lg font-medium transition-all duration-300 ease-in-out transform scale-100">
                  {shop.productCount} Products
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Shop Logo */}

        <div className="flex justify-center items-center transition-all duration-300 ease-in-out transform scale-100">
          <div className="relative h-32 w-32">
            <div className="group relative h-full w-full rounded-lg overflow-hidden border border-border">
              <Image
                src={imagePreview || "/placeholder.svg"}
                alt="Shop Logo"
                fill
                className="object-cover transition-all duration-300 ease-in-out"
              />
            </div>
            {/* Display Change Logo button below the image */}
            {isEditing && (
              <div className="flex flex-col items-center mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  id="logoUpload"
                />
                <label htmlFor="logoUpload">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-background text-sm border-warm-brown/60 hover:bg-background/90"
                  >
                    Change Logo
                  </Button>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="col-span-full flex items-center gap-4 pt-4 transition-all duration-300 ease-in-out">
            <Button
              onClick={handleUpdate}
              disabled={isLoading}
              className="bg-deep-brown hover:bg-deep-brown/90 text-white"
            >
              {isLoading ? (
                "Updating..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopDetails;
