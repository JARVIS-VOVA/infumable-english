import React from 'react'
import { Button } from './ui'

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null

  const maxVisiblePages = 5
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
  const normalizedStartPage = Math.max(1, endPage - maxVisiblePages + 1)
  const pages = Array.from(
    { length: endPage - normalizedStartPage + 1 },
    (_, index) => normalizedStartPage + index
  )

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(1)}
      >
        First
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          size="sm"
          variant={page === currentPage ? 'primary' : 'outline'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        Last
      </Button>
    </div>
  )
}
