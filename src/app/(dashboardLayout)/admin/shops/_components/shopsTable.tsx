import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Store, User, Package, Users, Edit } from "lucide-react";
import Image from "next/image";
import { TShopInputProp } from "@/types";

interface ShopsTableProps {
  shops: TShopInputProp[];
  currentPage: number;
  itemsPerPage: number;
  searchTerm: string;
  isEditingStatus: boolean;
  onViewShop: (shop: TShopInputProp) => void;
  onStatusChange: (shopId: string, newStatus: string) => void;
  onToggleEditStatus: () => void;
}

const ShopsTable = ({
  shops,
  currentPage,
  itemsPerPage,
  searchTerm,
  isEditingStatus,
  onViewShop,
  onStatusChange,
  onToggleEditStatus,
}: ShopsTableProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "BLACKLISTED":
        return "destructive";
      case "RESTRICTED":
        return "secondary";
      case "DELETED":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "BLACKLISTED":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "RESTRICTED":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "DELETED":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  if (shops.length === 0) {
    return (
      <div className="text-center py-12">
        <Store className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">
          {searchTerm ? "No matching shops found" : "No shops yet"}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {searchTerm ? "Try adjusting your search" : "Shops will appear here"}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Table Header with Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 ">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Shops</h2>
        </div>

        {/* Edit Status Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Edit Status:</span>
          <Button
            variant={isEditingStatus ? "default" : "outline"}
            size="sm"
            onClick={onToggleEditStatus}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            {isEditingStatus ? "Editing" : "Edit"}
          </Button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto min-h-screen">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 font-bold">#</TableHead>
              <TableHead className="min-w-[80px] font-bold">Logo</TableHead>
              <TableHead className="min-w-[150px] font-bold">
                Shop Name
              </TableHead>
              <TableHead className="min-w-[120px] font-bold">Owner</TableHead>
              <TableHead className="min-w-[100px] font-bold text-center">
                Products
              </TableHead>
              <TableHead className="min-w-[100px] font-bold text-center">
                Followers
              </TableHead>
              <TableHead className="min-w-[120px] font-bold text-center">
                Status
              </TableHead>
              <TableHead className="text-right min-w-[100px] font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop: TShopInputProp, index: number) => (
              <TableRow key={shop.id} className="hover:bg-gray-50/50">
                <TableCell className="font-medium text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>

                <TableCell>
                  <div className="flex justify-center">
                    {shop.logo ? (
                      <div className="relative h-12 w-12">
                        <Image
                          src={shop.logo}
                          alt={shop.name}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Store className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">
                        {shop.name}
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-xs text-gray-500 truncate cursor-help">
                            ID: {shop.id.slice(0, 8)}...
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-mono text-xs">{shop.id}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {shop.owner.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {shop.owner.email}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 justify-center">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-700">
                      {shop.productCount}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 justify-center">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-purple-700">
                      {shop.followerCount}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex justify-center">
                    {isEditingStatus ? (
                      <select
                        value={shop.status}
                        onChange={(e) =>
                          onStatusChange(shop.id, e.target.value)
                        }
                        className="p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="BLACKLISTED">BLACKLISTED</option>
                        <option value="RESTRICTED">RESTRICTED</option>
                        <option value="DELETED">DELETED</option>
                      </select>
                    ) : (
                      <Badge
                        variant={getStatusVariant(shop.status)}
                        className={getStatusColor(shop.status)}
                      >
                        {shop.status}
                      </Badge>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex justify-end">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() => onViewShop(shop)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View shop details</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ShopsTable;
