import { useState } from 'react';
import axios from 'axios';
import '../Styles/Post.css'
import PostOptions from './PostOptions';

function Post({ id, timestamp, username, details, likes, getPosts }) {
  const [currentLikes, setCurrentLikes] = useState(likes);

  async function deletePost() {
    try {
      const response = await axios.delete('/posts/deletepost', { data: {id} });
      console.log(response);
      getPosts();
    } catch (error) {
      console.error(error);
    }
  }

  async function likePost() {
    try {
      const response = await axios.put('/posts/updatelikes', {id, likes: currentLikes+1});
      console.log(response);
      setCurrentLikes(currentLikes => currentLikes+1);
      getPosts();
    } catch (error) {
      console.error(error);
    }
  }

  function addComment() {
    console.log("To Do: Add Comment")
  }

  return(
    <div className="post">
      <div className="post-header">
        <div>
          <div className="username">{username}</div>
          <div className="post-time">{timestamp}</div>
        </div>
        <PostOptions deletePost={deletePost}/>
      </div>
      <div className="post-content">{details}</div>
      <div className="likes">{likes}</div>
      <div className="post-feedback">
        <button onClick={likePost}>Like</button>
        <button onClick={addComment}>Comment</button>
      </div>
    </div>
  )
};

export default Post;
