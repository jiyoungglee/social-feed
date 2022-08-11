import { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';
import '../styles/PostInteraction.css';
import AddComment from './AddComment';
import Comment from './Comment';

function PostInteraction({ postId, postLikes, getPosts, topComment, commentsCount }) {
  const textRef = useRef(null);
  const [comments, setComments] = useState(topComment ? [topComment] : [])
  const [numberComments, setnumberComments] = useState(commentsCount ? commentsCount : 0)

  async function fetchComments() {
    const response = await axios.get(`/comments/getComments/${postId}`);
    setComments(response.data)
  }

  function loadComments() {
    if (comments) {
      return comments.map((comment) =>
        <Comment key={comment.commentId} details={comment} removeComment={removeComment} getRecent={getRecent} />
      )
    }
  }

  // Like Button
  async function likePost() {
    try {
      await axios.put('/posts/updatelikes', {id: postId, postLikes: postLikes+1});
      getPosts();
    } catch (error) {
      console.error(error);
    }
  }

  // Comment Button
  function toComment() {
    textRef.current.focus();
  }

  async function getRecent(id) {
    const response = await axios.get(`/comments/getComment/${id}`);
    const recentComment = response.data[0];
    const commentIndex = comments.findIndex(comment => comment.commentId===id)
    if(commentIndex === -1) {
      setComments(comments => [recentComment, ...comments])
      setnumberComments(numberComments => numberComments + 1)
    }
    else {
      setComments(comments => comments.map((comment, i) => i === commentIndex ? recentComment : comment))
    } 
  }

  function removeComment(id) {
    setComments(comments => comments.filter(comment => comment.commentId !== id));
    setnumberComments(numberComments => numberComments - 1)
  }

  return (
    <div>
      <div className="current-feedback">
        <div className="likes">{postLikes} Likes</div>
        <div className="number-comments">{numberComments} Comments</div>
      </div>
      <div className="post-feedback">
        <button onClick={likePost}><FontAwesomeIcon icon={faHeart} /> Like</button>
        <button onClick={toComment}><FontAwesomeIcon icon={faMessage} /> Comment</button>
      </div>
        <AddComment textRef={textRef} postId={postId} getRecent={getRecent} />
      <div className="view-comments">
        {loadComments()}
      </div>
      {numberComments-comments.length > 0 && 
      <div className="view-all" onClick={fetchComments}>View All</div>}
    </div>
  )
}

export default PostInteraction;
