import { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';

import '../Styles/PostInteraction.css';
import AddComment from './AddComment';


function PostInteraction({ id, likes, getPosts }) {
  const [currentLikes, setCurrentLikes] = useState(likes);
  const textRef = useRef(null);


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

  function toComment() {
    textRef.current.focus();
  }

  return (
    <div>
      <div className="likes">{likes} Likes</div>
      <div className="post-feedback">
        <button onClick={likePost}><FontAwesomeIcon icon={faHeart} /> Like</button>
        <button onClick={toComment}><FontAwesomeIcon icon={faMessage} /> Comment</button>
      </div>
      <AddComment textRef={textRef} />
    </div>
  )
}

export default PostInteraction;
