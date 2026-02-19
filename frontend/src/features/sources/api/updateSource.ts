import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/lib/axios';
import type { Source } from '../types';

type UpdateSourceDTO = {
  id: number;
  source: {
    title?: string;
    language?: string;
    isPublic?: boolean;
  };
};

export const updateSource = ({ id, ...data }: UpdateSourceDTO): Promise<Source> => {
  return api.patch(`/api/v1/sources/${id}`, data).then((res: any) => res.data);
};

export const useUpdateSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSource,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sources', 'mine'] });
      queryClient.invalidateQueries({ queryKey: ['source', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['sources', 'public'] });
    },
  });
};
