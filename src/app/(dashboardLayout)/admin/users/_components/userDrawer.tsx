import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TUser } from "@/types";
import Image from "next/image";

interface UserDrawerProps {
  user: TUser | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDrawer = ({ user, isOpen, onClose }: UserDrawerProps) => {
  if (!user) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>User Details</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6 text-sm">
          <div className="grid gap-4">
            {/* User Name */}
            <div>
              <h3 className="font-semibold">Name</h3>
              <p className="text-muted-foreground">{user.name}</p>
            </div>

            {/* Email */}
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted-foreground">{user.email}</p>
            </div>

            {/* Role */}
            <div>
              <h3 className="font-semibold">Role</h3>
              <p className="text-muted-foreground">{user.role}</p>
            </div>

            {/* Status */}
            <div>
              <h3 className="font-semibold">Status</h3>
              <p className="text-muted-foreground">{user.status}</p>
            </div>

            {/* Profile Photo */}
            {user.profilePhoto && (
              <div>
                <h3 className="font-semibold">Profile Photo</h3>
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image
                    src={user.profilePhoto}
                    alt={`${user.name}'s Profile`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full rounded-full"
                    priority={true}
                  />
                </div>
              </div>
            )}

            {/* Shops Followed */}
            <div>
              <h3 className="font-semibold">Shops Followed</h3>
              <p className="text-muted-foreground">
                {user.followedShops?.length || 0}
              </p>
            </div>

            {/* Created At */}
            <div>
              <h3 className="font-semibold">Account Created</h3>
              <p className="text-muted-foreground">
                {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Updated At */}
            <div>
              <h3 className="font-semibold">Last Updated</h3>
              <p className="text-muted-foreground">
                {new Date(user.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
