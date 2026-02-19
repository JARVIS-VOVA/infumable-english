import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'src/lib/axios'
import type { UpdateTermDTO } from '../types/index'

export const updateTerm = ({ id, ...data }: UpdateTermDTO & { id: number }) => {
  return api.patch(`/api/v1/terms/${id}`, data)
}

export const useUpdateTerm = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTerm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms'] })
    },
  })
}
