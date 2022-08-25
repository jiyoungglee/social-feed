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

  async function getUserPosts(body) {
    const response = await axios.get('/posts/getUserPosts', { params: body });
    setPosts(response.data);
  }

  useEffect(() => {
    const params = {
      userId,
      requestor: state.userId
    };
    getUserPosts(params);
  },[userId, state.userId]);

  return (
    <div>
      { state.userId === Number(userId) && <CreatePost getPosts={() => getUserPosts({userId, requestor: state.userId})} /> }
      <PostsLoad posts={posts} setPosts={setPosts} /> 
    </div>
  )
}

export default ProfilePage;
