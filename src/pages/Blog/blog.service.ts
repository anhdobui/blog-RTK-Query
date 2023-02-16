import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from 'types/blog.type'
export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  tagTypes: ['Post'],
  refetchOnMountOrArgChange: 30,
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => 'posts',
      providesTags: (result, error, arg) => {
        return result
          ? [
              ...result.map((post) => ({
                type: 'Post' as const,
                id: post.id
              })),
              { type: 'Post' as const, id: 'LIST' }
            ]
          : [{ type: 'Post' as const, id: 'LIST' }]
      }
    }),
    getPostId: build.query<Post, string>({
      query: (id) => `posts/${id}`
    }),
    updatePost: build.mutation<Post, { id: string; body: Omit<Post, 'id'> }>({
      query: ({ id, body }) => {
        return {
          url: `posts/${id}`,
          method: 'PUT',
          body
        }
      },
      invalidatesTags: (result, error, arg) => {
        return error ? [] : [{ type: 'Post', id: result?.id }]
      }
    }),
    deletePost: build.mutation<{}, string>({
      query: (id) => {
        return {
          url: `posts/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, id) => {
        return error ? [] : [{ type: 'Post', id }]
      }
    }),
    addPost: build.mutation<Post, Omit<Post, 'id'>>({
      query: (body) => {
        return {
          url: 'posts',
          method: 'POST',
          body
        }
      },
      invalidatesTags: (result, error, arg) => {
        return error ? [] : [{ type: 'Post', id: 'LIST' }]
      }
    })
  })
})
export const {
  useGetPostsQuery,
  useGetPostIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddPostMutation
} = blogApi
