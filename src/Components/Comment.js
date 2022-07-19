import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import '../Styles/Comment.css';

function Comment( { comments, getPosts } ) {
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

  function renderComments() {
    if (comments[0].commentText) {
      comments.sort((a,b) => (a.commentTimestamp < b.commentTimestamp) ? 1 : ((b.commentTimestamp < a.commentTimestamp) ? -1 : 0))
      return comments.map(({ commentId, postId, commenter, commentText, commentLikes, commentTimestamp }) => {
        return (
          <div key={commentId} className="comment-wrapper">
            <div className="comment-top">
              <div className="comment-details">
                <div className="commenter">{commenter}</div>
                <div className="comment-text">{commentText}</div>
              </div>
              <div className="comment-likes">
                {commentLikes!==0 && `${commentLikes} Likes`}
              </div>
            </div>
            <div className="comment-bottom">
              <button onClick={() => likeComment(commentId, commentLikes)}><FontAwesomeIcon icon={faHeart} /> Like</button>
              <div className="comment-time">{getTime(commentTimestamp)}</div>
            </div>
          </div>
        )
      })
    }
  }

  return (
    <div className="comments-view">
      {renderComments()}
    </div>
  )
};

export default Comment;
