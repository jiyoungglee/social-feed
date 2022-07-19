import { useState } from 'react';
import axios from 'axios';
import '../Styles/EditablePost.css';
import TextForm from './TextForm';

function EditablePost({ postId, originalPost, saveEdit, editRef }) {
  const [textContent, setTextContent] = useState(originalPost);

  async function editPost() {
    try {
      const response = await axios.put('/posts/updatepost', {id: postId, postDetails: textContent});
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    saveEdit();
  }

  return (
    <div className="editable-post">
      <TextForm
        textRef = {editRef}
        rows="1"
        submitText = {editPost}
        textContent = {textContent}
        setTextContent = {setTextContent}
        minHeight = {16}
        type= "edit"
      />
    </div>
  )
}

export default EditablePost;