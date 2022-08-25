import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostsLoad from '../PostsLoad';
import CreatePost from '../CreatePost';
import { UserContext } from '../../store/UserContext';

function Newsfeed() {
  const { state } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  async function getAllPosts(userId) {
    const response = await axios.get('/posts', { params: { userId } });
    setPosts(response.data);
  }

  useEffect(() => {
    getAllPosts(state.userId);
  },[state.userId]);

  return (
    <div className="newsfeed-content">
      <CreatePost getPosts={() => getAllPosts(state.userId)} />
      <PostsLoad posts={posts} setPosts={setPosts} />
    </div>
  );
}

export default Newsfeed;
