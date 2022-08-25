import PostsLoad from "../PostsLoad";
import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom'
import { UserContext } from "../../store/UserContext";

function SearchResults() {
  const { state } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");
  
  async function fetchResults(query) {
    const response = await axios.put('/posts/getResults', query)
    setPosts(response.data);
  }

  useEffect(() => {
    const queryBody = {
      searchQuery: `%${searchQuery}%`,
      userId: state.userId
    }
    fetchResults(queryBody);
  }, [searchQuery, state.userId]);

  return (
    <div>
      {posts.length === 0 && "No Results"}
      <PostsLoad posts={posts} setPosts={setPosts} />
    </div>
  )
}

export default SearchResults;
