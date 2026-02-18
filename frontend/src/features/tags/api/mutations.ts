import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/lib/axios';
import type { CreateTagDTO, UpdateTagDTO } from '../types';

export const createTag = (data: CreateTagDTO) => {
  return api.post('/api/v1/tags', data);
};

export const updateTag = ({ id, ...data }: UpdateTagDTO) => {
  return api.patch(`/api/v1/tags/${id}`, data);
};

export const deleteTag = (id: number) => {
  return api.delete(`/api/v1/tags/${id}`);
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};
