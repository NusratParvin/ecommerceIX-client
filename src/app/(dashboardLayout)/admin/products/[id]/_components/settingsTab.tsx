import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import {
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
} from "@/redux/features/products/productsApi";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export const SettingsTab = ({ product }: { product: Product }) => {
  const [updateProductStatus] = useUpdateProductStatusMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      const res = await deleteProduct(product.id).unwrap();
      if (res.success) {
        toast.success("Product deleted successfully!");
        setIsDeleteDialogOpen(false);
      }
    } catch {
      toast.error("Failed to delete product.");
      setIsDeleteDialogOpen(false);
    }
  };

  // Handle update status product
  const handleUpdateStatusProduct = async () => {
    try {
      const newStatus = product.status === "ACTIVE" ? "HIDDEN" : "ACTIVE";
      const res = await updateProductStatus({
        id: product.id,
        status: newStatus,
      }).unwrap();

      if (res.success) {
        toast.success("Product status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update product status.");
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Product Settings</CardTitle>
          <CardDescription>
            Manage product visibility, pricing, and other settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Product Status</h3>
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    product.status === "ACTIVE" ? "default" : "destructive"
                  }
                >
                  {product.status}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUpdateStatusProduct}
                  className="gap-2"
                >
                  {product.status === "ACTIVE" ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  {product.status === "ACTIVE"
                    ? "Hide Product"
                    : "Show Product"}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Danger Zone</h3>
              <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Product
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the product &quot;
                      <span className="font-semibold">{product.name}</span>
                      &quot; and remove all associated data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteProduct}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete Product
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
