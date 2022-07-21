import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import CreatePost from './CreatePost';
import Navbar from './Navbar';
import '../Styles/Newsfeed.css';

function Newsfeed() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const response = await axios.get('/posts');
    setPosts(response.data);
  }

  useEffect(() => {
    getPosts();
  },[]);

  function loadPosts() {
    return(
      posts.map(({ poster, id, postDetails, postLikes, timestamp, commentId, commentText, commentLikes, commentTimestamp, commenter, commentsCount }) => {
        return (
          <Post 
            key={id}
            postId={id}
            timestamp={timestamp}
            username={poster}
            details={postDetails}
            postLikes={postLikes}
            topComment={commentId!==null && {commentId, commentText, commentLikes, commentTimestamp, commenter}}
            commentsCount={commentsCount}
            getPosts={getPosts}
          />)
      })
    )
  }

  return (
    <div>
      <Navbar />
      <div className="newsfeed-content">
        <CreatePost getPosts={getPosts} />
        {loadPosts()}
      </div>
    </div>
  );
}

export default Newsfeed;
