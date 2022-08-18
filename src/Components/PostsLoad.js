import Post from "./Post";
import axios from "axios";

function PostsLoad({ posts, setPosts }) {

  async function updatePost(id) {
    const response = await axios.get(`/posts/getPost/${id}`);
    const updatedPost = response.data[0];

    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          ...updatedPost};
      }
      return post;
    });

    setPosts(updatedPosts);
  }

  async function removePost(id) {
    setPosts(posts.filter(post => post.id!== id));
  }

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
            updatePost={updatePost}
            removePost={removePost}
          />)
      })}
    </div>
  )
}

export default PostsLoad;
