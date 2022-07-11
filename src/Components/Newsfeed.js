import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

function Newsfeed() {
  const [textContent, setTextContent] = useState('');
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const response = await axios.get('/posts');
    setPosts(response.data);
  }

  useEffect(() => {
    getPosts();
  },[]);

  function handleInputChange(event) {
    setTextContent(event.target.value);
  };

  async function handleSubmit(event) {
    if(event.key === 'Enter' && !event.shiftKey) {
      try {
        const response = await axios.post('/posts/insert', {
          userId: '1234',
          postDetails: textContent,
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      getPosts();
      setTextContent('');
    }
  }

  function loadPosts() {
    return(
      posts.map((post) => {
        return <Post key={post.id} id={post.id} user={post.userId} details={post.postDetails} onDelete={getPosts} />
      })
    )
  }

  return (
    <div>
      <textarea
        placeholder="What's on your mind?"
        onChange={handleInputChange}
        value={textContent}
        onKeyDown={handleSubmit}
      />
      {loadPosts()}
    </div>
  );
}

export default Newsfeed;
