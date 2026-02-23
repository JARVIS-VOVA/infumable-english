import { useQuery } from '@tanstack/react-query'
import api from 'src/lib/axios'
import type { PaginatedResponse } from 'src/types/pagination'
import type { Term } from '../types/index'

type GetTermsParams = {
  page?: number
  perPage?: number
  sourceId?: number
  learnt?: boolean
}

export const getTerms = ({ page, perPage, sourceId, learnt }: GetTermsParams): Promise<PaginatedResponse<Term>> => {
  return api
    .get('/api/v1/terms', { params: { page, perPage, sourceId, learnt } })
    .then((res) => res.data)
}

export const useTerms = ({ page, perPage, sourceId, learnt }: GetTermsParams) => {
  return useQuery({
    queryKey: ['terms', page, perPage, sourceId, learnt],
    queryFn: () => getTerms({ page, perPage, sourceId, learnt }),
  })
}
