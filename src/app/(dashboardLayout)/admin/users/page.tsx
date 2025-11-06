/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Search, Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserStats from "./_components/userStats";

const ITEMS_PER_PAGE = 10;

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [roleFilter, setRoleFilter] = useState<
    "all" | "ADMIN" | "VENDOR" | "USER"
  >("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "ACTIVE" | "SUSPENDED"
  >("all");
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

  // Filter users based on role and status
  const filteredUsers = users.filter((user: TUser) => {
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesRole && matchesStatus;
  });

  // Calculate user statistics
  const userStats = {
    total: totalRecords,
    active: users.filter((user: TUser) => user.status === "ACTIVE").length,
    suspended: users.filter((user: TUser) => user.status === "SUSPENDED")
      .length,
    admins: users.filter((user: TUser) => user.role === "ADMIN").length,
    vendors: users.filter((user: TUser) => user.role === "VENDOR").length,
    regularUsers: users.filter((user: TUser) => user.role === "USER").length,
  };

  // Handle user status update
  const handleUpdateStatus = async (userId: string, status: string) => {
    try {
      await updateUserStatus({ userId, status }).unwrap();
      toast.success(`User status updated to ${status}!`);
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

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Spinner />
        <p className="text-sm text-gray-600">Loading Users...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 font-semibold">
                Failed to load users.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Please try again later.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-2 space-y-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-1 text-slate-700">
            <Users className="w-4 h-4" />
            <h1 className="text-lg font-semibold  tracking-tight">
              User Management
            </h1>
          </div>
          <p className="text-sm text-muted-foreground ps-5">
            Manage and monitor all system users
          </p>
        </div>
        {/* <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Link href="/admin/users/addUser">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          </Link>
        </div> */}
      </div>

      {/* User Statistics */}
      <UserStats userStats={userStats} />

      {/* Search and Filters */}

      <div className="flex flex-col lg:flex-row gap-4 pt-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Role Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <Filter className="h-4 w-4" />
                Role: {roleFilter === "all" ? "All" : roleFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setRoleFilter("all")}>
                All Roles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("ADMIN")}>
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("VENDOR")}>
                Vendor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("USER")}>
                User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <Filter className="h-4 w-4" />
                Status: {statusFilter === "all" ? "All" : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("ACTIVE")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("SUSPENDED")}>
                Suspended
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort By */}
          <div className="flex items-center space-x-2 ">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Created</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="role">Role</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Order */}
          <div className="flex items-center space-x-2">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-32 h-9">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-grow border border-slate-200/60 rounded-none shadow-xl p-2 min-h-screen">
        <UserTable
          users={filteredUsers}
          onView={handleViewUser}
          onDelete={handleDeleteUser}
          onUpdateStatus={handleUpdateStatus}
          onUpdateRole={handleUpdateRole}
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
          userStats={{
            active: userStats.active,
            suspended: userStats.suspended,
          }}
        />
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
