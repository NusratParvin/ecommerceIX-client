import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VendorConflictModalProps {
  visible: boolean;
  onClose: () => void;
  onReplace: () => void;
  onCancel: () => void;
}

const VendorConflictModal = ({
  visible,
  onClose,
  onReplace,
  onCancel,
}: VendorConflictModalProps) => {
  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vendor Conflict Detected</DialogTitle>
          <DialogDescription>
            Your cart contains items from a different vendor. Would you like to
            replace the cart with this item or keep your current cart?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="destructive" onClick={onReplace}>
            Replace Cart
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Keep Current Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VendorConflictModal;
