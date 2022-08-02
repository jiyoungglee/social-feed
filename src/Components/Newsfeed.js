import { useState, useEffect } from 'react';
import axios from 'axios';
import PostsLoad from './PostsLoad';
import CreatePost from './CreatePost';
import '../Styles/Newsfeed.css';

function Newsfeed() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  async function getAllPosts() {
    const response = await axios.get('/posts');
    setPosts(response.data);
  }

  async function getUser() {
    const response = await axios.get('/users/currentUser');
    setCurrentUser(response.data);
  }

  useEffect(() => {
    getAllPosts();
    getUser();
  },[]);

  return (
    <div className="newsfeed-content">
      <CreatePost getPosts={getAllPosts} currentUser={currentUser} />
      <PostsLoad posts={posts} getPosts={getAllPosts} currentUser={currentUser} />
    </div>
  );
}

export default Newsfeed;
