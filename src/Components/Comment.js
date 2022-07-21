import { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Comment.css';
import Editable from './Editable';
import OptionsMenu from './OptionsMenu';

function Comment( { details, removeComment, getRecent } ) {
  const [commentEditable, setCommentEditable] = useState(false);
  const editRef = useRef(null);

  function enableEdit() {
    setCommentEditable(true);
  }

  function getTime(timestamp) {
    const today = new Date().toISOString().substring(0,10);
    if (timestamp.startsWith(today)) {
      return `Today at ${timestamp.substring(11,16)}`
    }
    else {
      return timestamp.substring(0,10);
    }
  }

  async function likeComment() {
    try {
      const response = await axios.put('/comments/updatelikes', {commentId: details.commentId, commentLikes: details.commentLikes+1});
      console.log(response);
      getRecent(details.commentId);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteComment() {
    try {
      const response = await axios.delete('/comments/deletecomment', { data: {commentId: details.commentId} });
      console.log(response);
      removeComment(details.commentId);
    } catch (error) {
      console.error(error);
    }
  }

  async function editComment(newText) {
    try {
      const response = await axios.put('/comments/updatecomment', {commentId: details.commentId, commentText: newText});
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setCommentEditable(false);
    getRecent(details.commentId);
  }

  return (
    <div className="comment-wrapper">
      <div className="comment-top">
        <div className= {!commentEditable ? "comment-details" : "comment-details edit"} >
        {commentEditable ? 
          <Editable originalText={details.commentText} saveEdit={editComment} editRef={editRef} /> :
          <div className="non-editable">
            <div className="commenter">{details.commenter}</div>
            <div className="comment-text">{details.commentText}</div>
            {details.commentLikes!==0 &&
            <div className="comment-likes">
                <FontAwesomeIcon icon={faHeart} />
                {details.commentLikes}
            </div>
            }
          </div>
        }
        </div>
        <OptionsMenu onDelete={deleteComment} enableEdit={enableEdit} />
      </div>
      <div className="comment-bottom">
        <button onClick={likeComment}>Like</button>
        <div className="comment-time">{getTime(details.commentTimestamp)}</div>
      </div>
    </div>
  )
};

export default Comment;
