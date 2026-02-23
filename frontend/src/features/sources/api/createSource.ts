import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'src/lib/axios'
import type { CreateSourceDTO, Source } from '../types'

export const createSource = (data: CreateSourceDTO): Promise<Source> => {
  return api.post('/api/v1/sources', data).then((res) => res.data)
}

export const useCreateSource = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sources', 'public'] })
      queryClient.invalidateQueries({ queryKey: ['sources', 'mine'] })
    },
  })
}
