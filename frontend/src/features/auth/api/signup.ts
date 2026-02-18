import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/lib/axios';

export const signup = (data: any) => {
  return api.post('/api/v1/users', { user: data });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
