import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  totalCoupons: number;
  activeCoupons: number;
  expiredCoupons: number;
  currentItemsCount: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
  totalRecords,
  totalCoupons,
  activeCoupons,
  expiredCoupons,
  currentItemsCount,
  onPageChange,
}: PaginationComponentProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t">
      {/* Left section - Count and Stats */}
      {/* <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1"> */}
      <div className="text-sm text-gray-600">
        <p>
          Showing {currentItemsCount} of {totalRecords} coupons
        </p>
      </div>
      <div className="flex items-center gap-4   ">
        {totalCoupons > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <span className="flex gap-1">
                <span>{totalCoupons}</span>
                <span> Total</span>
              </span>
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              <span className="flex gap-1">
                <span>{activeCoupons}</span>
                <span> Active</span>
              </span>
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700">
              <span className="flex gap-1">
                <span>{expiredCoupons}</span>
                <span> Expired</span>
              </span>
            </Badge>
          </div>
        )}

        {/* Right section - Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) onPageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            <PaginationItem>
              <Button
                variant="ghost"
                className="flex items-center px-4 text-sm text-gray-600"
              >
                {currentPage}
              </Button>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) onPageChange(currentPage + 1);
                }}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>{" "}
      {/* </div> */}
    </div>
  );
};

export default PaginationComponent;
