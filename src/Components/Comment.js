import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/Comment.css';
import Editable from './Editable';
import OptionsMenu from './OptionsMenu';
import { UserContext } from '../store/UserContext';
import { Link } from 'react-router-dom';
import Timestamp from './Timestamp';

function Comment( { details, removeComment, getRecent } ) {
  const { state } = useContext(UserContext);
  const [commentEditable, setCommentEditable] = useState(false);
  const editRef = useRef(null);

  function enableEdit() {
    setCommentEditable(true);
  }

  // function getTime(timestamp) {
  //   const today = new Date().toISOString().substring(0,10);
  //   if (timestamp.startsWith(today)) {
  //     return `Today at ${timestamp.substring(11,16)}`
  //   }
  //   else {
  //     return timestamp.substring(0,10);
  //   }
  // }

  async function likeComment() {
    try {
      await axios.put('/comments/updatelikes', {commentId: details.commentId, commentLikes: details.commentLikes+1});
      getRecent(details.commentId);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteComment() {
    try {
      await axios.delete('/comments/deletecomment', { data: {userId: state.userId, commentId: details.commentId} });
      removeComment(details.commentId);
    } catch (error) {
      console.error(error);
    }
  }

  async function editComment(newText) {
    try {
      await axios.put('/comments/updatecomment', {userId: state.userId, commentId: details.commentId, commentText: newText});
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
            <Link to={`/profile/${details.commenterId}`} className="commenter">{details.commenter}</Link>
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
        {details.commenterId === state.userId && <OptionsMenu onDelete={deleteComment} enableEdit={enableEdit} />}
      </div>
      {commentEditable ?
        <div className="edit-comment">
          <span onClick={() => editComment(editRef.current.value)}>Save</span>
          <span onClick={() => setCommentEditable(false)}>Cancel</span>
        </div> :
        <div className="comment-bottom">
          <button onClick={likeComment}>Like</button>
          <Timestamp type="comment" timestamp={details.commentTimestamp}/>
        </div>
      }
    </div>
  )
};

export default Comment;
