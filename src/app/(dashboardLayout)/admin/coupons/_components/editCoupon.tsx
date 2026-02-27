import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TCoupon } from "@/types";

interface EditCouponDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editCoupon: TCoupon | null;
  onEditChange: (field: keyof TCoupon, value: string) => void;
  onUpdate: () => void;
}

const EditCouponDialog = ({
  open,
  onOpenChange,
  editCoupon,
  onEditChange,
  onUpdate,
}: EditCouponDialogProps) => {
  if (!editCoupon) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogContent className="max-w-md"> */}
      <DialogContent className="w-[90%] md:max-w-4xl h-4/5 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit Coupon</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coupon Code
            </label>
            <Input
              placeholder="Coupon Code"
              value={editCoupon.code}
              onChange={(e) => onEditChange("code", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Amount (%)
            </label>
            <Input
              type="number"
              placeholder="Discount Amount"
              value={editCoupon.discountAmount.toString()}
              onChange={(e) => onEditChange("discountAmount", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiration Date
            </label>
            <Input
              type="date"
              value={editCoupon.expirationDate.split("T")[0]}
              onChange={(e) => onEditChange("expirationDate", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onUpdate}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCouponDialog;
