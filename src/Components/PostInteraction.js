import { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';

import '../Styles/PostInteraction.css';
import AddComment from './AddComment';


function PostInteraction({ postId, postLikes, getPosts, comments }) {
  const [currentLikes, setCurrentLikes] = useState(postLikes);
  const textRef = useRef(null);


  async function likePost() {
    try {
      const response = await axios.put('/posts/updatelikes', {id: postId, postLikes: currentLikes+1});
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
      <div className="likes">{postLikes} Likes</div>
      <div className="post-feedback">
        <button onClick={likePost}><FontAwesomeIcon icon={faHeart} /> Like</button>
        <button onClick={toComment}><FontAwesomeIcon icon={faMessage} /> Comment</button>
      </div>
      <AddComment textRef={textRef} comments={comments} postId={postId} getPosts={getPosts} />
    </div>
  )
}

export default PostInteraction;
