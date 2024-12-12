"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { UserTable } from "./_components/userTable";
import { UserDrawer } from "./_components/userDrawer";
import { TUser } from "@/types";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "@/redux/features/users/usersApi";
import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE = 10;

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Fetch users using RTK Query
  const { data, isLoading, error } = useGetUsersQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    sortBy,
    sortOrder,
    searchTerm,
  });

  const users = data?.data || [];
  const totalRecords = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);

  // Handle user status update
  const handleUpdateStatus = async (userId: string, status: string) => {
    try {
      await updateUserStatus({ userId, status }).unwrap();
      toast.success(`User status updated to ${status}!`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to update user status. Please try again.");
    }
  };

  // Handle user role update
  const handleUpdateRole = async (userId: string, role: string) => {
    try {
      await updateUserRole({ userId, role }).unwrap();
      toast.success(`User role updated to ${role}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      toast.error("Failed to update user role. Please try again.");
    }
  };

  // Handle delete user
  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully!");
    } catch {
      toast.error("Failed to delete user.");
    }
  };

  // Handle view user
  const handleViewUser = (user: TUser) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

  // Handle Search Input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load users.</p>;

  return (
    <div className="container mx-auto p-0 space-y-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-deep-brown">Users</h1>
          <p className="text-muted-foreground">Total users: {totalRecords}</p>
        </div>
        <Link
          href="/admin/users/addUser"
          className="flex items-center bg-deep-brown hover:bg-warm-brown text-white py-2 px-4 rounded-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Link>
      </div>

      {/* Search, Sort & Filter */}
      <div className="flex flex-wrap justify-between items-center gap-6 mb-6">
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <Input
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center space-x-2 w-44">
          <label className="text-sm font-medium text-gray-900 w-20">
            Sort By:
          </label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="role">Role</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order Dropdown */}
        <div className="flex items-center space-x-2 w-44">
          <label className="text-sm font-medium text-gray-900">Order:</label>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger>
              <SelectValue placeholder="Sort Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        <UserTable
          users={users}
          onView={handleViewUser}
          onDelete={handleDeleteUser}
          onUpdateStatus={handleUpdateStatus}
          onUpdateRole={handleUpdateRole}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>

      {/* User Drawer */}
      <UserDrawer
        user={selectedUser}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedUser(null);
        }}
      />
    </div>
  );
};

export default UserManagement;
