import PostsLoad from "./PostsLoad";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

function SearchResults() {
  let  { searchQuery } = useParams();
  const [posts, setPosts] = useState([])

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
      <PostsLoad posts={posts} getPosts={fetchResults} />
    </div>
  )
}

export default SearchResults;
