import { useState, useEffect } from 'react';
import axios from 'axios';
import PostsLoad from '../PostsLoad';
import CreatePost from '../CreatePost';

function Newsfeed() {
  const [posts, setPosts] = useState([]);

  async function getAllPosts() {
    const response = await axios.get('/posts');
    setPosts(response.data);
  }

  useEffect(() => {
    getAllPosts();
  },[]);

  return (
    <div className="newsfeed-content">
      <CreatePost getPosts={getAllPosts} />
      <PostsLoad posts={posts} setPosts={setPosts} />
    </div>
  );
}

export default Newsfeed;
