import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import '../styles/CreatePost.css';
import TextForm from './TextForm';
import { UserContext } from '../store/UserContext';

function CreatePost({ getPosts }) {
  const { state } = useContext(UserContext);
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
      await axios.post('/posts/insert', {
        userId: state.userId,
        postDetails: textContent,
      });
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
