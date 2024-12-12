import { TUser } from "@/types";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";

interface UserTableProps {
  users: TUser[];
  onView: (user: TUser) => void;
  onDelete: (userId: string) => void;
  onUpdateStatus: (userId: string, status: string) => Promise<void>;
  onUpdateRole: (userId: string, role: string) => Promise<void>;
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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              #
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Profile Picture
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Full Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Email Address
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2 justify-center">
                Role
                <input
                  type="checkbox"
                  checked={isRoleEditable}
                  onChange={(e) => setIsRoleEditable(e.target.checked)}
                  className="cursor-pointer"
                />
              </div>
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Date Joined
            </th>
            <th
              className="px-4 py-2 text-center text-sm font-medium text-gray-700"
              style={{ width: "150px" }}
            >
              Activity Status
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="px-4 py-2 text-sm">{index + 1}</td>
              <td className="px-4 py-2">
                {user.profilePhoto ? (
                  <div className="w-10 h-10 relative">
                    <Image
                      src={user.profilePhoto}
                      alt={`${user.name}'s Profile`}
                      className="object-cover rounded-full"
                      width={40}
                      height={40}
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-sm">N/A</span>
                  </div>
                )}
              </td>
              <td className="px-4 py-2 text-sm">{user.name}</td>
              <td className="px-4 py-2 text-sm">{user.email}</td>

              {/* Role */}
              <td className="px-4 py-2 text-center">
                {isRoleEditable ? (
                  <select
                    value={user.role}
                    onChange={(e) => onUpdateRole(user.id, e.target.value)}
                    disabled={updatingUserId === user.id}
                    className=" rounded-none px-1 py-1 text-xs"
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
              </td>

              <td className="px-4 py-2 text-sm">
                {format(new Date(user.createdAt), "MMM d, yyyy")}
              </td>

              {/* Activity Status */}
              <td className="px-4 py-2 text-center" style={{ width: "150px" }}>
                <div className="flex items-center gap-2 justify-center">
                  <input
                    type="checkbox"
                    checked={user.status === "ACTIVE"}
                    onChange={(e) =>
                      handleToggleStatus(user.id, e.target.checked)
                    }
                    disabled={updatingUserId === user.id}
                    className="cursor-pointer"
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
              </td>

              {/* Actions */}
              <td className="px-4 py-2 text-center">
                <div className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onView(user)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(user.id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
