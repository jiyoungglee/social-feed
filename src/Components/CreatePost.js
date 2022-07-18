import { useState, useRef } from 'react';
import axios from 'axios';
import '../Styles/CreatePost.css';

function CreatePost({ getPosts }) {
  const [textContent, setTextContent] = useState('');
  const textRef = useRef(null);

  function autoGrow(event) {
    if (event.target.scrollHeight > 100) {
      event.target.style.height = "auto";
      event.target.style.height = (event.target.scrollHeight) + "px";
    }
  }

  function handleInputChange(event) {
    setTextContent(event.target.value);
  };

  function handleSubmit(event) {
    if(event.key === 'Enter' && !event.shiftKey) {
      uploadPost();
    }
  }

  function resetText() {
    setTextContent('');
    textRef.current.style.height="auto";
    textRef.current.blur();
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
    resetText();
  }

  return (
    <div className="new-post">
      <textarea
        ref={textRef}
        placeholder="What's on your mind?"
        onInput={autoGrow}
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
