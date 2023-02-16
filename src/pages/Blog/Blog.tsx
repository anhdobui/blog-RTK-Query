import CreatePost from './../../component/CreatePost/CreatePost'
import PostList from './../../component/PostList/PostList'
function Blog() {
  return (
    <div
      className="p-5"
      style={{
        display: 'block',
        maxWidth: '1180px',
        margin: '0 auto',
        textAlign: 'left'
      }}
    >
      <CreatePost />
      <PostList />
    </div>
  )
}

export default Blog
