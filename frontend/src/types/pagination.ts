export type PaginationMeta = {
  currentPage: number
  nextPage: number | null
  prevPage: number | null
  perPage: number
  totalPages: number
  totalCount: number
}

export type PaginatedResponse<T> = {
  data: T[]
  meta: PaginationMeta
}
