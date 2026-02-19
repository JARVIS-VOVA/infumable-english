import { useQuery } from '@tanstack/react-query'
import api from 'src/lib/axios'
import type { AuthUser } from '../types'

export const getUser = (): Promise<AuthUser | null> => {
  return api
    .get('/api/v1/current_user')
    .then((res: any) => res.data)
    .catch(() => null)
}

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
