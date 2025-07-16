import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from 'src/constants/globals'

export const tagsApi = createApi({
  reducerPath: 'tags',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/v1/tags`,
    credentials: 'include',
  }),
  tagTypes: ['Tag'],
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => '',
      providesTags: ['Tag'],
    }),

    createTag: builder.mutation({
      query: newTag => ({
        url: '',
        method: 'POST',
        body: newTag,
      }),
      invalidatesTags: ['Tag'],
    }),

    updateTag: builder.mutation({
      query: ({ id, ...updatedTag }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: updatedTag,
      }),
      invalidatesTags: ['Tag'],
    }),

    deleteTag: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tag'],
    }),
  }),
})

export const {
  useGetTagsQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagsApi
