import PostsLoad from "../PostsLoad";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'

function SearchResults() {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");
  

  async function fetchResults(query) {
    const response = await axios.put('/posts/getResults', {
      searchQuery: query
    })
    setPosts(response.data);
  }

  useEffect(() => {
    const queryBody = `%${searchQuery}%`
    fetchResults(queryBody);
  }, [searchQuery]);

  return (
    <div>
      {posts.length === 0 && "No Results"}
      <PostsLoad posts={posts} getPosts={fetchResults} />
    </div>
  )
}

export default SearchResults;
