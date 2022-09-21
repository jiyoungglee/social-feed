import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import '../Styles/Post.css'
import PostInteraction from './PostInteraction';
import OptionsMenu from './OptionsMenu';
import Editable from './Editable';
import { UserContext } from '../store/UserContext';
import { Link } from 'react-router-dom';
import Timestamp from './Timestamp';

function Post({ postId, timestamp, userId, username, details, postLikes, topComment, commentsCount, postLiked, updatePost, removePost }) {
  const { state } = useContext(UserContext);
  const [postEditable, setPostEditable] = useState(false);
  const editRef = useRef(null);

  async function deletePost() {
    try {
      await axios.delete('/posts/deletepost', { data: {userId: state.userId, id: postId} });
      removePost(postId);
    } catch (error) {
      console.error(error);
    }
  }

  function enableEdit() {
    setPostEditable(true);
  }

  async function editPost(newText) {
    try {
      await axios.put('/posts/updatepost', {userId: state.userId, id: postId, postDetails: newText});
    } catch (error) {
      console.error(error);
    }
    setPostEditable(false);
    updatePost(postId);
  }

  return(
    <div className="post">
      <div className="post-header">
        <div>
          <Link to={`/profile/${userId}`} className="username">{username}</Link>
          <Timestamp type="post" timestamp={timestamp} />
        </div>
        <OptionsMenu onHide={() => removePost(postId)} onDelete={deletePost} enableEdit={enableEdit} editMode={userId === state.userId} />
      </div>
      <div className="post-content">
        {postEditable 
          ? <div className="editable-post">
              <Editable postId={postId} originalText={details} saveEdit={editPost} editRef={editRef} />
              <span onClick={() => editPost(editRef.current.value)}>Save</span>
              <span onClick={() => setPostEditable(false)}>Cancel</span>
            </div>
          : <div className="view-post">{details}</div>}
      </div>
      <PostInteraction postId={postId} postLikes={postLikes} updatePost={updatePost} topComment={topComment} commentsCount={commentsCount} postLiked={postLiked} />
    </div>
  )
};

export default Post;
