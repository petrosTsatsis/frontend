import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/home";

const getPublicContent = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getCounts = () => {
  return axios.get(`${API_URL}`);
};

const UserService = {
  getPublicContent, getCounts
};




export default UserService;