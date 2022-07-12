import axios from 'axios';
import '../Styles/Post.css'
import PostInteraction from './PostInteraction';
import PostOptions from './PostOptions';

function Post({ id, timestamp, username, details, likes, getPosts }) {
  async function deletePost() {
    try {
      const response = await axios.delete('/posts/deletepost', { data: {id} });
      console.log(response);
      getPosts();
    } catch (error) {
      console.error(error);
    }
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
      <PostInteraction id={id} likes={likes} getPosts={getPosts} />
    </div>
  )
};

export default Post;
