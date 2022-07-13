import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import CreatePost from './CreatePost';
import Navbar from './Navbar';

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
      posts.map((post) => {
        return (
          <Post 
            key={post.id}
            id={post.id}
            timestamp={post.timestamp}
            username={post.username}
            details={post.postDetails}
            likes={post.likes}
            getPosts={getPosts}
          />)
      })
    )
  }

  return (
    <div>
      <Navbar />
      <CreatePost getPosts={getPosts} />
      {loadPosts()}
    </div>
  );
}

export default Newsfeed;
