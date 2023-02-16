import { configureStore } from '@reduxjs/toolkit'
import { rtkQueryErrorLogger } from 'middleware'
import { blogApi } from 'pages/Blog/blog.service'
import blogReducer from 'pages/Blog/blog.slice'

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    [blogApi.reducerPath]: blogApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware, rtkQueryErrorLogger)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
