import { useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';
import '../Styles/PostInteraction.css';
import AddComment from './AddComment';
import Comment from './Comment';

function PostInteraction({ postId, postLikes, getPosts, comments }) {
  const textRef = useRef(null);

  // Like Button
  async function likePost(postLikes) {
    try {
      const response = await axios.put('/posts/updatelikes', {id: postId, postLikes: postLikes+1});
      console.log(response);
      getPosts();
    } catch (error) {
      console.error(error);
    }
  }

  // Comment Button
  function toComment() {
    textRef.current.focus();
  }

  // Load Comments
  function loadComments() {
    if (comments[0].commentText) {
      comments.sort((a,b) => (a.commentTimestamp < b.commentTimestamp) ? 1 : ((b.commentTimestamp < a.commentTimestamp) ? -1 : 0))
      return comments.map((comment) => {
        return <Comment key={comment.commentId} details={comment} getPosts={getPosts}/>
      })
    }
  }

  return (
    <div>
      <div className="likes">{postLikes} Likes</div>
      <div className="post-feedback">
        <button onClick={() => likePost(postLikes)}><FontAwesomeIcon icon={faHeart} /> Like</button>
        <button onClick={toComment}><FontAwesomeIcon icon={faMessage} /> Comment</button>
      </div>
      <AddComment textRef={textRef} postId={postId} getPosts={getPosts} />
      {loadComments()}
    </div>
  )
}

export default PostInteraction;
