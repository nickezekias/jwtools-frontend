import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://192.168.1.104/api",
  withCredentials: true,
  withXSRFToken: true
});

export default axios;