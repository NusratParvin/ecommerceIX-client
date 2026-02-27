import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TCategory } from "@/types";

interface EditCategoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editCategory: TCategory | null;
  setEditCategory: (category: TCategory | null) => void;
  onSave: () => void;
}

export function EditCategory({
  open,
  onOpenChange,
  editCategory,
  setEditCategory,
  onSave,
}: EditCategoryProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogContent> */}
      <DialogContent className="w-[90%] md:max-w-4xl h-4/5 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Category ID
            </label>
            <Input
              type="text"
              value={editCategory?.id || ""}
              disabled
              className="bg-muted mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Category Name
            </label>
            <Input
              type="text"
              value={editCategory?.name || ""}
              onChange={(e) => {
                if (editCategory) {
                  setEditCategory({ ...editCategory, name: e.target.value });
                }
              }}
              className="mt-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
