import Post from "./Post";

function PostsLoad({ posts, getPosts, currentUser }) {
  return (
    <div>
      {posts.map(({ poster, posterId, id, postDetails, postLikes, timestamp, commentId, commentText, commentLikes, commentTimestamp, commenter, commenterId, commentsCount }) => {
        return (
          <Post 
            key={id}
            postId={id}
            timestamp={timestamp}
            userId={posterId}
            username={poster}
            details={postDetails}
            postLikes={postLikes}
            topComment={commentId!==null && {commenterId, commentId, commentText, commentLikes, commentTimestamp, commenter}}
            commentsCount={commentsCount}
            getPosts={getPosts}
            currentUser={currentUser}
          />)
      })}
    </div>
  )
}

export default PostsLoad;
