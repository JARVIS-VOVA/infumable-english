import { useQuery } from '@tanstack/react-query'
import api from 'src/lib/axios'
import type { PaginatedResponse } from 'src/types/pagination'
import type { Source } from '../types'

type GetPublicSourcesParams = {
  page: number
  perPage: number
}

export const getPublicSources = ({ page, perPage }: GetPublicSourcesParams): Promise<PaginatedResponse<Source>> => {
  return api.get('/api/v1/sources/public', { params: { page, perPage } }).then((res: any) => res.data)
}

export const usePublicSources = ({ page, perPage }: GetPublicSourcesParams) => {
  return useQuery({
    queryKey: ['sources', 'public', page, perPage],
    queryFn: () => getPublicSources({ page, perPage }),
  })
}
