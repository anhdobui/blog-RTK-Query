import {
  useDeletePostMutation,
  useGetPostsQuery
} from 'pages/Blog/blog.service'
import { cancelPost, startEditingPost } from 'pages/Blog/blog.slice'
import { useDispatch } from 'react-redux'
import PostItem from './../PostItem/PostIem'
import SkeletonPost from './../SkeletonPost/SkeletonPost'
function PostList() {
  const { data, isLoading, isFetching } = useGetPostsQuery()
  const dispatch = useDispatch()
  const [deletePost, deletePostResult] = useDeletePostMutation()
  const handleStartEditingPost = (postId: string) => {
    dispatch(startEditingPost(postId))
  }
  const handleDeletePost = (postId: string) => {
    deletePost(postId)
    dispatch(cancelPost())
  }
  return (
    <>
      <div>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="mb-10 md:mb-16">
              <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                Dev Blog
              </h2>
              <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi
                tệ. Nhưng ngày mốt sẽ có nắng
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
              {isFetching && (
                <>
                  <SkeletonPost />
                  <SkeletonPost />
                </>
              )}
              {!isFetching &&
                data &&
                data.map((post) => (
                  <PostItem
                    key={post.id}
                    post={post}
                    handleStartEditingPost={handleStartEditingPost}
                    handleDeletePost={handleDeletePost}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostList
