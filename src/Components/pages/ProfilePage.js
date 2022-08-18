import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PostsLoad from "../PostsLoad";
import { useParams } from "react-router-dom";
import CreatePost from "../CreatePost";
import { UserContext } from "../../store/UserContext";

function ProfilePage() {
  const { state } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

  async function getUserPosts(url) {
    const response = await axios.get(url);
    setPosts(response.data);
  }

  useEffect(() => {
    const endpoint = `/posts/getPosts/${userId}`;
    getUserPosts(endpoint);
  },[userId]);

  return (
    <div>
      { state.userId === Number(userId) && <CreatePost getPosts={() => getUserPosts(`/posts/getPosts/${userId}`)} /> }
      <PostsLoad posts={posts} setPosts={setPosts} /> 
    </div>
  )
}

export default ProfilePage;
