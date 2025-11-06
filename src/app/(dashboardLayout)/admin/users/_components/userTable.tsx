import { TUser } from "@/types";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { UserPagination } from "./userPagination";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";

interface UserTableProps {
  users: TUser[];
  onView: (user: TUser) => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (userId: string, status: string) => Promise<void>;
  onUpdateRole: (userId: string, role: string) => Promise<void>;
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  userStats: {
    active: number;
    suspended: number;
  };
}

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "bg-red-100 text-red-600";
    case "VENDOR":
      return "bg-blue-100 text-blue-600";
    case "USER":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export const UserTable = ({
  users,
  onView,
  onDelete,
  onUpdateStatus,
  onUpdateRole,
  currentPage,
  totalPages,
  totalRecords,
  itemsPerPage,
  onPageChange,
}: UserTableProps) => {
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [isRoleEditable, setIsRoleEditable] = useState(false);

  const handleToggleStatus = async (userId: string, isActive: boolean) => {
    const newStatus = isActive ? "ACTIVE" : "SUSPENDED";
    setUpdatingUserId(userId);

    try {
      await onUpdateStatus(userId, newStatus);
    } catch (error) {
      console.error("Failed to update user status:", error);
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto  min-h-screen  ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">#</TableHead>
              <TableHead className="text-left">Profile Picture</TableHead>
              <TableHead className="text-left">Full Name</TableHead>
              <TableHead className="text-left">Email Address</TableHead>
              <TableHead className="text-center">
                <div className="flex items-center gap-2 justify-center">
                  Role
                  <input
                    type="checkbox"
                    checked={isRoleEditable}
                    onChange={(e) => setIsRoleEditable(e.target.checked)}
                    className="cursor-pointer w-4 h-4"
                  />
                </div>
              </TableHead>
              <TableHead className="text-left">Date Joined</TableHead>
              <TableHead className="text-center w-32">
                Activity Status
              </TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="text-sm">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell>
                  {user.profilePhoto ? (
                    <div className="w-10 h-10 relative">
                      <Image
                        src={user.profilePhoto}
                        alt={`${user.name}'s Profile`}
                        className="object-cover rounded-full"
                        fill
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">N/A</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-sm font-medium">
                  {user.name}
                </TableCell>
                <TableCell className="text-sm">{user.email}</TableCell>

                {/* Role */}
                <TableCell className="text-center">
                  {isRoleEditable ? (
                    <select
                      value={user.role}
                      onChange={(e) => onUpdateRole(user.id, e.target.value)}
                      disabled={updatingUserId === user.id}
                      className="rounded-md px-2 py-1 text-xs border border-input bg-background"
                    >
                      <option value="USER">USER</option>
                      <option value="VENDOR">VENDOR</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  )}
                </TableCell>

                <TableCell className="text-sm">
                  {format(new Date(user.createdAt), "MMM d, yyyy")}
                </TableCell>

                {/* Activity Status */}
                <TableCell className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <input
                      type="checkbox"
                      checked={user.status === "ACTIVE"}
                      onChange={(e) =>
                        handleToggleStatus(user.id, e.target.checked)
                      }
                      disabled={updatingUserId === user.id}
                      className="cursor-pointer w-4 h-4"
                    />
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        user.status === "ACTIVE"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {updatingUserId === user.id ? "Updating..." : user.status}
                    </span>
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onView(user)}
                      className="flex items-center gap-1 h-8"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(user.id)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-600 h-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Integrated Pagination */}
      <UserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </>
  );
};
