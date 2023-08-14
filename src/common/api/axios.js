import axios from "axios";

const instance = axios.create({
  baseURL: "https://nature-app-api.onrender.com/api/v1",
});

export default instance;
