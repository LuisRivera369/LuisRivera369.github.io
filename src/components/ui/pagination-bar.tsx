"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationBarProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center">
      <div className="join shadow-sm overflow-hidden rounded-lg">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="join-item btn btn-sm px-3 bg-base-300/50 text-base-content/70 hover:bg-primary hover:text-primary-content disabled:bg-base-300/20"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
        
        <div className="join-item flex items-center bg-base-300/50 px-4 no-animation cursor-default text-xs font-semibold text-base-content/80 border-x border-base-content/5">
          {currentPage} / {totalPages}
        </div>
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="join-item btn btn-sm px-3 bg-base-300/50 text-base-content/70 hover:bg-primary hover:text-primary-content disabled:bg-base-300/20"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
