import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface ShopsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  currentItemsCount: number;
  onPageChange: (page: number) => void;
}

const ShopsPagination = ({
  currentPage,
  totalPages,
  totalRecords,
  currentItemsCount,
  onPageChange,
}: ShopsPaginationProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 p-4 border-t  ">
      {/* Left - Showing count (left aligned on desktop) */}
      <div className="text-sm text-gray-600 sm:text-left text-center">
        <p>
          Showing {currentItemsCount} of {totalRecords} shops
        </p>
      </div>

      {/* Center - Empty on desktop, acts as spacer */}
      <div className="hidden sm:block"></div>

      {/* Right - Pagination (right aligned on desktop) */}
      <div className="flex justify-center sm:justify-end">
        <Pagination>
          <PaginationContent className="flex items-center">
            {/* Previous Button */}
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

            {/* Current Page Info */}
            <PaginationItem>
              <Button
                variant="ghost"
                className="flex items-center px-4 text-sm text-gray-600"
              >
                Page {currentPage} of {totalPages}
              </Button>
            </PaginationItem>

            {/* Next Button */}
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
      </div>
    </div>
  );
};

export default ShopsPagination;
