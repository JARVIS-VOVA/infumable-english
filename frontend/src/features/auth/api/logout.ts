import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'src/lib/axios'

export const logout = () => {
  return api.delete('/api/v1/sessions')
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.setQueryData(['user'], null)
      queryClient.setQueryData(['session'], { authenticated: false })
    },
  })
}
