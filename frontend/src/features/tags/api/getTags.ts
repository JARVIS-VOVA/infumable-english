import { useQuery } from '@tanstack/react-query';
import api from 'src/lib/axios';
import type { Tag } from '../types';

export const getTags = (): Promise<Tag[]> => {
  return api.get('/api/v1/tags').then((res: any) => res.data);
};

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });
};
