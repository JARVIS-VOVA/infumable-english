import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'src/lib/axios'
import type { CreateTermDTO } from '../types/index'

export const createTerm = (data: CreateTermDTO) => {
  return api.post('/api/v1/terms', data)
}

export const useCreateTerm = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTerm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms'] })
    },
  })
}
