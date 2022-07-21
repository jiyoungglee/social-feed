import { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';
import '../Styles/PostInteraction.css';
import AddComment from './AddComment';
import Comment from './Comment';

function PostInteraction({ postId, postLikes, getPosts, topComment }) {
  const textRef = useRef(null);
  const [comments, setComments] = useState(topComment && [topComment])

  async function fetchComments() {
    const response = await axios.get(`/comments/getComments/${postId}`);
    setComments(response.data)
  }

  function loadComments() {
    if (comments) {
      comments.sort((a,b) => (a.commentTimestamp < b.commentTimestamp) ? 1 : ((b.commentTimestamp < a.commentTimestamp) ? -1 : 0))
      return comments.map((comment) => {
        return <Comment key={comment.commentId} details={comment} removeComment={removeComment} getRecent={getRecent} />
      })
    }
  }

  // Like Button
  async function likePost() {
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

  async function getRecent(id) {
    const response = await axios.get(`/comments/getComment/${id}`);
    if(!comments) {
      setComments(response.data)
    }
    else {
      const commentIndex = comments.findIndex(comment => comment.commentId===id)
      if(commentIndex === -1) {
        setComments(comments => [...comments,...response.data])
      }
      else {
        setComments(comments => {
          const updatedComments = comments.splice(commentIndex, 1, response.data[0]);
          return updatedComments;
        })
      }
    }
  }

  function removeComment(id) {
    setComments(comments => comments.filter(comment => comment.commentId !== id))
  }

  return (
    <div>
      <div className="likes">{postLikes} Likes</div>
      <div className="post-feedback">
        <button onClick={likePost}><FontAwesomeIcon icon={faHeart} /> Like</button>
        <button onClick={toComment}><FontAwesomeIcon icon={faMessage} /> Comment</button>
      </div>
      <AddComment textRef={textRef} postId={postId} getRecent={getRecent} />
      {loadComments()}
    </div>
  )
}

export default PostInteraction;
