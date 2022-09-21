import { useState, useEffect, useContext } from 'react';
import http from '../../http-common';
import PostsLoad from '../PostsLoad';
import CreatePost from '../CreatePost';
import { UserContext } from '../../store/UserContext';

function Newsfeed() {
  const { state } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  async function getAllPosts(userId) {
    const response = await http.get('/posts', { params: { userId } });
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
