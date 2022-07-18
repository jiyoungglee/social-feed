import { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/EditablePost.css';

function EditablePost({ postId, originalPost, saveEdit, editRef }) {
  const [textContent, setTextContent] = useState(originalPost);

  useEffect(() => {
    function autoGrow() {
      if (editRef.current.scrollHeight > 16) {
        editRef.current.style.height = "auto";
        editRef.current.style.height = (editRef.current.scrollHeight) + "px";
      }
    }
    autoGrow()
    editRef.current.focus()
  },[editRef, textContent]);

  function handleInputChange(event) {
    setTextContent(event.target.value);
  };

  async function editPost() {
    try {
      const response = await axios.put('/posts/updatepost', {id: postId, postDetails: textContent});
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    saveEdit();
  }

  function handleEdit(event) {
    if(event.key === 'Enter' && !event.shiftKey) {
      editPost();
    }
  }

  return (
    <div className="editable-post">
      <textarea
        rows="1"
        ref={editRef}
        onChange={handleInputChange}
        value={textContent}
        onKeyDown={handleEdit}
      />
    </div>
  )
}

export default EditablePost;