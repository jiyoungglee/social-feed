import { useState } from 'react';
import axios from 'axios';
import '../Styles/EditablePost.css';

function EditablePost({ id, originalPost, saveEdit, editRef }) {
  const [textContent, setTextContent] = useState(originalPost);

  function handleInputChange(event) {
    setTextContent(event.target.value);
  };

  async function editPost() {
    try {
      const response = await axios.put('/posts/updatepost', {id, postDetails: textContent});
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
        rows={textContent.split("\n").length}
        ref={editRef}
        onChange={handleInputChange}
        value={textContent}
        onKeyDown={handleEdit}
      />
    </div>
  )
}

export default EditablePost;