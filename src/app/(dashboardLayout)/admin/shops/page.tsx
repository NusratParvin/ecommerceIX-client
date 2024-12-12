"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, Search } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  useGetAllShopsQuery,
  useUpdateShopStatusMutation,
} from "@/redux/features/shops/shopsApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ShopDetailsDrawer } from "./_components/shopDrawer";
import { TShopInputProp } from "@/types";

export default function ShopManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [selectedShop, setSelectedShop] = useState<TShopInputProp | null>(null);

  const { data, isLoading, error } = useGetAllShopsQuery({
    page: currentPage,
    limit: 10,
    sortBy,
    sortOrder,
    searchTerm,
  });

  const [updateShopStatus] = useUpdateShopStatusMutation();

  const handleStatusChange = async (shopId: string, newStatus: string) => {
    try {
      await updateShopStatus({ shopId, status: newStatus }).unwrap();
      toast.success(`Shop status updated to ${newStatus}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to update shop status");
    }
  };

  const handleViewShop = (shop: TShopInputProp) => {
    setSelectedShop(shop);
  };

  const closeDrawer = () => {
    setSelectedShop(null);
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load shops.</p>;

  const shops: TShopInputProp[] = data?.data || [];
  const totalRecords = data?.meta?.total || 0;
  const totalPages = totalRecords > 0 ? Math.ceil(totalRecords / 10) : 1;
  console.log(shops);

  return (
    // <div className="container mx-auto p-0 space-y-2">
    <div className="flex flex-col min-h-screen container mx-auto p-0">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-deep-brown">Shops</h1>
          <p className="text-muted-foreground">Total shops: {shops.length}</p>
        </div>
        {/* <Link
        href="/admin/users/addUser"
        className="flex items-center bg-deep-brown hover:bg-warm-brown text-white py-2 px-4 rounded-md"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add User
      </Link> */}
      </div>
      {/* Search Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="relative w-full max-w-md">
          <Input
            placeholder="Search shops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full max-w-md"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Sort By:</label>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-40">{sortBy}</SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="ownerId">Owner</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Order:</label>
          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value)}
          >
            <SelectTrigger className="w-32">
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Shop Table */}
      <div className="flex-grow">
        <table className="min-w-full bg-white border rounded shadow text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Logo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Owner</th>
              <th className="px-4 py-2">Products</th>
              <th className="px-4 py-2">Followers</th>
              <th className="px-4 py-2 text-center">
                <div className="flex items-center gap-2 justify-center">
                  Status
                  <input
                    type="checkbox"
                    checked={isEditingStatus}
                    onChange={(e) => setIsEditingStatus(e.target.checked)}
                    className="cursor-pointer"
                  />
                </div>
              </th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((shop, index) => (
              <tr key={shop.id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  {shop.logo && (
                    <Image
                      src={shop.logo}
                      alt={shop.name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2">{shop.name}</td>
                <td className="px-4 py-2">{shop.owner.name}</td>
                <td className="px-4 py-2 text-center">{shop.productCount}</td>
                <td className="px-4 py-2 text-center">{shop.followerCount}</td>
                <td className="px-4 py-2 text-center">
                  {isEditingStatus ? (
                    <select
                      value={shop.status}
                      onChange={(e) =>
                        handleStatusChange(shop.id, e.target.value)
                      }
                      className="p-1 text-xs"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="BLACKLISTED">BLACKLISTED</option>
                      <option value="RESTRICTED">RESTRICTED</option>
                      <option value="DELETED">DELETED</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        shop.status === "ACTIVE"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {shop.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => handleViewShop(shop)}>
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage >= totalPages}
          className="border px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Shop Details Drawer */}
      <ShopDetailsDrawer
        isOpen={!!selectedShop}
        onClose={closeDrawer}
        shop={selectedShop}
      />
    </div>
  );
}
