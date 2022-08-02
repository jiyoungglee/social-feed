import { useState, useRef } from 'react';
import axios from 'axios';
import '../Styles/Post.css'
import PostInteraction from './PostInteraction';
import OptionsMenu from './OptionsMenu';
import Editable from './Editable';

function Post({ postId, timestamp, userId, username, details, postLikes, topComment, commentsCount, getPosts, currentUser }) {
  const [postEditable, setPostEditable] = useState(false);
  const editRef = useRef(null);

  async function deletePost() {
    try {
      const response = await axios.delete('/posts/deletepost', { data: {id: postId} });
      console.log(response);
      getPosts();
    } catch (error) {
      console.error(error);
    }
  }

  function enableEdit() {
    setPostEditable(true);
  }

  async function editPost(newText) {
    try {
      const response = await axios.put('/posts/updatepost', {id: postId, postDetails: newText});
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setPostEditable(false);
    getPosts();
  }

  return(
    <div className="post">
      <div className="post-header">
        <div>
          <div className="username">{username}</div>
          <div className="post-time">{timestamp}</div>
        </div>
        {userId === currentUser &&
        <OptionsMenu onDelete={deletePost} enableEdit={enableEdit} />}
      </div>
      <div className="post-content">
        {postEditable ? 
        <div className="editable-post">
          <Editable postId={postId} originalText={details} saveEdit={editPost} editRef={editRef} />
          <span onClick={() => editPost(editRef.current.value)}>Save</span>
          <span onClick={() => setPostEditable(false)}>Cancel</span>
        </div>
        : 
        <div>{details}</div>
        }
      </div>
      <PostInteraction postId={postId} postLikes={postLikes} getPosts={getPosts} topComment={topComment} commentsCount={commentsCount} currentUser={currentUser} />
    </div>
  )
};

export default Post;
