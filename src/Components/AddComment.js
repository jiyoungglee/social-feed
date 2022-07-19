import { useState } from 'react';
import axios from 'axios';
import '../Styles/AddComment.css';
import TextForm from './TextForm';

function AddComment({ textRef, postId, getPosts }) {
  const [textContent, setTextContent] = useState('');

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

  return (
    <div className="add-comment">
      <TextForm 
        textRef = {textRef}
        rows="1"
        placeholder = "Add your comment..."
        submitText = {addComment}
        textContent = {textContent}
        setTextContent = {setTextContent}
        minHeight = {16}
      />
      <div className="reply">
        <button disabled={(textContent.length === 0)} onClick={addComment}>Comment</button>
      </div>
    </div>
  )
}

export default AddComment;
