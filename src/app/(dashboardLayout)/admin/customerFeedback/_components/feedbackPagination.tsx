import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

interface ReviewsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  currentItemsCount: number;
  onPageChange: (page: number) => void;
}

export const FeedbackPagination = ({
  currentPage,
  totalPages,
  totalRecords,
  currentItemsCount,
  onPageChange,
}: ReviewsPaginationProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t">
      <div className="text-sm text-gray-600 w-full">
        <p className="text-sm text-gray-600">
          Showing {currentItemsCount} of {totalRecords} reviews
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
