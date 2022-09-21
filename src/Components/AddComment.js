import { useContext, useState } from 'react';
import axios from 'axios';
import '../Styles/AddComment.css';
import TextForm from './TextForm';
import { UserContext } from '../store/UserContext';

function AddComment({ textRef, postId, getRecent }) {
  const { state } = useContext(UserContext);
  const [textContent, setTextContent] = useState('');

  function resetComment() {
    setTextContent('');
    textRef.current.style.height="auto";
    textRef.current.blur();
  }

  async function addComment() {
      try {
        const response = await axios.post('/comments/insert', {
          userId: state.userId,
          postId: postId,
          commentText: textContent,
        });
        getRecent(response.data.insertId);
      } catch (error) {
        console.error(error);
      }
      resetComment();
  }

  return (
    <div className="add-comment">
      <div className="comment-textarea">
        <TextForm 
          textRef = {textRef}
          rows="1"
          placeholder = "Add your comment..."
          submitText = {addComment}
          textContent = {textContent}
          setTextContent = {setTextContent}
          minHeight = {16}
        />
      </div>
      <div className="reply">
        <button disabled={(textContent.length === 0)} onClick={addComment}>Comment</button>
      </div>
    </div>
  )
}

export default AddComment;
