import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'src/lib/axios'
import type { Source } from '../types'

export const cloneSource = (id: number): Promise<Source> => {
  return api.post(`/api/v1/sources/${id}/clone`).then((res: any) => res.data)
}

export const useCloneSource = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cloneSource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sources', 'public'] })
      queryClient.invalidateQueries({ queryKey: ['sources', 'mine'] })
    },
  })
}
