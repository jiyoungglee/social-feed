import { useState } from 'react';
import '../Styles/AddComment.css';

function AddComment({ textRef }) {
  // To Do: move comments to database
  const [comments, setComments] = useState([]);
  const [textContent, setTextContent] = useState('');

  function handleInputChange(event) {
    setTextContent(event.target.value);
  };

  function addComment() {
    setComments(comments => [...comments, textContent]);
    setTextContent("");
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
