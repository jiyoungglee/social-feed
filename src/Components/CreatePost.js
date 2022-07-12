import { useState } from 'react';
import axios from 'axios';
import '../Styles/CreatePost.css';

function CreatePost({ getPosts }) {
  const [textContent, setTextContent] = useState('');

  function handleInputChange(event) {
    setTextContent(event.target.value);
  };

  function handleSubmit(event) {
    if(event.key === 'Enter' && !event.shiftKey) {
      uploadPost();
    }
  }

  async function uploadPost() {
    try {
      const response = await axios.post('/posts/insert', {
        userId: 'TestUserId',
        postDetails: textContent,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    getPosts();
    setTextContent('');
  }

  return (
    <div className="new-post">
      <textarea
        placeholder="What's on your mind?"
        onChange={handleInputChange}
        value={textContent}
        onKeyDown={handleSubmit}
      />
      <div className="submit">
        <button onClick={uploadPost}>Post</button>
      </div>
    </div>
  )
}

export default CreatePost;
