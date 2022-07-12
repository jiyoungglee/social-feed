import axios from 'axios';
import '../Styles/Post.css'

function Post({ id, timestamp, userId, details, likes, onDelete }) {

  async function deletePost() {
    try {
      const response = await axios.delete('/posts/deletepost', { data: {id} });
      console.log(response);
      onDelete();
    } catch (error) {
      console.error(error);
    }
  }

  async function likePost() {
    try {
      const response = await axios.put('/posts/updatelikes', {id, likes: 1});
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <div className="post">
      <div className="post-header">
        <div className="username">{userId}</div>
        <div className="post-time">{timestamp}</div>
      </div>
      <div className="post-content">{details}</div>
      <div className="likes">{likes}</div>
      <div className="post-feedback">
        <button onClick={likePost}>Like</button>
        <button onClick={deletePost}>Delete</button>
      </div>
    </div>
  )
};

export default Post;
