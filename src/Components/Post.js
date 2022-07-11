import axios from 'axios';

function Post({ id, user, details, onDelete }) {
  async function deletePost() {
    try {
      const response = await axios.delete('/posts/deletepost', { data: {id} });
      console.log(response);
      onDelete();
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <div>
      {user}
      {details}
      <button onClick={deletePost}>Delete</button>
    </div>
  )
};

export default Post;