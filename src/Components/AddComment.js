import { useState } from 'react';
import axios from 'axios';
import '../Styles/AddComment.css';

function AddComment({ textRef, postId, getPosts }) {
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

  return (
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
  )
}

export default AddComment;
