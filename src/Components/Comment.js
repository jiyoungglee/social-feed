import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import '../Styles/Comment.css';

function Comment( { details, getPosts } ) {
  function getTime(timestamp) {
    const today = new Date().toISOString().substring(0,10);
    if (timestamp.startsWith(today)) {
      return `Today at ${timestamp.substring(11,16)}`
    }
    else {
      return timestamp.substring(0,10);
    }
  }

  async function likeComment(commentId, commentLikes) {
    try {
      const response = await axios.put('/comments/updatelikes', {commentId: commentId, commentLikes: commentLikes+1});
      console.log(response);
      getPosts();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="comment-wrapper">
      <div className="comment-top">
        <div className="comment-details">
          <div className="commenter">{details.commenter}</div>
          <div className="comment-text">{details.commentText}</div>
        </div>
        <div className="comment-likes">
          {details.commentLikes!==0 && `${details.commentLikes} Likes`}
        </div>
      </div>
      <div className="comment-bottom">
        <button onClick={() => likeComment(details.commentId, details.commentLikes)}><FontAwesomeIcon icon={faHeart} /> Like</button>
        <div className="comment-time">{getTime(details.commentTimestamp)}</div>
      </div>
    </div>
  )
};

export default Comment;
