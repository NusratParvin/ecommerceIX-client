import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TransactionsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  currentItemsCount: number;
  onPageChange: (page: number) => void;
}

export const TransactionsPagination = ({
  currentPage,
  totalPages,
  totalRecords,
  currentItemsCount,
  onPageChange,
}: TransactionsPaginationProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t  ">
      <div className="text-sm text-gray-600 w-full">
        <p className="text-sm text-gray-600">
          Showing {currentItemsCount} of {totalRecords} transactions
        </p>
      </div>

      <Pagination className="flex justify-end">
        <PaginationContent>
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
              {currentPage}
              {/* Page {currentPage} of {totalPages} */}
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
  );
};
