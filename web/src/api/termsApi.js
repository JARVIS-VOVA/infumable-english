import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from 'src/constants/globals'

export const termsApi = createApi({
  reducerPath: 'terms',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/v1/terms`,
    credentials: 'include',
  }),
  tagTypes: ['Term'],
  endpoints: (builder) => ({
    getTerms: builder.query({
      query: () => '',
      providesTags: ['Term'],
    }),

    createTerms: builder.mutation({
      query: newTerms => ({
        url: '',
        method: 'POST',
        body: newTerms,
      }),
      invalidatesTags: ['Term'],
    }),

    updateTerm: builder.mutation({
      query: ({ id, ...updatedTerm }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: updatedTerm,
      }),
      invalidatesTags: ['Term'],
    }),

    deleteTerm: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Term'],
    }),
  }),
})

export const {
  useGetTermsQuery,
  useCreateTermsMutation,
  useUpdateTermMutation,
  useDeleteTermMutation,
} = termsApi
