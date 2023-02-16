import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type BlogState = {
  postId: string
}
const initialState: BlogState = {
  postId: ''
}
const slice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditingPost: (state, action: PayloadAction<string>) => {
      state.postId = action.payload
    },
    cancelPost: (state) => {
      state.postId = ''
    }
  }
})
export const { cancelPost, startEditingPost } = slice.actions
const blogReducer = slice.reducer
export default blogReducer
