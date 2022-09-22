import axios from "axios";

export default axios.create({
  baseURL: "https://social-feed-backend.herokuapp.com/",
  withCredentials: true,
  headers: {
    "Content-type": "application/json"
  }
});
