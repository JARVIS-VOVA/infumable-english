import { useQuery } from '@tanstack/react-query'
import api from 'src/lib/axios'
import type { Source } from '../types'

export const getSource = (id: number): Promise<Source> => {
  return api.get(`/api/v1/sources/${id}`).then((res: any) => res.data)
}

export const useSource = (id: number) => {
  return useQuery({
    queryKey: ['source', id],
    queryFn: () => getSource(id),
    enabled: Number.isFinite(id),
  })
}
