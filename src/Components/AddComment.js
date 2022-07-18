import { useState } from 'react';
import axios from 'axios';
import '../Styles/AddComment.css';

function AddComment({ textRef, comments, postId, getPosts }) {
  const [textContent, setTextContent] = useState('');


  function autoGrow(event) {
    if (event.target.scrollHeight > 16) {
      event.target.style.height = "auto";
      event.target.style.height = (event.target.scrollHeight) + "px";
    }
  }

  function handleInputChange(event) {
    setTextContent(event.target.value);
  };

  function resetComment() {
    setTextContent('');
    textRef.current.style.height="auto";
    textRef.current.blur();
  }

  async function addComment() {
      try {
        const response = await axios.post('/comments/insert', {
          userId: 'TestUserId',
          postId: postId,
          commentText: textContent,
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      getPosts();
      resetComment();
  }

  function handleSubmit(event) {
    if(event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (textContent.length !== 0) addComment();
    }
  }

  function renderComments() {
    if (comments[0].commentText) {
      comments.sort((a,b) => (a.commentTimestamp < b.commentTimestamp) ? 1 : ((b.commentTimestamp < a.commentTimestamp) ? -1 : 0))
      return comments.map(comment => {
        return (
          <div key={comment.commentId} className="comment-wrapper">
            <div className="comment-details">{comment.commentText}</div>
          </div>
        )
      })
    }
  }

  return (
    <div className="comments-section">
      <div className="add-comment">
        <textarea
          ref={textRef}
          rows="1"
          placeholder="Add your comment..."
          onChange={handleInputChange}
          onInput={autoGrow}
          value={textContent}
          onKeyDown={handleSubmit}
        />
        <div className="reply">
          <button disabled={(textContent.length === 0)} onClick={addComment}>Comment</button>
        </div>
      </div>
      <div className="comments-view">
          {renderComments()}
      </div>
    </div>
  )
}

export default AddComment;
