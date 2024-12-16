"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
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
  TableRow,
} from "@/components/ui/table";
import {
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
  useUpdateCouponMutation,
} from "@/redux/features/coupons/couponsApi";
import { format } from "date-fns";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Ticket } from "lucide-react";
import { Trash2, Edit3 } from "lucide-react";

interface TCoupon {
  id: string;
  code: string;
  discountAmount: number;
  expirationDate: string;
}

const AdminCouponsPage = () => {
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountAmount: "",
    expirationDate: "",
  });
  const [editCoupon, setEditCoupon] = useState<TCoupon | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data, isLoading, isError } = useGetAllCouponsQuery(undefined);
  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const handleInputChange = (field: keyof TCoupon, value: string) => {
    setNewCoupon((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditChange = (field: keyof TCoupon, value: string) => {
    setEditCoupon((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleDialogClose = () => {
    setNewCoupon({ code: "", discountAmount: "", expirationDate: "" });
    setDialogOpen(false);
  };

  const handleCreate = async () => {
    if (
      !newCoupon.code ||
      newCoupon.discountAmount === "" ||
      !newCoupon.expirationDate
    ) {
      toast.error("Please fill all fields correctly.");
      return;
    }
    const discount = parseFloat(newCoupon.discountAmount);
    if (isNaN(discount) || discount <= 0) {
      toast.error("Discount amount must be a positive number.");
      return;
    }

    // Prepare data for submission
    const formattedData = {
      code: newCoupon.code.trim(),
      discountAmount: discount,
      expirationDate: new Date(newCoupon.expirationDate).toISOString(),
    };

    try {
      await createCoupon(formattedData).unwrap();

      toast.success("Coupon created successfully!");
      setDialogOpen(false);
      setNewCoupon({ code: "", discountAmount: "", expirationDate: "" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to create coupon.");
    }
  };

  const handleUpdate = async () => {
    if (!editCoupon) return;

    // Parse float for discountAmount to ensure it's correctly formatted as a number.
    const updatedDiscount = parseFloat(editCoupon.discountAmount.toString());

    if (isNaN(updatedDiscount)) {
      toast.error("Invalid discount amount.");
      return;
    }

    // Ensure the expiration date is formatted as 'yyyy-MM-dd' for the HTML input compatibility
    const formattedExpirationDate = editCoupon.expirationDate
      ? new Date(editCoupon.expirationDate).toISOString().split("T")[0]
      : "";

    try {
      await updateCoupon({
        ...editCoupon,
        discountAmount: updatedDiscount,
        expirationDate: formattedExpirationDate,
      }).unwrap();

      toast.success("Coupon updated successfully!");
      setEditDialogOpen(false);
      setEditCoupon(null);
    } catch (error) {
      console.error("Error updating coupon:", error);
      toast.error("Failed to update coupon.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCoupon(id).unwrap();
      toast.success("Coupon deleted successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to delete coupon.");
    }
  };

  if (isLoading) return <Spinner />;
  if (isError) return <p>Failed to load coupons.</p>;
  //   console.log(data?.data);

  const coupons = data?.data;
  return (
    <>
      <div className="p-2 space-y-2">
        {/* Heading */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold text-charcoal">Coupons</h1>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="bg-warm-brown">
            {" "}
            + Create New Coupon
          </Button>
        </div>

        <div>
          {/* Table to display existing coupons */}
          <div className="border rounded-lg p-4 shadow-md">
            {isLoading ? (
              <Spinner />
            ) : coupons.length === 0 ? (
              <p className="text-center text-gray-500">No data found.</p>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Total Records:{" "}
                  <span className="font-medium">{coupons.length}</span>
                </p>
                <Table>
                  <TableHead>
                    <TableRow className="flex w-full">
                      <TableCell className="flex-1 text-left px-4 py-2">
                        Code
                      </TableCell>
                      <TableCell className="flex-1 text-left px-4 py-2">
                        Discount
                      </TableCell>
                      <TableCell className="flex-1 text-left px-4 py-2">
                        Expiration Date
                      </TableCell>
                      <TableCell className="flex-1 text-right px-4 py-2">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {coupons?.map((coupon: TCoupon) => (
                      <TableRow key={coupon.id} className="flex w-full">
                        <TableCell className="flex-1 px-4 py-2">
                          {coupon.code}
                        </TableCell>
                        <TableCell className="flex-1 px-4 py-2">{`${coupon.discountAmount}%`}</TableCell>
                        <TableCell className="flex-1 px-4 py-2">
                          {format(new Date(coupon.expirationDate), "PPP")}
                        </TableCell>
                        <TableCell className="flex-1 px-4 py-2 text-right">
                          <Button
                            onClick={() => {
                              setEditCoupon(coupon);
                              setEditDialogOpen(true);
                            }}
                            className="inline-flex justify-center bg-white border-white  items-center p-2 text-blue-500 hover:text-blue-600 mr-2"
                          >
                            <Edit3 size={16} />
                          </Button>
                          <Button
                            onClick={() => handleDelete(coupon.id)}
                            className="inline-flex justify-center bg-white border-white items-center p-2 text-red-500 hover:text-red-600"
                            variant="destructive"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </div>

          {/* Dialogs for Creating and Editing Coupons */}
          {dialogOpen && (
            <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Coupon</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Coupon Code
                    <Input
                      placeholder="Enter code"
                      value={newCoupon.code}
                      onChange={(e) =>
                        handleInputChange("code", e.target.value)
                      }
                      className="mt-1"
                    />
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    Discount Amount ($)
                    <Input
                      type="number"
                      placeholder="Enter discount"
                      value={newCoupon.discountAmount}
                      onChange={(e) =>
                        handleInputChange("discountAmount", e.target.value)
                      }
                      className="mt-1"
                    />
                  </label>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiration Date
                    <Input
                      type="date"
                      placeholder="Select date"
                      value={newCoupon.expirationDate}
                      onChange={(e) =>
                        handleInputChange("expirationDate", e.target.value)
                      }
                      className="mt-1"
                    />
                  </label>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreate}>Create</Button>
                  <Button onClick={handleDialogClose}>Cancel</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {editDialogOpen && editCoupon && (
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Coupon</DialogTitle>
                </DialogHeader>
                <Input
                  placeholder="Coupon Code"
                  value={editCoupon.code}
                  onChange={(e) => handleEditChange("code", e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Discount Amount ($)"
                  value={editCoupon.discountAmount.toString()}
                  onChange={(e) =>
                    handleEditChange("discountAmount", e.target.value)
                  }
                />
                <Input
                  type="date"
                  placeholder="Expiration Date"
                  value={editCoupon.expirationDate}
                  onChange={(e) =>
                    handleEditChange("expirationDate", e.target.value)
                  }
                />
                <DialogFooter>
                  <Button onClick={handleUpdate}>Save Changes</Button>
                  <Button onClick={() => setEditDialogOpen(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminCouponsPage;
