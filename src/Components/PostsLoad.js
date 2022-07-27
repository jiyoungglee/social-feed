import Post from "./Post";

function PostsLoad({ posts, getPosts }) {
  return (
    <div>
      {posts.map(({ poster, id, postDetails, postLikes, timestamp, commentId, commentText, commentLikes, commentTimestamp, commenter, commentsCount }) => {
        return (
          <Post 
            key={id}
            postId={id}
            timestamp={timestamp}
            username={poster}
            details={postDetails}
            postLikes={postLikes}
            topComment={commentId!==null && {commentId, commentText, commentLikes, commentTimestamp, commenter}}
            commentsCount={commentsCount}
            getPosts={getPosts}
          />)
      })}
    </div>
  )
}

export default PostsLoad;
