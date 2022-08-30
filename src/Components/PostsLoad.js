import Post from "./Post";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../store/UserContext";

function PostsLoad({ posts, setPosts }) {
  const { state } = useContext(UserContext);

  async function updatePost(postId) {
    const response = await axios.get(`/posts/getPost`,{params: {userId:state.userId, postId}});
    const updatedPost = response.data[0];

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          ...updatedPost};
      }
      return post;
    });

    setPosts(updatedPosts);
  }

  function removePost(id) {
    setPosts(posts.filter(post => post.id!== id));
  }

  return (
    <div>
      {posts.map(({ poster, posterId, id, postDetails, postLikes, timestamp, commentId, commentText, commentLikes, commentTimestamp, commenter, commenterId, commentsCount, postLiked, commentLiked}) => {
        return (
          <Post 
            key={id}
            postId={id}
            timestamp={timestamp}
            userId={posterId}
            username={poster}
            details={postDetails}
            postLikes={postLikes}
            topComment={commentId!==null && {commenterId, commentId, commentText, commentLikes, commentTimestamp, commenter, commentLiked}}
            commentsCount={commentsCount}
            postLiked={postLiked}
            updatePost={updatePost}
            removePost={removePost}
          />)
      })}
    </div>
  )
}

export default PostsLoad;
