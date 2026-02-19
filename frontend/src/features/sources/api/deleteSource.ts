import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/lib/axios';

export const deleteSource = (id: number): Promise<void> => {
  return api.delete(`/api/v1/sources/${id}`).then(() => undefined);
};

export const useDeleteSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSource,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['sources', 'mine'] });
      queryClient.invalidateQueries({ queryKey: ['sources', 'public'] });
      queryClient.invalidateQueries({ queryKey: ['source', deletedId] });
    },
  });
};
