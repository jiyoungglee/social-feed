import axios from "axios";

export default axios.create({
  baseURL: "https://api.jiyoung-lee.com/",
  withCredentials: true,
  headers: {
    "Content-type": "application/json"
  }
});
