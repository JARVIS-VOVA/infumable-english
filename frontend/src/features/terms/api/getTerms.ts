import { useQuery } from '@tanstack/react-query';
import api from 'src/lib/axios';
import type { Term } from '../types/index';

export const getTerms = (): Promise<Term[]> => {
  return api.get('/api/v1/terms').then((res: any) => res.data);
};

export const useTerms = () => {
  return useQuery({
    queryKey: ['terms'],
    queryFn: getTerms,
  });
};
