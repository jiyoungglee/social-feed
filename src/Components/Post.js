import { useState, useRef } from 'react';
import axios from 'axios';
import '../Styles/Post.css'
import PostInteraction from './PostInteraction';
import PostOptions from './PostOptions';
import EditablePost from './EditablePost';

function Post({ postId, timestamp, username, details, postLikes, topComment, getPosts }) {
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

  function saveEdit() {
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
        <PostOptions deletePost={deletePost} enableEdit={enableEdit} />
      </div>
      <div className="post-content">
      {postEditable ? 
        <EditablePost postId={postId} originalPost={details} saveEdit={saveEdit} editRef={editRef} /> : 
        <div>{details}</div>
      }
      </div>
      <PostInteraction postId={postId} postLikes={postLikes} getPosts={getPosts} topComment={topComment} />
    </div>
  )
};

export default Post;
