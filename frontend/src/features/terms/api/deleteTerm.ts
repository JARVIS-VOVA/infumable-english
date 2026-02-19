import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'src/lib/axios'

export const deleteTerm = (id: number) => {
  return api.delete(`/api/v1/terms/${id}`)
}

export const useDeleteTerm = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTerm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms'] })
    },
  })
}
