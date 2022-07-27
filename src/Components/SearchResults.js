import PostsLoad from "./PostsLoad";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'

function SearchResults() {
  // let  { searchQuery } = useParams();
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([])

  async function fetchResults(query) {
    const response = await axios.put('/posts/getResults', {
      searchQuery: query
    })
    setPosts(response.data);
  }

  useEffect(() => {
    const searchQuery = searchParams.get("searchQuery");
    const queryBody = `%${searchQuery}%`
    fetchResults(queryBody);
  }, [searchParams]);

  return (
    <div>
      {posts.length === 0 && "No Results"}
      <PostsLoad posts={posts} getPosts={fetchResults} />
    </div>
  )
}

export default SearchResults;
