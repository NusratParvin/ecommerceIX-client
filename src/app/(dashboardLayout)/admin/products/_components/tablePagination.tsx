"use client";

import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  currentItems: number;
  activeCount: number;
  hiddenCount: number;
  onPageChange: (page: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  totalRecords,
  currentItems,
  activeCount,
  hiddenCount,
  onPageChange,
}) => {
  const generatePageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = maxVisiblePages;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t">
      <div className="text-sm text-gray-600  ">
        Showing <span className="font-medium">{currentItems}</span> of{" "}
        <span className="font-medium">{totalRecords}</span> products
      </div>

      <div className="flex md:flex-row flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Status:</span>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <span className="flex gap-1">
              <span>{activeCount}</span>
              <span> Active</span>
            </span>
          </Badge>
          <Badge variant="outline" className="bg-orange-50 text-orange-700">
            <span className="flex gap-1">
              <span>{hiddenCount}</span>
              <span>Hidden</span>
            </span>
          </Badge>
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {generatePageNumbers().map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => onPageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    onPageChange(Math.min(currentPage + 1, totalPages))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};
