import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getPublicContent = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getCounts = () => {
  return axios.get(`${API_URL}/home`);
};

const updateUser = (user) => {
  return axios.put(`${API_URL}/profile`, user, { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getCounts,
  updateUser,
};

export default UserService;