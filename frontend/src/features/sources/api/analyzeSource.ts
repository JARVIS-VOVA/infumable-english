import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/lib/axios';
import type { Source } from '../types';

type AnalyzeSourceDTO = {
  id: number;
  source: {
    text: string;
  };
};

export const analyzeSource = ({ id, ...data }: AnalyzeSourceDTO): Promise<Source> => {
  return api.post(`/api/v1/sources/${id}/analyze`, data).then((res: any) => res.data);
};

export const useAnalyzeSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: analyzeSource,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['source', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['sources', 'mine'] });
      queryClient.invalidateQueries({ queryKey: ['terms'] });
    },
  });
};
