import { useState, useRef, useContext } from 'react';
import http from '../http-common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';
import '../Styles/PostInteraction.css';
import AddComment from './AddComment';
import Comment from './Comment';
import { UserContext } from '../store/UserContext';

function PostInteraction({ postId, postLikes, topComment, commentsCount, updatePost, postLiked }) {
  const { state } = useContext(UserContext);
  const textRef = useRef(null);
  const [comments, setComments] = useState(topComment ? [topComment] : [])
  const [numberComments, setnumberComments] = useState(commentsCount ? commentsCount : 0)

  async function fetchComments() {
    const response = await http.get(`/comments/getComments`, {params: {userId:state.userId, postId}});
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
      await http.post('/posts/likePost', {postId, userId: state.userId});
      updatePost(postId);
    } catch (error) {
      console.error(error);
    }
  }

  async function unlikePost() {
    try {
      await http.delete('/posts/unlikePost', { data: {postId, userId: state.userId} });
      updatePost(postId);
    } catch (error) {
      console.error(error);
    }
  }

  // Comment Button
  function toComment() {
    textRef.current.focus();
  }

  async function getRecent(id) {
    const response = await http.get(`/comments/getComment`, {params: {userId:state.userId, commentId:id}});
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
        { postLiked === 0
        ? <button onClick={likePost}><FontAwesomeIcon icon={faHeart} /> Like</button>
        : <button onClick={unlikePost}><FontAwesomeIcon icon={faHeart} /> Unlike</button> }
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
