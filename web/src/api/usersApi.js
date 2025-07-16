import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from 'src/constants/globals'

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/v1/users`,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: user => ({
        url: '',
        method: 'POST',
        body: { user },
      }),
      invalidatesUsers: ['User'],
    }),
  }),
})

export const {
  useCreateUserMutation,
} = usersApi
