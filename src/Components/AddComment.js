import { useState } from 'react';
import '../Styles/AddComment.css';

function AddComment({ textRef }) {
  // To Do: move comments to database
  const [comments, setComments] = useState([]);
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

  function addComment() {
    setComments(comments => [...comments, textContent]);
    resetComment();
  }

  function handleSubmit(event) {
    if(event.key === 'Enter' && !event.shiftKey) {
      addComment();
    }
  }

  function renderComments() {
    return comments.map(comment => {
      return(
        <div className="comment-wrapper">
          <div className="comment-details">{comment}</div>
        </div>
      )
    })
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
          <button onClick={addComment}>Comment</button>
        </div>
      </div>
      <div className="comments-view">
          {renderComments()}
      </div>
    </div>
  )
}

export default AddComment;
