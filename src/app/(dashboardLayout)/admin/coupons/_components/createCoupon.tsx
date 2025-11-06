import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateCouponDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newCoupon: {
    code: string;
    discountAmount: string;
    expirationDate: string;
  };
  onInputChange: (
    field: "code" | "discountAmount" | "expirationDate",
    value: string
  ) => void;
  onCreate: () => void;
}

const CreateCouponDialog = ({
  open,
  onOpenChange,
  newCoupon,
  onInputChange,
  onCreate,
}: CreateCouponDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Coupon</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coupon Code *
            </label>
            <Input
              placeholder="SUMMER25"
              value={newCoupon.code}
              onChange={(e) => onInputChange("code", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Amount (%) *
            </label>
            <Input
              type="number"
              placeholder="25"
              value={newCoupon.discountAmount}
              onChange={(e) => onInputChange("discountAmount", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiration Date *
            </label>
            <Input
              type="date"
              value={newCoupon.expirationDate}
              onChange={(e) => onInputChange("expirationDate", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onCreate}>Create Coupon</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCouponDialog;
