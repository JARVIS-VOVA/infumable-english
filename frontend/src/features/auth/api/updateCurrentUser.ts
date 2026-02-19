import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'src/lib/axios'
import type { AuthUser } from '../types'

type UpdateCurrentUserDTO = {
  user: {
    username: string;
  };
}

export const updateCurrentUser = (data: UpdateCurrentUserDTO): Promise<AuthUser> => {
  return api.patch('/api/v1/current_user', data).then((res: any) => res.data)
}

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
