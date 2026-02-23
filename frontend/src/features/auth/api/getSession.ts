import { useQuery } from '@tanstack/react-query'
import api from 'src/lib/axios'
import type { Session } from '../types'

export const getSession = (): Promise<Session> => {
  return api.get<Session>('/api/v1/sessions').then((res) => res.data)
}

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: getSession,
  })
}
