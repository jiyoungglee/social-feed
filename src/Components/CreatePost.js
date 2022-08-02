import { useState, useRef } from 'react';
import axios from 'axios';
import '../Styles/CreatePost.css';
import TextForm from './TextForm';

function CreatePost({ getPosts, currentUser }) {
  const [textContent, setTextContent] = useState('');
  const postRef = useRef(null);

  // Functions on post submission
  //Helper function after submit
  function resetText() {
    setTextContent('');
    postRef.current.style.height="auto";
    postRef.current.blur();
  }

  // Main submission function
  async function uploadPost() {
    try {
      const response = await axios.post('/posts/insert', {
        userId: currentUser,
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
      <TextForm 
        textRef = {postRef}
        placeholder = "What's on your mind?"
        submitText = {uploadPost}
        textContent = {textContent}
        setTextContent = {setTextContent}
        minHeight = {100}
      />
      <div className="submit">
        <button disabled={(textContent.length === 0)} onClick={uploadPost} >Post</button>
      </div>
    </div>
  )
}

export default CreatePost;
