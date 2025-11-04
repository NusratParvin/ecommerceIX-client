// import { TUser } from "@/types";
// import Image from "next/image";
// import { format } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { Eye, Trash2 } from "lucide-react";
// import { useState } from "react";
// import { UserPagination } from "./userPagination";

// interface UserTableProps {
//   users: TUser[];
//   onView: (user: TUser) => void;
//   onDelete: (id: string) => void;
//   onUpdateStatus: (userId: string, status: string) => Promise<void>;
//   onUpdateRole: (userId: string, role: string) => Promise<void>;
//   currentPage: number;
//   totalPages: number;
//   totalRecords: number;
//   itemsPerPage: number;
//   onPageChange: (page: number) => void;
//   userStats: {
//     active: number;
//     suspended: number;
//   };
// }

// const getRoleBadgeColor = (role: string) => {
//   switch (role) {
//     case "ADMIN":
//       return "bg-red-100 text-red-600";
//     case "VENDOR":
//       return "bg-blue-100 text-blue-600";
//     case "USER":
//       return "bg-green-100 text-green-600";
//     default:
//       return "bg-gray-100 text-gray-600";
//   }
// };

// export const UserTable = ({
//   users,
//   onView,
//   onDelete,
//   onUpdateStatus,
//   onUpdateRole,
//   currentPage,
//   totalPages,
//   totalRecords,
//   itemsPerPage,
//   onPageChange,
// }: UserTableProps) => {
//   const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
//   const [isRoleEditable, setIsRoleEditable] = useState(false);

//   const handleToggleStatus = async (userId: string, isActive: boolean) => {
//     const newStatus = isActive ? "ACTIVE" : "SUSPENDED";
//     setUpdatingUserId(userId);

//     try {
//       await onUpdateStatus(userId, newStatus);
//     } catch (error) {
//       console.error("Failed to update user status:", error);
//     } finally {
//       setUpdatingUserId(null);
//     }
//   };

//   return (
//     <>
//       <div className="overflow-x-auto  min-h-screen bg-green-400">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//                 #
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//                 Profile Picture
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//                 Full Name
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//                 Email Address
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
//                 <div className="flex items-center gap-2 justify-center">
//                   Role
//                   <input
//                     type="checkbox"
//                     checked={isRoleEditable}
//                     onChange={(e) => setIsRoleEditable(e.target.checked)}
//                     className="cursor-pointer"
//                   />
//                 </div>
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//                 Date Joined
//               </th>
//               <th
//                 className="px-4 py-2 text-center text-sm font-medium text-gray-700"
//                 style={{ width: "150px" }}
//               >
//                 Activity Status
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {users.map((user, index) => (
//               <tr key={user.id}>
//                 <td className="px-4 py-2 text-sm">{index + 1}</td>
//                 <td className="px-4 py-2">
//                   {user.profilePhoto ? (
//                     <div className="w-10 h-10 relative">
//                       <Image
//                         src={user.profilePhoto}
//                         alt={`${user.name}'s Profile`}
//                         className="object-cover rounded-full"
//                         width={40}
//                         height={40}
//                       />
//                     </div>
//                   ) : (
//                     <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
//                       <span className="text-gray-500 text-sm">N/A</span>
//                     </div>
//                   )}
//                 </td>
//                 <td className="px-4 py-2 text-sm">{user.name}</td>
//                 <td className="px-4 py-2 text-sm">{user.email}</td>

//                 {/* Role */}
//                 <td className="px-4 py-2 text-center">
//                   {isRoleEditable ? (
//                     <select
//                       value={user.role}
//                       onChange={(e) => onUpdateRole(user.id, e.target.value)}
//                       disabled={updatingUserId === user.id}
//                       className=" rounded-none px-1 py-1 text-xs"
//                     >
//                       <option value="USER">USER</option>
//                       <option value="VENDOR">VENDOR</option>
//                       <option value="ADMIN">ADMIN</option>
//                     </select>
//                   ) : (
//                     <span
//                       className={`px-2 py-1 rounded-md text-xs font-semibold ${getRoleBadgeColor(
//                         user.role
//                       )}`}
//                     >
//                       {user.role}
//                     </span>
//                   )}
//                 </td>

//                 <td className="px-4 py-2 text-sm">
//                   {format(new Date(user.createdAt), "MMM d, yyyy")}
//                 </td>

//                 {/* Activity Status */}
//                 <td
//                   className="px-4 py-2 text-center"
//                   style={{ width: "150px" }}
//                 >
//                   <div className="flex items-center gap-2 justify-center">
//                     <input
//                       type="checkbox"
//                       checked={user.status === "ACTIVE"}
//                       onChange={(e) =>
//                         handleToggleStatus(user.id, e.target.checked)
//                       }
//                       disabled={updatingUserId === user.id}
//                       className="cursor-pointer"
//                     />
//                     <span
//                       className={`px-2 py-1 rounded-md text-xs font-semibold ${
//                         user.status === "ACTIVE"
//                           ? "bg-green-100 text-green-600"
//                           : "bg-yellow-100 text-yellow-600"
//                       }`}
//                     >
//                       {updatingUserId === user.id ? "Updating..." : user.status}
//                     </span>
//                   </div>
//                 </td>

//                 {/* Actions */}
//                 <td className="px-4 py-2 text-center">
//                   <div className="flex justify-center gap-2">
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       onClick={() => onView(user)}
//                       className="flex items-center gap-1"
//                     >
//                       <Eye className="w-4 h-4" />
//                       View
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       onClick={() => onDelete(user.id)}
//                       className="flex items-center gap-1 text-red-500 hover:text-red-600"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                       Delete
//                     </Button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>{" "}
//       </div>
//       {/* Pagination */}
//       <UserPagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         totalRecords={totalRecords}
//         itemsPerPage={itemsPerPage}
//         onPageChange={onPageChange}
//       />
//     </>
//   );
// };

import { TUser } from "@/types";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPagination } from "./userPagination";

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
      return "bg-red-100 text-red-600 border-red-200";
    case "VENDOR":
      return "bg-blue-100 text-blue-600 border-blue-200";
    case "USER":
      return "bg-green-100 text-green-600 border-green-200";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
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
  userStats,
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
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Showing {users.length} of {totalRecords} users
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Edit Roles:</span>
              <input
                type="checkbox"
                checked={isRoleEditable}
                onChange={(e) => setIsRoleEditable(e.target.checked)}
                className="cursor-pointer w-4 h-4"
              />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {userStats.active} Active
              </Badge>
              <Badge variant="outline" className="bg-orange-50 text-orange-700">
                {userStats.suspended} Suspended
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead className="w-16">Profile</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead>Date Joined</TableHead>
                <TableHead className="text-center w-32">Status</TableHead>
                <TableHead className="text-center w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>

                  <TableCell>
                    {user.profilePhoto ? (
                      <div className="w-8 h-8 relative">
                        <Image
                          src={user.profilePhoto}
                          alt={`${user.name}'s Profile`}
                          className="object-cover rounded-full"
                          width={32}
                          height={32}
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-muted-foreground text-xs">
                          N/A
                        </span>
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="font-medium">{user.name}</TableCell>

                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>

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
                      <Badge
                        variant="outline"
                        className={`text-xs ${getRoleBadgeColor(user.role)}`}
                      >
                        {user.role}
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {format(new Date(user.createdAt), "MMM d, yyyy")}
                  </TableCell>

                  {/* Activity Status */}
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <input
                        type="checkbox"
                        checked={user.status === "ACTIVE"}
                        onChange={(e) =>
                          handleToggleStatus(user.id, e.target.checked)
                        }
                        disabled={updatingUserId === user.id}
                        className="cursor-pointer w-4 h-4"
                      />
                      <Badge
                        variant="outline"
                        className={
                          user.status === "ACTIVE"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }
                      >
                        {updatingUserId === user.id
                          ? "Updating..."
                          : user.status}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onView(user)}
                        className="h-8 w-8 p-0"
                        title="View user"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDelete(user.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                        title="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
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
      </CardContent>
    </Card>
  );
};
