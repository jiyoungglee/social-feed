import axios from "axios";

export default axios.create({
  baseURL: "https://social-feed-backend.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});