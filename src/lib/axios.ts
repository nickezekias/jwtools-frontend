import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:5173",
  withCredentials: true,
});

export default axios;