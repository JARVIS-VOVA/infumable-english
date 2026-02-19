import { useQuery } from '@tanstack/react-query'
import api from 'src/lib/axios'
import type { PaginatedResponse } from 'src/types/pagination'
import type { Source } from '../types'

type GetSourcesParams = {
  page: number
  perPage: number
}

export const getSources = ({ page, perPage }: GetSourcesParams): Promise<PaginatedResponse<Source>> => {
  return api.get('/api/v1/sources', { params: { page, perPage } }).then((res: any) => res.data)
}

export const useSources = ({ page, perPage }: GetSourcesParams) => {
  return useQuery({
    queryKey: ['sources', 'mine', page, perPage],
    queryFn: () => getSources({ page, perPage }),
  })
}
